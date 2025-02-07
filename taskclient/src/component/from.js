import React, { useEffect } from 'react';
import { Box, Grid, TextField, Button } from '@mui/material';
import { profile, register, updateuser } from '../api';

export default function Form({ setView, updataval,refersh,setRefersh }) {
  const [email, setEmail] = React.useState('');
  const [upload, setUpload] = React.useState(false);
  const [firstname, setFirstname] = React.useState('');
  const [role, setRole] =React.useState('');
  const [dob, setDob] = React.useState('');
  const [mobileNumber, setMobileNumber] =React.useState('');
  const [city, setCity] = React.useState('');
  const [state, setState] = React.useState('');
 
  const [lastname, setLastname] = React.useState('');
  const [error, setError] = React.useState({
    firstnameError: "",
    lastnameError: "",
    emailError: "",
    dobError: "",
    roleError: "",
   mobileNumberError: "",
   cityError: "",
   stateError: "",

  });

  useEffect(() => {
    if (updataval) {
      setEmail(updataval.email || "");
      setFirstname(updataval.firstname || "");
      setLastname(updataval.lastname || "");
      setRole(updataval.role || "");
      setDob(updataval.dob || "");
      setCity(updataval.city || "");
      setState(updataval.state || "");
      setMobileNumber(updataval.mobileNumber || "");
    }
  }, [updataval]);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateName = (name) => /^[a-zA-Z]*$/.test(name) && name.length <= 100;

  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    let valid = true;


    if (!validateName(firstname)) {
      setError((prev) => ({ ...prev, firstnameError: "First name must be alphabetic and max 100 characters" }));
      valid = false;
    } else {
      setError((prev) => ({ ...prev, firstnameError: "" }));
    }

    if (!validateName(lastname)) {
      setError((prev) => ({ ...prev, lastnameError: "Last name must be alphabetic and max 100 characters" }));
      valid = false;
    } else {
      setError((prev) => ({ ...prev, lastnameError: "" }));
    }

    if (!validateEmail(email)) {
      setError((prev) => ({ ...prev, emailError: "Invalid email format" }));
      valid = false;
    } else {
      setError((prev) => ({ ...prev, emailError: "" }));
    }
    if (!role) {
      setError((prev) => ({ ...prev, roleError: "Role is not Enter" }));
      valid = false;
    } else {
      setError((prev) => ({ ...prev, roleError: "" }));
    }
    if (!dob) {
      setError((prev) => ({ ...prev, dobErrorError: "DoB is not Enter" }));
      valid = false;
    } else {
      setError((prev) => ({ ...prev, dobError: "" }));
    }
    if (!mobileNumber&& mobileNumber.length<11) {
      setError((prev) => ({ ...prev, mobileNumberError: "please check the Moblie Number" }));
      valid = false;
    } else {
      setError((prev) => ({ ...prev, mobileNumberError: "" }));
    }
    if (!city) {
      setError((prev) => ({ ...prev, cityError: "city is not Enter" }));
      valid = false;
    } else {
      setError((prev) => ({ ...prev, cityError: "" }));
    }
    if (!state) {
      setError((prev) => ({ ...prev, stateError: "state is not Enter" }));
      valid = false;
    } else {
      setError((prev) => ({ ...prev, stateError: "" }));
    }
    

    if (valid) {
      try {
        const res = await register({ firstname, lastname, email,mobileNumber,
          role:role,
          dob:dob,
          city:city,
          state:state,
         });
        alert(res.ok ? res.data.message : res?.message);
        if (res.ok) {
          setView(false);
          setRefersh(!refersh)
        } 
      } catch (error) {
        console.error(error);
        alert("An error occurred during registration. Please try again.");
      }
    }
  };

  const handleUpdateSubmit = async (event) => {
    event.preventDefault();
    let valid = true;

    if (!validateName(firstname)) {
      setError((prev) => ({ ...prev, firstnameError: "First name must be alphabetic and max 100 characters" }));
      valid = false;
    } else {
      setError((prev) => ({ ...prev, firstnameError: "" }));
    }

    if (!validateName(lastname)) {
      setError((prev) => ({ ...prev, lastnameError: "Last name must be alphabetic and max 100 characters" }));
      valid = false;
    } else {
      setError((prev) => ({ ...prev, lastnameError: "" }));
    }

    if (!validateEmail(email)) {
      setError((prev) => ({ ...prev, emailError: "Invalid email format" }));
      valid = false;
    } else {
      setError((prev) => ({ ...prev, emailError: "" }));
    }

    if (!role) {
      setError((prev) => ({ ...prev, roleError: "Role is not Enter" }));
      valid = false;
    } else {
      setError((prev) => ({ ...prev, roleError: "" }));
    }
    if (!dob) {
      setError((prev) => ({ ...prev, dobErrorError: "DoB is not Enter" }));
      valid = false;
    } else {
      setError((prev) => ({ ...prev, dobError: "" }));
    }
    if (!mobileNumber && mobileNumber.length<11) {
      setError((prev) => ({ ...prev, mobileNumberError: " valid Mobile Number Enter" }));
      valid = false;
    } else {
      setError((prev) => ({ ...prev, mobileNumberError: "" }));
    }
    if (!city) {
      setError((prev) => ({ ...prev, cityError: "city is not Enter" }));
      valid = false;
    } else {
      setError((prev) => ({ ...prev, cityError: "" }));
    }
    if (!state) {
      setError((prev) => ({ ...prev, stateError: "state is not Enter" }));
      valid = false;
    } else {
      setError((prev) => ({ ...prev, stateError: "" }));
    }
    
    if (valid) {
      try {
        const res = await updateuser({ 
          firstname,
           lastname, 
           email,
          mobileNumber,
          role:role,
          dob:dob,
          city:city,
          state:state,
          },updataval?._id);
        alert(res.ok ? res.data.message : res?.data?.message);
        if (res.ok) {
          setView(false);
          setRefersh(!refersh)
        }
            } catch (error) {
        console.error(error);
        alert("An error occurred during registration. Please try again.");
      }
    }
  };
  return (
    <Box sx={{ flexGrow: 1, padding: "50px" }}>
      <form onSubmit={updataval ?handleUpdateSubmit :handleSignupSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="First Name"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              error={!!error.firstnameError}
              helperText={error.firstnameError}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Last Name"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              error={!!error.lastnameError}
              helperText={error.lastnameError}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!error.emailError}
              helperText={error.emailError}
            />
             <TextField
              margin="normal"
              required
              fullWidth
              label="Mobile Number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              error={!!error.mobileNumberError}
              helperText={error.mobileNumberError}
            />
          </Grid>
          <Grid item xs={6}>
          <TextField
              margin="normal"
              required
              fullWidth
              label="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              error={!!error.roleError}
              helperText={error.roleError}
            />

          <TextField
              margin="normal"
              required
              fullWidth
              label="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              error={!!error.cityError}
              helperText={error.cityError}
            />
             </Grid>
             <Grid item xs={6}>
              
             <TextField
              margin="normal"
              required
              fullWidth
              label="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              error={!!error.stateError}
              helperText={error.stateError}
              />
              </Grid>

             <Grid item xs={6}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="DoB"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              error={!!error.dobError}
              helperText={error.dobError}
            />
             <Button type="submit"  variant="contained" sx={{ mt: 3, mb: 2 }} onClick={updataval ?handleUpdateSubmit :handleSignupSubmit}>
              Submit
            </Button>
         </Grid>
        </Grid>
      </form>
   
    </Box>
  );
}
