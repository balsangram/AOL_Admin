

import { Button, TextField, Paper } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { create_card, create_user_type } from '../api/config';

interface FormData {
    usertype: string;
    // link: string;
    image?: File;
}

function CreateInternalLogin() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    function createCard(data: FormData) {
        console.log(data,"data");
        
        const formData = new FormData();
        formData.append('usertype', data.usertype);
        // formData.append('link', data.link);
        if (selectedImage) {
            formData.append('img', selectedImage);
        }
        console.log('Card successfully increated:', data);


        axios.post(create_user_type, formData)
            .then((response) => {
                console.log(response);
                // navigate('/');
                // navigate("/action", { state: { usertype: usertype } });
            })
            .catch((err) => {
                console.error('Error:', err);
            });
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '4rem' }}>
            <Paper
                elevation={5}
                style={{
                    padding: '2rem',
                    borderRadius: '12px',
                    width: '400px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem',
                    // background: '#fff',
                    backgroundImage: "linear-gradient(0deg, #ECA55A , #fff)",
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                }}
            >
                <h2 style={{ textAlign: 'center', marginBottom: '1rem', color: '#333', fontSize: '1.5rem' }}>
                    Create User Type
                </h2>

                <TextField
                    label="User Type"
                    variant="outlined"
                    style={{
                        backgroundColor:"#fff"
                    }}
                    fullWidth
                    {...register('usertype', { required: 'Contents is required' })}
                    error={!!errors.usertype}
                    helperText={errors.usertype?.message}
                />

                {/* <TextField
                    label="Links"
                    variant="outlined"
                    fullWidth
                    {...register('link', { required: 'Links is required' })}
                    error={!!errors.link}
                    helperText={errors.link?.message}
                /> */}

                {/* Image Upload Section */}
                <div 
                style={{
                    display:"flex"
                }}
                >
                    <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="upload-image"
                        onChange={handleImageChange}
                    />
                    <label htmlFor="upload-image">
                        <Button
                            component="span"
                            variant="contained"
                            color="secondary"
                            fullWidth
                            sx={{
                                padding: '10px',
                                fontSize: '1rem',
                                backgroundColor: '#6c757d',
                                '&:hover': { backgroundColor: '#5a6268' },
                            }}
                        >
                            Upload Action Image
                        </Button>
                    </label>

                    {/* Show Image Preview */}
                    {imagePreview && (
                        <img
                            src={imagePreview}
                            alt="Preview"
                            style={{ marginTop: '10px', width: '100%', borderRadius: '8px' }}
                        />
                    )}
                </div>

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{
                        padding: '10px',
                        fontSize: '1rem',
                        color:"#ECA55A ",
                        backgroundColor: '#fff',
                        '&:hover': { backgroundColor: '#ECA55A ', color:"#fff" },
                    }}
                    onClick={handleSubmit(createCard)}
                >
                    Submit
                </Button>
            </Paper>
        </div>
    );
}

export default CreateInternalLogin;
