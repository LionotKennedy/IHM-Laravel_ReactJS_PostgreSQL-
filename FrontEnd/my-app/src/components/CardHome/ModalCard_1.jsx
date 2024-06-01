import React from 'react'
import { Container, CardContent, Typography, Card, Button, Box } from '@mui/material';
import { CheckCircle } from "@mui/icons-material";
// import CloseIcon from '@mui/icons-material/Close';
const ModalCard_1 = (open, onClose, handleClosePopup, isModalOpen, handleCloseModal) => {

  return (
    <>
      <Container maxWidth="sm" open={isModalOpen} onClose={handleCloseModal}>
        <Box my={30}>
          <Card>
            <CardContent>
              <Typography variant="h5" color="primary.main" className="colorTitle" > Infos</Typography>
              <Typography variant="p" color=""
              >Lorem ipsum dolor sit, amet
                consectetur adipisicing elit. Quo quis
                fugit nisi facilis quibusdam eveniet.
              </Typography>
              <Box mt={20}>
              </Box>
              <Button
                type="button"
                variant="contained"
                color="primary"
                size="medium"
                className="ajouterPlayer"
                endIcon={<CheckCircle />}
                fullWidth
                style={{ marginLeft: "10px" }}
                onClick={handleCloseModal}
              >
                OK
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </>
  )
}

export default ModalCard_1
