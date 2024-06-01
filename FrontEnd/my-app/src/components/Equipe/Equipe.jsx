import "./equipe.css"
import React, { useEffect, useState } from "react";
import { Button, Modal } from '@mui/material'; // Import Material-UI modal components
import { NavLink } from 'react-router-dom';
import ModalAddE from "../ModalEquipe/ModalAddE";
import axios from "axios";
import { CheckCircle, Clear } from "@mui/icons-material";
import {
    Card,
    CardContent,
    TextField,
    Box,
    Container,
    Input,
    FormControl,
    FormLabel,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
} from "@mui/material";
import SectionEquipe from "../ContentEquipe/SectionEquipe";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faEdit, faTrash, faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactPaginate from 'react-paginate';
import { motion } from "framer-motion";


const Equipe = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [equipe, setEquipe] = useState([]);
    const [laoding, setLaoding] = useState([]);
    const [updateId, setUpdateId] = useState(null);
    const [formError, setFormError] = useState("");
    const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
    const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
    const [deletionId, setDeletionId] = useState(null);
    const [searchs, setSearchs] = useState('');
    const [materielInput, setMaterielInput] = useState({
        nameQ: "",
        paysQ: "",
        villeQ: "",
        logoQ: null,
        error_list: {},
    });

    const handleInput = (e) => {
        e.persist();
        setMaterielInput({
            ...materielInput,
            [e.target.name]: e.target.value,
        });
        setFormError("");
    };
    const handleImageInput = (e) => {
        const file = e.target.files[0];
        setMaterielInput({
            ...materielInput,
            logoQ: file,
        });
    };

    // Anothers Add Modal
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    // Edit Modal
    const handleCloseModalUpdate = () => {
        setIsModalOpenUpdate(false);
    };


    // ************* PAGINATE ***************//
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5; // Nombre d'éléments par page
    const indexOfLastItem = (currentPage + 1) * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = equipe.slice(indexOfFirstItem, indexOfLastItem);
    // ************* ENDING ***************//

    // ************* PAGINATION ***************//
    useEffect(() => {
        refresh();
    }, [currentPage]); // Rafraîchir lorsque la page change
    // ************* ENDING ***************//





    // ************* REFRESH DATA FROM SERVER ***************//
    const refresh = () => {
        const fetchData = async () => {
            axios.get(`/api/display-equipe`).then(reponse => {
                if (reponse.data.status === 200) {
                    // console.log(reponse.data.equipe);
                    setEquipe(reponse.data.equipe);
                    setLaoding(false);
                }
            });
        }
        fetchData()
    }

    // ************* ENDING ***************//

    useEffect(() => {

        const fetchData = async () => {
            axios.get(`/api/display-equipe`).then(reponse => {
                if (reponse.data.status === 200) {
                    // console.log(reponse.data.equipe);
                    setEquipe(reponse.data.equipe);
                    setLaoding(false);
                }
            });
        }
        fetchData()

    }, []);


    // DISPLAY DATA FROM BACKEND
    var Display_player = '';
    if (laoding) {
        return <h1>Chargement...</h1>
    }
    else {
        Display_player = currentItems.filter((item) => {
            return searchs.toLowerCase() === ''
                ? item
                : item.nameQ.toLowerCase().includes(searchs);
        }).map((item, id) => {
            return (
                <tr key={item.id}>
                    <td className="tdEquipe">{item.id}</td>
                    <td className="tdEquipe"><img className="LogoEquipe" src={`http://127.0.0.1:8000/${item.logoQ}`} alt="image" /></td>
                    <td className="tdEquipe">{item.nameQ}</td>
                    <td className="tdEquipe">{item.paysQ}</td>
                    <td className="tdEquipe">{item.villeQ}</td>
                    {/* <td className="tdEquipe">
                        <button className="UpdateEquipe" onClick={() => handleOpenModalUpdate(item.id)} >Update</button><span> </span>
                        <button className="deleteEquipe" onClick={() => handleDelete(item.id)} >Delete</button>
                    </td> */}
                    <td className="tdEquipe">
                        <FontAwesomeIcon onClick={() => handleOpenModalUpdate(item.id)} icon={faEdit} className="iconUpdateEquipe" /> <span />
                        <FontAwesomeIcon onClick={() => handleDelete(item.id)} icon={faTrash} className="iconDeleteEquipe" />
                    </td>
                </tr>
            )
        });
    }


    // ************* FETCH DATA FROM SERVER ***************//
    const handleOpenModalUpdate = async (id) => {
        setUpdateId(id);
        setIsModalOpenUpdate(true);
        var ID = id
        console.log(ID);
        axios.get(`/api/edit-equipe/${ID}`).then(res => {
            if (res.data.status === 200) {
                // console.log(res.data.message);
                setMaterielInput(res.data.message);

            }
        });
    };


    // ************* UPDATE DATA FROM SERVER ***************//
    const submitPlayerUpate = (e) => {
        e.preventDefault();
        setMaterielInput({
            ...materielInput,
            error_list: {},
        });
        // setFormError("");
        console.log(updateId);

        const formData = new FormData();
        formData.append("nameQ", materielInput.nameQ);
        formData.append("paysQ", materielInput.paysQ);
        formData.append("villeQ", materielInput.villeQ);
        formData.append("logoQ", materielInput.logoQ);

        console.log(materielInput.nameQ);
        console.log(materielInput.paysQ);
        console.log(materielInput.villeQ);
        console.log(materielInput.logoQ);

        console.log(formData);

        axios.post(`/api/update-equipe/${updateId}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then(res => {
            if (res.data.status === 200) {
                // console.log(res.data.message);
                toast.success(res.data.message);
                setIsModalOpenUpdate(false);
                refresh();
            }
            else if (res.data.status === 422) {
                // console.log(res.data.errors);
                toast.error(res.data.errors);
                setIsModalOpenUpdate(false);
                refresh();
            }
            else if (res.data.status === 400) {
                // console.log(res.data.message);
                toast.error(res.data.message);
                setIsModalOpenUpdate(false);
                refresh();
            }
        });

    }

    // ************* DELETE DATA FROM SERVER ***************//
    const handleDelete = (id) => {
        setDeletionId(id);
        console.log(id);
        setOpenConfirmationDialog(true);
        refresh();
    }
    const handleConfirmationDialogClose = () => {
        setOpenConfirmationDialog(false);
        refresh();
    }
    const handleConfirmDelete = async () => {
        // console.log("Terminer");
        // console.log(deletionId);
        axios.delete(`/api/delete-equipe/${deletionId}`).then(res => {
            if (res.data.status === 200) {
                toast.success(res.data.message);
                setOpenConfirmationDialog(false);
                refresh();
            }
            else if (res.data.status === 404) {
                toast.error(res.data.message);
                refresh();
            }
        });
    }
    // ********** end ************//






    return (
        <>
            <motion.div className="mainEquipe"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                exit={{ X: window.innerWidth }}
            // initial={{ opacity: 0 }}
            // animate={{ opacity: 1 }}
            // exit={{ opacity: 0 }}
            >
                <SectionEquipe />
                <h1>Liste des equipes</h1>
                <div className="headerTitle">
                    <NavLink>
                        <div >
                            <button onClick={handleOpenModal} className="AddEquipe">
                                <FontAwesomeIcon icon={faFolderPlus} className="iconAddEquipe" /> Ajouter
                            </button>
                        </div>
                    </NavLink>

                    <Modal open={isModalOpen} onClose={handleCloseModal}>
                        <ModalAddE onClose={handleCloseModal} handleCloseModal={handleCloseModal} refresh={refresh} />
                    </Modal>

                    <div className="input-groupEquipe">
                        <FontAwesomeIcon icon={faSearch} className="iconE" />
                        <input
                            className="inputEquipe"
                            type="text"
                            placeholder="Recherche..."
                            onChange={(e) => setSearchs(e.target.value)}
                        />
                    </div>

                </div>
                <div>
                    <table className="tableEquipe">
                        <thead className="theadEquipe">
                            <tr className="trEquipe">
                                <th className="thEquipe">ID</th>
                                <th className="thEquipe">Logo</th>
                                <th className="thEquipe">Nom</th>
                                <th className="thEquipe">Pays</th>
                                <th className="thEquipe">Ville</th>
                                <th className="thEquipe"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {Display_player}
                        </tbody>
                    </table>
                </div>

                <div>
                    <div className="">
                        <ReactPaginate
                            previousLabel={"<< Précédent"}
                            nextLabel={"Suivant >>"}
                            pageCount={Math.ceil(equipe.length / itemsPerPage)}
                            onPageChange={({ selected }) => setCurrentPage(selected)}
                            containerClassName={"pagination"}
                            pageLinkClassName="pagination__link"
                            previousLinkClassName={"pagination__link"}
                            nextLinkClassName={"pagination__link"}
                            disabledClassName={"pagination__link--disabled"}
                            previousClassName={currentPage === 0 ? "pagination__link--disabled pagination__link" : "pagination__link"}
                            nextClassName={currentPage === Math.ceil(equipe.length / itemsPerPage) - 1 ? "pagination__link--disabled pagination__link" : "pagination__link"}
                            activeLinkClassName="active"
                        />
                    </div>
                </div>


                {/* MODAL WINDOW */}
                <Modal open={isModalOpenUpdate} onClose={handleCloseModalUpdate}>

                    <Container maxWidth="sm" open={isModalOpen} onClose={handleCloseModalUpdate}>
                        <Box my={5}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" color="primary.main" className="colorTitle" >Modification un equipe</Typography>
                                    <form onSubmit={submitPlayerUpate} encType="multipart/form-data">
                                        {formError && (
                                            <Box mt={3} mb={3} color="error.main">
                                                {formError}
                                            </Box>
                                        )}
                                        <Box mt={3}>
                                            <TextField
                                                type="text"
                                                name="nameQ"
                                                fullWidth
                                                variant="outlined"
                                                label="Nome equipe"
                                                onChange={handleInput}
                                                value={materielInput.nameQ}
                                            />
                                        </Box>
                                        <Box mt={3}>
                                            <TextField
                                                type="text"
                                                name="paysQ"
                                                fullWidth
                                                variant="outlined"
                                                label="Pays d'equipe"
                                                onChange={handleInput}
                                                value={materielInput.paysQ}
                                            />
                                        </Box>
                                        <Box mt={3}>
                                            <TextField
                                                type="text"
                                                name="villeQ"
                                                fullWidth
                                                variant="outlined"
                                                label="Ville d'equipe"
                                                onChange={handleInput}
                                                value={materielInput.villeQ}
                                            />
                                        </Box>
                                        <Box mt={3}>
                                            <FormControl fullWidth sx={{ marginBottom: 3 }}>
                                                <FormLabel htmlFor="image_materiel_url">
                                                    Logo equipe
                                                </FormLabel>
                                                <Input
                                                    type="file"
                                                    name="logoQ"
                                                    onChange={handleImageInput}
                                                    sx={{ marginTop: 1 }}
                                                />
                                                <img className="imageEquipe" src={`http://127.0.0.1:8000/${materielInput.logoQ}`} alt="image"></img>
                                            </FormControl>
                                        </Box>
                                        <Box mt={3} display="flex">
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                size="medium"
                                                endIcon={<CheckCircle />}
                                                fullWidth
                                                className="ajouterPlayer"
                                            >
                                                Modification
                                            </Button>
                                            <NavLink
                                                // to={linkBack}
                                                style={{ textDecoration: "none" }}
                                            >
                                                <Button
                                                    type="button"
                                                    variant="contained"
                                                    color="secondary"
                                                    className="annulerPlayer"
                                                    size="medium"
                                                    endIcon={<Clear />}
                                                    fullWidth
                                                    style={{ marginLeft: "10px" }}
                                                    onClick={handleCloseModalUpdate}
                                                >
                                                    Annuler
                                                </Button>
                                            </NavLink>
                                        </Box>
                                    </form>
                                </CardContent>
                            </Card>
                        </Box>
                    </Container>
                </Modal>
                {/* Fenetre de comfirmation */}
                <Dialog
                    open={openConfirmationDialog}
                    onClose={handleConfirmationDialogClose}
                >
                    <DialogTitle>Confirmation</DialogTitle>
                    <DialogContent>
                        Êtes-vous sûr de vouloir supprimer ce equipe ?
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleConfirmationDialogClose} color="primary">
                            Annuler
                        </Button>
                        <Button onClick={handleConfirmDelete} className="deleteCof">
                            Supprimer
                        </Button>
                    </DialogActions>
                </Dialog>

            </motion.div>
            <ToastContainer position='top-center' theme='dark' transition={Zoom} />
        </>
    )
}
export default Equipe