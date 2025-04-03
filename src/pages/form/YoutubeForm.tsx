import { useForm, SubmitHandler } from 'react-hook-form';
import Button from '../../components/button/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { add_youtube_link } from '../../api/config';

type FormValues = {
    YouTubeLink: string;
    platform: string;
    thumbnail?: FileList;
};

function YoutubeForm() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log(data);
        const formData = new FormData();
        formData.append('YouTubeLink', data.YouTubeLink);
        formData.append('platform', data.platform);

        // Append thumbnail only if a file is selected
        if (data.thumbnail && data.thumbnail.length > 0) {
            formData.append('thumbnail', data.thumbnail[0]);
        }

        console.log(formData, 'formData');

        axios
            .post(add_youtube_link, formData)
            .then((response) => {
                console.log(response, 'response');
                navigate('/'); // Redirect after successful submission
            })
            .catch((error) => {
                console.log(error); // Handle error gracefully
            });
    };

    const platform = ['mobile', 'web'];

    return (
        <div className="flex justify-center items-center flex-col bg-white w-[35rem] m-auto rounded-2xl shadow-2xl mt-8">
            <h2 className="text-2xl font-bold m-8 font-cinzel">Add Your YouTube Link</h2>
            <form className="flex flex-col p-4 gap-2 w-[34rem] m-auto mb-5" onSubmit={handleSubmit(onSubmit)}>
                {/* YouTube Link */}
                <input
                    className="p-4 border-2 focus:outline-none rounded-lg"
                    type="text"
                    placeholder="YouTube Link"
                    {...register('YouTubeLink', { required: 'YouTube Link is required', maxLength: { value: 80, message: 'Max length is 80 characters' } })}
                />
                {errors.YouTubeLink && <span className="text-red-500">{errors.YouTubeLink.message}</span>}
                {/* Platform */}
                <select className="p-4 border-2 focus:outline-none rounded-lg" {...register('platform', { required: 'Please select a platform' })}>
                    <option value="">Select a Platform</option>
                    {platform.map((value, index) => (
                        <option key={index} value={value}>
                            {value}
                        </option>
                    ))}
                </select>
                {errors.platform && <span className="text-red-500">{errors.platform.message}</span>}
                {/* Image Upload (Optional) */}
                <label htmlFor="thumbnail" className="bg-black-light rounded-lg font-poppins">
                    <input className="p-3 font-poppins" type="file" {...register('thumbnail')} />
                </label>
                {/* Submit Button */}
                <Button text="Submit" /> {/* Assuming your Button component takes a "text" prop to display the label */}
            </form>
        </div>
    );
}

export default YoutubeForm;
