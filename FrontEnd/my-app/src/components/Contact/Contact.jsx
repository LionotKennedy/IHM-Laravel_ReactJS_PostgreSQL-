import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faUserPlus, faFolderPlus, faPhoneSquare, faEnvelopeOpen } from "@fortawesome/free-solid-svg-icons";
import "./contact.css";
import { motion } from "framer-motion";

const Contact = () => {
    return (
        <>
            <motion.div className="contacts lights"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                {/* <!-- Page Title Starts --> */}
                {/* revealator-slideup */}
                <section className="title-section text-left text-sm-center  revealator-once revealator-delay1">
                    <h1><span className="h1_for_contact">entrer en</span> <span>contact</span></h1>
                    <span className="title-bg">contact</span>
                </section>
                {/* <!-- Page Title Ends --> */}

                {/* revealator-slideup */}
                <section className="main-content  revealator-once revealator-delay1">
                    <div className="container">
                        <div className="row">
                            {/* <!-- Left Side Starts --> */}
                            <div className="col-12 col-lg-4">
                                <h3 className="text-uppercase custom-title mb-0 ft-wt-600 pb-3 h3Contact">N'hésitez pas !</h3>
                                <p className="open-sans-font mb-3 h3Contact">N'hésitez pas à me contacter. Je suis toujours ouvert à discuter de nouveaux projets, d'idées créatives ou d'opportunités pour être partie prenante de vos visions.</p>
                                <p className="open-sans-font custom-span-contact position-relative pConta h3Contact">
                                    {/* <i className="fa fa-envelope-open position-absolute"></i> */}
                                    <FontAwesomeIcon icon={faEnvelopeOpen} className="iconContact Iconcolor" />
                                    <span className="d-block spanConta">mail me</span>footballeur@gmail.com
                                </p>
                                <p className="open-sans-font custom-span-contact position-relative pConta h3Contact">
                                    {/* <i className="fa fa-phone-square position-absolute"></i> */}
                                    <FontAwesomeIcon icon={faPhoneSquare} className="iconContact1 Iconcolor" />
                                    <span className="d-block spanConta">call me</span>+216 21 184 010
                                </p>
                                <ul className="social list-unstyled pt-1 mb-5 solialContact">
                                    <li className="facebook"><a title="Facebook" href="#">
                                        <FontAwesomeIcon icon={faFolderPlus} className="IconSolial" />
                                        {/* <i class="fa fa-facebook"></i> */}
                                    </a>
                                    </li>
                                    <li className="twitter"><a title="Twitter" href="#"><FontAwesomeIcon icon={faTrash} className="IconSolial" /></a>
                                    </li>
                                    <li className="youtube"><a title="Youtube" href="#"><FontAwesomeIcon icon={faEdit} className="IconSolial" /></a>
                                    </li>
                                    <li className="dribbble"><a title="Dribbble" href="#"><FontAwesomeIcon icon={faUserPlus} className="IconSolial" /></a>
                                    </li>
                                </ul>
                            </div>
                            {/* <!-- Left Side Ends --> */}

                            {/* <!-- Contact Form Starts --> */}
                            <div className="col-12 col-lg-8">
                                <form className="contactform" method="post" action="http://slimhamdi.net/tunis/light/php/process-form.php">
                                    <div className="contactform">
                                        <div className="row">
                                            <div className="col-12 col-md-4">
                                                <input className="getData getDataS" type="text" name="name" placeholder="VOTRE NOM" />
                                            </div>
                                            <div className="col-12 col-md-4">
                                                <input className="getData getDataS" type="email" name="email" placeholder="VOTRE EMAIL" />
                                            </div>
                                            <div className="col-12 col-md-4" >
                                                <input className="getData getDataS" type="text" name="subject" placeholder="VOTRE SUJET" />
                                            </div>
                                            <div className="col-12">
                                                <textarea className="getData getDataSA" name="message" placeholder=" VOTRE MESSAGE"></textarea>
                                                <button type="submit" className="btnC btn-contact btnContact">envoyer Message</button>
                                            </div>
                                            <div className="col-12 form-message">
                                                <span className="output_message text-center font-weight-600 text-uppercase"></span>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            {/* <!-- Contact Form Ends --> */}
                        </div>
                    </div>

                </section>
            </motion.div>
        </>
    )
}

export default Contact;