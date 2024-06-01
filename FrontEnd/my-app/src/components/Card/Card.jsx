import React, { useEffect, useState } from "react";
import "./card.css"
import axios from "axios";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';



const Card = () => {

    const [card, setCard] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            axios.get(`/api/display-player`).then(reponse => {
                if (reponse.data.status === 200) {
                    console.log(reponse.data.player)
                    setCard(reponse.data.player);
                }
            });
        }
        fetchData()
    }, []);

    return (
        <section className="testimonial containerCard sectionCard testeCard">

            <Swiper className="testimonial__container"
            // slidesPerView={1}
            loop={true}
            grabCursor={true}
            spaceBetween={24}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              576: {
                slidesPerView: 3,
                // spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 48,
              },
            //   1024: {
            //     slidesPerView: 5,
            //     spaceBetween: 50,
            //   },
            }}
            modules={[Pagination]}
            // className="mySwiper"
            >
                {card.map(({ id, ImageP,NameP, PaysP,PosteP,NombreP1,NombreP2,NombreP3,AgeP }) => {
                    return (
                        <SwiperSlide className="testimonial__card" key={id}>
                            <img src={`http://127.0.0.1:8000/${ImageP}`} alt="" className="testimonial__img"/>

                            <div className="testimonial___name">{NameP}</div> 
                            <div className="testimonial__description">{AgeP} ans</div>
                            <div className="testimonial__description">Pays: {PaysP}</div>
                            <div className="testimonial__description">Poste :{PosteP}</div>

                            <div className="testimonial__description">Nombre de but à marque: {NombreP1}</div>
                            <div className="testimonial__description">Nombre de passe: {NombreP2}</div>
                            <div className="testimonial__description">Nombre de Tire: {NombreP3}</div>
                        </SwiperSlide>

                    )
                })}
            </Swiper>
        </section>
    )
}

export default Card;