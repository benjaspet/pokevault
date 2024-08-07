import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ICard } from "../types/ICard.ts";

export interface ISimilarCardsProps extends Record<any, any> {
    query: string;
    setName: string;
    setId: string;
}

const SimilarCards: React.FC<ISimilarCardsProps> = (props) => {
    const query = props.query;
    const setName = props.setName;
    const setId = props.setId;
    const navigate = useNavigate();
    const [cards, setCards] = useState<ICard[]>([]);
    const [sameSetCards, setSameSetCards] = useState<ICard[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [sameSetLoading, setSameSetLoading] = useState<boolean>(true);
    const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

    const smoothScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    const handleCardClick = (cardId) => {
        smoothScrollToTop()
        navigate(`/${cardId}/view`);
    };

    const fetchCards = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8005/api/v1/search?q=${encodeURIComponent(query)}&page=1&limit=6`);
            const data = await response.json();
            console.log(data.data)
            if (data.data.length > 0) {
                setCards(data.data);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchSameSetCards = async () => {
        setSameSetLoading(true);
        try {
            const response = await fetch(`http://localhost:8005/api/v1/searchBySet?q=${setId}&limit=6`);
            const data = await response.json();
            console.log(data.data)
            if (data.data.length > 0) {
                setSameSetCards(data.data);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setSameSetLoading(false);
        }
    }

    useEffect(() => {
        fetchCards();
        fetchSameSetCards();
    }, [query, setId]);

    const handleImageLoad = (cardId) => {
        setTimeout(() => {
            setLoadedImages(prevLoadedImages => new Set(prevLoadedImages).add(cardId));
        }, 100); // delay in milliseconds to ensure the transition takes place
    };

    return (
        <div className="row justify-content-center mx-lg-5 mx-sm-2 mx-md-3">
            <h4 className={"text-center mb-3"}>Similar Cards to {query}</h4>
            {loading ? (
                <div className="text-center mb-4 mt-2">
                    <div className="spinner-border text-success" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                cards.map((card, index) => (
                    <div className="col-6 col-sm-4 col-md-3 col-lg-2 mb-4" key={index}>
                        <img
                            src={card.images.small}
                            onClick={() => handleCardClick(card.id)}
                            onLoad={() => handleImageLoad(card.id)}
                            className={`card-img-top pokemon-card rounded rounded-2 ${loadedImages.has(card.id) ? 'loaded' : ''}`}
                            alt="Card"
                        />
                    </div>
                ))
            )}
            <h4 className={"text-center mb-3"}>Similar Cards in {setName}</h4>
            {sameSetLoading ? (
                <div className="text-center mb-4 mt-2">
                    <div className="spinner-border text-success" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                sameSetCards.map((card, index) => (
                    <div className="col-6 col-sm-4 col-md-3 col-lg-2 mb-4" key={index}>
                        <img
                            src={card.images.small}
                            onClick={() => handleCardClick(card.id)}
                            onLoad={() => handleImageLoad(card.id)}
                            className={`card-img-top pokemon-card rounded rounded-2 ${loadedImages.has(card.id) ? 'loaded' : ''}`}
                            alt="Card"
                        />
                    </div>
                ))
            )}
        </div>
    );
};

export default SimilarCards;
