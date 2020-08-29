import React from "react";

function Navbar(props) {
    return (
        <nav className="navbar navbar-expand-sm navbar-custom">
            <div className="justify-content-start">
                <i className="fas fa-dungeon fa-2x"></i>
                <span className="navbar-brand">Pick a category</span>
            </div>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"><i className="fas fa-dice-d20"></i></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <button className="nav-item classes">Classes</button>
                    <button className="nav-item races">Races</button>
                    <button className="nav-item weapons">Weapons</button>
                    <button className="nav-item spells">Spells</button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;