import { Box, Modal } from "@mui/material";
import React from "react";
import CustomButton from "../../../Core-Components/Button";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #c6c6c6",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function DeleteCard({ open, onClose,handleDeleteItem }) {
    
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style, width: 400 }}>
        <h4 id="parent-modal-title"></h4>
        <p id="parent-modal-description" style={{ fontSize: "17px" }}>
          
        </p>
        <div className="d-flex justify-content-end align-items-center gap-3">
          <CustomButton
            sx={{ padding: "3px 10px", backgroundColor: "#daaa11" }}
            onClick={onClose}
          >
            Cancel
          </CustomButton>
          <CustomButton
            sx={{ padding: "3px 10px", backgroundColor: "#b60000" }}
            onClick={handleDeleteItem}
          >
            Delete
          </CustomButton>
        </div>
      </Box>
    </Modal>
  );
}

export default DeleteCard;
