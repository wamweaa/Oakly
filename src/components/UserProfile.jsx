import React, { useState, useEffect } from "react";
import { Grid, Typography, Button, Box, Snackbar, TextField, InputAdornment, IconButton } from "@mui/material";
import { ArrowBack as ArrowBackIcon, Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    contactNumber: "",
    password: "",
  });
  const [avatar, setAvatar] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const navigate = useNavigate();
  
  const token = localStorage.getItem("token"); // Fetch token from localStorage

  useEffect(() => {
    if (!token) {
      navigate("/signin"); // Redirect to sign-in if no token
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch("https://oakly-backend-1.onrender.com/api/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Add Authorization header
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFormData({
            username: data.name || "",
            email: data.email || "",
            contactNumber: data.phone || "",
            password: "",
          });
          // Handle avatar if available
        } else {
          const errorResult = await response.json();
          console.error("Failed to fetch user data:", errorResult);
          setMessage(errorResult.error || "Failed to fetch user data.");
          setMessageType("error");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setMessage("Error fetching user data.");
        setMessageType("error");
      }
    };

    fetchUserData();
  }, [navigate, token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    formDataToSend.append("username", formData.username);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("contactNumber", formData.contactNumber);
    formDataToSend.append("password", formData.password);
    if (avatar) {
      formDataToSend.append("avatar", avatar);
    }
  
    try {
      const response = await fetch("https://oakly-backend-1.onrender.com/api/user", {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`, // Add Authorization header
        },
        body: formDataToSend,
      });
  
      if (response.ok) {
        setMessage("Profile updated successfully!");
        setMessageType("success");
      } else {
        const errorResult = await response.json();
        setMessage(errorResult.error || "Failed to update profile.");
        setMessageType("error");
      }
    } catch (error) {
      setMessage("Error updating profile. Please try again.");
      setMessageType("error");
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  const handleSnackbarClose = () => setMessage("");

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: "100vh", background: "linear-gradient(to right, #74ebd5, #ACB6E5)" }}>
      <Grid item xs={12} sm={8} md={6}>
        <Box
          sx={{
            padding: 4,
            bgcolor: "white",
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
          }}
        >
          <IconButton onClick={() => navigate(-1)} style={{ marginBottom: "1rem" }}>
            <ArrowBackIcon style={{ color: "#007BFF" }} />
          </IconButton>
          <Typography variant="h4" sx={{ marginBottom: 2, fontWeight: "bold", color: "#007BFF" }}>
            User Profile
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <img
                src={
                  avatar
                    ? URL.createObjectURL(avatar)
                    : "https://cdn.builder.io/api/v1/image/assets/TEMP/abbf950f2a8a007869429c7e9fd0e822f1523d6d3ea027e64766fd65baab6430?placeholderIfAbsent=true&apiKey=d975cdd6201143ddb3c9da5092c113ba"
                }
                alt="User profile"
                style={{ borderRadius: "50%", marginBottom: "1rem", width: "120px", height: "120px" }}
              />
              <Button variant="contained" component="label" sx={{ marginBottom: 2 }}>
                Upload Picture
                <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
              </Button>
              <TextField
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                fullWidth
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                fullWidth
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Contact Number"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleInputChange}
                fullWidth
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleInputChange}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ marginBottom: 2 }}
              />
              <Button variant="contained" color="primary" type="submit">
                Update Profile
              </Button>
              <Button variant="outlined" color="secondary" onClick={handleLogout} sx={{ marginTop: 2 }}>
                Logout
              </Button>
            </Box>
          </form>
          <Snackbar
            open={!!message}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
            message={message}
            severity={messageType}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default UserProfile;
