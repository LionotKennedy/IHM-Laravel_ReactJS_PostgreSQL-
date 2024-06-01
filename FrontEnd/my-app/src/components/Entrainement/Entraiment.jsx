
import "./entrainement.css"
import React, { useState, useEffect } from "react";
import axios from "axios"
import ModalEntrainement from "../ModalEntr/ModalEntrainement";
import { Button } from '@mui/material'; // Import Material-UI modal components
import { NavLink } from 'react-router-dom';
import { CheckCircle, Clear } from "@mui/icons-material";
import {
    Card,
    CardContent,
    TextField,
    Box,
    Container,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Modal,
    Typography,
} from "@mui/material";
import SectionEquipe from "../ContentEquipe/SectionEquipe";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faEdit, faTrash, faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactPaginate from 'react-paginate';
import { motion } from "framer-motion";


const Entraiment = () => {
    const [open, setOpen] = useState(false);
    const [entrai, setEntrai] = useState([]);
    const [laoding, setLaoding] = useState([]);
    const [updateId, setUpdateId] = useState(null);
    const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formError, setFormError] = useState("");
    const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
    const [deletionId, setDeletionId] = useState(null);
    const [equi1, setEqui1] = useState('');
    const [searchs, setSearchs] = useState('');
    const [materielInput, setMaterielInput] = useState({
        id_equipe: "",
        lieuEnt: "",
        descEnt: "",
        dateEnt: "",
        timeEnt: "",
        // error_list: {},
    });
    // Show modal add
    const handleOpenPopup = () => {
        setOpen(true);
    }
    const handleClosePopup = () => {
        setOpen(false);
    }
    const handleSubmitModal = async () => {
        handleClosePopup();
    };
    // Edit Modal
    const handleCloseModalUpdate = () => {
        setIsModalOpenUpdate(false);
    };

    const handleChange1 = (event) => {
        setEqui1(event.target.value)
    }
    const handleInput = (e) => {
        e.persist();
        setMaterielInput({
            ...materielInput,
            [e.target.name]: e.target.value,
        });
        setFormError("");
    };

    // ************* PAGINATE ***************//
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5; // Nombre d'éléments par page
    const indexOfLastItem = (currentPage + 1) * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = entrai.slice(indexOfFirstItem, indexOfLastItem);
    // ************* ENDING ***************//

    // ************* PAGINATION ***************//
    useEffect(() => {
        refresh();
    }, [currentPage]); // Rafraîchir lorsque la page change
    // ************* ENDING ***************//




    // ************* DELETE DATA FROM SERVER ***************//
    const handleDelete = (id) => {
        setDeletionId(id);
        // console.log(id);
        setOpenConfirmationDialog(true);
        refresh();
    }

    const handleConfirmationDialogClose = () => {
        setOpenConfirmationDialog(false);
        refresh();
    }
    const handleConfirmDelete = async () => {
        // console.log("Terminer");
        console.log(deletionId);
        axios.delete(`/api/delete-entrainmt/${deletionId}`).then(res => {
            if (res.data.status === 200) {
                setOpenConfirmationDialog(false);
                toast.success(res.data.message);
                refresh();
            }
            else if (res.data.status === 404) {
                toast.error(res.data.message);
                // console.log("Echoc...");
                refresh();
            }
        });
    }
    // ************* ENDING DATA FROM SERVER ***************//

    // ************* REFRESH DATA FROM SERVER ***************//
    const refresh = () => {
        const fetchData = async () => {
            axios.get(`/api/display-entrainmt`).then(res => {
                if (res.data.status === 200) {
                    // console.log(res.data.entrainement);
                    setEntrai(res.data.entrainement);
                    setLaoding(false);
                }
            });
        }
        fetchData()
    }
    // ************* ENDING ***************//


    // ************* REFRESH DATA FROM SERVER ***************//
    useEffect(() => {

        const fetchData = async () => {
            axios.get(`/api/display-entrainmt`).then(res => {
                if (res.data.status === 200) {
                    // console.log(res.data.entrainement);
                    setEntrai(res.data.entrainement);
                    setLaoding(false);
                }
            });
        }
        fetchData()

    }, []);
    // ************* ENDING ***************//


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
                <tr key={item.entrainements_id}>
                    <td className="tdEntr">{item.entrainements_id}</td>
                    <td className="tdEntr"><img className="logoEntrainement" src={`http://127.0.0.1:8000/${item.logoQ}`} alt="image" /></td>
                    <td className="tdEntr">{item.nameQ}</td>
                    <td className="tdEntr">{item.lieuEnt}</td>
                    <td className="tdEntr">{item.descEnt}</td>
                    <td className="tdEntr">{item.dateEnt}</td>
                    <td className="tdEntr">{item.timeEnt}</td>
                    {/* <td className="tdEntr">
                        <button className="updateEntr" onClick={() => handleOpenModalUpdate(item.entrainements_id)} >Update</button><span> </span>
                        <button className="deleteEntr" onClick={() => handleDelete(item.entrainements_id)} >Delete</button>
                    </td> */}
                    <td className="tdEquipe">
                        <FontAwesomeIcon onClick={() => handleOpenModalUpdate(item.entrainements_id)} icon={faEdit} className="iconUpdateEquipe" /> <span />
                        <FontAwesomeIcon onClick={() => handleDelete(item.entrainements_id)} icon={faTrash} className="iconDeleteEquipe" />
                        {/* <FontAwesomeIcon onClick={() => handleDelete(item.matchs_id)} icon={faTrash} className="iconDeleteEquipe" /> */}
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
        axios.get(`/api/edit-entrainmt/${ID}`).then(res => {
            if (res.data.status === 200) {
                toast.success(res.data.message);
                // console.log(res.data.message);
                setMaterielInput(res.data.message);

            }
            else if (res.data.status === 404) {
                toast.error(res.data.message);
                // console.log(res.data.message)
            }
        });
    };


    const submitPlayerUpate = (e) => {
        e.preventDefault();
        setMaterielInput({
            ...materielInput,
            error_list: {},
        });
        // setFormError("");
        console.log(updateId);

        const formData = new FormData();
        formData.append("id_equipe", materielInput.id_equipe);
        formData.append("lieuEnt", materielInput.lieuEnt);
        formData.append("descEnt", materielInput.descEnt);
        formData.append("dateEnt", materielInput.dateEnt);
        formData.append("timeEnt", materielInput.timeEnt);


        axios.post(`/api/update-entrainmt/${updateId}`, formData, {
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


    return (
        <>
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                exit={{ X: window.innerWidth }}
            >
                <SectionEquipe />
                <h1>Liste des Entrainement</h1>
                <div className="headerEntrain">
                    <button onClick={handleOpenPopup} className='addEntr' ><FontAwesomeIcon icon={faFolderPlus} className="iconAddEntrainment" /> Ajouter</button>
                    <ModalEntrainement open={open} onClose={handleClosePopup} onSubmit={handleSubmitModal} handleClosePopup={handleClosePopup} refresh={refresh} />
                    <div className="input-groupEntrain">
                        <FontAwesomeIcon icon={faSearch} className="iconEn" />
                        <input
                            className="inputEntrain"
                            type="text"
                            placeholder="Recherche..."
                            onChange={(e) => setSearchs(e.target.value)}
                        />
                    </div>
                </div>

                {/* table */}
                <div>
                    <table className="tableEntr">
                        <thead className="theadEntr">
                            <tr>
                                <th className="thEntr">ID</th>
                                <th className="thEntr">Logo</th>
                                <th className="thEntr">Nom Equipe</th>
                                <th className="thEntr">Lieu</th>
                                <th className="thEntr">Description</th>
                                <th className="thEntr">Date</th>
                                <th className="thEntr">Heur</th>
                                <th className="thEntr"></th>
                                {/* <th className="thEntr"></th> */}
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
                            pageCount={Math.ceil(entrai.length / itemsPerPage)}
                            onPageChange={({ selected }) => setCurrentPage(selected)}
                            containerClassName={"pagination"}
                            pageLinkClassName="pagination__link"
                            previousLinkClassName={"pagination__link"}
                            nextLinkClassName={"pagination__link"}
                            disabledClassName={"pagination__link--disabled"}
                            previousClassName={currentPage === 0 ? "pagination__link--disabled pagination__link" : "pagination__link"}
                            nextClassName={currentPage === Math.ceil(entrai.length / itemsPerPage) - 1 ? "pagination__link--disabled pagination__link" : "pagination__link"}
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
                                    <Typography variant="h5" color="primary.main" className="colorTitle" >Modification du entrainement</Typography>
                                    <form onSubmit={submitPlayerUpate} encType="multipart/form-data">
                                        {formError && (
                                            <Box mt={3} mb={3} color="error.main">
                                                {formError}
                                            </Box>
                                        )}
                                        <div className='style'>
                                            <TextField
                                                type="text"
                                                variant="outlined"
                                                label="Equipe"
                                                name="id_equipe"
                                                value={materielInput.id_equipe}
                                                onChange={handleChange1}
                                                fullWidth
                                                style={{ borderColor: 'purple' }}
                                            >

                                            </TextField>
                                        </div>

                                        <Box mt={3}>
                                            <TextField
                                                type='text'
                                                variant="outlined"
                                                label="Lieu"
                                                name="lieuEnt"
                                                onChange={handleInput}
                                                value={materielInput.lieuEnt}
                                                fullWidth
                                                style={{ borderColor: 'purple' }}
                                            />

                                        </Box>

                                        <Box mt={3}>
                                            <TextField
                                                type='text'
                                                variant="outlined"
                                                label="Description"
                                                name="descEnt"
                                                onChange={handleInput}
                                                value={materielInput.descEnt}
                                                fullWidth
                                                style={{ borderColor: 'purple' }}
                                            />
                                        </Box>

                                        <Box mt={3}>
                                            <Typography variant="p" color="primary.main" className="colorTitle" >Date du entrainement</Typography>
                                            <TextField
                                                type='date'
                                                variant="outlined"
                                                name="dateEnt"
                                                onChange={handleInput}
                                                value={materielInput.dateEnt}
                                                fullWidth
                                                style={{ borderColor: 'purple' }}

                                            />
                                        </Box>
                                        <Box mt={3}>
                                            <Typography variant="p" color="primary.main" className="colorTitle" >Date du entrainement</Typography>
                                            <TextField
                                                type='time'
                                                variant="outlined"
                                                name="timeEnt"
                                                onChange={handleInput}
                                                value={materielInput.timeEnt}
                                                fullWidth
                                                style={{ borderColor: 'purple' }}
                                            />
                                        </Box>

                                        <Box mt={3} display="flex">
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                size="medium"
                                                className="ajouterPlayer"
                                                endIcon={<CheckCircle />}
                                                fullWidth
                                            >
                                                Modification
                                            </Button>
                                            <NavLink
                                                style={{ textDecoration: "none" }}
                                            >
                                                <Button
                                                    type="button"
                                                    variant="contained"
                                                    color="secondary"
                                                    size="medium"
                                                    className="annulerPlayer"
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
                        Êtes-vous sûr de vouloir supprimer ce entrainement ?
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
};

export default Entraiment;