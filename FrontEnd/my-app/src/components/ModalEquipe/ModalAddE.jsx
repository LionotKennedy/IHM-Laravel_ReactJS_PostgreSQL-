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

} from "@mui/material";
import { CheckCircle, Clear } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast,} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ModalAddE = ({ isModalOpen, handleCloseModal,refresh }) => {
  const [formError, setFormError] = useState("");
  const [materielInput, setMaterielInput] = useState({
    nameQ: "",
    paysQ: "",
    villeQ: "",
    logoQ: null,
    error_list: {},
  });
  const navigate = useNavigate();
  const userRole = localStorage.getItem("role");
  let linkBack = "/admin/player";

  const handleImageInput = (e) => {
    const file = e.target.files[0];
    setMaterielInput({
      ...materielInput,
      logoQ: file,
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
      nameQ: "",
      paysQ: "",
      villeQ: "",
      logoQ: null,
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
    if (materielInput.nameQ === "") {
      errors.nameQ = "Nom equipe est requis";
    }
    if (materielInput.paysQ === "") {
      errors.paysQ = "Pays equipe est requis";
    }
    if (materielInput.villeQ === "") {
      errors.villeQ = "Ville d'equipe est requis";
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
      formData.append("nameQ", materielInput.nameQ);
      formData.append("paysQ", materielInput.paysQ);
      formData.append("villeQ", materielInput.villeQ);
      formData.append("logoQ", materielInput.logoQ);
      console.log(formData);
      console.log( materielInput.nameQ);
      console.log( materielInput.paysQ);
      console.log( materielInput.villeQ);
      console.log( materielInput.logoQ);

      axios.post("http://127.0.0.1:8000/api/store-equipe", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          // 'Authorization': `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        if (res.data.status === 200) {
          toast.success(res.data.message);
          // console.log("Success", res.data.message, "success");
          navigate("/admin/equipe");
          resetForm();
          handleCloseModal();
          refresh();
        } else if (res.data.status === 422) {
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
            <Typography variant="h5" color="primary.main" className="colorTitle" >Ajouter un equipe</Typography>
              <form onSubmit={submitPlayer} encType="multipart/form-data">
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
                    label="Nom equipe"
                    error={materielInput.error_list.nameQ ? true : false}
                    helperText={materielInput.error_list.nameQ}
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
                    error={materielInput.error_list.paysQ ? true : false}
                    helperText={materielInput.error_list.paysQ}
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
                    error={materielInput.error_list.villeQ ? true : false}
                    helperText={materielInput.error_list.villeQ}
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
                    {materielInput.error_list.logoQ && (
                      <FormHelperText error>
                        {materielInput.error_list.logoQ}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Box>
                <Box mt={3} display="flex">
                  <Button
                   className="ajouterPlayer"
                    type="submit"
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
    </>
  );
};

export default ModalAddE;

{
  /* <Dialog open={isModalOpen} onClose={handleCloseModal} fullWidth maxWidth="sm">
                                </Dialog> */
}
