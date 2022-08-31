import { useSelector, useDispatch } from "react-redux";
import SignIn from "./Containers/SignIn";
import SignUp from "./Containers/SignUp";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { fetchUserInfo } from "./Store/Action/authAction";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Inbox from "./Containers/Inbox";
import ChatRoom from "./Containers/ChatRoom";
export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(fetchUserInfo(user.uid));
      }
    });
  }, []);
  const userExist = useSelector(({ auth }) => auth.user);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={userExist !== null ? <Inbox /> : <SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/chat-room" element={<ChatRoom />} />
      </Routes>
    </BrowserRouter>
  );
}
