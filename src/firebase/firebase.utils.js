import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config= {
    apiKey: "AIzaSyDZyGYRJHxB781ND1kkW5sZzzm6O7j15mo",
    authDomain: "shop-db-b23b9.firebaseapp.com",
    projectId: "shop-db-b23b9",
    storageBucket: "shop-db-b23b9.appspot.com",
    messagingSenderId: "377114038551",
    appId: "1:377114038551:web:6339414ea847b1ad41a752",
    measurementId: "G-M1TYQZNN6R"
  };

  export const createUserProfileDocument = async(userAuth, additionalData) =>{
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    //console.log(snapShot)
    if(!snapShot.exists){
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      }catch(error){
        console.log('error creating user ', error.message);
      }      
    }

    return userRef;

  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;