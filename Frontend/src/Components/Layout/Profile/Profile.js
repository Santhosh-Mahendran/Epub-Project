import React, { useState } from "react";
import { RxAvatar } from "react-icons/rx";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { Drawer, TextField } from "@mui/material";
import CustomButton from "../../Core-Components/Button";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";

function Profile({ openProfileDetails, handleClose }) {
  const [editProfile, setEditProfile] = useState(false);
  const [fullName, setFullName] = useState("abcdeffgh");
  const [showPassword, setShowPassword] = useState(false);

  const handleEdit = () => {
    setEditProfile(true);
  };

  return (
    <Drawer open={openProfileDetails} onClose={handleClose} anchor="right">
      <div style={{ padding: "20px", width: "300px" }}>
        <h4 className="text-center mb-0">User Profile</h4>
        <div className="text-center mt-3 mb-2">
          <RxAvatar style={{ width: "70px", height: "70px", color: "gray" }} />
          <br />
        </div>
        <div className="text-center">
          <h6 className="text-center mb-1" style={{ fontSize: "22px" }}>
            {fullName}
          </h6>
          <p className="mb-2">abcdefgh@gmail.com</p>

          <div className="text-center mt-2">
            <div className="my-4">
              <TextField
                className="input"
                id="standard-basic"
                label="Full Name"
                variant="standard"
                value="abcdefgh sdfsd"
                InputProps={{
                  endAdornment: (
                    <FaUser className="me-2" style={{ cursor: "pointer" }} />
                  ),
                }}
              />
            </div>
            <div className="my-4">
              <TextField
                className="input"
                id="standard-basic"
                label="Mobile Number"
                variant="standard"
                value="1234567890"
                InputProps={{
                  endAdornment: (
                    <FaPhoneAlt
                      className="me-2"
                      style={{ cursor: "pointer" }}
                    />
                  ),
                }}
              />
            </div>
            <div className="my-4">
              <TextField
                className="input"
                id="standard-basic"
                label="city"
                variant="standard"
                value="Thanjavur"
                InputProps={{
                  endAdornment: (
                    <FaLocationDot
                      className="me-2"
                      style={{ cursor: "pointer" }}
                    />
                  ),
                }}
              />
            </div>
            {/* <div className="my-4">
              <TextField
                className="input"
                id="standard-basic"
                label="Password"
                variant="standard"
                type="password"
                value="sugi@02"
                InputProps={{
                  endAdornment: (
                    <div
                      className="me-2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <IoEyeOffOutline
                          style={{ fontSize: "20px", cursor: "pointer" }}
                        />
                      ) : (
                        <IoEyeOutline
                          style={{ fontSize: "20px", cursor: "pointer" }}
                        />
                      )}
                    </div>
                  ),
                }}
              />
            </div> */}

            <div className="d-flex justify-content-end my-4 gap-2">
              <CustomButton
                sx={{
                  backgroundColor: "#BA0E0E",
                  padding: "2px 8px",
                  fontSize: "12px",
                }}
                onClick={handleClose}
              >
                Cancel
              </CustomButton>
              {editProfile ? (
                <CustomButton
                  sx={{
                    backgroundColor: "green",
                    padding: "2px 8px",
                    fontSize: "12px",
                  }}
                  onClick={handleClose}
                >
                  Save Changes
                </CustomButton>
              ) : (
                <CustomButton
                  sx={{
                    backgroundColor: "#BA0E0E",
                    padding: "2px 6px",
                    fontSize: "12px",
                  }}
                  onClick={handleEdit}
                >
                  EDIT PROFILE
                </CustomButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
}

export default Profile;
