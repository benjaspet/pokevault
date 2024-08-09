import React from "react";

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="bg-success">
                <div className="container overflow-hidden">
                    <div
                        className="row gy-3 gy-md-5 gy-xl-0 align-items-center justify-content-center text-center">
                        <div className="col-12 col-sm-6 d-flex justify-content-center p-4">
                            <div
                                className="footer-logo-wrapper d-flex flex-column flex-sm-row align-items-center justify-content-center m-0">
                                <a href="https://www.tcgplayer.com/"
                                   className="my-2 mb-sm-3 me-sm-2">
                                    <img src="/tcgplayer-logo.png" alt="" height={45}/>
                                </a>
                                <a href="https://www.cardmarket.com/en">
                                    <img src="/limitless-logo.png" alt="" height={45}/>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-success p-0 m-0">
                <div className="container d-flex justify-content-center">
                    <hr className="rounded bg-light my-1 w-75"/>
                </div>
            </div>
            <div className="bg-success">
                <div className="container overflow-hidden py-4 py-md-4" style={{fontSize: 15}}>
                    <div className="row">
                        <div className="col">
                            <p className="text-center px-3">
                                The literal and graphical information presented on this site about
                                Pokémon, including card images and card text, Pokémon, The Pokémon
                                TCG, and The Pokémon TCG Online and its trademarks are © 1995-2021
                                Nintendo, The Pokémon Company International, Inc, and GAMEFREAK.
                                This website is not produced by, endorsed by, supported by, or
                                affiliated with Nintendo, The Pokémon Company International, Inc, or
                                GAMEFREAK.
                            </p>
                            <p className="text-center px-3 mb-0">
                                Developed with ♥ by <a className={"link-light"}
                                        href={"https://benpetrillo.dev"}>
                                Ben Petrillo
                            </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
