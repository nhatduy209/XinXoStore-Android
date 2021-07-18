import storage from '@react-native-firebase/storage'; 
export const deleteImageFromStorage = (imageNamePath)  => {
  let reference = storage().ref(imageNamePath);         // path to image on storage

  reference.delete().then(() => {                                 // 4
      console.log('Image deleted from the bucket!');
  }).catch((e) => console.log('deleting image error => ', e));
}