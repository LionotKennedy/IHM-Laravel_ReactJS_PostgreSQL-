
import './navbarplayer.css'
import React from "react";
import {  NavLink, Outlet } from "react-router-dom";
const NavBarPlayer = () => {
  return (
    <>
      <header className='hdr'>
        <a href="#" className="logo links"></a>
        <ul className='lu'>
          <div className='il'><NavLink className='links' to="/admin/content">Joueur</NavLink></div>
          <div className='il'><NavLink className='links' to="/admin/content/contrat">Contrat</NavLink></div>
        </ul>
      </header>
      <div>
        <main><Outlet /></main>
      </div>
    </>
  )
};

export default NavBarPlayer;