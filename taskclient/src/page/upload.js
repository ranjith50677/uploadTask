import { useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { Button } from "@mui/material";

const ImportExport = () => {
    const [file, setFile] = useState(null);


    const uploadFile = async () => {
        if (!file) {
            alert("Please select a file first!");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        const token = localStorage.getItem("token"); 

        try {
            await axios.post("http://localhost:7373/api/user/uploadusers", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: JSON.parse(token),  
                },
            });

            alert("Users Imported Successfully!");
        } catch (error) {
            alert("Error importing users. Please check the file format.");
            console.error(error);
        }
    };


    // const exportUsers = async () => {
    //     const res = await axios.get("http://localhost:7373/export-users", { responseType: "blob" });
    //     const url = window.URL.createObjectURL(new Blob([res.data]));
    //     const link = document.createElement("a");
    //     link.href = url;
    //     link.setAttribute("download", "users.xlsx");
    //     document.body.appendChild(link);
    //     link.click();
    // };

    const exportUsers = async () => {
        try {
            const token = localStorage.getItem("token");
    
            if (!token) {
                alert("User not authenticated. Please log in.");
                return;
            }
    
            const res = await axios.get("http://localhost:7373/api/user/exportusers", { 
                responseType: "blob",
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`,
                },
            });
    
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "users.xlsx");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            alert("Error exporting users. Please try again.");
            console.error("Export Error:", error);
        }
    };
    
    return (
        <div>
            <h2>Import & Export Users</h2>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
              <Button variant="contained" onClick={uploadFile}>Import</Button>
            {/* <button onClick={exportUsers}>Export</button> */}
        </div>
    );
};

export default ImportExport;