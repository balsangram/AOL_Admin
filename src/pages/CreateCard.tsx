import { Button, TextField, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { create_card } from '../api/config';

interface FormData {
    name: string;
    link: string;
    image?: File;
}

function CreateCard() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FormData>();

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [headline, setHeadline] = useState<string>("");

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    function createCard(data: FormData) {
        const formData = new FormData();
        formData.append('name', headline || data.name);
        formData.append('link', data.link);

        if (selectedImage) {
            formData.append('img', selectedImage);
        }

        axios.post(create_card, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then((response) => {
                console.log("Card Created Successfully:", response.data);
                navigate('/');
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
                    backgroundImage: "linear-gradient(0deg, #ECA55A , #fff)",
                    padding: '2rem',
                    borderRadius: '12px',
                    width: '400px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                }}
            >
                <h2 style={{ textAlign: 'center', marginBottom: '1rem', color: '#333', fontSize: '1.5rem' }}>
                    Create New Card
                </h2>

                {/* Language Selection */}
                <FormControl fullWidth>
                    <InputLabel>Headlines</InputLabel>
                    <Select
                        value={headline}
                        onChange={(event) => setHeadline(event.target.value)}
                    >
                        <MenuItem value="Facilities & Services at Center">Facilities & Services at Center</MenuItem>
                        <MenuItem value="Stay Updated">Stay Updated</MenuItem>
                    </Select>
                </FormControl>

                {/* Name Field (If no headline is selected) */}
                {!headline && (
                    <TextField
                        style={{ backgroundColor: "white" }}
                        label="Contents"
                        variant="outlined"
                        fullWidth
                        {...register('name', { required: 'Contents is required' })}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                    />
                )}

                <TextField
                    style={{ backgroundColor: "white" }}
                    label="Links"
                    variant="outlined"
                    fullWidth
                    {...register('link', { required: 'Links is required' })}
                    error={!!errors.link}
                    helperText={errors.link?.message}
                />

                {/* Image Upload Section */}
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
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
                            sx={{
                                padding: '10px',
                                fontSize: '1rem',
                                backgroundColor: '#6c757d',
                                '&:hover': { backgroundColor: '#5a6268' },
                            }}
                        >
                            Upload Image
                        </Button>
                    </label>

                    {/* Show Image Preview */}
                    {imagePreview && (
                        <img
                            src={imagePreview}
                            alt="Preview"
                            style={{ width: '80px', height: '80px', borderRadius: '8px', objectFit: 'cover' }}
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
                        color: "brown",
                        backgroundColor: '#fff',
                        '&:hover': { backgroundColor: '#ECA55A', color: "#fff" },
                    }}
                    onClick={handleSubmit(createCard)}
                >
                    Submit
                </Button>
            </Paper>
        </div>
    );
}

export default CreateCard;
