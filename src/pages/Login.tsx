import { Button, Card, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/authSlice";
import axios from "axios";
import { useEffect } from "react";
import { display_login } from "../api/config";
import logo from "../../public/assets/logo/AOL LOGO BANGALORE ASHRAM BLACK.png";

// API URL from .env
// const API_URL = process.env.REACT_APP_API_URL;
// const API_URL = "http://localhost:8001";

// Type for login form data
interface LoginForm {
  email: string;
  password: string;
}

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ mode: "onBlur" });

  // Function to handle login
  const validSubmit = async (data: LoginForm) => {
    try {
      const response = await axios.post(`${display_login}`, data);
      console.log("Login Response:", response.data);

      // Save token & update Redux state
      localStorage.setItem("token", response.data.token);
      dispatch(loginSuccess(response.data.token));

      // Navigate to dashboard
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Login Error:", error);
      alert(error.response?.data?.message || "Invalid email or password");
    }
  };

  // Auto redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/dashboard");
  }, [navigate]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        height: "100vh",
        width: "100vw",
        position: "fixed",
        zIndex: "100",
        left: "0",
        top: "0",
      }}
    >
      <Card sx={{ width: 620, padding: "4rem" ,  backgroundImage: "linear-gradient(0deg, #ECA55A , #fff)" }}>
        {/* <h1 style={{ fontSize: "2.5rem", margin: "2rem 0 4rem", fontWeight: "bold" }}>
          AOL Admin Panel
          
        </h1> */}
        <img src={logo}
        style={{
          margin:"auto",
          width:"40%"
        }}
        alt="" />
        <h1 style={{ fontSize: "2rem" , margin:"2rem 0"}}>Login</h1>
        <form
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          onSubmit={handleSubmit(validSubmit)}
        >
          {/* Email Input */}
          <TextField
            label="Email"
            variant="outlined"
            {...register("email", { required: "Email is required" })}
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
          />

          {/* Password Input */}
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            {...register("password", { required: "Password is required" })}
            error={!!errors.password}
            helperText={errors.password?.message}
            fullWidth
          />

          {/* Submit Button */}
          <Button type="submit" variant="contained" style={{
            color:"#ECA55A ",
            backgroundColor:"#fff"
          }}>
            Submit
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default Login;
