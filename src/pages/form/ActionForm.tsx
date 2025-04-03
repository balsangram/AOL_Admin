import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import { add_action, display_all_user_type } from '../../api/config';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/button/Button';

type FormData = {
    language: string;
    usertype: string;
    actions: { action: string; link: string; img: FileList }[];
};

function ActionForm({ head }: { head: { headline: string }[] }) {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<FormData>();

    const { fields, append, remove } = useFieldArray({ control, name: 'actions' });

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        console.log('Form Data:', data);

        const requests = data.actions.map(async (item) => {
            const formData = new FormData();
            formData.append('language', data.language);
            formData.append('usertype', data.usertype);
            formData.append('action', item.action);
            formData.append('link', item.link);

            if (item.img && item.img.length > 0) {
                console.log('Selected file:', item.img[0]);
                formData.append('img', item.img[0]);
            } else {
                console.warn('No file selected');
            }

            return axios.post(add_action, formData);
        });

        try {
            await Promise.all(requests);
            navigate('/user_type');
        } catch (err) {
            console.error(err);
        }
    };

    const [userType, setUserType] = useState<{ usertype: string }[]>([]);
    const language = ['English'];

    useEffect(() => {
        axios
            .get(display_all_user_type)
            .then((response) => setUserType(response.data))
            .catch((err) => console.error('Error fetching user types:', err));
    }, []);

    return (
        <div className=" flex justify-center items-center flex-col bg-white w-[35rem] m-auto rounded-2xl shadow-2xl mt-8">
            <h2 className="text-2xl font-bold m-8 font-cinzel">Add Actions</h2>
            <form className="flex flex-col p-4 gap-2 w-[34rem] m-auto mb-5" onSubmit={handleSubmit(onSubmit)}>
                {/* Select Language */}
                <select className="p-4 border-2 focus:outline-none rounded-lg font-poppins" {...register('language', { required: 'Please select a language' })}>
                    <option value="">Select a Language</option>
                    {language.map((value, index) => (
                        <option key={index} value={value}>
                            {value}
                        </option>
                    ))}
                </select>
                {errors.language && <span className="text-red-500 font-poppins">{errors.language.message}</span>}

                {/* Select User Type */}
                <select className="p-4 border-2 focus:outline-none rounded-lg font-poppins" {...register('usertype', { required: 'Please select a user type' })}>
                    <option value="" className="font-poppins">
                        Select a User Type
                    </option>
                    {userType.map((user, index) => (
                        <option key={index} value={user.usertype}>
                            {user.usertype}
                        </option>
                    ))}
                </select>
                {errors.usertype && <span className="text-red-500">{errors.usertype.message}</span>}

                {/* Dynamic Actions */}
                {fields.map((field, index) => (
                    <div key={field.id} className="border p-4 rounded bg-white mb-2">
                        <input
                            type="text"
                            className="p-3 border-2 focus:outline-none rounded-lg w-full mb-2 font-poppins"
                            placeholder="Enter Action Title"
                            {...register(`actions.${index}.action`, { required: 'Action title is required' })}
                        />
                        {errors.actions?.[index]?.action && <span className="text-red-500 font-poppins">{errors.actions[index].action?.message}</span>}

                        <input
                            type="text"
                            className="p-3 border-2 focus:outline-none rounded-lg w-full mb-2 font-poppins"
                            placeholder="Enter Link"
                            {...register(`actions.${index}.link`, { required: 'Link is required' })}
                        />
                        {errors.actions?.[index]?.link && <span className="text-red-500 font-poppins">{errors.actions[index].link?.message}</span>}

                        <label htmlFor="" className="bg-black-light rounded-lg font-poppins">
                            <input type="file" className="p-3 border-2 focus:outline-none rounded-lg w-full font-poppins" {...register(`actions.${index}.img`, { required: 'File is required' })} />
                        </label>
                        {errors.actions?.[index]?.img && <span className="text-red-500 font-poppins">{errors.actions[index].img?.message}</span>}

                        <button type="button" className="bg-red-500 hover:bg-red-600 text-white p-2 rounded mt-2 font-poppins" onClick={() => remove(index)}>
                            Remove
                        </button>
                    </div>
                ))}

                <button type="button" className="p-2 bg-gray-500 text-white rounded font-poppins" onClick={() => append({ action: '', link: '', img: {} as FileList })}>
                    Add Another Action
                </button>

                {/* Submit Button */}
                <Button text="Submit" />
                {/* <input type="submit" className="p-4 bg-blue-500 text-white font-bold cursor-pointer hover:bg-blue-700 rounded mt-4" /> */}
            </form>
        </div>
    );
}

export default ActionForm;
