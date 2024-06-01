import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "../css/style.css"
import "../css/styleswintcher.css"
import "../css/preloader.min.css"
import "../css/fm.revealator.jquery.min.css"
import "../css/circle.css"
import "../css/bootstrap.min.css"
import "../skins/green.css"
import "./navBarSimpleUser.css"


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser, faEnvelopeOpen, faComments } from "@fortawesome/free-solid-svg-icons";

const NavBarSimpleUser = () => {
    return (
        <>
            <header className="header" id="navbar-collapse-toggle">
            {/* revealator-slideup */}

                <ul className="icon-menu d-none d-lg-block  revealator-once revealator-delay1">
                    <li className="icon-box userNav">
                        {/* <i className="fa fa-home"></i> */}
                        <FontAwesomeIcon icon={faHome} className="iconH"></FontAwesomeIcon>
                        <NavLink className="" to="/">
                            <h2>Accueil</h2>
                        </NavLink>
                    </li>
                    <li className="icon-box userNav">
                        <FontAwesomeIcon icon={faComments} className="iconH"></FontAwesomeIcon>
                        <NavLink className="" to="/service">
                            <h2>Services</h2>
                        </NavLink>
                    </li>
                    <li className="icon-box userNav">
                        <FontAwesomeIcon icon={faEnvelopeOpen} className="iconH"></FontAwesomeIcon>
                        <NavLink className="" to="/contact">
                            <h2>Contact</h2>
                        </NavLink>
                    </li>
                    <li className="icon-box userNav">
                        <FontAwesomeIcon icon={faUser} className="iconH"></FontAwesomeIcon>
                        <NavLink className="" to="/login">
                            <h2>Conncter</h2>
                        </NavLink>
                    </li>
                </ul>

                <section role="navigation" className="d-block d-lg-none">
                    <nav id="menuToggle">
                        <input type="checkbox" />
                        <span></span>
                        <span></span>
                        <span></span>
                        <ul className="list-unstyled" id="menu">
                            <li><NavLink to="/"> <FontAwesomeIcon icon={faHome} className="iconH"></FontAwesomeIcon><span>Acceuil</span></NavLink></li>
                            <li><NavLink to="/service"><FontAwesomeIcon icon={faComments} className="iconH"></FontAwesomeIcon><span>Services</span></NavLink></li>
                            <li><NavLink to="/contact"><FontAwesomeIcon icon={faEnvelopeOpen} className="iconH"></FontAwesomeIcon><span>Contact</span></NavLink></li>
                            <li><NavLink to="/login"><FontAwesomeIcon icon={faUser} className="iconH"></FontAwesomeIcon><span>Se Connecter</span></NavLink></li>
                        </ul>
                    </nav>
                </section>
            </header>
            
            <><Outlet/></>
        </>
    )
}
export default NavBarSimpleUser;