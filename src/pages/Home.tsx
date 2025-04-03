import { useEffect, useState } from 'react';
import axios from 'axios';
import { display_all_cards, display_all_head } from '../api/config';
import Card from '../components/cards/Card';
import Popups from '../components/Popups/Popups';

interface Card {
    name: string;
    link: string;
    img: string;
    id: string;
}

interface Headline {
    headline: string;
}

const Home = () => {
    const [headlines, setHeadlines] = useState<Headline[]>([]);
    const [cardsByHeadline, setCardsByHeadline] = useState<{ [key: string]: Card[] }>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                // Fetch headlines
                const { data } = await axios.get(display_all_head);
                const fetchedHeadlines: Headline[] = data.headlines || [];
                setHeadlines(fetchedHeadlines);

                if (fetchedHeadlines.length === 0) {
                    setLoading(false);
                    return;
                }

                // Fetch all cards in parallel
                const cardsPromises = fetchedHeadlines.map(async ({ headline }) => {
                    try {
                        const response = await axios.get(`${display_all_cards}/${headline}`);
                        return { [headline]: response.data || [] };
                    } catch (error) {
                        console.error(`Error fetching cards for headline: ${headline}`, error);
                        return { [headline]: [] };
                    }
                });

                const allCards = await Promise.all(cardsPromises);
                setCardsByHeadline(Object.assign({}, ...allCards));
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to load data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="flex flex-col items-center p-4">
            {/* <Popups /> */}

            {loading && <p className="text-gray-500 font-poppins">Loading...</p>}
            {error && <p className="text-red-500 font-poppins">{error}</p>}

            {!loading && !error && headlines.length === 0 && <p className="text-gray-500 font-poppins">No headlines available</p>}

            {!loading &&
                !error &&
                headlines.length > 0 &&
                headlines.map(({ headline }, index) => (
                    <div key={index} className="w-full text-center my-4">
                        <h2 className="text-2xl font-bold mb-2 font-cinzel">{headline}</h2>
                        <div className="flex gap-4 flex-wrap justify-center pb-12">
                            {cardsByHeadline[headline]?.length > 0 ? (
                                cardsByHeadline[headline].map((card, index) => <Card key={index} link={card.link} name={card.name} img={card.img} id={card._id} />)
                            ) : (
                                <p className="col-span-2 text-gray-500 font-poppins">No cards available</p>
                            )}
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default Home;
