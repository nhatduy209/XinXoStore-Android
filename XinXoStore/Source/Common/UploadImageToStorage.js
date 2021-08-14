import storage from '@react-native-firebase/storage'; 
export const uploadImageToStorage =async(path, imageNamePath)  => {
  let reference = storage().ref(imageNamePath);         // path to image on storage 
  let task = reference.putFile(path);               // path to image on devices

  task.then((res) => {                                 // 4
      console.log('Image uploaded to the bucket!' );
  }).catch((e) => console.log('uploading image error => ', e));
}


export const uploadImageToStorageMessage =async(path, imageNamePath)  => new Promise( (resolve , reject) => {
  let reference = storage().ref(imageNamePath);         // path to image on storage 
  let task = reference.putFile(path);               // path to image on devices
  task.then((res) => {                                 // 4
      resolve(res)
  }).catch((e) => {console.log('uploading image error => ', e); reject(e)});
}) 