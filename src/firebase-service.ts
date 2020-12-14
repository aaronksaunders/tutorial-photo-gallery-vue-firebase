//
// firebaseservice - a composable for managing the interaction
// with firebase
//
// REFERENCE
// @see https://v3.vuejs.org/guide/composition-api-introduction.html#why-composition-api
//
import { onMounted, ref } from "vue";

// FIREBASE
import firebase from "firebase/app";
import "firebase/firestore";

const db = firebase
  .initializeApp({ projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID })
  .firestore();

const photoCollection = db.collection("photos");

const photos = ref<any>([]);
const error = ref<any>(null);
const loading = ref<any>(false);

export default () => {
  /**
   *
   * @param collection returns data for specified collections
   */
  const getCollectionData = async (collection: any) => {
    loading.value = true;
    try {
      const querySnapshot = await collection.get();
      const results = querySnapshot.docs.map((doc: any) => {
        return { ...doc.data(), id: doc.id };
      });
      loading.value = false;
      return results;
    } catch (e) {
      error.value = e;
      loading.value = false;
    }
  };

  /**
   * get document from firebase and not local photos
   *
   * @param collection
   * @param id
   */
  const getCollectionDoc = async (collection: any, id: string) => {
    loading.value = true;
    try {
      const doc = await collection.doc(id).get();
      loading.value = false;
      return { ...doc.data(), id: doc.id };
    } catch (e) {
      error.value = e;
      loading.value = false;
    }
  };


  /**
   * delete document from firebase collection
   *
   * @param collection
   * @param id
   */
  const removeCollectionDoc = async (collection: any, id: string) => {
    loading.value = true;
    try {
      const doc = await collection.doc(id).delete();
      loading.value = false;
      return true
    } catch (e) {
      error.value = e;
      loading.value = false;
      return false;
    }
  };

  /**
   * 
   * @param collection 
   * @param data 
   */
  const writeCollectionDoc = async (collection: any, data: any) => {
    loading.value = true;
    try {
      await collection.doc().set({...data}, {merge : true});
      loading.value = false;
      return true;
    } catch (e) {
      error.value = e;
      loading.value = false;
      return false;
    }
  };

  const loadPhotos = async () => {
    photos.value = await getCollectionData(photoCollection);
  };

  onMounted(async () => {
    await loadPhotos();
  });

  return {
    // functions
    loadPhotos,
    getphoto: (id: string) => getCollectionDoc(photoCollection, id),
    savePhoto: (data: any) => writeCollectionDoc(photoCollection, data),
    deletePhoto: (id: string) => removeCollectionDoc(photoCollection, id),
    //properties
    photos,
    loading,
    error,
  };
};
