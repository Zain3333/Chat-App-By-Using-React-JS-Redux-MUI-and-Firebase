import {
  CLEAR_CHAT,
  CLEAR_RECEPIENT,
  GET_ALL_CHATS,
  GET_ALL_RECEPIENT,
} from "../Constant/chatConst";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
export function getAllRecepientsAction() {
  return async (dispatch) => {
    let allUsers = await firebase.firestore().collection("users").get();
    allUsers.forEach(function (doc) {
      const user = doc.data();
      user.id = doc.id;
      if (user.uid !== firebase.auth().currentUser.uid) {
        dispatch({ type: GET_ALL_RECEPIENT, payload: user });
      }
    });
  };
}

export function detachRecipientsListener() {
  return async (dispatch) => {
    dispatch({ type: CLEAR_RECEPIENT });
  };
}
let unsubscribe;
export function fetchAllMsgs(sender, recepientUid) {
  return async (dispatch) => {
    let chatDocId = makeDocId(sender, recepientUid);
    unsubscribe = firebase
      .firestore()
      .collection("chat")
      .doc(chatDocId)
      .collection("messages")
      .orderBy("createdAt", "asc")
      .onSnapshot(function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
          if (change.type === "added") {
            dispatch({ type: GET_ALL_CHATS, payload: change.doc.data() });
          }
        });
      });
  };
}

export function detachMsgListener() {
  return async (dispatch) => {
    unsubscribe();
    dispatch({ type: CLEAR_CHAT });
  };
}

export function sendMsg(msg) {
  return async (dispatch) => {
    let chatDocId = makeDocId(msg.sender, msg.receiver);
    firebase
      .firestore()
      .collection("chat")
      .doc(chatDocId)
      .collection("messages")
      .add(msg);
  };
}
function makeDocId(uid1, uid2) {
  let docId;
  if (uid1 > uid2) {
    docId = uid1 + uid2;
  } else {
    docId = uid2 + uid1;
  }
  return docId;
}
