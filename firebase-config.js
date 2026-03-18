const firebaseConfig = {
  apiKey: "AIzaSyCsOs6bAlOfLGP6v1ydd81e3H1Ena7QJms",
  authDomain: "gorras-web.firebaseapp.com",
  projectId: "gorras-web",
  storageBucket: "gorras-web.appspot.com",
  messagingSenderId: "842328159823",
  appId: "1:842328159823:web:08ce3450399af1bb911c3a"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const storage = firebase.storage();