import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { add_advertisement } from '../../api/config';
import Button from '../../components/button/Button';

type FormData = {
    img1: FileList;
    link1: string;
    img2: FileList;
    link2: string;
    img3: FileList;
    link3: string;
};

function ADVForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const onSubmit = async (data: FormData) => {
        const formData = new FormData();

        if (!data.img1[0] || !data.img2[0] || !data.img3[0]) {
            return setError('All images are required');
        }

        console.log(data, 'data');

        formData.append('img1', data.img1[0]);
        formData.append('link1', data.link1);
        formData.append('img2', data.img2[0]);
        formData.append('link2', data.link2);
        formData.append('img3', data.img3[0]);
        formData.append('link3', data.link3);

        try {
            const response = await axios.post(add_advertisement, formData);

            if (response.data.success) {
                navigate('/');
            } else {
                setError(response.data.message || 'Upload failed');
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message || 'An error occurred');
            } else {
                setError('An unexpected error occurred');
            }
        }
    };

    return (
        <div className="flex justify-center items-center flex-col bg-white w-[35rem] m-auto rounded-2xl shadow-2xl mt-8">
            <h2 className="text-2xl font-bold m-8 font-cinzel">Upload Advertisement Image</h2>
            {/* {error && <p className="text-red-500">{error}</p>} */}

            <form className="flex flex-col p-4 gap-4 w-[34rem] m-auto mb-5" onSubmit={handleSubmit(onSubmit)}>
                {[1, 2, 3].map((num) => (
                    <div key={num}>
                        <label className="font-bold ">Image {num}:</label>
                        <input
                            type="file"
                            className="p-3 border-2 focus:outline-none rounded-lg w-full mb-2"
                            {...register(`img${num}` as keyof FormData, { required: 'Image is required' })}
                            accept="image/*"
                        />
                        {errors[`img${num}` as keyof FormData] && <p className="text-red-500">Image {num} is required</p>}

                        <input
                            type="text"
                            placeholder="Enter Link"
                            {...register(`link${num}` as keyof FormData, { required: 'Link is required' })}
                            className="p-3 border-2 focus:outline-none rounded-lg w-full mb-2"
                        />
                        {errors[`link${num}` as keyof FormData] && <p className="text-red-500">Link {num} is required</p>}
                    </div>
                ))}

                <Button text="Submit" />
            </form>
        </div>
    );
}

export default ADVForm;
