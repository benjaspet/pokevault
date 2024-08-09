import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import config from "../../config/config.json";
import { ICard } from "../types/ICard.ts";
import {ISet} from "../types/ISet.ts";

const formatDate = (dateString: string): string => {
  return new Date(dateString).toDateString()
};

const SetInfo: React.FC = () => {
  const { setId } = useParams<{ setId: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [tcgSet, setTcgSet] = useState<ISet | null>(null);
  const [setCards, setSetCards] = useState<ICard[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchCards = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${config.host}/api/v1/search/setOrdered?q=${setId}`);

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data.data);
      setSetCards(data.data);
    } catch (err: any) {
      console.error(err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchSetInfo = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${config.host}/api/v1/sets/${setId}`);

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setTcgSet(data.data);
    } catch (err: any) {
      console.error(err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSetInfo().then(() => console.log('Fetch completed'));
    fetchCards().then(() => console.log('Fetch completed'));
  }, []);

  const handleCardClick = (cardId: string) => {
    navigate(`/${cardId}/view`);
  };

  return (
    <div className="container my-4 px-4">
      {loading && (
        <div className="d-flex justify-content-center align-items-center w-100"
             style={{height: '200px'}}>
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <div className="card my-4">
        <div
          className="card-header d-flex flex-column flex-md-row align-items-center justify-content-between">
          <img
            className="card-img-top py-2 d-block d-md-none"
            src={tcgSet?.images?.logo}
            alt="Set Logo"
            style={{maxWidth: 124}}
          />
          <div>
            <h4 className="mb-0">
              {tcgSet?.name} <small
              className="text-secondary-emphasis">({tcgSet?.ptcgoCode})</small>
            </h4>
            <p className="card-text mb-0">
              {formatDate(tcgSet?.releaseDate || new Date().toString())} • {tcgSet?.total} Cards
            </p>
          </div>
          <img
            className="card-img-top py-2 d-none d-md-block"
            src={tcgSet?.images?.logo}
            alt="Set Logo"
            style={{maxWidth: 124}}
          />
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item text-secondary-emphasis">
            All content is the property of Pokémon. PokéVault is in no way affiliated with or
            endorsed by
            Pokémon, Nintendo, Creatures, or Game Freak. Pokémon and its trademarks are © 1995-2024
            Nintendo, Creatures, and GAME FREAK.
          </li>
        </ul>
      </div>

      <div className="row justify-content-center">
        {setCards.map((card) => (
          <div
            className="col-6 col-sm-4 col-md-3 col-lg-2 mb-4 d-flex justify-content-center"
            key={card.id}
          >
            {card.images?.small ? (
              <img
                src={card.images.small}
                onClick={() => handleCardClick(card.id)}
                className="card-img-top pokemon-card rounded loaded"
                alt="Card"
              />
            ) : (
              <p>No image available</p>
            )}
          </div>
        ))}
      </div>


    </div>
  );
};

export default SetInfo;
