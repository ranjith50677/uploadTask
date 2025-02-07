import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../modal/user.js";
import dotenv from "dotenv";
// import multer from "multer";
import xlsx from "xlsx";
// import cors from "cors";
// import path from "path";

dotenv.config()

export const reg =async (req,res)=>{
const saltRound=10;

let firstname=req.body.firstname
let lastname=req.body.lastname
let role=req.body.role
let dob=req.body.dob
let gender=req.body.gender
let city=req.body.city
let state=req.body.state
let mobileNumber=req.body.mobileNumber
let email=req.body.email
let password=req.body.password

const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const validateName = (name) => {
  const regex = /^[a-zA-Z]*$/;
  return regex.test(name) && name.length <= 100;
};
if(!firstname){
  return res.status(400).json({message:"please enter fristname"})
}else if(!validateName(firstname)){
  return res.status(400).json({message:" only alphabetical charater enter and max 100 charater "})
}

if(!lastname){return res.status(400).json({message:"please enter lastname"})
}else if(!validateName(lastname)){
    return res.status(400).json({message:" only alphabetical charater enter and max 100 charater "})
  }
if(!email){
  return res.status(400).json({message:"please enter email"})
}else if(!validateEmail(email)){
  return res.status(400).json({message:" valide email "})
}

if(!password)return res.status(400).json({message:"please enter password"})
// if(firstname.length < 100 )return res.status(400).json({message:"max 100 value"})
let exemail=await User.findOne({email:email})
if(exemail)return res.status(400).json({message:"email already exists"})
bcrypt.hash(req.body.password,saltRound,
  async(err,hash)=>{
    try {
        let register=await new User({
            firstname:firstname,
            lastname:lastname,
            email:email,
            role:role,
            mobileNumber:mobileNumber,
            city:city,
            dob:dob,
            state:state,
            gender:gender,
            password:hash
        })
        let usersave=await register.save();
        res.status(201).json({message:"register success"})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})

};


// export const ownerreg =async (req,res)=>{
// const saltRound=10;

// let firstname=req.body.firstname
// let lastname=req.body.lastname
// let role=req.body.role
// let dob=req.body.dob
// let gender=req.body.gender
// let city=req.body.city
// let state=req.body.state
// let mobileNumber=req.body.mobileNumber
// let email=req.body.email
// let password=req.body.password

// const validateEmail = (email) => {
//   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return regex.test(email);
// };

// const validateName = (name) => {
//   const regex = /^[a-zA-Z]*$/;
//   return regex.test(name) && name.length <= 100;
// };
// if(!firstname){
//   return res.status(400).json({message:"please enter fristname"})
// }else if(!validateName(firstname)){
//   return res.status(400).json({message:" only alphabetical charater enter and max 100 charater "})
// }

// if(!lastname)
//   {return res.status(400).json({message:"please enter lastname"})
// }else if(!validateName(lastname)){
//     return res.status(400).json({message:" only alphabetical charater enter and max 100 charater "})
//   }

// if(!email){
//   return res.status(400).json({message:"please enter email"})
// }else if(!validateEmail(email)){
//   return res.status(400).json({message:" valide email "})
// }

// if(!password)return res.status(400).json({message:"please enter password"})
// // if(firstname.length < 100 )return res.status(400).json({message:"max 100 value"})
// let exemail=await User.findOne({email:email})
// if(exemail)return res.status(400).json({message:"email already exists"})
// bcrypt.hash(req.body.password,saltRound,
//   async(err,hash)=>{
//     try {
//         let register=await new User({
//           firstname:firstname,
//           lastname:lastname,
//           email:email,
//           role:role,
//           mobileNumber:mobileNumber,
//           city:city,
//           dob:dob,
//           state:state,
//           gender:gender,
//           password:hash,
//            isOwner:true
//         })
//         let usersave=await register.save();
//         res.status(201).json({message:"register success"})
//     } catch (error) {
//         res.status(400).json({message:error.message})
//     }
// })

// };


export const login = async (req, res) => {
  console.log(req.body)
    let email = req.body.email?.toLowerCase();
    let foundUser = await User.findOne({ email: email });
    if (!req.body.email)
      return res.status(400).json({ message: "please enter email" });
    if (!req.body.password)
      return res.status(400).json({ message: "please enter password" });
    if (foundUser) {
      bcrypt.compare(req.body.password, foundUser.password, (err, result) => {
        
        if (result) {
          try {
            const token = jwt.sign({ id: foundUser?._id }, process.env.JWT, {
              expiresIn: "4h",
            });
            res.header("token", token).json({
              message: "login successfully",
              token: token
            });
          } catch (error) {
            res.status(400).json({ message: error.message });
          }
        } else {
          res.status(400).json({ message: "please enter correct password" });
        }
      });
    } else {
      res.status(404).json({ message: "user not found" });
    }
  };
  

  export const uploadUser = async (req, res) => {
    const workbook = xlsx.readFile(req.file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const users = xlsx.utils.sheet_to_json(sheet);
    let errorMsg = ""
    try {
      for (let index = 0; index < users.length; index++) {
        const element = users[index];
        let exemail = await User.findOne({ email: element.email })
        if (!exemail) {
          let register = await new User({
            firstname: element.firstname,
            lastname: element.lastname,
            email: element.email,
            mobileNumber: element.mobileNumber,
            role: element.role,
            dob: element.dob,
            city: element.city,
            state: element.state
          })
          await register.save();
        } else {
          // errorMsg += " email ${element.email} already exists"
        }
      }
      res.send('Users imported successfully');
    } catch (error) {
      res.status(400).send(error);
    }
  }

  
// export const exportUsers = async (req, res) => {
//   const users = await User.find();
//   const worksheet = xlsx.utils.json_to_sheet(users);
//   const workbook = xlsx.utils.book_new();
//   xlsx.utils.book_append_sheet(workbook, worksheet, 'Users');
//   res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
//   res.setHeader('Content-Disposition', 'attachment; filename=users.xlsx');
//   xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' });
//   res.end();
// }
  
export const exportUsers = async (req, res) => {
  try {
      const users = await User.find().lean(); // Use .lean() for faster query response

      if (!users.length) {
          return res.status(404).json({ message: "No users found to export" });
      }

      const worksheet = xlsx.utils.json_to_sheet(users);
      const workbook = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(workbook, worksheet, "Users");

      const excelBuffer = xlsx.write(workbook, { bookType: "xlsx", type: "buffer" });

      // Set response headers for file download
      res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
      res.setHeader("Content-Disposition", 'attachment; filename="users.xlsx"');

      // Send buffer to client
      res.send(excelBuffer);
  } catch (error) {
      console.error("Error exporting users:", error);
      res.status(500).json({ message: "Error exporting users" });
  }
};


  export const getAllUsers = async (req, res) => {
    try {
      let users = await User.find()
      res.status(200).json({ users });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  export const getUserById = async (req, res) => {
    try {
      let user = await User.findById(req.params.id);
      res.status(200).json({ user });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  export const profile = async (req, res) => {
    try {
      let user = await User.findById({_id: req.user.id});
      res.status(200).json({ user });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  export const UpdateUser = async (req, res) => {
    try {
      let user = await User.findByIdAndUpdate(req.params.id,
        {
          firstname:req.body.firstname,
          lastname:req.body.lastname,
          email:req.body.email,
          role:req.body.role,
          dob:req.body.dob,
          gender:req.body.gender,
          city:req.body.city,
          state:req.body.state,
          mobileNumber:req.body.mobileNumber,
          email:req.body.email,
          password:req.body.password

      });
      res.status(200).json({ message:"update sucessfully" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };



  export const deleteuser = async (req, res) => {
    try {
      let user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json({ message:"delete sucessfully" });
    } catch (error) {
      res.status(400).json({ message: error.message });
}
  };


