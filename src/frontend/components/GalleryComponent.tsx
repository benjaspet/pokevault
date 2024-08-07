import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Footer.css";
import { ICard } from "../types/ICard.ts";

const preloadImage = (src) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src || "https://images.pokemoncard.io/images/assets/CardBack.jpg";
        img.onload = resolve;
        img.onerror = reject;
    });
};

const preloadImages = (imagesArray) => {
    const promises = imagesArray.map((src) => preloadImage(src));
    return Promise.all(promises);
};

const CardGalleryComponent = () => {
    const [loading, setLoading] = useState(true);
    const [cards, setCards] = useState<ICard[]>([]);
    const [imagesPreloaded, setImagesPreloaded] = useState<Set<string>>(new Set());
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [query, setQuery] = useState("pikachu");
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const navigate = useNavigate();

    const fetchCards = useCallback(async (searchQuery, pageNumber) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8005/api/v1/search?q=${searchQuery}&page=${pageNumber}`);
            const data = await response.json();
            if (data.data.length > 0) {
                setCards((prevCards) => [...prevCards, ...data.data]);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
            setIsInitialLoad(false);
        }
    }, []);

    useEffect(() => {
        fetchCards(query, page);
    }, [page, query, fetchCards]);

    useEffect(() => {
        if (cards.length > 0) {
            const newCardImages = cards.slice(imagesPreloaded.size).map(card => card.images.small);
            preloadImages(newCardImages)
                .then(() => {
                    setImagesPreloaded(prevImages => new Set([...prevImages, ...newCardImages]));
                })
                .catch(() => {
                    console.error("Error preloading images");
                });
        }
    }, [cards]);

    const search = async (event) => {
        event.preventDefault();
        const inputElement = document.getElementById("pokemon-card-search");
        const searchQuery = inputElement ? inputElement.value : "pikachu";

        setLoading(true);
        setIsInitialLoad(true);
        setCards([]);
        setPage(1);
        setQuery(searchQuery);
        setHasMore(true);
    };

    const handleCardClick = (cardId) => {
        navigate(`/${cardId}/view`);
    };

    const handleScroll = useCallback(() => {
        if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 500 && hasMore && !loading) {
            setPage((prevPage) => prevPage + 1);
        }
    }, [hasMore, loading]);

    useEffect(() => {
        const throttleScroll = (func, delay) => {
            let lastCall = 0;
            return function (...args) {
                const now = new Date().getTime();
                if (now - lastCall < delay) {
                    return;
                }
                lastCall = now;
                return func(...args);
            };
        };

        const throttledHandleScroll = throttleScroll(handleScroll, 10);

        window.addEventListener("scroll", throttledHandleScroll);
        return () => window.removeEventListener("scroll", throttledHandleScroll);
    }, [handleScroll]);

    return (
        <div className="container my-4 px-4">
            <form onSubmit={search}>
                <div className="mb-4 d-flex align-items-center">
                    <input
                        type="text"
                        className="form-control me-3"
                        id="pokemon-card-search"
                        placeholder="Search for any Pokémon card..."
                    />
                    <button type="submit" className="btn btn-success">Search</button>
                </div>
            </form>
            <div className="row">
                {loading && isInitialLoad ? (
                    <div className="text-center">
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
                                className={`card-img-top pokemon-card rounded loaded`}
                                alt="Card"
                            />
                        </div>
                    ))
                )}
                {loading && !isInitialLoad && (
                    <div className="text-center">
                        <div className="spinner-border text-success" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CardGalleryComponent;