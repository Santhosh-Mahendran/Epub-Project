import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import CustomButton from "../../../Core-Components/Button";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Add_Cat_Request } from "../../../../Redux/Action/PublisherAction/CategoryAction";

function NewCategory({ handleCategoryClose, openAddCategory }) {
  const [catName, setCatName] = useState("");
  const [catDescription, setCatDescription] = useState("");
  const { loading , message } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const handleAddCat = () => {
    if (catName && catDescription) {
      dispatch(
        Add_Cat_Request({ category_name: catName, description: catDescription })
      );
    } else {
      alert("enter the Fields");
    }
    setCatName("");
    setCatDescription("");
  };
  useEffect(()=>{
    if(message){
    handleCategoryClose();

    }
  },[message])
  return (
    <Modal
      show={openAddCategory}
      onHide={handleCategoryClose}
      style={{ zIndex: "999999" }}
    >
      <Modal.Header closeButton>
        <Modal.Title style={{ color: "#4b4363" }}>Add new Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex flex-column gap-3">
          <TextField
            fullWidth
            label="Enter Category Name"
            variant="outlined"
            className="input"
            value={catName}
            onChange={(e) => setCatName(e.target.value)}
            size="medium"
          />
          <TextField
            fullWidth
            label="Enter Description"
            variant="outlined"
            className="input"
            value={catDescription}
            onChange={(e) => setCatDescription(e.target.value)}
            size="medium"
          />
        </div>
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
          onClick={handleCategoryClose}
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
          loading={loading ? true : false}
        >
          Add Category
        </CustomButton>
      </Modal.Footer>
    </Modal>
  );
}

export default NewCategory;
