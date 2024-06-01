import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, Stack, Box, TextField, Typography, MenuItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';
import "./matchs.css";
import { CheckCircle, Clear } from "@mui/icons-material";

const ModalMatchs = ({ open, onClose, refresh, handleClosePopup }) => {

    const navigate = useNavigate();
    const [formError, setFormError] = useState("");

    const [equi1, setEqui1] = useState('');
    const [equi2, setEqui2] = useState('');
    const [equipe1, setEquipe1] = useState([]);
    const [equipe2, setEquipe2] = useState([]);

    const [materielInput, setMaterielInput] = useState({
        score_1: "",
        score_2: "",
        dateMa: "",
        timeMa: "",
        // error_list: {},
    });

    const resetForm = () => {
        setMaterielInput({
            score_1: "",
            score_2: "",
            dateMa: "",
            timeMa: "",
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
    const handleChange2 = (event) => {
        // setEqui1(event.target.value)
        setEqui2(event.target.value)
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
        if (materielInput.score_1 === "") {
            errors.score_1 = "Type de matériel est requis";
            toast.error("Champs est requis");
        }
        if (materielInput.score_2 === "") {
            errors.score_2 = "Type de matériel est requis";
            toast.error("Champs est requis");
        }
        if (materielInput.dateMa === "") {
            errors.dateMa = "Description du matériel est requis";
            toast.error("Champs est requis");
        }
        if (materielInput.timeMa === "") {
            errors.timeMa = "Description du matériel est requis";
            toast.error("Champs est requis");
        }
        if (equi1 === "") {
            errors.joueur = "Description du matériel est requis";
            toast.error("Champs est requis");
        }
        if (equi2 === "") {
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
            formData.append("id_equipe_1", equi1);
            formData.append("id_equipe_2", equi2);
            formData.append("score_1", materielInput.score_1);
            formData.append("score_2", materielInput.score_2);
            formData.append("dateMa", materielInput.dateMa);
            formData.append("timeMa", materielInput.timeMa);
            
            console.log(formData);
            console.log(equi1)
            console.log(equi2)
            console.log(materielInput.score_1)
            console.log(materielInput.score_2)
            console.log(materielInput.dateMa)
            console.log(materielInput.timeMa)
            axios.post(`/api/store-match`, formData).then(res => {
                if (res.data.status === 200) {
                    // console.log(res.data.message);
                    toast.success(res.data.message);
                    refresh();
                }
                else if (res.data.status === 402) {
                    // console.log(res.data.errors)
                    toast.error(res.data.errors);
                    refresh();
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
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle className="contentTitle">
                <Typography variant="h5" color="primary.main"  className="colorTitle" >Ajouter un Matchs</Typography>
                <IconButton onClick={onClose} style={{ float: 'right' }}>
                    <CloseIcon color="primary" />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Stack spacing={2} margin={2}>
                    <div className='styles'>
                        <TextField
                            select
                            variant="outlined"
                            label="Equipe 1"
                            name="id_equipe_1"
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
                            type='number'
                            variant="outlined"
                            label="Score 1"
                            name="score_1"
                            onChange={handleInput}
                            value={materielInput.score_1}
                            style={{ borderColor: 'purple' }}
                        />
                    </div>
                    <div className='styles' >
                        <TextField
                            select
                            variant="outlined"
                            label="Equipe 2"
                            name="id_equipe_2"
                            value={equi2}
                            onChange={handleChange2}
                            fullWidth
                            style={{ borderColor: 'purple' }}
                        >
                            {
                                equipe2.map((item) => {
                                    return (
                                        <MenuItem value={item.id} key={item.id}>{item.id}</MenuItem>
                                    )
                                })
                            }
                        </TextField>
                        <TextField
                            type='number'
                            variant="outlined"
                            label="Score 2"
                            name="score_2"
                            onChange={handleInput}
                            value={materielInput.score_2}
                            style={{ borderColor: 'purple' }}

                        />
                    </div>
                    <Typography variant="p" color="primary.main"  className="colorTitle" >Date du Matchs</Typography>
                    <TextField
                        type='date'
                        variant="outlined"
                        name="dateMa"
                        onChange={handleInput}
                        value={materielInput.dateMa}
                        style={{ borderColor: 'purple' }}

                    />
                    <Typography variant="p" color="primary.main"  className="colorTitle" >Heurs du Matchs</Typography>
                    <TextField
                        type='time'
                        variant="outlined"
                        name="timeMa"
                        onChange={handleInput}
                        value={materielInput.timeMa}
                        style={{ borderColor: 'purple' }}

                    />
                    <Box mt={3} display="flex">
                        <Button
                         variant="contained"
                            color="primary"
                            size="medium"
                            endIcon={<CheckCircle />}
                            className="ajouterPlayer"
                            fullWidth onClick={handleSubmit}>
                            Ajouter
                        </Button>
                        <NavLink
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
    );
};

export default ModalMatchs;
