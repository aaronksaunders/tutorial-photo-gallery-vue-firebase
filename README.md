
<p align="center">
  <img src="Screen Shot 2020-12-14 at 12.34.22 AM.png"  height="450" /><br />
</p>
<br/>

# Build Your First Ionic App: Photo Gallery (Ionic Vue and Capacitor) WITH FIREBASE!!

----

Adding Firebase To Ionic Framework Intro to VueJS Camera App
#ionic #vuejs #firebase

In the "Your First Ionic App: Vue" https://ionicframework.com/docs/vue/your-first-app from the ionic documentation, They show how to use the vue ionic and capacitor camera to take photos using the plugins and save them to local storage. In this video, I take that application and add firebase for saving and retrieving the photos from the firebase database

- App might not work on some devices because the image being captured it too large for a base64 string
- See video on YouTube [Adding Firebase To Ionic Framework Intro to VueJS Camera App](https://youtu.be/f3Fcje1GfSg)
---

Get started with Ionic by building a photo gallery app that runs on iOS, Android, and the web - with just one codebase. This is the complete project referenced in the ["Your First App: Vue" guide](https://ionicframework.com/docs/vue/your-first-app). Follow along to create a complete CRUD (create-read-update-delete) experience.

Powered by [Ionic Vue](https://ionicframework.com/docs/vue/overview) (web app) and [Capacitor](https://capacitorjs.com) (native app runtime).

## How It Works

After the user navigates to Tab 2 (Photos), they can tap/click on the camera button to open up the device's camera. After taking or selecting a photo, it's stored permanently into the device's filesystem. When the user reopens the app at a later time, the photo images are loaded from the filesystem and displayed again in the gallery. The user can tap on a photo to be presented with the option to remove the photo.

## Feature Overview
* App framework: [Vue](https://vuejs.org/)
* UI components: [Ionic Framework](https://ionicframework.com/docs/components)
  * Camera button: [Floating Action Button (FAB)](https://ionicframework.com/docs/api/fab)
  * Photo Gallery display: [Grid](https://ionicframework.com/docs/api/grid)
  * Delete Photo dialog: [Action Sheet](https://ionicframework.com/docs/api/action-sheet) 
* Native runtime: [Capacitor](https://capacitorjs.com)
  * Taking photos: [Camera API](https://capacitorjs.com/docs/apis/camera)
  * [NEW] Writing photo to Firebase
  * [NEW] Storing photo gallery in Firebase

## Project Structure
* Tab2 (Photos) (`src/views/Tab2.vue`): Photo Gallery UI and basic logic.
* usePhotoGallery Hook (`src/composables/usePhotoGallery.ts`): Logic encapsulating Capacitor APIs, including Camera .
* [NEW] firebase-service (`src/firebase-service.ts`) for interacting with firebase for CRUD Actions

## How to Run

[NEW] You need to include a `.env` file in the root directory of your application that has your firebase configuration
```
VUE_APP_FIREBASE_PROJECT_ID=your-project-id
```

> Note: It's highly recommended to follow along with the [tutorial guide](https://ionicframework.com/docs/vue/your-first-app), which goes into more depth, but this is the fastest way to run the app. 

0) Install Ionic if needed: `npm install -g @ionic/cli`.
1) Clone this repository.
2) In a terminal, change directory into the repo: `cd photo-gallery-capacitor-vue`.
3) Install all packages: `npm install`.
4) Run on the web: `ionic serve`.
5) Run on iOS or Android: See [here](https://ionicframework.com/docs/building/running).
