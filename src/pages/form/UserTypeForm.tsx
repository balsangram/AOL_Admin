import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { create_card, create_user_type } from '../../api/config';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/button/Button';

type FormData = {
    usertype: string;
    img: FileList;
};

function UserTypeForm() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormData>();
    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log(data.img, 'img');

        const formData = new FormData();
        formData.append('usertype', data.usertype);
        formData.append('img', data.img[0]);

        console.log(formData, "formData ''");

        axios
            .post(create_user_type, formData)
            .then((response) => {
                console.log('Response:', response);
                navigate('/user_type');
            })
            .catch((err) => {
                console.error('Axios Error:', err);
            });
    };

    return (
        <div className=" flex justify-center items-center flex-col bg-white w-[35rem] m-auto rounded-2xl shadow-2xl mt-8">
            <h2 className="text-2xl font-bold m-8 font-cinzel">Create User Type</h2>
            <form className="flex flex-col p-4 gap-2 w-[34rem] m-auto mb-5" onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder="User Type" className="p-4 border-2 focus:outline-none rounded-lg" {...register('usertype', { required: true })} />
                {errors.usertype && <span className="text-red-500">This field is required</span>}

                <label htmlFor="" className="bg-black-light rounded-lg">
                    <input type="file" className="p-4 focus:outline-none rounded-lg" {...register('img', { required: true })} />
                </label>
                {errors.img && <span className="text-red-500">This field is required</span>}
                <Button text="Submit" />
                {/* <input type="submit" /> */}
            </form>
        </div>
    );
}

export default UserTypeForm;
