import React, { useState } from 'react'
import "./cardHome.css"
import ModalCard_1 from './ModalCard_1';
import { Modal } from '@mui/material';

const CardHome = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cards] = useState([
        {
            title: 'Service-1',
            text: `   Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe, cum. Sint, id. 
            Eveniet non eum reiciendis! Harum sint possimus laborum.`,
        },
        {
            title: 'Service-2',
            text: `   Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe, cum. Sint, id. 
            Eveniet non eum reiciendis! Harum sint possimus laborum.`,
        },
        {
            title: 'Service-3',
            text: `   Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe, cum. Sint, id. 
            Eveniet non eum reiciendis! Harum sint possimus laborum.`,
        },
        // {
        //     title: 'Card-4',
        //     text: `   Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe, cum. Sint, id. 
        //     Eveniet non eum reiciendis! Harum sint possimus laborum.`,
        // },
        // {
        //     title: 'Card-5',
        //     text: `   Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe, cum. Sint, id. 
        //     Eveniet non eum reiciendis! Harum sint possimus laborum.`,
        // },
        // {
        //     title: 'Card-6',
        //     text: `   Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe, cum. Sint, id. 
        //     Eveniet non eum reiciendis! Harum sint possimus laborum.`,
        // },


    ]);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <section className='sectionHome'>
                <div className='containerCardHome'>
                    <div className='h1Card'> Information</div>
                    <div className='cardsCardHome'>
                        {
                            cards.map((card, i) => (
                                <div key={i} className='cardCardHome'>
                                    <h3>{card.title}</h3>
                                    <p>
                                        {card.text}
                                    </p>

                                    <div >
                                        <button onClick={handleOpenModal} className="btnCard ajouterPlayer">
                                            Voir plus
                                        </button>
                                    </div>

                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>
            <Modal open={isModalOpen} onClose={handleCloseModal}>
                <ModalCard_1 onClose={handleCloseModal} handleCloseModal={handleCloseModal} />
            </Modal>
        </>
    )
}

export default CardHome
