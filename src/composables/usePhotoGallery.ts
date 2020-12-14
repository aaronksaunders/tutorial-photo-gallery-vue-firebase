import { ref, onMounted } from "vue";
import {
  Plugins,
  CameraResultType,
  CameraSource,
  CameraPhoto,
} from "@capacitor/core";
import { isPlatform } from "@ionic/vue";

// firebase service
import firebaseService from "../firebase-service";

export function usePhotoGallery() {
  const { Camera, Filesystem } = Plugins;
  const galleryPhotos = ref<Photo[]>([]);

  const { photos, loadPhotos, savePhoto, deletePhoto } = firebaseService();

  const loadSaved = async () => {
    galleryPhotos.value = photos;
  };

  const convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });

  const savePicture = async (
    photo: CameraPhoto,
    fileName: string
  ): Promise<boolean> => {
    let base64Data: string;
    // "hybrid" will detect Cordova or Capacitor;
    if (isPlatform("hybrid")) {
      const file = await Filesystem.readFile({
        path: photo.path!,
      });
      base64Data = file.data;
    } else {
      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(photo.webPath!);
      const blob = await response.blob();
      base64Data = (await convertBlobToBase64(blob)) as string;
    }
    const savedFile = {
      fileName: fileName,
      data: base64Data,
    };

    return savePhoto(savedFile);
  };

  const takePhoto = async () => {
    const cameraPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });
    const fileName = new Date().getTime() + ".jpeg";
    try {
      await savePicture(cameraPhoto, fileName);

      await loadPhotos();
      galleryPhotos.value = photos;
    } catch (e) {
      alert(e.message);
    }
  };

  /**
   * 
   * @param photo 
   */
  const deleteFromGallery = async (photo: any) => {
    try {
      const resp = await deletePhoto(photo.id);
      await loadPhotos();
    } catch (e) {
      alert(e.message);
    }
  };

  onMounted(loadSaved);

  return {
    photos,
    takePhoto,
    deleteFromGallery,
  };
}

export interface Photo {
  data: string;
  fileName: string;
  id: string;
}
