import { Style } from '@mui/icons-material';
import { Button } from '@mui/material';
import { green } from '@mui/material/colors';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
import comingSoon from '../../assets/comingSoon/comingSoon.png';
import EditIcon from '@mui/icons-material/Edit';

interface CardProps {
    link?: string;
    action: string;
    // onEdit?: () => void;
    id: string;
    img: string;
}

const ActionCard: React.FC<CardProps> = ({ link, action, id, img }) => {
    // const navigate = useNavigate();

    const handleEditClick = (event: React.MouseEvent) => {};

    const notify = () => {
        console.log('Coming Soon triggered!'); // Debugging log
    };

    return (
        <div
            key={id}
            className="  shadow-2xl flex  p-10 
                 transition-all duration-500 ease-in-out
                  text-[#5A382D]
                 hover:text-[#7B480F] hover:font-bold hover:shadow-2xl hover:scale-105 hover:px-8
                 w-full flex-col  cursor-pointer min-w-6  relative"
            style={{
                backgroundColor: 'white',
                boxShadow: '10px 10px 20px 0 rgb(97 75 66 / 70%)',
                borderRadius: '4px',
                maxWidth: '15rem',
                maxHeight: '15rem',
            }}
        >
            <img
                src={img}
                alt=""
                style={{
                    height: '6rem',
                    width: '5rem',
                    margin: 'auto',
                    borderRadius: '5rem',
                }}
            />
            {/* <ToastContainer /> */}

            <a href={link} target="_blank" rel="noopener noreferrer" className="text-center m-auto text-xl h-20 mt-4 flex justify-center items-center font-poppins">
                {action}
            </a>
            <Link to="/action_edit_card" state={{ link, action, img, id }} className="bg-[#FFD093] absolute right-2 top-2 rounded-full p-2 hover:bg-[#F4C17F] transition-all font-poppins">
                <EditIcon sx={{ color: '#fff' }} />
            </Link>
        </div>
    );
};

export default ActionCard;
