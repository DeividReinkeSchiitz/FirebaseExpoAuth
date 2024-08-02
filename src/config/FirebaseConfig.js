import firebase from "firebase";

const firebaseConfig = {
  apiKey: "KEY",
  authDomain: "react-nativefirebase-b8062.firebaseapp.com",
  databaseURL: "https://react-nativefirebase-b8062.firebaseio.com",
  projectId: "react-nativefirebase-b8062",
  storageBucket: "react-nativefirebase-b8062.appspot.com",
  messagingSenderId: "260499478397",
  appId: "1:260499478397:web:8ff754af1ee778b64fde14",
  measurementId: "G-E5SNC537GW"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

/* firebase.auth().onAuthStateChanged(user => {
  if (!user) {
    this.props.navigation.navigate("Loading");
  }
}); */
