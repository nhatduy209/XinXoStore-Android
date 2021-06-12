import storage from '@react-native-firebase/storage';

export default class TestAPI {
   myPromise = ( img ) => new Promise((resolve, reject) => {
    const ref = storage().ref(img);
    ref.getDownloadURL().then(res => resolve(res)).catch(err => reject(err));
  });
}