import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../components/button/Button';
import axios from 'axios';
import { create_card, display_all_head } from '../../api/config';
import { useNavigate } from 'react-router-dom';

type Headline = {
    headline: string;
};

type FormData = {
    headline: string;
    name: string;
    link: string;
    img: FileList;
};

function CardForm() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = (data: FormData) => {
        console.log(data);
        const formData = new FormData();
        formData.append('headline', data.headline);
        formData.append('name', data.name);
        formData.append('link', data.link);
        formData.append('img', data.img[0]);
        console.log('formData', formData);

        axios
            .post(create_card, formData)
            .then((response) => {
                console.log(response, 'sucess');
                navigate('/');
            })
            .catch((err) => {
                console.log(err);
            });
    };
    console.log(errors);

    const [head, setHead] = useState<Headline[]>([]);

    useEffect(() => {
        axios
            .get(display_all_head)
            .then((response) => {
                console.log(response.data, 'headlines');
                setHead(response.data.headlines);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div className=" flex justify-center items-center flex-col bg-white w-[35rem] m-auto rounded-2xl shadow-2xl mt-8">
            <h2 className="text-2xl font-bold m-8 font-cinzel">Create New Card</h2>
            <form className=" flex flex-col p-4 gap-2 w-[34rem] m-auto mb-5" onSubmit={handleSubmit(onSubmit)}>
                <input className="p-4 border-2 focus:outline-none rounded-lg" type="text" placeholder="name" {...register('name', { required: true, maxLength: 80 })} />
                <input className="p-4 border-2 focus:outline-none rounded-lg" type="text" placeholder="link" {...register('link', { required: true, maxLength: 100 })} />
                <select className="p-4 border-2 focus:outline-none rounded-lg" {...register('headline', { required: true })}>
                    <option value="" className="font-poppins">
                        Select a Headline
                    </option>
                    {head.map((value, index) => (
                        <option key={index} value={value.headline}>
                            {value.headline}
                        </option>
                    ))}
                </select>
                <label htmlFor="" className="bg-black-light rounded-lg">
                    <input className="p-3 focus:outline-none rounded-lg" type="file" placeholder="img" {...register('img', { required: true })} />
                </label>
                {/* <input type="submit" /> */}
                <Button text="Submit" />
            </form>
        </div>
    );
}

export default CardForm;
