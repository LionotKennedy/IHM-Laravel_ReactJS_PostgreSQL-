
import React, { useState, useEffect } from "react";
import ModalMatchs from "../ModalMatchs/ModalMatchs";
import axios from 'axios'
import "./matchs.css"
import { Button } from '@mui/material'; // Import Material-UI modal components
import { NavLink } from 'react-router-dom';
import { CheckCircle, Clear } from "@mui/icons-material";
import {
    Card,
    CardContent,
    TextField,
    Box,
    Container,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Modal,
    // MenuItem,
} from "@mui/material";
import SectionEquipe from "../ContentEquipe/SectionEquipe";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faEdit, faTrash, faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactPaginate from 'react-paginate';
import { motion } from "framer-motion";

const Matchs = () => {
    const [open, setOpen] = useState(false);
    const [match, setMatch] = useState([]);
    const [laoding, setLaoding] = useState([]);
    const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updateId, setUpdateId] = useState(null);
    const [formError, setFormError] = useState("");
    const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
    const [deletionId, setDeletionId] = useState(null);
    const [searchs, setSearchs] = useState('');

    const [equi1, setEqui1] = useState('');
    const [equi2, setEqui2] = useState('');


    const [materielInput, setMaterielInput] = useState({
        score_1: "",
        score_2: "",
        id_equipe_1: "",
        id_equipe_2: "",
        dateMa: "",
        timeMa: "",
        // error_list: {},
    });

    const handleInput = (e) => {
        e.persist();
        setMaterielInput({
            ...materielInput,
            [e.target.name]: e.target.value,
        });
        setFormError("");
    };

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
        // setEqui2(event.target.value)
    }
    const handleChange2 = (event) => {
        // setEqui1(event.target.value)
        setEqui2(event.target.value)
    }


    // ************* PAGINATE ***************//
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5; // Nombre d'éléments par page
    const indexOfLastItem = (currentPage + 1) * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = match.slice(indexOfFirstItem, indexOfLastItem);
    // ************* ENDING ***************//

    // ************* PAGINATION ***************//
    useEffect(() => {
        refresh();
    }, [currentPage]); // Rafraîchir lorsque la page change
    // ************* ENDING ***************//




    // REFRESH DATA FROM BACKEND
    const refresh = () => {

        const fetchData = async () => {
            axios.get(`/api/display-match`).then(res => {
                if (res.data.status === 200) {
                    // console.log(res.data.matches);
                    setMatch(res.data.matches);
                    setLaoding(false);
                }
            });
        }
        fetchData()
    }
    // ENDING

    // Display data
    useEffect(() => {

        const fetchData = async () => {
            axios.get(`/api/display-match`).then(res => {
                if (res.data.status === 200) {
                    // console.log(res.data.matches);
                    setMatch(res.data.matches);
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
                : item.nameQ1.toLowerCase().includes(searchs);
        }).map((item, id) => {
            return (
                <tr key={item.id}>
                    <td className="tdMatchs">{item.matchs_id}</td>
                    <td className="tdMatchs"> <span className="label">{item.nameQ1}</span></td>
                    <td className="tdMatchs"> <img className="logoMatchs" src={`http://127.0.0.1:8000/${item.logoQ1}`} alt="image" /></td>
                    <td className="tdMatchs"><span className="scrore">{item.score_1}</span></td>
                    <td className="tdMatchs"><span className="tire">-</span></td>
                    <td className="tdMatchs"><span className="scrore">{item.score_2}</span></td>
                    <td className="tdMatchs"> <img className="logoMatchs" src={`http://127.0.0.1:8000/${item.logoQ2}`} alt="image" /></td>
                    <td className="tdMatchs"> <span className="label">{item.nameQ2}</span></td>
                    <td className="tdMatchs"> <span className="">{item.dateMa} à {item.timeMa}</span></td>
                    {/* <td className="tdMatchs">
                        <button className="updateMatchs" onClick={() => handleOpenModalUpdate(item.matchs_id)} >Update</button><span> </span>
                        <button className="updateDelete" onClick={() => handleDelete(item.matchs_id)} >Delete</button>
                    </td> */}
                    <td className="tdEquipe">
                        <FontAwesomeIcon onClick={() => handleOpenModalUpdate(item.matchs_id)} icon={faEdit} className="iconUpdateEquipe" /> <span />
                        <FontAwesomeIcon onClick={() => handleDelete(item.matchs_id)} icon={faTrash} className="iconDeleteEquipe" />
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
        axios.get(`/api/edit-match/${ID}`).then(res => {
            if (res.data.status === 200) {
                // console.log(res.data.message);
                setMaterielInput(res.data.message);

            }
            else if (res.data.status === 404) {
                // console.log(res.data.message)
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
        formData.append("id_equipe_1", materielInput.id_equipe_1);
        formData.append("id_equipe_2", materielInput.id_equipe_2);
        formData.append("score_1", materielInput.score_1);
        formData.append("score_2", materielInput.score_2);
        formData.append("dateMa", materielInput.dateMa);
        formData.append("timeMa", materielInput.timeMa);

        console.log(formData);
        console.log(materielInput.id_equipe_1)
        console.log(materielInput.id_equipe_2)
        console.log(materielInput.score_1)
        console.log(materielInput.score_2)
        console.log(materielInput.dateMa)
        console.log(materielInput.timeMa)

        axios.post(`/api/update-match/${updateId}`, formData, {
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
                console.log(res.data.errors);
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
        // console.log(id);
        setOpenConfirmationDialog(true);
        refresh();
    }
    const handleConfirmationDialogClose = () => {
        setOpenConfirmationDialog(false);
        refresh();
    }
    const handleConfirmDelete = async () => {
        // console.log(deletionId);
        axios.delete(`/api/delete-match/${deletionId}`).then(res => {
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


    return (
        <>
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                exit={{ X: window.innerWidth }}
            >
                <SectionEquipe />
                <h1>Liste des Matches</h1>
                <div className="headerMatch">
                    <button onClick={handleOpenPopup} className='addMatchs' ><FontAwesomeIcon icon={faFolderPlus} className="iconAddMatchs" />  Ajouter</button>
                    <ModalMatchs open={open} onClose={handleClosePopup} onSubmit={handleSubmitModal} handleClosePopup={handleClosePopup} refresh={refresh} />
                    <div className="input-groupMatchs">
                        <FontAwesomeIcon icon={faSearch} className="iconM" />
                        <input
                            className="inputMatchs"
                            type="text"
                            placeholder="Recherche..."
                            onChange={(e) => setSearchs(e.target.value)}
                        />
                    </div>
                </div>
                {/* table */}
                <div>
                    <table className="tableMatchs">
                        <thead className="theadMatchs">
                            <tr className="trMatchs">
                                <th className="thMatchs">ID</th>
                                <th className="thMatchs"></th>
                                <th className="thMatchs"></th>
                                <th className="thMatchs"></th>
                                <th className="thMatchs">Matchs</th>
                                <th className="thMatchs"></th>
                                <th className="thMatchs"></th>
                                <th className="thMatchs"></th>
                                <th className="thMatchs">Data et Heurs</th>
                                <th className="thMatchs">Action</th>
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
                            pageCount={Math.ceil(match.length / itemsPerPage)}
                            onPageChange={({ selected }) => setCurrentPage(selected)}
                            containerClassName={"pagination"}
                            pageLinkClassName="pagination__link"
                            previousLinkClassName={"pagination__link"}
                            nextLinkClassName={"pagination__link"}
                            disabledClassName={"pagination__link--disabled"}
                            previousClassName={currentPage === 0 ? "pagination__link--disabled pagination__link" : "pagination__link"}
                            nextClassName={currentPage === Math.ceil(match.length / itemsPerPage) - 1 ? "pagination__link--disabled pagination__link" : "pagination__link"}
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
                                    <Typography variant="h5" color="primary.main" className="colorTitle" >Modification du matchs</Typography>
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
                                                label="Equipe 1"
                                                name="id_equipe_1"
                                                value={materielInput.id_equipe_1}
                                                onChange={handleChange1}
                                                fullWidth
                                                style={{ borderColor: 'purple' }}
                                            >
                                                {/* {
                                                equipe1.map((item) => {
                                                    return (
                                                        <MenuItem value={item.id_equipe_1} key={item. id_equipe_1}>{item.id_equipe_1}
                                                        </MenuItem>
                                                    )
                                                })
                                            } */}
                                            </TextField>
                                        </div>

                                        <Box mt={3}>
                                            <TextField
                                                type='number'
                                                variant="outlined"
                                                label="Score 1"
                                                name="score_1"
                                                onChange={handleInput}
                                                value={materielInput.score_1}
                                                style={{ borderColor: 'purple' }}
                                                fullWidth
                                            />

                                        </Box>
                                        <div className='style' >
                                            <TextField
                                                type="text"
                                                variant="outlined"
                                                label="Equipe 2"
                                                name="id_equipe_2"
                                                value={materielInput.id_equipe_2}
                                                onChange={handleChange2}
                                                fullWidth
                                                style={{ borderColor: 'purple' }}
                                            >

                                            </TextField>
                                        </div>
                                        <Box mt={3}>
                                            <TextField
                                                type='number'
                                                variant="outlined"
                                                label="Score 2"
                                                name="score_2"
                                                onChange={handleInput}
                                                value={materielInput.score_2}
                                                style={{ borderColor: 'purple' }}
                                                fullWidth

                                            />
                                        </Box>

                                        <Box mt={3}>
                                            <Typography variant="p" color="primary.main" className="colorTitle" >Date du matchs</Typography>
                                            <TextField
                                                type='date'
                                                variant="outlined"
                                                name="dateMa"
                                                onChange={handleInput}
                                                value={materielInput.dateMa}
                                                style={{ borderColor: 'purple' }}
                                                fullWidth
                                            />
                                        </Box>
                                        <Box mt={3}>
                                            <Typography variant="p" color="primary.main" className="colorTitle" >Heurs du matchs</Typography>
                                            <TextField
                                                type='time'
                                                variant="outlined"
                                                name="timeMa"
                                                onChange={handleInput}
                                                value={materielInput.timeMa}
                                                fullWidth
                                            />
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
                                                Modifiaction
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
                        Êtes-vous sûr de vouloir supprimer ce Match ?
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

export default Matchs;