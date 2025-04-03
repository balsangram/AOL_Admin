import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { display_all_user_type } from '../api/config';

type UserTypeData = {
    usertype: string;
    img?: string; // Optional in case some items don't have images
};

const UserType = () => {
    const [items, setItems] = useState<UserTypeData[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(display_all_user_type)
            .then((response) => {
                console.log(response.data);
                setItems(response.data);
            })
            .catch((err) => {
                console.error('Error fetching data:', err);
            });
    }, []);

    return (
        <div className="flex flex-wrap gap-4 justify-center">
            {items.map((item, index) => (
                <div
                    key={index}
                    className="shadow-2xl flex p-10 transition-all duration-500 ease-in-out text-[#5A382D]
                        hover:text-[#7B480F] hover:font-bold hover:shadow-2xl hover:scale-105 hover:px-7
                        w-full flex-col cursor-pointer min-w-6 text-center"
                    onClick={() => navigate('/action', { state: { usertype: item.usertype } })}
                    style={{
                        backgroundColor: 'white',
                        boxShadow: '10px 10px 20px 0 rgb(97 75 66 / 70%)',
                        borderRadius: '4px',
                        maxWidth: '15rem',
                        maxHeight: '15rem',
                    }}
                >
                    <img
                        src={item.img || 'default-image-url.png'} // Provide a default image if none exists
                        alt={item.usertype}
                        style={{
                            height: '5rem',
                            width: '5rem',
                            margin: 'auto',
                            borderRadius: '50%',
                        }}
                    />
                    <p className="text-xl h-20 mt-4 flex justify-center items-center">{item.usertype}</p>
                </div>
            ))}
        </div>
    );
};

export default UserType;
