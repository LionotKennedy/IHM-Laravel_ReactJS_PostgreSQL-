import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, DialogActions, Button, IconButton, Stack, TextField, Box, MenuItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import "./modalContrat.css"
import { CheckCircle, Clear } from "@mui/icons-material";


const ModalAddContrat = ({ open, onClose, refresh, handleClosePopup }) => {
    // const [name, setName] = useState('');
    // const [solde, setSolde] = useState('');
    // const navigate = useNavigate();
    // const [clients, setClient] = useState([]);
    const [formError, setFormError] = useState("");
    const [joueur, setJoueur] = useState('');
    const [joueur1, setJoueur1] = useState([]);

    const [materielInput, setMaterielInput] = useState({
        salaire: "",
        dateDebut: "",
        dateExp: "",
        // error_list: {},
    });

    const resetForm = () => {
        setMaterielInput({
            salaire: "",
            dateDebut: "",
            dateExp: "",
            error_list: {},
        });
        setJoueur("");
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

    const handleChange = (event) => {
        setJoueur(event.target.value)
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
        if (materielInput.salaire === "") {
            errors.salaire = "Type de matériel est requis";
        }
        if (materielInput.dateDebut === "") {
            errors.dateDebut = "Description du matériel est requis";
        }
        if (materielInput.dateExp === "") {
            errors.dateExp = "Description du matériel est requis";
        }
        if (joueur === "") {
            errors.joueur = "Description du matériel est requis";
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
            formData.append("id_player", joueur);
            formData.append("salaire", materielInput.salaire);
            formData.append("dateDebut", materielInput.dateDebut);
            formData.append("dateExp", materielInput.dateExp);

            console.log(formData);
            console.log(joueur)
            console.log(materielInput.salaire)
            console.log(materielInput.dateDebut)
            console.log(materielInput.dateExp)
            axios.post(`/api/store-contrat`, formData).then(res => {
                if (res.data.status === 200) {
                    toast.success(res.data.message);
                    // console.log(res.data.message);
                    refresh();
                }
                else if (res.data.status === 402) {
                    toast.error(res.data.errors);
                    // console.log(res.data.errors);
                    refresh();
                }
            });
            resetForm();
            handleClosePopup();
        }


    };

    // ************ FECH DATA   ***********//
    useEffect(() => {
        axios.get(`/api/Allplayer`).then(res => {
            if (res.data.status === 200) {
                // console.log(res.data.player);
                setJoueur1(res.data.player);
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
            <DialogTitle className='contentTitle'>
            <Typography variant="h5" color="primary.main" className="colorTitle" >Ajouter un Contrat</Typography>
                <IconButton onClick={onClose} style={{ float: 'right' }}>
                    <CloseIcon color="primary" />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Stack spacing={2} margin={2}>
                    <Box mt={3} >
                        <TextField
                            select
                            variant="outlined"
                            label="Numero du joueur"
                            name="id_player"
                            value={joueur}
                            onChange={handleChange}
                            fullWidth
                            style={{ borderColor: 'purple' }}
                        >
                            {
                                joueur1.map((item) => {
                                    return (
                                        <MenuItem value={item.id} key={item.id}>{item.id}</MenuItem>
                                    )
                                })
                            }
                        </TextField>
                    </Box>
                    <TextField
                        type='number'
                        variant="outlined"
                        label="Salaire"
                        name="salaire"
                        onChange={handleInput}
                        value={materielInput.salaire}
                        style={{ borderColor: 'purple' }}

                    />
                    <Typography variant="p" color="primary.main" className="colorTitle" >Date debut</Typography>
                    <TextField
                        type='date'
                        variant="outlined"
                        name="dateDebut"
                        onChange={handleInput}
                        value={materielInput.dateDebut}
                        style={{ borderColor: 'purple' }}

                    />
                    <Typography variant="p" color="primary.main" className="colorTitle" >Date expiration</Typography>
                    <TextField
                        type='date'
                        variant="outlined"
                        name="dateExp"
                        onChange={handleInput}
                        value={materielInput.dateExp}
                        style={{ borderColor: 'purple' }}

                    />
                    <Box mt={3} display="flex" >
                        <Button
                             variant="contained"
                            className="ajouterPlayer"
                            color="primary"
                            size="medium"
                            endIcon={<CheckCircle />}
                            fullWidth onClick={handleSubmit}>
                            Ajouter
                        </Button>
                        <NavLink
                            // to={linkBack}
                            style={{ textDecoration: "none" }}
                        >
                            <Button
                                type="button"
                                variant="contained"
                                className="annulerPlayer"
                                color="secondary"
                                size="medium"
                                endIcon={<Clear />}
                                fullWidth
                                style={{ marginLeft: "10px" }}
                                onClick={onClose}
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

export default ModalAddContrat;
