import { Button, Typography, Box, Card, CardContent } from "@mui/material";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { add_advertisement } from "../api/config";

type FormData = {
  file1: FileList;
  file2: FileList;
  file3: FileList;
};

function FileUploadForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const validSubmit = (data: FormData) => {
    const formData = new FormData();
    formData.append('img1', data.file1[0]);
    formData.append('img2', data.file2[0]);
    formData.append('img3', data.file3[0]);
   
    console.log("valid submit function:", data);
    axios.post(`${add_advertisement}`,formData).then((response)=>{
      console.log(response,"adv");
      navigate("/success");
      
    }).catch((err)=>{
      console.log(err);
      
    })
  };



  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // minHeight: "100vh",
        // background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
        padding: "20px",
      }}
    >
      <Card sx={{ maxWidth: 500, width: "100%", boxShadow: 5, borderRadius: 3,  backgroundImage: "linear-gradient(0deg, #ECA55A , #fff)", }}>
        <CardContent>
          <form
            style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
            onSubmit={handleSubmit(validSubmit)}
          >
            <Typography
              variant="h5"
              style={{
                marginBottom: "20px",
                textAlign: "center",
                fontWeight: "bold",
                color: "#333",
              }}
            >
              Upload Your Files
            </Typography>

            {/* File Input 1 */}
            <input
              type="file"
              style={{
                margin: "20px 0",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                backgroundColor: "#fff",
                
              }}
              {...register("file1", { required: "File 1 is required" })}
            />
            {errors.file1 && (
              <Typography color="error" style={{ marginBottom: "10px", fontSize: "14px" }}>
                {errors.file1.message}
              </Typography>
            )}

            {/* File Input 2 */}
            <input
              type="file"
              style={{
                margin: "20px 0",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                backgroundColor: "#fff",
              }}
              {...register("file2", { required: "File 2 is required" })}
            />
            {errors.file2 && (
              <Typography color="error" style={{ marginBottom: "10px", fontSize: "14px" }}>
                {errors.file2.message}
              </Typography>
            )}

            {/* File Input 3 */}
            <input
              type="file"
              style={{
                margin: "20px 0",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                backgroundColor: "#fff",
              }}
              {...register("file3", { required: "File 3 is required" })}
            />
            {errors.file3 && (
              <Typography color="error" style={{ marginBottom: "10px", fontSize: "14px" }}>
                {errors.file3.message}
              </Typography>
            )}

            <Button
              type="submit"
              variant="contained"
              // color="primary"
              sx={{
                marginTop: "20px",
                padding: "10px 20px",
                fontWeight: "bold",
                borderRadius: "8px",
                backgroundColor:"#fff ",
                color:"black"
              }}
            >
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default FileUploadForm;
