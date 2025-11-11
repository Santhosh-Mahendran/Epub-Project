import { Box, Button, Modal, Rating, Typography } from "@mui/material";
import { useEffect } from "react";
import { RxCross2 } from "react-icons/rx";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  padding: "1.5rem",
  borderRadius: "1rem",
};

function Dictionary({ open, handleClose, selectedText }) {
  useEffect(() => {}, []);
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
            <div
              role="button"
              onClick={handleClose}
              style={{ color: "#4b4363" }}
            >
              Back
            </div>
            <div role="button" onClick={handleClose}>
              <RxCross2 />
            </div>
          </div>
          <div>
            <div>
              <p
                className="mb-0"
                style={{
                  color: "#2a2b3f",
                }}
              >
                selected Text :
              </p>
              <h2
                style={{
                  fontWeight: "700",
                  fontSize: "18px",
                  color: "#2a2b3f",
                }}
              >
                {selectedText}
              </h2>
            </div>
            <div>
              <p
                className="mb-0"
                style={{
                  color: "#2a2b3f",
                }}
              >
                Explanation :
              </p>
              <h2
                style={{
                  fontWeight: "700",
                  fontSize: "18px",
                  color: "#2a2b3f",
                }}
              >
                {selectedText}
              </h2>
            </div>
            <div>
              <p
                className="mb-0"
                style={{
                  color: "#2a2b3f",
                }}
              >
                Explanation in English :
              </p>
              <h2
                style={{
                  fontWeight: "700",
                  fontSize: "18px",
                  color: "#2a2b3f",
                }}
              >
                {selectedText}
              </h2>
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <Button
              sx={{ backgroundColor: "#c99e3aff", color: "#fff" }}
              onClick={handleClose}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
}

export default Dictionary;
