import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

function MenuItems({ anchorEl, open, onClose, listdata }) {
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
    >
      {listdata?.map((data) => (
        <MenuItem key={data.label} onClick={data.handleClick}>{data.label}</MenuItem>
      ))}
    </Menu>
  );
}

export default MenuItems;
