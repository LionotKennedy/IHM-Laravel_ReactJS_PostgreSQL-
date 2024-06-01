
import "./navbarEquipe.css"
import React from "react";
import {  NavLink, Outlet } from "react-router-dom";
const NavBarEquipe = () => {
  return (
    <>
      <header className="headerEquipe">
      <a href="#" className="logo liEquipe"></a>
        <ul className="ulEquipe">
          <div className="liEquipe"><NavLink className="linksEquipe" to="/admin/equipe">Equipe</NavLink></div>
          <div className="liEquipe"><NavLink className="linksEquipe" to="/admin/equipe/matchs">Matchs</NavLink></div>
          <div className="liEquipe"><NavLink className="linksEquipe" to="/admin/equipe/entraiment">Entrainement</NavLink></div>
        </ul>
      </header>
      <div className="containerEquipe">
      <main><Outlet /></main>
      </div>
    </>
  )
};

export default NavBarEquipe;