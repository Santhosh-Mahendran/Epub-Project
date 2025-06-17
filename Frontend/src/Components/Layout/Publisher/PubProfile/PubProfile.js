import { Button, TextField } from "@mui/material";
import "./Style.css";

function PubProfile() {
  return (
    <div className="container">
      <div
        className="card shadow profile-container"
        style={{ padding: "20px", margin: "0 auto" }}
      >
        <h4 className="text-center">Personal Profile</h4>
        <form className="mt-2 d-flex flex-column gap-4">
          <div className="row" style={{ rowGap: "13px" }}>
            <div className="col-lg-6 col-md-6 col-sm-6">
              <TextField size="small" label="username" sx={{ width: "100%" }} />
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6">
              <TextField
                size="small"
                label="PhoneNumber"
                sx={{ width: "100%" }}
              />
            </div>
          </div>
          <div className="row" style={{ rowGap: "13px" }}>
            <div className="col-lg-6 col-md-6 col-sm-6">
              <TextField size="small" label="Email" sx={{ width: "100%" }} />
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6">
              <TextField size="small" label="City" sx={{ width: "100%" }} />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6">
              <TextField size="small" label="Password" sx={{ width: "100%" }} />
            </div>
          </div>
          <div className="row gap-3">
            <div className="col-12">
              <TextField
                size="small"
                label="Description"
                sx={{ width: "100%" }}
                multiline
                rows={2}
              />
            </div>
            <div className="col-12">
              <TextField
                size="small"
                label="About Us"
                sx={{ width: "100%" }}
                multiline
                rows={5}
              />
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <Button sx={{ backgroundColor: "green", color: "#fff" }}>
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PubProfile;
