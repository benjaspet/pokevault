import React from "react";

const Topbar: React.FC = () => {
    return (
        <nav className="topbar py-2 mx-auto" data-bs-theme={"dark"}>
            <div className="container">
                <ul className="nav me-auto justify-content-center justify-content-lg-start">
                    <li className="nav-item">
                        <a href="#" className="nav-link text-light px-2" aria-current="page">
                            Card Database
                        </a>
                    </li>
                    <li className="nav-item d-none d-sm-block">
                        <a href="#" className="nav-link text-light px-2" aria-current="page">
                            Decklists
                        </a>
                    </li>
                    <li className="nav-item d-none d-md-block">
                        <a href="#" className="nav-link text-light px-2" aria-current="page">
                            Content
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Topbar;
