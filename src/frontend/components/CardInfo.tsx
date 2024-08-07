/*
 * Copyright © 2024 Ben Petrillo. All rights reserved.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
 * OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * All portions of this software are available for public use,
 * provided that credit is given to the original author(s).
 */

import React, {useEffect, useState} from "react";
import {ICard} from "../types/ICard.ts";
import {useParams} from "react-router-dom";
import SimilarCards from "./SimilarCards.tsx";

const getTCGPlayerPricesPreview = (card: ICard) => {
    if (card.tcgplayer) {
        return (
            <div className="row align-items-start">
                <h6 className="mb-1 text-decoration-underline">TCGPlayer</h6>
                {Object.keys(card.tcgplayer.prices).map((priceType, index) => (
                    <div key={index} className="d-flex justify-content-between">
                        <div className="small text-primary-emphasis">
                            {card.set.name}
                            <span className="text-muted"> – {priceType.charAt(0).toUpperCase() + priceType.slice(1)}</span>
                        </div>
                        <span className="small text-muted">
                            {card.tcgplayer.prices[priceType]?.market ? `$${card.tcgplayer.prices[priceType].market}` : 'N/A'}
                        </span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
}

const getCardmarketPricesPreview = (card: ICard) => {
    if (card.cardmarket) {
        return (
            <div className="row align-items-start">
                <h6 className="mb-1 text-decoration-underline">Cardmarket</h6>
                {Object.keys(card.cardmarket.prices)
                    .filter(priceType => card.cardmarket.prices[priceType] !== 0)
                    .filter(priceType => !['ReverseHoloAvg30', 'ReverseHoloAvg7', 'ReverseHoloAvg1',
                    'LowPrice', 'Avg30', 'Avg1', 'Avg7', 'LowPriceExPlus', 'TrendPrice', 'ReverseHoloLow', 'ReverseHoloTrend'].includes(priceType.charAt(0).toUpperCase() + priceType.slice(1)))
                    .map((priceType, index) => (
                    <div key={index} className="d-flex justify-content-between">
                        <div className="small text-primary-emphasis">
                            {card.set.name}
                            <span className="text-muted"> – {priceType.charAt(0).toUpperCase() + priceType.slice(1)}</span>
                        </div>
                        <span className="small text-muted">
                            {card.cardmarket.prices[priceType] ? `€${card.cardmarket.prices[priceType]}` : 'N/A'}
                        </span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
}


const CardInfo: React.FC = () => {
    const { cardId } = useParams<{ cardId: string }>();
    const [card, setCard] = useState<ICard | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (cardId) {
            fetch(`http://localhost:8005/api/v1/get/${cardId}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data.data)
                    setCard(data.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error("Error fetching card data:", error);
                    setLoading(false);
                });
        }
    }, [cardId]);

    if (loading) {
        return (
            <div className={"container m-5 p-5"}>
                <div className={"mx-5 px-5"}>
                    <div className="text-center">
                        <div className="spinner-border text-success" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!card) {
        return (
            <div
                className="container-fluid d-flex justify-content-center align-items-center my-4 px-4">
                <div className="card text-bg-dark text-center" style={{maxWidth: '24rem'}}>
                    <div className="card-header">404 Not Found</div>
                    <div className="card-body">
                        <p className="card-text">
                            The requested resource was not found on our servers. Are you sure
                            you entered a valid trading card ID?
                        </p>
                    </div>
                    <div className={"card-footer"}>
                        If you believe this is an error,
                        please <a href={"mailto:admin@benpetrillo.dev"}>contact us</a>.
                    </div>
                </div>
            </div>


        )
    }

    document.title = `${card.name} (${card.id}) - PokéVault`;

    return (
        <div>
            <div className="container d-flex justify-content-center align-items-center my-4">
                <div className="card mb-3" style={{maxWidth: "1224px"}}>
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src={card.images.large}
                                 className="img-fluid rounded-4 p-2"
                                 data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                                 style={{cursor: "pointer"}} alt={card.name}/>
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <div className={"d-flex flex-wrap mb-0 pb-0"}>
                                    <h4 className={"card-title"}>{card.name}</h4>
                                    <small
                                        className={"text-muted mt-1 ps-2 fst-italic"}>{card.set.name} / {card.id}</small>
                                </div>
                                <hr className={"p-0 my-1"}></hr>
                                {card.abilities && (
                                    card.abilities?.map((ability, index) => (
                                        <div key={index} className="py-1">
                                            <div className={"row"}>
                                                <div className="col">
                                                    <img src={"/ability.png"} style={{maxWidth: 64}}
                                                         className={"me-1"} alt={"Ability"}></img>
                                                    <h6 className="card-title d-inline-block me-2">{ability.name}</h6>
                                                </div>
                                            </div>
                                            <div className={"row"}>
                                                <p className="card-text small">{ability.text}</p>
                                            </div>
                                        </div>
                                    ))
                                )}
                                {card.supertype === "Trainer" && (
                                    card.rules?.slice(0, card.rules?.length - 1)
                                        .map((rule, index) => (
                                            <div key={index} className="py-1">
                                                <div className={"row"}>
                                                    <p className="card-text small">{rule}</p>
                                                </div>
                                            </div>
                                        ))
                                )}
                                {card.attacks && (
                                    card.attacks?.map((attack, index) => (
                                        <div key={index} className="py-1">
                                            <div className={"row"}>
                                                <div className="col">
                                                    <h6 className="card-title d-inline-block me-2">{attack.name} {attack.damage ? `[${attack.damage}]` : ""}</h6>
                                                    <div className="d-inline-block">
                                                        {attack.cost.map((cost, index) => (
                                                            <img
                                                                src={`/energy/${cost.toLowerCase()}.png`}
                                                                key={index} style={{maxWidth: 18}}
                                                                alt={cost}
                                                                className={"me-1 mb-1"}/>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            {attack.text && (
                                                <div className={"row"}>
                                                    <p className="card-text small">{attack.text}</p>
                                                </div>
                                            )}
                                        </div>
                                    ))
                                )}
                                <hr className={"py-0 mt-1 mb-2"}></hr>
                                <div className={"py-1"}>
                                    <h6 className="card-title">Legalities</h6>
                                    <div className={"d-flex flex-wrap mb-2"}>
                                        {card.legalities.standard === "Legal" ? (
                                            <span
                                                className="badge text-bg-success me-1">Standard</span>
                                        ) : (
                                            <span
                                                className="badge text-bg-danger me-1">Standard</span>
                                        )}
                                        {card.legalities.expanded === "Legal" ? (
                                            <span
                                                className="badge text-bg-success me-1">Expanded</span>
                                        ) : (
                                            <span
                                                className="badge text-bg-danger me-1">Expanded</span>
                                        )}
                                        {card.legalities.unlimited === "Legal" ? (
                                            <span className="badge text-bg-success">Unlimited</span>
                                        ) : (
                                            <span className="badge text-bg-danger">Unlimited</span>
                                        )}
                                    </div>
                                </div>
                                <div className="row align-items-start py-1">
                                    <div className="col-12 col-md-6">
                                        {getTCGPlayerPricesPreview(card)}
                                    </div>
                                    <div className="col-12 col-md-6">
                                        {getCardmarketPricesPreview(card)}
                                    </div>
                                </div>
                                <hr></hr>
                                <div className="row align-items-start">
                                    <div className="col-12 col-md-6">
                                        <p className="small pb-0 mb-0">
                                            Artist: <p
                                            className={"d-inline text-primary-emphasis"}>{card.artist}</p>
                                        </p>
                                        <p className="small pb-0 mb-0">
                                            Rarity: <p
                                            className={"d-inline text-primary-emphasis"}>{card.rarity}</p>
                                        </p>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <p className="small pb-0 mb-0">
                                            Set Number: <p
                                            className={"d-inline text-primary-emphasis"}>
                                            {card.id.split("-")[1]} of {card.set.printedTotal}
                                        </p>
                                        </p>
                                        <p className="small pb-0 mb-0">
                                            Release Date: <p
                                            className={"d-inline text-primary-emphasis"}>{card.set.releaseDate}</p>
                                        </p>
                                    </div>
                                </div>
                                <div className={"d-flex flex-wrap mt-3"}>
                                    {card.hp && (
                                        <span className="badge text-bg-primary me-1 mb-1">
                                        HP: {card.hp}
                                    </span>
                                    )}
                                    {card.types && (
                                        <span className="badge text-bg-primary me-1 mb-1">
                                        Type: {card.types?.join(", ")}
                                    </span>
                                    )}
                                    {card.nationalPokedexNumbers && (
                                        <span className="badge text-bg-primary me-1 mb-1">
                                        Dex: #{card.nationalPokedexNumbers?.join(", #")}
                                    </span>
                                    )}
                                    {card.weaknesses && (
                                        <span className="badge text-bg-primary me-1 mb-1">Weakness:
                                            {card.weaknesses?.map((weakness, index) => (
                                                <img
                                                    src={`/energy/${weakness.type.toLowerCase()}.png`}
                                                    key={index} style={{maxWidth: 12}}
                                                    alt={weakness.type}
                                                    className={"ms-1"}/>
                                            ))} ×2
                                    </span>
                                    )}
                                    {card.retreatCost && (
                                        <span className="badge text-bg-primary me-1 mb-1">Retreat:
                                        <img
                                            src={`/energy/${card.retreatCost[0].toLowerCase()}.png`}
                                            style={{maxWidth: 12}}
                                            alt={card.retreatCost[0]}
                                            className={"ms-1 me-1"}
                                        />
                                        ×{card.retreatCost?.length}
                                    </span>
                                    )}
                                    {card.resistances && (
                                        <span className="badge text-bg-primary me-1 mb-1">Resistance:
                                            {card.resistances?.map((res, index) => (
                                                <img src={`/energy/${res.type.toLowerCase()}.png`}
                                                     key={index} style={{maxWidth: 12}}
                                                     alt={res.type}
                                                     className={"ms-1"}/>

                                            ))} {card.resistances[0].value}
                                    </span>
                                    )}
                                </div>
                                <div className={"mt-3"}>
                                    <p className="card-text fst-italic small">
                                        {card.flavorText}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="staticBackdrop" data-bs-keyboard="false"
                     tabIndex={-1}
                     aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <img src={card.images.large} className={"rounded rounded-3"}
                                 alt={""}></img>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"mx-5"}>
                <SimilarCards query={card.name} setName={card.set.name} setId={card.set.id}/>
            </div>
        </div>
    );
};

export default CardInfo;