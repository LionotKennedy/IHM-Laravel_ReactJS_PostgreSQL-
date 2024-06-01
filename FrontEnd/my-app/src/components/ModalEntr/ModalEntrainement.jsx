import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, Stack, TextField, Box, MenuItem, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CheckCircle, Clear } from "@mui/icons-material";


const ModalEntrainement = ({ open, onClose, refresh, handleClosePopup }) => {

    const navigate = useNavigate();
    const [formError, setFormError] = useState("");
    const [equi1, setEqui1] = useState('');
    const [equi2, setEqui2] = useState('');
    const [equipe1, setEquipe1] = useState([]);
    const [equipe2, setEquipe2] = useState([]);

    const [materielInput, setMaterielInput] = useState({
        lieuEnt: "",
        descEnt: "",
        dateEnt: "",
        timeEnt: "",
        // error_list: {},
    });


    const resetForm = () => {
        setMaterielInput({
            lieuEnt: "",
            descEnt: "",
            dateEnt: "",
            timeEnt: "",
            error_list: {},
        });
        setEqui1("");
        setEqui2("");
        setFormError("");
    };

    const handleInput = (e) => {
        e.persist();
        setMaterielInput({
            ...materielInput,
            [e.target.name]: e.target.value,
        });
        setFormError("");
    };

    // ************ ACTUALISER  ***********//

    const handleChange1 = (event) => {
        setEqui1(event.target.value)
        // setEqui2(event.target.value)
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        setMaterielInput({
            ...materielInput,
            error_list: {},
        });
        setFormError("");
        // resetForm();
        const errors = {};
        console.log(equi1)
        console.log(materielInput.lieuEnt)
        console.log(materielInput.descEnt)
        console.log(materielInput.dateEnt)
        console.log(materielInput.timeEnt)
        if (materielInput.lieuEnt === "") {
            errors.lieuEnt = "Type de matériel est requis";
            toast.error("Champs est requis");
        }
        if (materielInput.descEnt === "") {
            errors.descEnt = "Type de matériel est requis";
            toast.error("Champs est requis");
        }
        if (materielInput.dateEnt === "") {
            errors.dateEnt = "Description du matériel est requis";
            toast.error("Champs est requis");
        }
        if (materielInput.timeEnt === "") {
            errors.timeEnt = "Description du matériel est requis";
            toast.error("Champs est requis");
        }
        if (equi1 === "") {
            errors.joueur = "Description du matériel est requis";
            toast.error("Champs est requis");
        }

        if (Object.keys(errors).length > 0) {
            let errorString = "Les champs suivants sont requis : ";
            errorString += Object.keys(errors).join(", ");

            setMaterielInput({
                ...materielInput,
                error_list: errors,
            });
            setFormError(errorString);
        } else {
            const formData = new FormData();
            formData.append("id_equipe", equi1);
            formData.append("lieuEnt", materielInput.lieuEnt);
            formData.append("descEnt", materielInput.descEnt);
            formData.append("dateEnt", materielInput.dateEnt);
            formData.append("timeEnt", materielInput.timeEnt);

            axios.post(`/api/store-entrainmt`, formData).then(respons => {
                if (respons.data.status === 200) {
                    toast.success(respons.data.message);
                    refresh();
                }
                else if (respons.data.status === 422) {
                    toast.error(respons.data.errors);
                    // console.log(respons.data.errors);
                }
            });
            resetForm();
            handleClosePopup();
        }


    };


    // ************ FECH DATA   ***********//
    useEffect(() => {
        axios.get(`/api/display-equipe`).then(res => {
            if (res.data.status === 200) {
                // console.log(res.data.equipe);
                setEquipe1(res.data.equipe);
                setEquipe2(res.data.equipe);
            }
            else {
                // console.log("Echec de recuperation");
            }
        });

        const allDataPlayer = async () => {

        }
        allDataPlayer();
    }, []);
    // ************ ACTUALISER  ***********//

    return (
        <>
            <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
                <DialogTitle className="contentTitle">
                    <Typography variant="h5" color="primary.main"  className="colorTitle" >Ajouter du Entrainement</Typography>
                    <IconButton onClick={onClose} style={{ float: 'right' }}>
                        <CloseIcon color="primary" />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Stack spacing={2} margin={2}>

                        <TextField
                            select
                            variant="outlined"
                            label="Equipe 1"
                            name="id_equipe"
                            value={equi1}
                            onChange={handleChange1}
                            fullWidth
                            style={{ borderColor: 'purple' }}
                        >
                            {
                                equipe1.map((item) => {
                                    return (
                                        <MenuItem value={item.id} key={item.id}>{item.id}</MenuItem>
                                    )
                                })
                            }
                        </TextField>
                        <TextField
                            type='text'
                            variant="outlined"
                            label="Lieu"
                            name="lieuEnt"
                            onChange={handleInput}
                            value={materielInput.lieuEnt}
                            style={{ borderColor: 'purple' }}
                        />

                        <TextField
                            type='text'
                            variant="outlined"
                            label="Description"
                            name="descEnt"
                            onChange={handleInput}
                            value={materielInput.descEnt}
                            style={{ borderColor: 'purple' }}

                        />
                        <Typography variant="p" color="primary.main" className="colorTitle" >Date du Entrainement</Typography>
                        <TextField
                            type='date'
                            variant="outlined"
                            name="dateEnt"
                            onChange={handleInput}
                            value={materielInput.dateEnt}
                            style={{ borderColor: 'purple' }}

                        />
                        <Typography variant="p" color="primary.main"  className="colorTitle" >Heurs du Entrainement</Typography>
                        <TextField
                            type='time'
                            variant="outlined"
                            name="timeEnt"
                            onChange={handleInput}
                            value={materielInput.timeEnt}
                            style={{ borderColor: 'purple' }}

                        />
                        <Box mt={3} display="flex">

                            <Button
                                variant="contained"
                                color="primary"
                                size="medium"
                                endIcon={<CheckCircle />}
                                className="ajouterPlayer"
                                fullWidth
                                onClick={handleSubmit}>
                                Valider
                            </Button>
                            <NavLink
                                style={{ textDecoration: "none" }}
                            >
                                <Button
                                    type="button"
                                    variant="contained"
                                    color="secondary"
                                    size="medium"
                                    endIcon={<Clear />}
                                    className="annulerPlayer"
                                    fullWidth
                                    style={{ marginLeft: "10px" }}
                                    onClick={handleClosePopup}
                                >
                                    Annuler
                                </Button>
                            </NavLink>
                        </Box>
                    </Stack>
                </DialogContent>
                <DialogActions>{/* Ajoutez des boutons d'actions ici si nécessaire */}</DialogActions>
            </Dialog>

        </>
    );
};

export default ModalEntrainement;
