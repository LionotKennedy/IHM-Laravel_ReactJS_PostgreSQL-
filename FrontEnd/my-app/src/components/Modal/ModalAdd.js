import React, {  useState } from "react";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Box,
  Typography,
  Container,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  RadioGroup,
  FormControlLabel,
  Radio,

} from "@mui/material";
import { CheckCircle, Clear } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast,} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ModalAdd = ({ isModalOpen, handleCloseModal,refresh }) => {
  const [formError, setFormError] = useState("");
  const [materielInput, setMaterielInput] = useState({
    NameP: "",
    PaysP: "",
    AgeP: "",
    PosteP: "",
    NombreP1: "",
    NombreP2: "",
    NombreP3: "",
    ImageP: null,
    error_list: {},
  });
  const navigate = useNavigate();
  const userRole = localStorage.getItem("role");
  let linkBack = "/admin/player";

  const handleImageInput = (e) => {
    const file = e.target.files[0];
    setMaterielInput({
      ...materielInput,
      ImageP: file,
    });
  };

  const handleInput = (e) => {
    e.persist();
    setMaterielInput({
      ...materielInput,
      [e.target.name]: e.target.value,
    });
    setFormError("");
  };

  const resetForm = () => {
    setMaterielInput({
      NameP: "",
      PaysP: "",
      AgeP: "",
      PosteP: "",
      NombreP1: "",
      NombreP2: "",
      NombreP3: "",
      ImageP: null,
      error_list: {},
    });
    setFormError("");
  };

  const submitPlayer = (e) => {
    e.preventDefault();
    setMaterielInput({
      ...materielInput,
      error_list: {},
    });
    setFormError("");
    // resetForm();
    const errors = {};
    if (materielInput.NameP === "") {
      errors.NameP = "Type de matériel est requis";
    }
    if (materielInput.PaysP === "") {
      errors.PaysP = "Description du matériel est requis";
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
      formData.append("NameP", materielInput.NameP);
      formData.append("PaysP", materielInput.PaysP);
      formData.append("AgeP", materielInput.AgeP);
      formData.append("PosteP", materielInput.PosteP);
      formData.append("NombreP1", materielInput.NombreP1);
      formData.append("NombreP2", materielInput.NombreP2);
      formData.append("NombreP3", materielInput.NombreP3);
      formData.append("ImageP", materielInput.ImageP);
      console.log(formData);
      // if (userRole === 'userSimple' && demandeurVerifCount > 0) {
      //     formData.append('id_demandeur', id_demandeur);
      // }
      // const authToken = localStorage.getItem('auth_token');
      axios
        .post("http://127.0.0.1:8000/api/store-player", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            // 'Authorization': `Bearer ${authToken}`,
          },
        })
        .then((res) => {
          if (res.data.status === 200) {
            // console.log("Success", res.data.message, "success");
            toast.success(res.data.message);
            navigate("/admin/content");
            resetForm();
            handleCloseModal();
            refresh();
          } else if (res.data.status === 400) {
            toast.error(res.data.errors);
            setMaterielInput({
              ...materielInput,
              error_list: res.data.errors,
            });
          }
        });
    }
  };

  return (
    <>
      <Container maxWidth="sm" open={isModalOpen} onClose={handleCloseModal}>
        <Box my={5}>
          <Card>
            <CardContent>
              <Typography variant="h5" color="primary.main" className="colorTitle" >Ajouter un Joueur</Typography>
              {/* <Paper elevation={0} sx={{ backgroundColor: '#f8f8f8', marginBottom: 5, padding: 3 }}>
                            <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            >
                            <NavLink
                            // to={linkBack}
                            className="btn btn-primary btn-sm float-end"
                            sx={{ textDecoration: 'none', color: '#1976D2', '&:hover': { color: '#125699' } }}
                            >
                            <ArrowCircleLeft /> Retour à l'affichage
                            </NavLink>
                            </Box>
                        </Paper> */}
              <form onSubmit={submitPlayer} encType="multipart/form-data">
                {formError && (
                  <Box mt={3} mb={3} color="error.main">
                    {formError}
                  </Box>
                )}
                <Box mt={3}>
                  <TextField
                    type="text"
                    name="NameP"
                    // className="NamePlayer"
                    fullWidth
                    variant="outlined"
                    label="Nom du joueur"
                    error={materielInput.error_list.NameP ? true : false}
                    helperText={materielInput.error_list.NameP}
                    onChange={handleInput}
                    value={materielInput.NameP}
                    />
                </Box>
                <Box mt={3}>
                  <TextField
                    type="text"
                    name="PaysP"
                    fullWidth
                    variant="outlined"
                    label="Pays"
                    error={materielInput.error_list.PaysP ? true : false}
                    helperText={materielInput.error_list.PaysP}
                    onChange={handleInput}
                    value={materielInput.PaysP}
                    />
                </Box>
                <Box mt={3}>
                  <TextField
                    type="number"
                    name="AgeP"
                    fullWidth
                    variant="outlined"
                    label="Age du joueur"
                    error={materielInput.error_list.AgeP ? true : false}
                    helperText={materielInput.error_list.AgeP}
                    onChange={handleInput}
                    value={materielInput.AgeP}
                  />
                </Box>
                <Box
                  mt={3}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "30px",
                  }}
                  >
                  <TextField
                    type="number"
                    name="NombreP1"
                    fullWidth
                    variant="outlined"
                    label="Nombre debut"
                    error={materielInput.error_list.NombreP1 ? true : false}
                    helperText={materielInput.error_list.NombreP1}
                    onChange={handleInput}
                    value={materielInput.NombreP1}
                    />
                  <TextField
                    type="number"
                    name="NombreP2"
                    fullWidth
                    variant="outlined"
                    label="Nombre de tire"
                    error={materielInput.error_list.NombreP2 ? true : false}
                    helperText={materielInput.error_list.NombreP2}
                    onChange={handleInput}
                    value={materielInput.NombreP2}
                  />
                  <TextField
                    type="number"
                    name="NombreP3"
                    fullWidth
                    variant="outlined"
                    label="Nombre de passe"
                    error={materielInput.error_list.NombreP3 ? true : false}
                    helperText={materielInput.error_list.NombreP3}
                    onChange={handleInput}
                    value={materielInput.NombreP3}
                  />
                </Box>
                <Box
                  mt={3}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "30px",
                  }}
                >
                  <FormControl name="PosteP" className="teste">
                    <FormLabel>Selection le poste</FormLabel>
                    <RadioGroup
                      value={materielInput.PosteP}
                      onChange={handleInput}
                    >
                      <div className="teste">
                        <FormControlLabel
                          label="Attaquant"
                          value="Attaquant"
                          name="PosteP"
                          control={<Radio />}
                        />
                        <FormControlLabel
                          label="Centre"
                          value="Centre"
                          name="PosteP"
                          control={<Radio />}
                        />
                        <FormControlLabel
                          label="Defence"
                          value="Defence"
                          name="PosteP"
                          control={<Radio />}
                        />
                        <FormControlLabel
                          label="Gardient"
                          value="Gardient"
                          name="PosteP"
                          control={<Radio />}
                        />
                      </div>
                    </RadioGroup>
                  </FormControl>
                  {/* you selected : {materielInput.PosteP} */}
                </Box>
                <Box mt={3}>
                  <FormControl fullWidth sx={{ marginBottom: 3 }}>
                    <FormLabel htmlFor="image_materiel_url">
                      Profile du joueur
                    </FormLabel>
                    <Input
                      type="file"
                      name="ImageP"
                      onChange={handleImageInput}
                      sx={{ marginTop: 1 }}
                    />
                    {materielInput.error_list.ImageP && (
                      <FormHelperText error>
                        {materielInput.error_list.ImageP}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Box>
                <Box mt={3} display="flex">
                  <Button
                    type="submit"
                    className="ajouterPlayer"
                    variant="contained"
                    color="primary"
                    size="medium"
                    endIcon={<CheckCircle />}
                    fullWidth
                    // onClick={handleCloseModal}
                  >
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
                        onClick={handleCloseModal}
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
      {/* <ToastContainer position='top-center' theme='dark' transition={Zoom} /> */}

    </>
  );
};

export default ModalAdd;

