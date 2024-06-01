import React from 'react'
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion"
import Login from "../components/Authentification/Login";
import Header from "../components/NavBar/NavBar";
import Home from "../components/Home/Home";
import Content from "../components/Player/Content";
import Player from "../components/Player/Player";
import Contrat from "../components/Contrat/Contrat";
import Equipe from "../components/Equipe/Equipe";
import ContentEquipe from "../components/ContentEquipe/ContentEquipe";
import Matchs from "../components/Matchs/Matchs";
import Entraiment from "../components/Entrainement/Entraiment";
import NavBarSimpleUser from "../components/NavBarSimpleUser/NavBarSimpleUser";
import UserSimple from "../components/UserSimple/UserSimple";
import Contact from "../components/Contact/Contact";
import Service from "../components/Service/Service";

function RoutesPrincipal() {
    const location = useLocation();
  return (
    <>
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
          {/* Page utilisateur simple */}
          <Route path="/" element={<NavBarSimpleUser />}>
            <Route path="/" element={<UserSimple />}></Route>
            <Route path="/contact" element={<Contact />}></Route>
            <Route path="/service" element={<Service />}></Route>
            <Route path="/login" element={<Login />}></Route>
          </Route>

          {/* Ending utilisateur simple */}

          <Route path="/admin" element={<Header />}>
            <Route path="/admin/home" element={<Home />}></Route>

            <Route path="/admin/content" element={<Content />}>
              <Route path="/admin/content" element={<Player />}></Route>
              <Route
                path="/admin/content/contrat"
                element={<Contrat />}
              ></Route>
            </Route>

            <Route path="/admin/equipe" element={<ContentEquipe />}>
              <Route path="/admin/equipe" element={<Equipe />}></Route>
              <Route path="/admin/equipe/matchs" element={<Matchs />}></Route>
              <Route
                path="/admin/equipe/entraiment"
                element={<Entraiment />}
              ></Route>
            </Route>
          </Route>
        </Routes>
        </AnimatePresence>
    </>
  )
}

export default RoutesPrincipal
