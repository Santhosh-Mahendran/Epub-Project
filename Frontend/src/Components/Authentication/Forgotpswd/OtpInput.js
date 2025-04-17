import React, { useEffect, useRef, useState } from "react";
import { InputOtp } from "primereact/inputotp";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-blue/theme.css";

function OtpInput({ setOtp }) {
  const [otpValue, setOtpValue] = useState(new Array(4).fill(""));

  const inputref = useRef([]);
  useEffect(() => {
    if (inputref.current[0]) {
      inputref.current[0].focus();
    }
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otpValue];
    //allow only one input
    newOtp[index] = value.substring(value.length - 1);
    setOtpValue(newOtp);

    //combine Otp
    const CombineOtp = newOtp.join("");
    setOtp(CombineOtp);

    //move the cursor to next field if current field is filled
    if (value && index < 3 && inputref.current[index + 1]) {
      inputref.current[index + 1].focus();
    }
  };

  const handleClick = (index) => {
    inputref.current[index].setSelectionRange(1, 1);
    //focus empty field
    if (index > 0 && !otpValue[index - 1]) {
      inputref.current[otpValue.indexOf("")].focus();
    }
  };
  const handleKeyDown = (e, index) => {
    if (
      e.key === "Backspace" &&
      !otpValue[index] &&
      index > 0 &&
      inputref.current[index - 1]
    ) {
      //moving focus to previous field
      inputref.current[index - 1].focus();
    }
  };
  return (
    <div className="text-center">
      {/* <InputOtp value={otpValue} onChange={(e) => setOtpValue(e.value)} /> */}
      {otpValue.map((value, index) => (
        <input
          key={index}
          ref={(input) => (inputref.current[index] = input)}
          type="text"
          className="otpField"
          value={value}
          onChange={(e) => handleChange(e, index)}
          onClick={() => handleClick(index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
        />
      ))}
    </div>
  );
}

export default OtpInput;
