import React from "react";
import poste1 from "../assets/blog/poste-1.jpeg";
import poste2 from "../assets/blog/poste-2.jpeg";
import poste3 from "../assets/blog/poste-3.jpeg";
import poste4 from "../assets/blog/poste-4.jpeg";
import poste5 from "../assets/blog/poste-5.jpeg";
import poste6 from "../assets/blog/poste-6.png";
import { motion } from "framer-motion";

const Service = () => {
    return (
        <>
            <motion.div className=""
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >

                {/* <!-- Page Title Starts --> */}
                {/* revealator-slideup */}
                <section className="title-section text-left text-sm-center  revealator-once revealator-delay1">
                    <h1><span className="h1_for_contact">Nos</span> <span>Service</span></h1>
                    <span className="title-bg">postes</span>
                </section>
                {/* <!-- Page Title Ends --> */}

                {/* <!-- Main Content Starts --> */}
                <section className="main-content revealator-once revealator-delay1">
                    <div className="container">
                        <div className="row">

                            <div className="col-12 col-md-6 col-lg-6 col-xl-4 mb-30">
                                <article className="post-container containerColor">
                                    <div className="post-thumb lineColor">
                                        <a href="#" className="d-block position-relative overflow-hidden">
                                            <img src={poste1} className="img-fluid ImageService" alt="Blog Post" />
                                        </a>
                                    </div>
                                    <div className="post-content">
                                        <div className="entry-header">
                                            <h3 className="h3Service"><a href="#" className="titleSe linkService">Formation de qualité:</a></h3>
                                        </div>
                                        <div className="entry-content open-sans-font">
                                            <p className="paragrService">Un club de football professionnel offre une formation de qualité pour les
                                                jeunes talents aspirant à devenir des footballeurs professionnels. Des entraîneurs expérimentés et des installations
                                                de pointe sont mis à disposition pour permettre aux joueurs de développer leurs compétences
                                                techniques, tactiques et physiques.
                                            </p>
                                        </div>
                                    </div>
                                </article>
                            </div>

                            {/* <!-- Article Starts --> */}
                            <div className="col-12 col-md-6 col-lg-6 col-xl-4 mb-30">
                                <article className="post-container containerColor">
                                    <div className="post-thumb lineColor">
                                        <a href="#" className="d-block position-relative overflow-hidden">
                                            <img src={poste2} className="img-fluid ImageService" alt="" />
                                        </a>
                                    </div>
                                    <div className="post-content">
                                        <div className="entry-header">
                                            <h3 className="h3Service"><a href="#" className="titleSe linkService">Encadrement personnalisé:</a></h3>
                                        </div>
                                        <div className="entry-content open-sans-font">
                                            <p className="paragrService">Les clubs professionnels offrent un encadrement personnalisé à
                                                leurs joueurs, en mettant en place des programmes adaptés à leurs besoins spécifiques. Des évaluations régulières sont
                                                effectuées pour suivre la progression des joueurs et ajuster les entraînements en conséquence.
                                            </p>
                                        </div>
                                    </div>
                                </article>
                            </div>
                            {/* <!-- Article Ends --> */}

                            {/* <!-- Article Starts --> */}
                            <div className="col-12 col-md-6 col-lg-6 col-xl-4 mb-30">
                                <article className="post-container containerColor">
                                    <div className="post-thumb lineColor">
                                        <a href="#" className="d-block position-relative overflow-hidden">
                                            <img src={poste6} className="img-fluid ImageService" alt="" />
                                        </a>
                                    </div>
                                    <div className="post-content">
                                        <div className="entry-header">
                                            <h3 className="h3Service"><a href="#" className="titleSe linkService">Accès à des compétitions de haut niveau:</a></h3>
                                        </div>
                                        <div className="entry-content open-sans-font">
                                            <p className="paragrService">Les clubs professionnels permettent aux joueurs de participer à des
                                                compétitions de haut niveau, que ce soit au niveau local, national ou international selon le niveau du club.
                                                Cela offre aux joueurs une
                                                exposition aux défis et aux exigences du jeu compétitif à un niveau professionnel.
                                            </p>
                                        </div>
                                    </div>
                                </article>
                            </div>
                            {/* <!-- Article Ends --> */}

                            {/* <!-- Article Starts --> */}
                            <div className="col-12 col-md-6 col-lg-6 col-xl-4 mb-30">
                                <article className="post-container containerColor">
                                    <div className="post-thumb lineColor">
                                        <a href="#" className="d-block position-relative overflow-hidden">
                                            <img src={poste4} className="img-fluid ImageService" alt="" />
                                        </a>
                                    </div>
                                    <div className="post-content">
                                        <div className="entry-header">
                                            <h3 className="h3Service"><a href="#" className="titleSe linkService">Soutien médical et physique:</a></h3>
                                        </div>
                                        <div className="entry-content open-sans-font">
                                            <p className="paragrService">Les clubs professionnels fournissent un soutien médical
                                                et physique de qualité à leurs joueurs. Des équipes médicales spécialisées veillent à la santé et
                                                au bien-être des joueurs, tout en mettant en place des
                                                programmes de préparation physique pour optimiser leurs performances sur le terrain.
                                            </p>
                                        </div>
                                    </div>
                                </article>
                            </div>
                            {/* <!-- Article Ends --> */}

                            {/* <!-- Article Starts --> */}
                            <div className="col-12 col-md-6 col-lg-6 col-xl-4 mb-30">
                                <article className="post-container containerColor">
                                    <div className="post-thumb lineColor">
                                        <a href="#" className="d-block position-relative overflow-hidden">
                                            <img src={poste5} className="img-fluid ImageService ImageService2" alt="" />
                                        </a>
                                    </div>
                                    <div className="post-content">
                                        <div className="entry-header">
                                            <h3 className="h3Service"><a href="blog-post.html" className="titleSe linkService">Développement académique:</a></h3>
                                        </div>
                                        <div className="entry-content open-sans-font">
                                            <p className="paragrService">Certains clubs intègrent des programmes éducatifs dans leur offre de services,
                                                permettant aux joueurs de poursuivre leur développement académique en parallèle de leur formation footballistique.
                                                Cela garantit un équilibre entre
                                                le sport et l'éducation pour les jeunes joueurs.
                                            </p>
                                        </div>
                                    </div>
                                </article>
                            </div>
                            {/* <!-- Article Ends --> */}

                            {/* <!-- Article Starts --> */}
                            <div className="col-12 col-md-6 col-lg-6 col-xl-4 mb-30">
                                <article className="post-container containerColor">
                                    <div className="post-thumb lineColor">
                                        <a href="#" className="d-block position-relative overflow-hidden">
                                            <img src={poste3} className="img-fluid ImageService ImageService2" alt="" />
                                        </a>
                                    </div>
                                    <div className="post-content">
                                        <div className="entry-header">
                                            <h3 className="h3Service"><a href="#" className="titleSe linkService">Opportunités de progression:</a></h3>
                                        </div>
                                        <div className="entry-content open-sans-font">
                                            <p className="paragrService">Enfin, les clubs de football professionnel offrent aux joueurs des opportunités de progression au sein
                                                de leur structure ou vers des clubs de niveaux supérieurs. Cela peut se traduire par des promotions au sein de l'équipe première,
                                                des prêts à d'autres clubs pour acquérir de l'expérience,
                                                ou même des transferts vers des ligues plus compétitives.
                                            </p>
                                        </div>
                                    </div>
                                </article>
                            </div>
                            {/* <!-- Article Ends --> */}



                            {/* <!-- Pagination Starts --> */}
                            <div className="col-12 mt-4">
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination justify-content-center mb-0 paginate paginateUl">
                                        <li className="page-item"><a className="page-links paginateNoAct" href="#">1</a></li>
                                        <li className="page-item activeService paginate"><a className="page-links paginateNoAct" href="#">2</a></li>
                                        <li className="page-item "><a className="page-links paginateNoAct" href="#">3</a></li>
                                        <li className="page-item"><a className="page-links paginateNoAct" href="#">4</a></li>
                                    </ul>
                                </nav>
                            </div>
                            {/* <!-- Pagination Ends --> */}

                        </div>
                    </div>

                </section >
            </motion.div>
        </>
    )
}
export default Service;