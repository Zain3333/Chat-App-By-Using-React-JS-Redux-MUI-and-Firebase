import {
  Box,
  Typography,
  Toolbar,
  AppBar,
  Button,
  Container,
  Avatar,
} from "@mui/material";
import { Logout } from "@mui/icons-material";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../Store/Action/authAction";
import {
  detachRecipientsListener,
  getAllRecepientsAction,
} from "../Store/Action/chatAction";
export default function Inbox() {
  const currentUser = useSelector(({ auth }) => auth.user);
  const recepients = useSelector(({ chat }) => chat.recepients);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const userExist = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    dispatch(getAllRecepientsAction());
  }, []);
  useEffect(() => () => dispatch(detachRecipientsListener()), []);
  return (
    <Box>
      <AppBar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          pl: 3,
          pr: 3,
          alignItems: "center",
        }}
      >
        <Toolbar>
          <Typography variant="h6">My Inbox</Typography>
        </Toolbar>
        <Button
          sx={{ color: "red", bgcolor: "#e5e5e5", textTransform: "capitalize" }}
          startIcon={<Logout sx={{ color: "red" }} />}
          onClick={() => dispatch(logoutUser())}
        >
          Logout
        </Button>
      </AppBar>
      <Container
        sx={{
          borderRadius: 2,
          p: 3,
          marginTop: 10,
          bgcolor: "#efefefe5",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {recepients || recepients.length > 0
          ? recepients.map((user, index) => {
              return (
                <div
                  key={index}
                  style={{
                    border: "1px solid lightgrey",
                    backgroundColor: "#e5e5e5",
                    marginTop: 15,
                    padding: 10,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    borderRadius: 5,
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    navigate("/chat-room", { state: { user, currentUser } })
                  }
                >
                  <Avatar
                    alt="Profile Pic"
                    sx={{ width: 50, height: 50 }}
                    src={user.imageURL}
                  />
                  <Box>
                    <Typography ml={2}>{user.name}</Typography>
                    <Typography sx={{ ml: 2, fontSize: 12, color: "grey" }}>
                      {user.email}
                    </Typography>
                  </Box>
                </div>
              );
            })
          : null}
      </Container>
    </Box>
  );
}
