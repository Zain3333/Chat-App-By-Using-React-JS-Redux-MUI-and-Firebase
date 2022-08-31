import {
  AppBar,
  Box,
  Button,
  Container,
  FormLabel,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signInAction } from "../Store/Action/authAction";
export default function SignIn() {
  // const userExist = JSON.parse(localStorage.getItem("user"));
  const userExist = useSelector(({ auth }) => auth.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (userExist !== null) {
      navigate("/");
    }
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleSignIn = () => {
    const userInfo = {
      email,
      password,
    };
    dispatch(signInAction(userInfo));
  };
  return (
    <Box>
      <AppBar sx={{ display: "flex", justifyContent: "center" }}>
        <Toolbar>
          <Typography variant="h6">Login to Continue</Typography>
        </Toolbar>
      </AppBar>
      <Container
        sx={{
          borderRadius: 2,
          p: 3,
          marginTop: 7,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <AccountCircle sx={{ fontSize: 90, color: "gray" }} />
        <FormLabel sx={{ marginTop: 3 }}>
          Email :
          <br />
          <TextField
            type={"email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ width: { sm: 320, xs: "100%" } }}
            variant="outlined"
          />
        </FormLabel>
        <FormLabel sx={{ marginTop: 3 }}>
          Password :
          <br />
          <TextField
            type={"password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ width: { sm: 320, xs: "100%" } }}
            variant="outlined"
          />
        </FormLabel>
        <Button variant="contained" sx={{ mt: 5 }} onClick={handleSignIn}>
          Login
        </Button>
        <Button
          variant="outlined"
          sx={{ mt: 3 }}
          onClick={() => navigate("/sign-up")}
        >
          Don't have an account?
        </Button>
      </Container>
    </Box>
  );
}
