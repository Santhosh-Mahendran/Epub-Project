import { Box, Button, Modal, Rating, Typography } from "@mui/material";
import { RxCross2 } from "react-icons/rx";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  boxShadow: 24,
  padding: "1.5rem",
  borderRadius: "1.6rem",
};

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}


function Review({ open, handleClose }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      BackdropProps={{
        style: {
          backgroundColor: "'color-mix(in srgb, #e9eaf2 30%, transparent)'",
        },
      }}
    >
      <Box sx={style}>
        <div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div role="button" onClick={handleClose} style={{color:"#4b4363"}}>
              Back
            </div>
            <div role="button" onClick={handleClose}>
              <RxCross2 />
            </div>
          </div>
          <div>
            <h2
              className="text-center"
              style={{ fontWeight: "700", fontSize: "20px", color: "#2a2b3f" }}
            >
              Your Rating For this Book?
            </h2>
            <p
              className="text-center "
              style={{ fontWeight: "600", fontSize: "1rem", color: "#2a2b3f" }}
            >
              Select Rating
            </p>
            <div className="text-center">
              <Rating
                name="size-large"
                defaultValue={2}
                size="large"
                sx={{
                  "& .MuiRating-icon": {
                    marginRight: "8px",
                    fontSize:"40px"
                  },
                }}
              />
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <Button sx={{backgroundColor:"#4b4363", color:"#fff"}}>Submit</Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
}

export default Review;
