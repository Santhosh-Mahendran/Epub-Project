import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { FormControlLabel, Switch, Tooltip } from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import InputAdornment from "@mui/material/InputAdornment";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import CustomButton from "../Core-Components/Button";
import { Autocomplete } from "@mui/material";
import { useLocation } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa";

function Register({ redirectTologin, handleReg }) {
  const location = useLocation();
  const [passwordVisible, setPasswordVisibile] = useState(false);
  const [passwordCVisible, setPasswordCVisibile] = useState(false);
  const { RegStatus, loading: pubRegLoad } = useSelector(
    (state) => state.PublisherReg
  );
  const { UserRegStatus, loading: UserRegLoad } = useSelector(
    (state) => state.ReaderReg
  );
  const [is_Institution, setIs_Institution] = useState(false);
  const handleToggle = (event) => {
    setIs_Institution(event.target.checked);
  };
  const initialState = {
    userName: "",
    email: "",
    phoneNum: "",
    city: "",
    password: "",
    repassword: "",
  };

  const passwordsyntax = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
  const validation = Yup.object().shape({
    userName: Yup.string()
      .min(6, "Username must have atleast 6 characters")
      .required("*this field is required"),
    email: Yup.string()
      .email("Invalid email")
      .required("this field is required"),
    password: Yup.string()
      .min(6, "password must have atleast 6 characters")
      .matches(passwordsyntax, "create a strong password")
      .required("*this field is required"),
    repassword: Yup.string()
      .oneOf(
        [Yup.ref("password"), null],
        "confirm password and password are not matching"
      )
      .required("*this field is required"),
    phoneNum: Yup.string()
      .matches(/^\d{10}$/, "Invalid phone number")
      .required("*this field is required"),
    city: Yup.string().required("*this field is required"),
  });

  const handleRegister = ({ values, resetForm }) => {
    const payload = {
      name: values.userName,
      email: values.email,
      password: values.password,
      phone: Number(values.phoneNum),
      address: values.city,
      geo_location: "Thanjavur",
      is_institution: is_Institution,
    };
    handleReg({ ...payload, onSuccess: resetForm });
  };

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: validation,
    onSubmit: (values, { resetForm }) => {
      handleRegister({values, resetForm});
    },
  });

  useEffect(() => {
    if (RegStatus || UserRegStatus) {
      redirectTologin();
    } else {
      return;
    }
  }, [RegStatus, UserRegStatus]);

  return (
    <>
      <h3 className="auth-title mt-3 mb-1">CREATE AN ACCOUNT</h3>
      <div className="login-form">
        <form className="form" onSubmit={formik.handleSubmit}>
          <div className="row">
            <div className="my-2 col-lg-6 col-md-6 col-sm-12">
              <TextField
                fullWidth
                type="text"
                label="UserName"
                variant="outlined"
                className={`input mb-0 ${
                  formik.errors.userName && formik.touched.userName
                    ? "is-invalid"
                    : formik.touched.userName && !formik.errors.userName
                    ? "is-valid"
                    : ""
                }`}
                name="userName"
                value={formik.values.userName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                size="small"
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        style={{ cursor: "pointer" }}
                      >
                        <FaUser />
                      </InputAdornment>
                    ),
                  },
                }}
              />
              {formik.errors.userName && formik.touched.userName && (
                <p className="invalid-feedback m-0">{formik.errors.userName}</p>
              )}
            </div>
            <div className="my-2 col-lg-6 col-md-6 col-sm-12">
              <TextField
                fullWidth
                label="Phone Number"
                variant="outlined"
                name="phoneNum"
                className={`input mb-0 ${
                  formik.errors.phoneNum && formik.touched.phoneNum
                    ? "is-invalid"
                    : formik.touched.phoneNum && !formik.errors.phoneNum
                    ? "is-valid"
                    : ""
                }`}
                value={formik.values.phoneNum}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                size="small"
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        style={{ cursor: "pointer" }}
                      >
                        <FaPhoneAlt />
                      </InputAdornment>
                    ),
                  },
                }}
              />
              {formik.errors.phoneNum && formik.touched.phoneNum && (
                <p className="invalid-feedback m-0">{formik.errors.phoneNum}</p>
              )}
            </div>
          </div>
          <div className="my-2" style={{ width: "100%" }}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              variant="outlined"
              className={`input mb-0 ${
                formik.errors.email && formik.touched.email
                  ? "is-invalid"
                  : formik.touched.email && !formik.errors.email
                  ? "is-valid"
                  : ""
              }`}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              size="small"
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      style={{ cursor: "pointer" }}
                    >
                      <MdEmail />
                    </InputAdornment>
                  ),
                },
              }}
            />
            {formik.errors.email && formik.touched.email && (
              <p className="invalid-feedback m-0">{formik.errors.email}</p>
            )}
          </div>
          <div className="my-2" style={{ width: "100%" }}>
            <TextField
              fullWidth
              label="City"
              name="city"
              variant="outlined"
              className={`input mb-0 ${
                formik.errors.phoneNum && formik.touched.phoneNum
                  ? "is-invalid"
                  : formik.touched.phoneNum && !formik.errors.phoneNum
                  ? "is-valid"
                  : ""
              }`}
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              size="small"
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      style={{ cursor: "pointer" }}
                    >
                      <FaLocationDot />
                    </InputAdornment>
                  ),
                },
              }}
            />
            {formik.errors.city && formik.touched.city && (
              <p className="invalid-feedback m-0">{formik.errors.city}</p>
            )}
          </div>
          <div className="my-2" style={{ width: "100%" }}>
            <TextField
              fullWidth
              type={passwordVisible ? "text" : "password"}
              label="Password"
              name="password"
              variant="outlined"
              className={`input mb-0 ${
                formik.errors.password && formik.touched.password
                  ? "is-invalid"
                  : formik.touched.password && !formik.errors.password
                  ? "is-valid"
                  : ""
              }`}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              size="small"
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      style={{ cursor: "pointer" }}
                    >
                      {passwordVisible ? (
                        <FaEyeSlash
                          onClick={() => setPasswordVisibile(false)}
                        />
                      ) : (
                        <FaEye onClick={() => setPasswordVisibile(true)} />
                      )}
                    </InputAdornment>
                  ),
                },
              }}
            />
            {formik.errors.password && formik.touched.password && (
              <p className="invalid-feedback m-0">{formik.errors.password}</p>
            )}
          </div>
          <div className="my-2" style={{ width: "100%" }}>
            <TextField
              fullWidth
              type={passwordCVisible ? "text" : "password"}
              label="Re-Enter Password"
              variant="outlined"
              className={`input mb-0 ${
                formik.errors.repassword && formik.touched.repassword
                  ? "is-invalid"
                  : formik.touched.repassword && !formik.errors.repassword
                  ? "is-valid"
                  : ""
              }`}
              name="repassword"
              value={formik.values.repassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              size="small"
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      style={{ cursor: "pointer" }}
                    >
                      {passwordCVisible ? (
                        <FaEyeSlash
                          onClick={() => setPasswordCVisibile(false)}
                        />
                      ) : (
                        <FaEye onClick={() => setPasswordCVisibile(true)} />
                      )}
                    </InputAdornment>
                  ),
                },
              }}
            />
            {formik.errors.repassword && formik.touched.repassword && (
              <p className="invalid-feedback m-0">{formik.errors.repassword}</p>
            )}
          </div>
          {location.pathname.startsWith("/auth/publisher") && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                marginBottom: "8px",
              }}
            >
              <FormControlLabel
                value="end"
                control={
                  <Switch
                    color="primary"
                    checked={is_Institution}
                    onChange={handleToggle}
                  />
                }
                label="Educational Institution *"
                labelPlacement="end"
                style={{ marginRight: 8 }}
              />
              <Tooltip
                title={
                  <span style={{ fontSize: "14px", lineHeight: "1.5" }}>
                    Enable this option if you are a school, college, or other
                    educational institution. Your books will not appear on the
                    public marketplace and will be accessible only to selected
                    readers you specify.
                  </span>
                }
                placement="right"
                arrow
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    color: "#1976d2",
                  }}
                >
                  <FaInfoCircle size={16} />
                </span>
              </Tooltip>
            </div>
          )}

          <CustomButton
            type="submit"
            className="w-100 button my-1"
            loading={pubRegLoad || UserRegLoad ? true : false}
          >
            SIGN UP
          </CustomButton>
        </form>
        <p
          className="or my-0"
          style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}
        >
          <span className="line" />
          OR
          <span className="line" />
        </p>
        <div className="p-text">
          <p>
            <FcGoogle className="google mx-1" />
            Sign Up with Google
          </p>
          <p>
            Already have an Account?
            <span className="navigationLink" onClick={redirectTologin}>
              Login
            </span>
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;
