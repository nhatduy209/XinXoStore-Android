import storage from '@react-native-firebase/storage';

export default class TestAPI {
   myPromise = () => new Promise((resolve, reject) => {
    const ref = storage().ref('/testImage.jpeg');
    ref.getDownloadURL().then(res => resolve(res)).catch(err => reject(err));
  });
}