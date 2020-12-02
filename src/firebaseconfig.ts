import * as firebase from 'firebase';
import "firebase/auth";
import "firebase/firestore"
import "firebase/functions";

const firebaseConfig = {
  apiKey: 'AIzaSyAQ-HG43-V1tAOCjTW3iPe69MJ1imbkmXM ',
  authDomain: 'swiper-9cfe9.firebaseapp.com',
  databaseURL: 'https://swiper-9cfe9.firebaseio.com',
  projectId: 'swiper-9cfe9',
  storageBucket: 'swiper-9cfe9.appspot.com',
  messagingSenderId: '511752242238',
  appId: '1:511752242238:web:fdea8164f6619ddd92bd6f',
  measurementId: 'G-2MQPMMRLHD',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };