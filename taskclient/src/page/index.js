import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, IconButton, Typography, Dialog } from '@mui/material';
import CustomizedTables from '../component/table';
import { Deleteuser, getAll, profile } from '../api/index.js';
import Profile from '../component/profile.js';
import { MdAccountCircle } from 'react-icons/md'; // Import an icon for the profile
import Form from '../component/from.js';
import ImportExport from './upload.js';

function Dashboard() {
  const [tabledata, setTabledata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refersh, setRefersh] = useState(false);
  const [error, setError] = useState(null);
  const [profileData,setProfiledata]=useState()
  const [updataval,setUpdataval]=useState()
  const [openProfile, setOpenProfile] = useState(false); // State to manage the modal
  const [view, setView] = useState(false); // State to manage view toggle

  // Fetch data for the table
  const fetchData = async () => {
    try {
      const res = await getAll();
      console.log(res);
      setTabledata(res.data);
    } catch (err) {
      console.error("Failed to fetch data:", err);
      setError("Failed to load data.");
    } finally {
      setLoading(false);
    }
  };

  const getProfile = async () => {
    try {
      const res = await profile();
      console.log(res,"profile")
      setProfiledata(res.data.user);
    
    } catch (err) {
      console.error("Failed to fetch data:", err);
     
    } 
  };

  
  useEffect(() => {
    fetchData();
    getProfile();
  }, [refersh]);

  // Show loading or error state
  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box padding={3}>
      <Box padding={3} bgcolor="#b0a5a58c" borderRadius={3} color="#251d1da3">
        <Typography variant="h4" gutterBottom>
          User Details
        </Typography>
        <hr />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <IconButton
            onClick={() => setOpenProfile(true)} 
            style={{ position: 'relative' }}
          >
            <MdAccountCircle size={30} />
          </IconButton>

          {profileData?.role != "user" && 
          <>
          <Button
            variant="contained"
            sx={{ width: "150px" }}
            onClick={() => setView((prev) => !prev)} 
          >
            {view ? "Back" : "Create"}
          </Button>
         
          </>
           }
        </Box>
        <Box padding={2}  borderRadius={2} marginTop={2}>
        <Box marginBottom={1}>
        <ImportExport/>
        </Box>
        
          {view ? (
           
            <Form setView={setView} view={view} updataval={updataval} setRefersh={setRefersh} refersh={refersh}/>
            
          ) : (
            <CustomizedTables setView={setView} view={view} tabledata={tabledata} setUpdataval={setUpdataval} setRefersh={setRefersh} refersh={refersh} profileData={profileData}/>
          )}
        </Box>
      </Box>

      <Dialog
        open={openProfile}
        onClose={() => setOpenProfile(false)} 
        maxWidth="md"
        fullWidth
      >
        <Profile profileData={profileData}/>
      </Dialog> 
    </Box>
  );
}

export default Dashboard;