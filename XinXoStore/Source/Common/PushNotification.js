import axios from 'axios';
import { ServerKey } from '../Config/ServerKey';


export function sendNotification (title, message, receiverToken) {
  var body = {
    to: receiverToken,
    notification: {
      title: title,
      body: message,
      mutable_content: true,
      sound: "Tri-tone",
      color: "red",
      invokeApp: true,
      priority: 4
    }
  }

  axios({
    method: 'post', //you can set what request you want to be
    url: 'https://fcm.googleapis.com/fcm/send',
    data: body,
    headers: {
      "Content-Type": "application/json",
      "Authorization": "key=" + ServerKey
    }
  }).then((res) => {
    console.log('NOTIFICATION SENT -----------------')
  }).catch((e) => {
    console.log("ERORR--------------------", e)
  })
}