
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import TextField from '@mui/material/TextField';
import { BiEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import { Deleteuser } from '../api';
import * as XLSX from "xlsx";
import { Button } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));




const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));



const CustomizedTables = ({ tabledata,setView,view,setUpdataval,setRefersh,refersh,profileData }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRows = Array.isArray(tabledata?.users)
  ? tabledata.users.filter(row =>
      row.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
  : []; // Return an empty array if tabledata.users is not defined

const paginatedRows = filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

const handel=(i)=>{
  setUpdataval(i)
  console.log(view)
  setView(true)
}
const handelDelete=async(i)=>{
    try {
      const res = await Deleteuser(i?._id)
     if(res.ok){
      setRefersh(!refersh)
      alert(res.data.message)
     }
    
    } catch (err) {
      console.error("Failed to fetch data:", err);
     
    } 

  }
  console.log(tabledata,"data")


const exportToExcel = () => {
  if (!Array.isArray(tabledata?.users) || tabledata?.users?.length === 0) {
    alert("No data available to export!");
    return;
  }

  const worksheet = XLSX.utils.json_to_sheet(tabledata?.users);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

  XLSX.writeFile(workbook, "users.xlsx");
};

  return (
    <>
    <Button variant="contained" onClick={exportToExcel}>Export Excel</Button>
    <Paper>
      
      <TextField
        label="Search"
        variant="outlined"
        size='small'
        sx={{width:"200px",marginLeft:" 10px"}}
        margin="normal"
        onChange={handleSearchChange}
      />
      <TableContainer>
        <Table sx={{ minWidth: 600 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>NO</StyledTableCell>
              <StyledTableCell align="center">FirstName</StyledTableCell>
              <StyledTableCell align="center">LastName</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">DateOfBrith</StyledTableCell>
              <StyledTableCell align="center">Role</StyledTableCell>
              <StyledTableCell align="center">Number</StyledTableCell>
              <StyledTableCell align="center">city</StyledTableCell>
              <StyledTableCell align="center">State</StyledTableCell>
            {profileData?.role!="user" &&
            <> 
             <StyledTableCell align="center">Edit & Update</StyledTableCell>
              <StyledTableCell align="center">Delete</StyledTableCell>
              </>
}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((row, key) => (
              <StyledTableRow key={row.email}>
                <StyledTableCell component="th" scope="row">
                  {page * rowsPerPage + key + 1}
                </StyledTableCell>
                <StyledTableCell align="center">{row.firstname}</StyledTableCell>
                <StyledTableCell align="center">{row.lastname}</StyledTableCell>
                <StyledTableCell align="center">{row.email}</StyledTableCell>
                <StyledTableCell align="center">{row.dob}</StyledTableCell>
                <StyledTableCell align="center">{row.role}</StyledTableCell>
                <StyledTableCell align="center">{row.mobileNumber}</StyledTableCell>
                <StyledTableCell align="center">{row.city}</StyledTableCell>
                <StyledTableCell align="center">{row.state}</StyledTableCell>
                {profileData?.role!="user" &&
                  <>
                <StyledTableCell align="center">
                  <div style={{ cursor: "pointer", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={()=>handel(row)}>
                  <BiEdit />
                  </div>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <div style={{ cursor: "pointer", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={()=>handelDelete(row)}>
                  <MdDelete />
                  </div>
                </StyledTableCell></>
                }
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>

<div style={{ height: 300, width: '100%' }}>
{/* <DataGrid
  {...data}
  loading={loading}
  slots={{
    toolbar: CustomToolbar,
  }}
/> */}
</div>
</>
  );
};

export default CustomizedTables;



// function CustomToolbar() {
//   return (
//     <>
//     // <GridToolbarContainer>
//     //   <GridToolbarExport printOptions={{ disableToolbarButton: true }} />
//     // </GridToolbarContainer>
//   );
// }
