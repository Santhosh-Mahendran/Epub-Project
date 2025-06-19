import { Drawer } from "@mui/material";
import { RxCross2 } from "react-icons/rx";

function CustomDrawer({ open, handleClose, children, title, titleColor }) {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleClose}
      variant="persistent"
      PaperProps={{
        sx: {
          width: "25%",
          userSelect: "none",
          backgroundColor: "#fff",
          padding: "10px",
        },
      }}
    >
      <div className="card-header d-flex justify-content-between align-items-center px-2 py-3">
        <h4
          className="m-0"
          style={{
            color: titleColor ? titleColor : "#0382ff",
            fontSize: "24px",
          }}
        >
          {title.toUpperCase()}
        </h4>
        <div role="button" onClick={handleClose}>
          {" "}
          <RxCross2 size={20} className="me-1" style={{ color: titleColor ? titleColor : "#0382ff"}} />
        </div>
      </div>
      {children}
    </Drawer>
  );
}

export default CustomDrawer;
