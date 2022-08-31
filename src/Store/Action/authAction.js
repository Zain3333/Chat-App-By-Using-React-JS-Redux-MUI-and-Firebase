import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/analytics";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import { USER_LOGOUT, USER_REGISTERED } from "../Constant/authConst";
var firebaseConfig = {
  // ADD YOUR FIREBASE HERE
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();
export function signUpAction(user) {
  return async (dispatch) => {
    try {
      const imageURL = await uploadPic(user.imageUri);
      const registeredUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password);
      delete user.imageUri;
      user.imageURL = imageURL;
      user.uid = registeredUser.user.uid;
      await firebase.firestore().collection("users").add(user);
      dispatch({ type: USER_REGISTERED, payload: user });
    } catch (error) {
      console.log("ERROR: in 'signUpAction'", error.message);
    }
  };
}
async function uploadPic(image) {
  return new Promise(async (resolve, reject) => {
    try {
      // const fetchResponse = await fetch(image);
      // const blob = await fetchResponse.blob();
      let storage = firebase.storage();
      let storageRef = storage.ref();
      let imageName = Date.now();
      let imagesRef = storageRef.child(`Profile_Pic/${imageName}.jpg`);
      var file = image;
      return imagesRef.put(file).then(function (snapshot) {
        imagesRef.getDownloadURL().then(function (url) {
          console.log("Uploaded a blob or file!", url);
          resolve(url);
        });
      });
    } catch (error) {
      console.log("ERROR: in 'uploadPic' " + error.message);
    }
  });
}

export function signInAction(user) {
  return async (dispatch) => {
    const authenticatedUser = await firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password);
    delete user.password;
    user.uid = authenticatedUser.user.uid;
    const userFound = await firebase
      .firestore()
      .collection("users")
      .where("uid", "==", user.uid)
      .get();
    userFound.forEach(function (doc) {
      if (doc) {
        const user = doc.data();
        user.id = doc.id;
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
        }
        dispatch({ type: USER_REGISTERED, payload: user });
      }
    });
  };
}

export function fetchUserInfo(uid) {
  return async (dispatch) => {
    const userFound = await firebase
      .firestore()
      .collection("users")
      .where("uid", "==", uid)
      .get();
    userFound.forEach(function (doc) {
      if (doc) {
        dispatch({ type: USER_REGISTERED, payload: doc.data() });
      }
    });
  };
}

export function logoutUser() {
  return async (dispatch) => {
    await firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: USER_LOGOUT });
        localStorage.setItem("user", null);
      })
      .catch((err) => console.log(err));
  };
}
