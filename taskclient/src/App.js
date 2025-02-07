// import './App.css';
// import { BrowserRouter, Route, Routes, useNavigation } from 'react-router-dom'
// import Dashboard from './page';
// import React, { useEffect } from 'react';
// import Login from './page/login';
// // import UploadFile from './component/uploadfile';
// const navigate=useNavigation()
// // const [token,setToken]=React.useState("")
// let token;
// let getToken=localStorage.getItem("token")
// if(getToken){
//   token=JSON.parse(getToken)
// }

// useEffect(()=>{
//  if(!token){
// navigate('/')
//  }
//  },[])

// function App() {
//   return (
//     <>
//     <BrowserRouter>
//       <Routes>
//         {/* <Route exact path="/login" name="Login Page" element={<Login />} /> */}
//       <>
//         {!token ? 
//         <Route exact path="/" name="Login" element={<Login/>} />  
//        : <Route path="/home" name="Home"  element={ <Dashboard />} />}
//        </>
//       </Routes>
//       <div>
//   </div>
//   </BrowserRouter>
//   </>
//   );
// }

// export default App;


import './App.css';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Dashboard from './page';
import React, { useEffect } from 'react';
import Login from './page/login';

function App() {
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [token, navigate]);

  return (
    <Routes>
      {!token ? (
        <Route path="/" element={<Login />} />
      ) : (
        <Route path="/" element={<Dashboard />} />
      )}
    </Routes>
  );
}

const AppWrapper = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default AppWrapper;
