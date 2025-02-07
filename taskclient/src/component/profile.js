import React from 'react';
import {
  Container,
  Box,
  Avatar,
  Typography,
  Button,
  Paper,
  Grid,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
// import { BiEdit } from 'react-icons/bi';
// import { CiSettings } from 'react-icons/ci';
// import imageavatar from "./"

 
const Profile = ({profileData}) => {     

const navigate=useNavigate();
    const logout=()=>{
     localStorage.removeItem("token")
     navigate("/")
    }
  return (
    <Container maxWidth="sm" sx={{ mt: 5,textAlign:"center" }}>
      {/* <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}> */}
        <Box display="flex" flexDirection="column" alignItems="center" marginBottom="10%">
          {/* Avatar */}
          <Avatar
            // src={imageavatar}
            //  alt="Profile Picture"
            sx={{ width: 120, height: 120, mb: 2 }}
          >{(profileData?.firstname)?.slice(0,2).toUpperCase()}</Avatar>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            {profileData?.firstname} {profileData?.lastname}
          </Typography>
         
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
           <a style={{fontWeight:"bold"}}> Email:</a>{profileData?.email}
            
          </Typography>
          
        </Box>
      
        <Button
              type="submit"
              
              variant="contained"
              sx={{ mt: 3, mb: 2 ,width:"150px"}}
              onClick={logout}
            >
              Logout
            </Button>
      {/* </Paper> */}
    </Container>
  );
};

export default Profile;