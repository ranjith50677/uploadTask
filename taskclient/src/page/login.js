
import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  InputAdornment,
  IconButton,
  Grid
} from '@mui/material';
import { login, register } from '../api/index.js';
import { useNavigate } from 'react-router-dom';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailsingup, setEmailsingup] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [role, setRole] = useState('user');
  const [dob, setDob] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [passwordsingup, setPasswordsingup] = useState('');
  const [changepage, setChangepage] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passworderror, setPasswordError] = useState('');
  const [signupEmailError, setSignupEmailError] = useState('');
  const [firstnameError, setFirstnameError] = useState('');
  const [lastnameError, setLastnameError] = useState('');
  const [roleError, setRoleError] = useState('');
  const [dobError, setDobError] = useState('');
  const [cityError, setCityError] = useState('');
  const [stateError, setStateError] = useState('');
  const [mobileNumberError, setMobileNumberError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate=useNavigate()

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateName = (name) => {
    const regex = /^[a-zA-Z]*$/;
    return regex.test(name) && name.length <= 100;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      setEmailError('Invalid email format');
      return;
    } else {
      setEmailError('');
    }
    if (!password) {
      setPasswordError('please enter password ');
      return;
    } else {
      setPasswordError('');
    }


  const apicall=async()=>{
    try {    
      let res=await login({
        email:email,
        password:password})
        console.log(res)
      if(res?.ok){
      localStorage.setItem("token",JSON.stringify(res.data.token))
      alert(res?.data?.message)
      navigate("/")
      }
      if(!res.ok){
        // return setmessage(res?.message)
      }
    } catch (error) {
      console.log(error)
    }
  }
  if(!emailError||!passworderror){
     apicall()
} 

  };

  const handleSignupSubmit = (event) => {
    event.preventDefault();
    if(!firstname){
      setFirstnameError('please Enter First name');
    } else if (!validateName(firstname)) {
      setFirstnameError('First name must be alphabetic and max 100 characters');
      return;
    } else {
      setFirstnameError('');
    }

    if(!lastname){
      setLastnameError('please Enter Last name ');
    } else if (!validateName(lastname)) {
      setLastnameError('Last name must be alphabetic and max 100 characters');
      return;
    } else {
      setLastnameError('');
    }

    if(!emailsingup){
      setSignupEmailError('please Enter email ');
    }else if (!validateEmail(emailsingup)) {
      setSignupEmailError('Invalid email format');
      return;
    } else {
      setSignupEmailError('');
    }
    if(!emailsingup){
      setSignupEmailError('please Enter email ');
    }else if (!validateEmail(emailsingup)) {
      setSignupEmailError('Invalid email format');
      return;
    } else {
      setSignupEmailError('');
    }
    if(!role){
      setRoleError('please Enter Role ');
    } else {
      setRoleError('');
    }
    if(!role){
      setRoleError('please Enter Role ');
    } else {
      setRoleError('');
    }
    if(!mobileNumber){
      setMobileNumberError('please Enter Mobile Number ');
    } else {
      setMobileNumberError('');
    }
    if(!city){
      setCityError('please Enter City ');
    } else {
      setCityError('');
    }
    if(!state){
      setStateError('please Enter State ');
    } else {
      setStateError('');
    }
    if(!passwordsingup){
      setPasswordError('please Enter passwor ');
    } else {
      setPasswordError('');
    }

  const apicall=async()=>{
    try {    
      let res=await register({
        firstname:firstname,
        lastname:lastname,
        email:emailsingup,
        role:role,
        dob:dob,
        mobileNumber:mobileNumber,
        city:city,
        state:state,
        password:passwordsingup})
      console.log(res)

      if(res.ok){
       alert(res.data.message)
       setChangepage(!changepage)
      }
      if(!res.ok){
        return alert(res?.data?.message)
      }
    } catch (error) {
      console.log(error)
    }
  }
  if(firstname|| lastname || email || password){
    console.log("Api run")
     apicall()
} 

  };

  return (
    <div style={{
      marginTop: "-22px",
      // backgroundImage: URL(Background), 
            backgroundImage: 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdeMrtXbj94ZWlC2Gh45_h7YJ5lF66OEbO9Q&s")', // Add your image path here
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh', 
    }}
  >
   
    <Container component="main" maxWidth="xs" sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: "center",
      // mt: 8,
    }}>
      {changepage === false ? (
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor:"rgb(226 219 219 / 72%)",
          height: "67vh",
          justifyContent: "center",
          borderRadius: "10px",
          mt: 8,
        }}>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: "450px", paddingLeft: "50px", paddingRight: "50px" }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!emailError}
              helperText={emailError}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!passworderror}
              helperText={passworderror}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ?  <MdVisibility />: <MdVisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}

            />
            <Typography component="h1" variant="contained" sx={{
              fontSize: "15px",
              // color: "blue"
            }}
             >
              have an account<span style={{color:"blue",cursor: "pointer",
              fontSize: "15px",}}  onClick={() => setChangepage(true)}> Sing Up</span>
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, width: "150px" }}
                onClick={handleSubmit}>
                Sign In
              </Button>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: "600px",
          backgroundColor:"rgb(226 219 219 / 72%)",
          justifyContent: "center",
          borderRadius: "10px",
          mt: 8,
        }}>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSignupSubmit} noValidate sx={{ mt: 1, width: "450px", paddingLeft: "50px", paddingRight: "50px" }}>
          <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstname"
              label="First Name"
              name="firstname"
              autoComplete="first name"
              autoFocus
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              error={!!firstnameError}
              helperText={firstnameError}
            />
            </Grid>
            <Grid item xs={6}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="lastname"
              label="Last Name"
              name="lastname"
              autoComplete="lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              error={!!lastnameError}
              helperText={lastnameError}
            />


