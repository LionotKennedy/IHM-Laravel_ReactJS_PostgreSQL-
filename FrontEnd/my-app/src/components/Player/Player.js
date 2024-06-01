import React, { useEffect, useState } from "react";
import { Button, Modal } from "@mui/material";
import ModalAdd from "../Modal/ModalAdd";
import axios from "axios";
import "./player.css";
import { motion } from "framer-motion";

// **************teste****************//
import {
  // Button,
  Card,
  CardContent,
  TextField,
  Box,
  Container,
  Input,
  FormControl,
  FormLabel,
  // FormHelperText,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
} from "@mui/material";
import { CheckCircle, Clear } from "@mui/icons-material";
import { NavLink } from "react-router-dom";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  faSearch,
  faTrash,
  faEdit,
  faUserPlus,
  faArrowUpLong,
} from "@fortawesome/free-solid-svg-icons";

// ***************Ending*****************//

const Player = () => {
  // ********** start ***********//

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
  const [player, setPlayer] = useState([]);
  const [laoding, setLaoding] = useState([]);

  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [deletionId, setDeletionId] = useState(null);
  const [updateId, setUpdateId] = useState(null);
  const [formError, setFormError] = useState("");
  const [search, setSearch] = useState([]);
  const [searchs, setSearchs] = useState("");

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
    // setFormError("");
  };

  // Anothers
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Anothers Select data to make update
  var poste = "";
  const handleOpenModalUpdate = async (id) => {
    setUpdateId(id);
    setIsModalOpenUpdate(true);
    var ID = id;
    console.log(ID);
    axios.get(`/api/edit-player/${ID}`).then((res) => {
      if (res.data.status === 200) {
        poste = res.data.message.PosteP;
        // console.log(res.data.message);
        // console.log(poste);

        setMaterielInput(res.data.message);

        if ((poste = "Attaquant")) {
          // console.log("Attaquant");
        } else if ((poste = "Centre")) {
          // console.log("Centre");
        } else if ((poste = "Defence")) {
          // console.log("Defence");
        } else if ((poste = "Gardient")) {
          // console.log("Gardient");
        }
      }
    });
  };

  const handleCloseModalUpdate = () => {
    setIsModalOpenUpdate(false);
  };

  // ************* SHOW DATA FROM SERVER ***************//
  const refresh = () => {
    const fetchData = async () => {
      axios.get(`/api/display-player`).then((reponse) => {
        if (reponse.data.status === 200) {
          // console.log(reponse.data.player)
          // setUpdate(reponse.data.player);
          setSearch(reponse.data.player);
          setPlayer(reponse.data.player);
          setLaoding(false);
        }
      });
    };
    fetchData();
  };

  useEffect(() => {
    const fetchData = async () => {
      axios.get(`/api/display-player`).then((reponse) => {
        if (reponse.data.status === 200) {
          setPlayer(reponse.data.player);
          setSearch(reponse.data.player);
          setLaoding(false);
        }
      });
    };
    fetchData();
  }, []);

  var Display_player = "";
  var ButtonValider = "";
  if (laoding) {
    return <h1>Chargement...</h1>;
  } else {
    Display_player = search
      .filter((item) => {
        return searchs.toLowerCase() === ""
          ? item
          : item.NameP.toLowerCase().includes(searchs);
      })
      .map((item, id) => {
        return (
          <tr key={item.id}>
            <td className="trs ptt">{item.id}</td>
            <td className="trs ptt">
              <img
                className="imagePlayer"
                src={`http://127.0.0.1:8000/${item.ImageP}`}
                alt="image"
              />
            </td>
            <td className="trs ptt">{item.NameP}</td>
            <td className="trs ptt">{item.PaysP}</td>
            <td className="trs ptt">{item.AgeP}</td>
            <td className="trs ptt">{item.PosteP}</td>
            <td className="trs ptt">{item.NombreP1}</td>
            <td className="trs ptt">{item.NombreP2}</td>
            <td className="trs ptt">{item.NombreP3}</td>
            <td className="trs ptt">
              {/* <button>View</button> */}
              {/* <button
              className="btnt"
              onClick={() => handleOpenModalUpdate(item.id)}
              >
              Update
              </button>
              <span> </span>
              <button className="btntd" onClick={() => handleDelete(item.id)}>
              Delete
            </button> */}
              <FontAwesomeIcon
                onClick={() => handleOpenModalUpdate(item.id)}
                icon={faEdit}
                className="iconUpdateP"
              />{" "}
              <span />
            </td>
            <td className="trs ptt">
              <FontAwesomeIcon
                onClick={() => handleDelete(item.id)}
                icon={faTrash}
                className="iconDeleteP"
              />
            </td>
          </tr>
        );
      });
  }

  // ************* UPDATE DATA FROM SERVER ***************//
  const submitPlayerUpate = (e) => {
    e.preventDefault();
    setMaterielInput({
      ...materielInput,
      error_list: {},
    });
    setFormError("");
    console.log("Update");
    // console.log(id)
    console.log(updateId);
    const errors = {};
    if (materielInput.NameP === "") {
      errors.NameP = "Type de matériel est requis";
    }
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

      axios
        .post(`/api/update-player/${updateId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.data.status === 200) {
            // console.log(res.data.message);
            toast.success(res.data.message);
            setIsModalOpenUpdate(false);
            refresh();
          } else if (res.data.status === 404) {
            // console.log(res.data.errors);
            toast.error(res.data.errors);
            setIsModalOpenUpdate(false);
            refresh();
          } else if (res.data.status === 400) {
            // console.log(res.data.message);
            toast.error(res.data.message);
            setIsModalOpenUpdate(false);
            refresh();
          }
        });
    }
  };

  // ************* DELETE DATA FROM SERVER ***************//
  const handleDelete = (id) => {
    setDeletionId(id);
    console.log(id);
    setOpenConfirmationDialog(true);
    // refresh();
  };
  const handleConfirmationDialogClose = () => {
    setOpenConfirmationDialog(false);
    refresh();
  };
  const handleConfirmDelete = async () => {
    // console.log("Terminer");
    console.log(deletionId);
    axios.delete(`/api/delete-player/${deletionId}`).then((res) => {
      if (res.data.status === 200) {
        toast.success(res.data.message);
        setOpenConfirmationDialog(false);
        refresh();
      } else if (res.data.status === 404) {
        toast.error(res.data.message);
        refresh();
      }
    });
  };
  // ********** end ************//

  return (
    <>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        exit={{ X: window.innerWidth }}

        // initial={{ opacity: 0 }}
        // animate={{ opacity: 1 }}
        // exit={{ opacity: 0 }}
      >
        <h3>Liste des joueurs</h3>
        <Modal open={isModalOpen} onClose={handleCloseModal}>
          <ModalAdd
            onClose={handleCloseModal}
            handleCloseModal={handleCloseModal}
            refresh={refresh}
          />
        </Modal>
        <div>
          <main className="tables mains" id="customers_table">
            <section className="table__headers">
              {/* <button className="btnta" onClick={handleOpenModal}>
              Ajouter
            </button> */}
              <FontAwesomeIcon
                onClick={handleOpenModal}
                icon={faUserPlus}
                className="iconAddP"
              />

              <div className="input-groupPlayer">
                <FontAwesomeIcon icon={faSearch} className="iconP" />
                <input
                  className="inputs"
                  type="text"
                  placeholder="Recherche..."
                  // onChange={Filter}
                  onChange={(e) => setSearchs(e.target.value)}
                />
              </div>

              <div className="export__file">
                <label
                  htmlFor="export-file"
                  className="export__file-btn labels"
                  title="Export File"
                ></label>
                <input className="inputs" type="checkbox" id="export-file" />
                <div className="export__file-options">
                  <label className="labels">Export As &nbsp; &#10140;</label>
                  <label className="labels" htmlFor="export-file" id="toPDF">
                    PDF <img className="imgs" src="" alt="" />
                  </label>
                  <label className="labels" htmlFor="export-file" id="toJSON">
                    JSON <img className="imgs" src="" alt="" />
                  </label>
                  <label className="labels" htmlFor="export-file" id="toCSV">
                    CSV <img className="imgs" src="" alt="" />
                  </label>
                  <label className="labels" htmlFor="export-file" id="toEXCEL">
                    EXCEL <img className="imgs" src="" alt="" />
                  </label>
                </div>
              </div>
            </section>
            {/* <div> */}
            <section className="table__bodys">
              <table className="tables">
                <thead className="theads">
                  <tr className="trs">
                    <th className="ths">
                      {" "}
                      ID{" "}
                      <span className="icon-arrow spans">
                        <FontAwesomeIcon
                          icon={faArrowUpLong}
                          className="iconPd"
                        />
                      </span>
                    </th>
                    <th className="ths">
                      {" "}
                      Profile{" "}
                      <span className="icon-arrow spans">
                        <FontAwesomeIcon
                          icon={faArrowUpLong}
                          className="iconPd"
                        />
                      </span>
                    </th>
                    <th className="ths">
                      {" "}
                      Nom{" "}
                      <span className="icon-arrow spans">
                        <FontAwesomeIcon
                          icon={faArrowUpLong}
                          className="iconPd"
                        />
                      </span>
                    </th>
                    <th className="ths">
                      {" "}
                      Pays{" "}
                      <span className="icon-arrow spans">
                        <FontAwesomeIcon
                          icon={faArrowUpLong}
                          className="iconPd"
                        />
                      </span>
                    </th>
                    <th className="ths">
                      {" "}
                      Age{" "}
                      <span className="icon-arrow spans">
                        <FontAwesomeIcon
                          icon={faArrowUpLong}
                          className="iconPd"
                        />
                      </span>
                    </th>
                    <th className="ths">
                      {" "}
                      Poste{" "}
                      <span className="icon-arrow spans">
                        <FontAwesomeIcon
                          icon={faArrowUpLong}
                          className="iconPd"
                        />
                      </span>
                    </th>
                    <th className="ths">
                      {" "}
                      But{" "}
                      <span className="icon-arrow spans">
                        <FontAwesomeIcon
                          icon={faArrowUpLong}
                          className="iconPd"
                        />
                      </span>
                    </th>
                    <th className="ths">
                      {" "}
                      Tire{" "}
                      <span className="icon-arrow spans">
                        <FontAwesomeIcon
                          icon={faArrowUpLong}
                          className="iconPd"
                        />
                      </span>
                    </th>
                    <th className="ths">
                      {" "}
                      Passe{" "}
                      <span className="icon-arrow spans">
                        <FontAwesomeIcon
                          icon={faArrowUpLong}
                          className="iconPd"
                        />
                      </span>
                    </th>

                    <th className="ths">
                      {/* <span className="icon-arrow spans"></span> */}
                    </th>
                    <th className="ths">
                      {/* <span className="icon-arrow spans"></span> */}
                    </th>
                  </tr>
                </thead>
                <tbody className="tbodys">{Display_player}</tbody>
              </table>
            </section>
          </main>
        </div>

        <Modal open={isModalOpenUpdate} onClose={handleCloseModalUpdate}>
          <Container
            maxWidth="sm"
            open={isModalOpen}
            onClose={handleCloseModal}
          >
            <Box my={5}>
              <Card>
                <CardContent>
                  <Typography
                    variant="h5"
                    color="primary.main"
                    className="colorTitle"
                  >
                    Modification de joueur
                  </Typography>
                  <form
                    onSubmit={submitPlayerUpate}
                    encType="multipart/form-data"
                  >
                    {formError && (
                      <Box mt={3} mb={3} color="error.main">
                        {formError}
                      </Box>
                    )}
                    <Box mt={3}>
                      <TextField
                        type="text"
                        name="NameP"
                        fullWidth
                        variant="outlined"
                        label="Nom du joueur"
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
                        label="Nombre de but"
                        onChange={handleInput}
                        value={materielInput.NombreP1}
                      />
                      <TextField
                        type="number"
                        name="NombreP2"
                        fullWidth
                        variant="outlined"
                        label="Nombre de tire"
                        onChange={handleInput}
                        value={materielInput.NombreP2}
                      />
                      <TextField
                        type="number"
                        name="NombreP3"
                        fullWidth
                        variant="outlined"
                        label="Nombre de passe"
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
                    </Box>
                    <Box mt={1}>
                      <FormControl fullWidth sx={{ marginBottom: 0 }}>
                        <FormLabel htmlFor="image_materiel_url">
                          Profile du joueur
                        </FormLabel>
                        <Input
                          type="file"
                          name="ImageP"
                          onChange={handleImageInput}
                          sx={{ marginTop: 1 }}
                        />
                        <img
                          className="imagePlayer"
                          src={`http://127.0.0.1:8000/${materielInput.ImageP}`}
                          alt="image"
                        ></img>
                      </FormControl>
                    </Box>
                    <Box mt={3} display="flex">
                      <Button
                        type="submit"
                        className="UpdatePlayer"
                        variant="contained"
                        color="primary"
                        size="medium"
                        endIcon={<CheckCircle />}
                        fullWidth
                        // onClick={submitPlayerUpate}
                      >
                        Modification
                      </Button>
                      {ButtonValider}

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
            Êtes-vous sûr de vouloir supprimer ce joueur ?
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

        {/* <Teste></Teste> */}
        <ToastContainer position="top-center" theme="dark" transition={Zoom} />
      </motion.div>
    </>
  );
};

export default Player;
