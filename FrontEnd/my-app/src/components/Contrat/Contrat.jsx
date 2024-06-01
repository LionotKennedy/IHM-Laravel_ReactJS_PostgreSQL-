import React, { useEffect, useState } from "react";
import ModalAddContrat from "../ModalContrat/ModalAddContrat";
import axios from "axios";
import './contrat.css'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, Stack, TextField, Box, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { CheckCircle, Clear } from "@mui/icons-material";
import Cards from "../Card/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactPaginate from 'react-paginate';
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";


const Contrat = () => {
  const [open, setOpen] = useState(false);
  const [contrat, setContrat] = useState([]);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [updateId, setUpdateID] = useState([]);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [deletionId, setDeletionId] = useState(null);
  const [contratInput, setContratInput] = useState({
    id_player: "",
    salaire: "",
    dateDebut: "",
    dateExp: "",
  });


  const handleOpenPopup = () => {
    setOpen(true);
  }
  const handleClosePopup = () => {
    setOpen(false);
  }
  const handleSubmitModal = async () => {
    handleClosePopup();
  };


  // Update modal
  const UpdateModalClose = () => {
    setOpenUpdate(false);
    // refresh();
  }

  const handleInput = (e) => {
    e.persist();
    setContratInput({
      ...contratInput,
      [e.target.name]: e.target.value,
    });
    // setFormError("");
  };


  const UpdateMadalOpen = async (id) => {
    setUpdateID(id);
    setOpenUpdate(true);
    var ID = id
    console.log(ID);
    axios.get(`/api/edit-contrat/${ID}`).then(res => {
      if (res.data.status === 200) {
        setContratInput(res.data.message);
      }
    });
  }

  useEffect(() => {

    const fetchData = async () => {
      axios.get(`/api/display-contrat`).then(reponse => {
        if (reponse.data.status === 200) {
          setContrat(reponse.data.contrats);
          // setPage(reponse.data.contrats);
          // setLaoding(false);
        }
      });
    }
    fetchData()

  }, []);

  // Update
  // ************* UPDATE DATA FROM SERVER ***************//
  const submitPlayerUpate = (e) => {
    // e.preventDefault();
    e.persist();
    setContratInput({
      ...contratInput,
      [e.target.name]: e.target.value,
    });
    console.log("Update")
    console.log(updateId);

    const formData = new FormData();
    formData.append("id_player", contratInput.id_player);
    formData.append("salaire", contratInput.salaire);
    formData.append("dateDebut", contratInput.dateDebut);
    formData.append("dateExp", contratInput.dateExp);

    console.log(contratInput.id_player);
    console.log(contratInput.salaire);
    console.log(contratInput.dateDebut);
    console.log(contratInput.dateExp);

    console.log(formData);

    axios.post(`/api/update-contrat/${updateId}`, formData).then(res => {
      if (res.data.status === 200) {
        refresh();
        setOpenUpdate(false);
        toast.success(res.data.message);
      }
      else if (res.data.status === 422) {
        refresh();
        setOpenUpdate(false);
        toast.error(res.data.error);
      }
      else if (res.data.status === 404) {
        refresh();
        setOpenUpdate(false);
        toast.error(res.data.message);
      }
    });

  }


  // ************* DELETE DATA FROM SERVER ***************//
  const handleDelete = (id) => {
    setDeletionId(id);
    console.log(id);
    setOpenConfirmationDialog(true);
  }
  const handleConfirmationDialogClose = () => {
    setOpenConfirmationDialog(false);
  }
  const handleConfirmDelete = async () => {
    console.log("Terminer");
    console.log(deletionId);
    setOpenConfirmationDialog(false);
    refresh();
    axios.delete(`/api/delete-contrat/${deletionId}`).then(res => {
      if (res.data.status === 200) {
        toast.success(res.data.message);
        // toast.success("res.data.message");
        setOpenConfirmationDialog(false);
        refresh();
      }
      else if (res.data.status === 404) {
        toast.error(res.data.message);
        refresh();
      }
    });
  }



  // ************* SHOW DATA FROM SERVER ***************//
  const refresh = () => {
    const fetchData = async () => {
      axios.get(`/api/display-contrat`).then(reponse => {
        if (reponse.data.status === 200) {
          // console.log(reponse.data.contrats)
          setContrat(reponse.data.contrats);
          // setLaoding(false);
        }
      });
    }
    fetchData()
  };
  // ************* SHOW DATA FROM SERVER ***************//

  // ************* PAGINATE ***************//
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 2; // Nombre d'éléments par page
  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = contrat.slice(indexOfFirstItem, indexOfLastItem);
  // ************* ENDING ***************//

  // ************* PAGINATION ***************//
  useEffect(() => {
    refresh();
  }, [currentPage]); // Rafraîchir lorsque la page change
  // ************* ENDING ***************//


  return (
    <>
      <motion.div className="containerContrat"
        // initial={{ width: 0 }}
        // animate={{ width: "100%" }}
        // exit={{ X: window.innerWidth }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >

        {/* <Section></Section> */}
        <h3>Liste des contrats</h3>
        <Cards />
        {/* <FontAwesomeIcon onClick={handleOpenPopup} icon={faFolderPlus} className="iconUpdate" /> <span />
          <FontAwesomeIcon onClick={handleOpenPopup} icon={faUserPlus} className="iconUpdate" /> <span /> */}

        <section className="main">
          <button onClick={handleOpenPopup} className='AddContrat' ><FontAwesomeIcon icon={faFolderPlus} className="iconAddC" /> Ajouter</button>
          <ModalAddContrat open={open} onClose={handleClosePopup} onSubmit={handleSubmitModal} handleClosePopup={handleClosePopup} refresh={refresh} />
          {
            currentItems.map((data, id) => (
              <div className="job_card" key={id}>
                <div className="job_details">
                  <div className="img">
                    <img className="imageContrat" src={`http://127.0.0.1:8000/${data.ImageP}`} alt="image" />
                  </div>
                  <div className="text">
                    <div className="nameP">{data.NameP}</div>
                    <span>Poste: {data.PosteP}</span><br />
                    <span>Date debut: {data.dateDebut}</span>
                  </div>
                </div>
                <div className="job_salary">
                  <div className="salaireP">Salaire: {data.salaire} Ariary</div>
                  <span>Date expiration: {data.dateExp}</span><br />
                  {/* <button className='updateContrat' onClick={() => UpdateMadalOpen(data.contrat_id)}>update</button><span>  </span> */}
                  {/* <button className='deleteContrat' onClick={() => handleDelete(data.contrat_id)}>delete</button> */}
                  <FontAwesomeIcon onClick={() => UpdateMadalOpen(data.contrat_id)} icon={faEdit} className="iconUpdate" /> <span />
                  <FontAwesomeIcon onClick={() => handleDelete(data.contrat_id)} icon={faTrash} className="iconDelete" />
                </div>
              </div>
            ))
          }
        </section>
        <div>

          {/* PAGINATION */}
          <div className="">
            <ReactPaginate
              previousLabel={"<< Précédent"}
              nextLabel={"Suivant >>"}
              pageCount={Math.ceil(contrat.length / itemsPerPage)}
              onPageChange={({ selected }) => setCurrentPage(selected)}
              containerClassName={"pagination"}
              pageLinkClassName="pagination__link"
              previousLinkClassName={"pagination__link"}
              nextLinkClassName={"pagination__link"}
              disabledClassName={"pagination__link--disabled"}
              previousClassName={currentPage === 0 ? "pagination__link--disabled pagination__link" : "pagination__link"}
              nextClassName={currentPage === Math.ceil(contrat.length / itemsPerPage) - 1 ? "pagination__link--disabled pagination__link" : "pagination__link"}
              activeLinkClassName="active"
            />
          </div>
        </div>

        {/* Coucou Fenetre ModaleUpdate */}
        <Dialog open={openUpdate} onClose={UpdateModalClose} fullWidth maxWidth="sm">
          <DialogTitle className="contentTitle">
            <Typography variant="h5" color="primary.main" className="colorTitle" > Modification du contrat</Typography>
            <IconButton onClick={UpdateModalClose} style={{ float: 'right' }}>
              <CloseIcon color="primary" />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Stack spacing={2} margin={2}>
              <div className="invisible">
                <TextField
                  type='number'
                  variant="outlined"
                  // label="Salaire"
                  name="id_player"
                  onChange={handleInput}
                  value={contratInput.id_player}
                  style={{ borderColor: 'purple' }}
                />
              </div>
              <TextField
                type='number'
                variant="outlined"
                // label="Salaire"
                name="salaire"
                onChange={handleInput}
                value={contratInput.salaire}
                style={{ borderColor: 'purple' }}
              />
              <TextField
                type='date'
                variant="outlined"
                name="dateDebut"
                onChange={handleInput}
                value={contratInput.dateDebut}
                style={{ borderColor: 'purple' }}

              />
              <TextField
                type='date'
                variant="outlined"
                name="dateExp"
                onChange={handleInput}
                value={contratInput.dateExp}
                style={{ borderColor: 'purple' }}

              />

              <Box mt={3} display="flex" >
                <Button
                  className="ajouterPlayer"
                  variant="contained"
                  color="primary"
                  size="medium"
                  endIcon={<CheckCircle />}
                  fullWidth
                  onClick={submitPlayerUpate}
                >
                  Modification
                </Button>
                <NavLink
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
                    onClick={UpdateModalClose}
                  >
                    Annuler
                  </Button>
                </NavLink>
              </Box>
            </Stack>
          </DialogContent>
          <DialogActions>{/* Ajoutez des boutons d'actions ici si nécessaire */}</DialogActions>
        </Dialog>



        {/* Fenetre de comfirmation */}
        <Dialog
          open={openConfirmationDialog}
          onClose={handleConfirmationDialogClose}
        >
          <DialogTitle>Confirmation</DialogTitle>
          <DialogContent>
            Êtes-vous sûr de vouloir supprimer ce contrat ?
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

export default Contrat;