</Grid>
</Grid>
 <Grid container spacing={3}>
<Grid item xs={6}>

            <TextField
              margin="normal"
              required
              fullWidth
              id="signup-email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={emailsingup}
              onChange={(e) => setEmailsingup(e.target.value)}
              error={!!signupEmailError}
              helperText={signupEmailError}
            />
            </Grid>
            <Grid item xs={6}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="signup-password"
              autoComplete="current-password"
              value={passwordsingup}
              onChange={(e) => setPasswordsingup(e.target.value)}
              error={!!passworderror}
              helperText={passworderror}
               InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ?  <MdVisibility />: <MdVisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
             </Grid>
             </Grid>
             <Grid container spacing={3}>
             <Grid item xs={6}>
              
             <TextField
              margin="normal"
              required
              fullWidth
              id="role"
              label="Role"
              name="Role"
              autoComplete="Role"
              value={role}
              disabled
              // onChange={(e) => setRole(e.target.value)}
              error={!!roleError}
              helperText={roleError}
            />
             </Grid>
             <Grid item xs={6}>
              
             <TextField
              margin="normal"
              required
              fullWidth
              id="dob"
              label="DOB"
              name="dob"
              autoComplete="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              error={!!dobError}
              helperText={dobError}
            />
             </Grid>
             </Grid>
             <Grid container spacing={3}>
             <Grid item xs={6}>
              
             <TextField
              margin="normal"
              required
              fullWidth
              id="mobilenumber"
              label="Moblie Number"
              name="moblienumber"
              autoComplete="moblienumber"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              error={!!mobileNumberError}
              helperText={mobileNumberError}
            />
             </Grid>
             <Grid item xs={6}>
              
             <TextField
              margin="normal"
              required
              fullWidth
              id="city"
              label="City"
              name="city"
              autoComplete="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              error={!!cityError}
              helperText={cityError}
            />
           
           </Grid>
           </Grid>
           <Grid container spacing={3}>
           <Grid item xs={6}>
            
             <TextField
              margin="normal"
              required
              fullWidth
              id="state"
              label="State"
              name="state"
              autoComplete="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              error={!!stateError}
              helperText={stateError}
              />
              </Grid>
              </Grid>
            <Typography component="h1" variant="contained" sx={{
              cursor: "pointer",
              fontSize: "15px",
              color: "blue"
            }}
             >
               have an account<span style={{color:"blue",cursor: "pointer",
              fontSize: "15px",}}  onClick={() => setChangepage(false)}> Sing In</span>

            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, width: "150px" }}
                onClick={handleSignupSubmit}
                >
                Sign Up

              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Container>
    </div>
  );
};

export default Login;
