import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';

interface CardProps {
    link?: string;
    name: string;
    id: string;
    img: string;
}

const Card: React.FC<CardProps> = ({ link, name, img, id }) => {
    return (
        <div
            className="shadow-2xl flex p-10 
                 transition-all duration-500 ease-in-out
                 text-[#5A382D] hover:text-[#7B480F] hover:font-bold 
                 hover:shadow-2xl hover:scale-105 hover:px-9
                 w-full flex-col cursor-pointer min-w-6 relative font-poppins"
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
                alt={name}
                style={{
                    height: '5rem',
                    width: '5rem',
                    margin: 'auto',
                    borderRadius: '5rem',
                }}
            />

            {link ? (
                <a href={link} target="_blank" rel="noopener noreferrer" className="text-center m-auto text-xl h-20 mt-4 flex justify-center items-center font-poppins">
                    {name}
                </a>
            ) : (
                <p className="text-center m-auto text-xl h-20 mt-4 flex justify-center items-center font-poppins">{name}</p>
            )}

            {/* Edit Button */}
            <Link to="/edit_card" state={{ link, name, img, id }} className="bg-[#FFD093] absolute right-2 top-2 rounded-full p-2 hover:bg-[#F4C17F] transition-all">
                <EditIcon sx={{ color: '#fff' }} />
            </Link>
        </div>
    );
};

export default Card;
