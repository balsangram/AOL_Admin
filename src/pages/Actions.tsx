import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { display_all_action } from '../api/config';
import Card from '../components/cards/Card';
import ActionCard from '../components/cards/ActionCard';

interface ActionItem {
    action: string;
    link: string;
    img: string;
}

const Action: React.FC = () => {
    const location = useLocation();
    const status = location.state?.usertype;
    const [details, setDetails] = useState<ActionItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!status) {
            setLoading(false);
            return;
        }

        axios
            .get(`${display_all_action}/${status}`)
            .then((response) => {
                console.log(response.data[0]._id, 'response');

                setDetails(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setError('Failed to load actions.');
                setLoading(false);
            });
    }, []);

    if (!status) {
        return <h1 className="text-center text-2xl font-bold mt-10">No user type selected</h1>;
    }

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold my-8">{status}</h1>

            {loading ? (
                <p className="text-lg text-gray-500">Loading actions...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : details.length > 0 ? (
                <div className="flex w-full flex-wrap gap-6 justify-center">
                    {details.map((item, index) => (
                        <ActionCard key={index} action={item.action} link={item.link} img={item.img} id={item._id} />
                    ))}
                </div>
            ) : (
                <p className="text-lg text-gray-500">No actions available</p>
            )}
        </div>
    );
};

export default Action;
