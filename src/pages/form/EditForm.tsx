import { useLocation, useNavigate } from 'react-router-dom';
import { delete_action, delete_card, update_card } from '../../api/config';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';
import Button from '../../components/button/Button';
import { noop } from 'framer-motion';

type FormData = {
    name: string;
    link: string;
    img: FileList;
    id: string;
};

const EditForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location, 'location');

    const { link, name, img, id } = location.state || {}; // Getting initial values

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>(); // Type-safe form

    // State to manage input values
    const [formValues, setFormValues] = useState({
        name: name || '',
        link: link || '',
        img: null as File | null,
        id: id || '',
    });

    const onSubmit = (data: FormData) => {
        console.log('data', data.name);

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('link', data.link);
        if (data.img.length > 0) {
            formData.append('img', data.img[0]); // Append only if a new image is uploaded
        }

        console.log('formData', formData);

        // const formData = {
        //     name: data.name,
        //     link: data.link,
        // };

        axios
            .patch(`${update_card}/${formValues.id}`, formData)
            .then((response) => {
                console.log(response, 'success');
                navigate('/');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const deleteCard = () => {
        axios
            .delete(`${delete_card}/${formValues.id}`)
            .then((response) => {
                console.log(response, 'Deleted Successfully');
                navigate('/'); // Redirect after delete
            })
            .catch((err) => {
                console.error(err, 'Error deleting card');
            });
    };

    return (
        <div>
            <div className="flex justify-center items-center flex-col bg-white w-[35rem] m-auto rounded-2xl shadow-2xl mt-8">
                <h2 className="text-2xl font-bold m-8 font-cinzel">Edit Card</h2>
                <form className="flex flex-col p-4 gap-2 w-[34rem] m-auto mb-5" onSubmit={handleSubmit(onSubmit)}>
                    {/* Name Input */}
                    <input className="p-4 border-2 focus:outline-none rounded-lg" type="text" defaultValue={formValues.name} placeholder="Name" {...register('name')} />
                    {errors.name && <span className="text-red-500">Name is required</span>}

                    {/* Link Input */}
                    <input className="p-4 border-2 focus:outline-none rounded-lg" type="text" defaultValue={formValues.link} placeholder="Link" {...register('link')} />
                    {errors.link && <span className="text-red-500">Link is required</span>}

                    {/* Image Upload */}
                    <label htmlFor="img" className="bg-black-light rounded-lg ">
                        <input className="p-3 focus:outline-none rounded-lg" type="file" accept="image/*" {...register('img')} />
                    </label>

                    {/* Buttons */}
                    <div className="p-4 flex justify-around">
                        {/* <button type="submit" className="bg-blue-400 px-6 py-2 rounded-full hover:text-white hover:bg-blue-600">
                            Submit
                        </button> */}
                        <Button text="Submit" />
                        <button onClick={deleteCard} className="bg-red-400 px-6 py-2 rounded-full hover:text-white hover:bg-red-600">
                            DELETE
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditForm;
