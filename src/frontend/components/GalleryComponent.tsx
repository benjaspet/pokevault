import React, { useEffect, useState } from "react";
import "../css/Footer.css";

// Function to preload a single image
const preloadImage = (src: string) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src || "https://images.pokemoncard.io/images/assets/CardBack.jpg";
        img.onload = resolve;
        img.onerror = reject;
    });
};

// Function to preload multiple images
const preloadImages = (imagesArray: string[]) => {
    const promises = imagesArray.map((src) => preloadImage(src));
    return Promise.all(promises);
};

const CardGalleryComponent: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [cards, setCards] = useState<any[]>([]);
    const [imagesPreloaded, setImagesPreloaded] = useState(false);

    useEffect(() => {
        // Fetch data when the component mounts
        fetch("http://localhost:8005/api/v1/search/order?orderBy=name")
            .then(response => response.json())
            .then(data => {
                setCards(data.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }, []); // Empty dependency array means this runs once on mount

    useEffect(() => {
        if (cards.length > 0) {
            preloadImages(cards.map(card => card.images.small))
                .then(() => {
                    setImagesPreloaded(true);
                })
                .catch(() => {
                    console.error("Error preloading images");
                });
        }
    }, [cards]); // Preload images whenever cards change

    const search = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent form from submitting and refreshing the page

        const inputElement = document.getElementById("pokemon-card-search") as HTMLInputElement;
        const query = inputElement ? inputElement.value : "pikachu";

        setLoading(true);
        fetch(`http://localhost:8005/api/v1/search?q=${query}`)
            .then(response => response.json())
            .then(data => {
                setCards(data.data);
                console.log(data.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    };

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
                {loading || !imagesPreloaded ? (
                    <div className="text-center">
                        <div className="spinner-border text-success" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    cards.map((card: any, index: number) => (
                        <div className="col-6 col-sm-4 col-md-3 col-lg-2 mb-4" key={index}>
                            <img src={card.images.small} className="card-img-top pokemon-card rounded" alt="Card"/>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default CardGalleryComponent;
