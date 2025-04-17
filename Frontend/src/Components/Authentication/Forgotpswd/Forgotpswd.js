import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import "../Auth.css";
import OtpInput from "./OtpInput";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../firebase/setup";
import { toast } from "react-toastify";

function Forgotpswd() {
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [sendOtp, setSendOtp] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisibile] = useState(false);
  const [newPswd, setNewPswd] = useState("");
  const [otp, setOtp] = useState("");
  const [ConfirmOtp, setConfirmOtp] = useState(null);
  const [resetPswd, setResetPswd] = useState(false);
  const navigate = useNavigate();

  const TextMessage = () => {
    if (sendOtp) {
      return "OTP was sent to Your Phone Number . Enter the code to reset Password";
    } else if (resetPswd) {
      return "Create New Password";
    } else {
      return "Enter your Phone Number to receive an OTP for password reset.";
    }
  };

  const FieldInput = () => {
    if (sendOtp) {
      return <OtpInput setOtp={setOtp} />;
    } else if (resetPswd) {
      return (
        <>
          <TextField
            fullWidth
            type={passwordVisible ? "text" : "password"}
            label="Enter New Password"
            variant="outlined"
            className="input mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            size="small"
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end" style={{ cursor: "pointer" }}>
                    {passwordVisible ? (
                      <FaEyeSlash onClick={() => setPasswordVisibile(false)} />
                    ) : (
                      <FaEye onClick={() => setPasswordVisibile(true)} />
                    )}
                  </InputAdornment>
                ),
              },
            }}
          />
          <TextField
            fullWidth
            type={passwordVisible ? "text" : "password"}
            label="Re-Enter New Password"
            variant="outlined"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            size="small"
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end" style={{ cursor: "pointer" }}>
                    {passwordVisible ? (
                      <FaEyeSlash onClick={() => setPasswordVisibile(false)} />
                    ) : (
                      <FaEye onClick={() => setPasswordVisibile(true)} />
                    )}
                  </InputAdornment>
                ),
              },
            }}
          />
        </>
      );
    } else {
      return (
        <TextField
          fullWidth
          label="Enter Your Phone Number"
          variant="outlined"
          className="input"
          value={phoneNum}
          onChange={(e) => setPhoneNum(e.target.value)}
          size="small"
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end" style={{ cursor: "pointer" }}>
                  {/* <MdEmail /> */}
                  <FaPhoneAlt />
                </InputAdornment>
              ),
            },
          }}
        />
      );
    }
  };

  const ButtonText = () => {
    if (sendOtp) {
      return "VERIFY OTP";
    } else if (resetPswd) {
      return "CREATE PASSWORD";
    } else {
      return "GET OTP";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sendOtp) {
      //Verify OTP
      try {
        ConfirmOtp.confirm("234567");
        setResetPswd(true);
        setSendOtp(false);
        toast.success("Otp Send Successfully");
      } catch (error) {
        console.log(error);
      }
    } else if (resetPswd) {
      //   return "CREATE PASSWORD";
    } else {
      try {
        console.log(phoneNum);

        const Recaptcha = new RecaptchaVerifier(auth, "recaptcha", {
          size: "invisible",
        });
        const confirmation = await signInWithPhoneNumber(
          auth,
          "+91 9345071095",
          Recaptcha
        );
        setConfirmOtp(confirmation);
        toast.success("Otp Send Successfully");
        setSendOtp(true);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="forgetpswd-container">
      <div className="Forget-password card shadow">
        <h3 className="auth-title align-self-center my-2">
          Change Your Password
        </h3>
        <p
          className="text-center my-1"
          style={{ color: "#72758f", fontSize: "17px" }}
        >
          {TextMessage()}
        </p>
        <div className="login-form">
          <form className="form mt-3">
            {FieldInput()}
            <div className="mt-4">
              <button
                type="button"
                className="btn w-100 button mb-2"
                onClick={handleSubmit}
              >
                {ButtonText()}
              </button>
              <div id="recaptcha" />
            </div>
          </form>

          <div className="p-text">
            <p className="text-start">
              Back to
              <span className="navigationLink" onClick={() => navigate("/")}>
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Forgotpswd;
