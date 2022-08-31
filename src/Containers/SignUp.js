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
import { PersonAddRounded } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signUpAction } from "../Store/Action/authAction";
export default function SignUp() {
  const userExist = JSON.parse(localStorage.getItem("user"));
  // const userExist = useSelector(({ auth }) => auth.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (userExist) {
      navigate("/");
    }
  }, []);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imagePath, setImagePath] = useState("");
  const dispatch = useDispatch();
  const handleSignUp = () => {
    const userInfo = {
      name,
      email,
      password,
      imageUri: imagePath,
    };
    dispatch(signUpAction(userInfo));
  };
  return (
    <Box>
      <AppBar sx={{ display: "flex", justifyContent: "center" }}>
        <Toolbar>
          <Typography variant="h6">Create New Account</Typography>
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
        <PersonAddRounded sx={{ fontSize: 70, color: "gray" }} />
        <FormLabel>
          Name :
          <br />
          <TextField
            type={"text"}
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ width: { sm: 320, xs: "100%" } }}
            variant="outlined"
          />
        </FormLabel>
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
        <FormLabel sx={{ marginTop: 3 }}>
          Profile Picture :
          <br />
          <TextField
            type={"file"}
            onChange={(e) => setImagePath(e.target.files[0])}
            sx={{ width: { sm: 320, xs: "100%" } }}
            variant="outlined"
            accept="image/*"
          />
        </FormLabel>
        <Button variant="contained" sx={{ mt: 5 }} onClick={handleSignUp}>
          SignUp
        </Button>
        <Button
          variant="outlined"
          sx={{ mt: 3 }}
          onClick={() => navigate("/sign-in")}
        >
          Already have an account?
        </Button>
      </Container>
    </Box>
  );
}
