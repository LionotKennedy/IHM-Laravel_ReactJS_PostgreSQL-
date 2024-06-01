import axios from "axios";
import "./navbar.css"
import "./nav.css"
import React, { useState } from "react";
import { useNavigate, NavLink, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut, faUsers, faHomeUser, faDashboard } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/Logo1.jpg"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

const Header = () => {

  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const history = useNavigate();

  // const logoutSubmit = (e) => {
  //   e.preventDefault();

  //   axios.post(`/api/logout`).then(res => {
  //     if (res.data.status === 200) {
  //       localStorage.removeItem('auth_token');
  //       localStorage.removeItem('auth_name');
  //       console.log("Coucou");
  //       console.log("Bonjour");
  //       // console.log(res.data.token);
  //       // console.log(res.data.username);
  //       // history('/');
  //     }
  //   })
  // }

  const handleConfirmationDialogClose = () => {
    setOpenConfirmationDialog(false);
  }

  const logoutSubmit = (e) => {
    e.preventDefault();
    setOpenConfirmationDialog(true);
    console.log("Bonjour");
  }

  const handleConfirmLogout = async () => {
    history('/login');
  }
  return (
    <>
      <div className="containerNav">
        <nav className="navNab">
          <ul>
            <div><NavLink href="#" className="logos Link_navs_logo">
              <img className="imageLogo" src={logo}></img>
              <span className="nav-items spanNavs_logo">Club Football</span>
            </NavLink></div>
            <div className="sectionNav">

              <li className="liNavBar"><NavLink className="Link_navs" to="/admin/home">
                {/* <i className="fas fa-menorah"></i> */}
                <FontAwesomeIcon icon={faHomeUser} className="icons" />
                <span className="nav-items spanNavs">Accueil</span>
              </NavLink></li>

              <li><NavLink className="Link_navs" to="/admin/content">
                {/* <i className="fas fa-comment"></i> */}
                <FontAwesomeIcon icon={faUsers} className="icons" />
                <span className="nav-items spanNavs">Joueur</span>
              </NavLink></li>

              <li className="liNavs"><NavLink className="Link_navs" to="/admin/equipe" >
                {/* <i className="fas fa-database"></i> */}
                {/* <FontAwesomeIcon icon="fa-brands fa-youtube" /> */}
                <FontAwesomeIcon icon={faDashboard} className="icons" />
                <span className="nav-items spanNavs">Operation</span>
              </NavLink></li>


            </div>
            {/* <div className="liNavs" onClick={logoutSubmit}><NavLink href="#" className="logout Link_navs_logout">
              <FontAwesomeIcon icon={faSignOut} className="icons" />
              <span className="nav-items spanNavs">Sortie</span>
            </NavLink></div> */}

            <div className="liNavs" onClick={logoutSubmit}><NavLink className="logout Link_navs_logout">
              <FontAwesomeIcon icon={faSignOut} className="icons" />
              <span className="nav-items spanNavs">Sortie</span>
            </NavLink></div>

          </ul>
        </nav>

        <Dialog
          open={openConfirmationDialog}
          onClose={handleConfirmationDialogClose}
        >
          <DialogTitle>Confirmation</DialogTitle>
          <DialogContent>
            Êtes-vous sûr de vouloir deconneter ?
          </DialogContent>
          <DialogActions>
            <Button onClick={handleConfirmationDialogClose} color="primary">
              Annuler
            </Button>
            <Button onClick={handleConfirmLogout} className="deleteCof">
              Deconnexion
            </Button>
          </DialogActions>
        </Dialog>

        <section className="main">
          <main><Outlet /></main>
        </section>
      </div>

    </>
  )
};

export default Header;