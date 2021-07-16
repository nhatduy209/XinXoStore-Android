import storage from '@react-native-firebase/storage'; 
export const uploadImageToStorage = (path, imageNamePath)  => {
  console.log(path);
  let reference = storage().ref(imageNamePath);         // path to image on storage 
  let task = reference.putFile(path);               // path to image on devices

  task.then(() => {                                 // 4
      console.log('Image uploaded to the bucket!');
  }).catch((e) => console.log('uploading image error => ', e));
}