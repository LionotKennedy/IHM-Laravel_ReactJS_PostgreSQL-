import React from "react";
import { NavLink } from "react-router-dom";
import image from "../assets/footKing.jpg";
import "./userSimple.css";
import { motion } from "framer-motion";

const UserSimple = () => {
    return (
        <>
            <motion.div className="home light"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                {/* revealator-slideup */}
                <section className="container-fluid main-container container-home p-0  revealator-once revealator-delay1">
                    <div className="color-block d-none d-lg-block"></div>
                    <div className="row home-details-container align-items-center">
                        <div className="col-lg-4 bg position-fixed d-none d-lg-block"></div>
                        <div className="col-12 col-lg-8 offset-lg-4 home-details text-left text-sm-center text-lg-left">
                            <div>
                                <img src={image} className="img-fluid main-img-mobile d-none d-sm-block d-lg-none" alt="my picture" />
                                <h6 className="text-uppercase open-sans-font mb-0 d-block d-sm-none d-lg-block hHome6">Bonjour !</h6>
                                {/* <h1 className="text-uppercase poppins-font"><span className="spanH">Club</span> Footballeur Professionnel</h1> */}
                                <div className="wrapper">
                                    <div className="static-txt">CLUB</div>
                                    <ul className="dynamic-txts coleur">
                                        <li><span>FOOTBALLEUR</span></li>
                                        <li><span>PROFESSIONEL</span></li>
                                        <li><span>FOOTBALLEUR</span></li>
                                        <li><span>PROFESSIONEL</span></li>
                                    </ul>
                                </div>
                                <p className="open-sans-font">I'm a Tunisian based web designer & front‑end developer focused on
                                    crafting clean & user‑friendly experiences, I am passionate about building excellent software that improves the
                                    lives of those around me.</p>
                                <NavLink to="/service" className="btns btn-abouts Link_Home_about"><span className="spanAbout">Nos Services</span></NavLink>
                            </div>
                        </div>
                    </div>
                </section>
            </motion.div>
        </>
    )
}
export default UserSimple;