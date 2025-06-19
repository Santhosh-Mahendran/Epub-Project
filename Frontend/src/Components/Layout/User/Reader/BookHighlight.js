import React from "react";
import CustomDrawer from "../../../Core-Components/CustomDrawer";
import { Card, Typography } from "@mui/material";

function BookHighlights({
  hLSlideOpen,
  setHLSlideOpen,
  allHighlight,
  setLocation,
}) {
  return (
    <CustomDrawer
      open={hLSlideOpen}
      handleClose={() => setHLSlideOpen(false)}
      title="Highlights"
    >
      <div className="p-2 d-flex flex-column" style={{ rowGap: "10px" }}>
        {allHighlight.length > 0 ? (
          allHighlight?.map((highlight) => (
            <>
              <Card
                key={highlight.id}
                className="px-3 py-2"
                style={{ backgroundColor: "#ececec", color: "black" }}
              >
                <Typography>
                  {highlight?.text?.length > 30
                    ? highlight?.text?.split(" ").slice(0, 12).join(" ") + "..."
                    : highlight?.text}
                </Typography>
                <div
                  style={{ float: "right" }}
                  className="linktoHl"
                  onClick={() => {
                    setLocation(highlight?.highlight_range);
                    setHLSlideOpen(false);
                  }}
                >
                  Go
                </div>
              </Card>
            </>
          ))
        ) : (
          <div>
            <p>No Highlights</p>
          </div>
        )}
      </div>
    </CustomDrawer>
  );
}

export default BookHighlights;
