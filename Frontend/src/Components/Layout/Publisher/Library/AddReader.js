// import { Box, Modal } from "@mui/material";
// import React from "react";
// import CustomButton from "../../../Core-Components/Button";

// function AddReader({ handleAddReaderClose, addReaderOpen }) {
//   return (
//     <Modal
//       open={addReaderOpen}
//       onClose={handleAddReaderClose}
//       aria-labelledby="child-modal-title"
//       aria-describedby="child-modal-description"
//     >
//       <Box sx={{ width: 200 }}>
//         <h2 id="child-modal-title">Text in a child modal</h2>
//         <p id="child-modal-description">
//           Lorem ipsum, dolor sit amet consectetur adipisicing elit.
//         </p>
//         <CustomButton onClick={handleAddReaderClose}>
//           Close Child Modal
//         </CustomButton>
//       </Box>
//     </Modal>
//   );
// }

// export default AddReader;

import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import CustomButton from "../../../Core-Components/Button";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Add_Cat_Request } from "../../../../Redux/Action/PublisherAction/CategoryAction";
import { Add_Subsciber_Request } from "../../../../Redux/Action/PublisherAction/SubscriberAction";

function AddReader({ handleAddReaderClose, addReaderOpen, selectedCategory }) {
  const [readerEmail, setReaderEmail] = useState("");
  const dispatch = useDispatch();
  const handleAddCat = () => {
    dispatch(
      Add_Subsciber_Request({
        category_id: selectedCategory,
        reader_email: readerEmail,
      })
    );
    setReaderEmail("");
    handleAddReaderClose();
  };
  return (
    <Modal
      show={addReaderOpen}
      onHide={handleAddReaderClose}
      style={{ zIndex: "999999" }}
    >
      <Modal.Header closeButton>
        <Modal.Title style={{ color: "#4b4363" }}>Add Reader</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <TextField
          fullWidth
          label="Enter Reader Email"
          variant="outlined"
          className="input"
          value={readerEmail}
          onChange={(e) => setReaderEmail(e.target.value)}
          size="small"
        />
      </Modal.Body>
      <Modal.Footer>
        <CustomButton
          type="button"
          className="mx-2"
          sx={{
            backgroundColor: "#BA0E0E",
            padding: "6px 12px",
            fontSize: "14px",
          }}
          onClick={handleAddReaderClose}
        >
          Cancel
        </CustomButton>
        <CustomButton
          type="button"
          onClick={handleAddCat}
          sx={{
            backgroundColor: "#22B16A",
            padding: "6px 12px",
            fontSize: "14px",
          }}
          // loading={loading ? true : false}
        >
          Add Reader
        </CustomButton>
      </Modal.Footer>
    </Modal>
  );
}

export default AddReader;
