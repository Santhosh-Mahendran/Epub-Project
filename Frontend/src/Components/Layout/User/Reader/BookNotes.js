import React from "react";
import CustomDrawer from "../../../Core-Components/CustomDrawer";
import { Card, Typography } from "@mui/material";

function BookNotes({
  notesSlideOpen,
  setNotesSlideOpen,
  setHLSlideOpen,
  NotesList,
  setLocation,
}) {
  return (
    <CustomDrawer
      open={notesSlideOpen}
      handleClose={() => setNotesSlideOpen(false)}
      title="Notes"
    >
      <div
        className="notes-container d-flex flex-column"
        style={{ height: "100%", gap: "15px", overflow: "hidden" }}
      >
        <div
          style={{
            overflowY: "auto",
            height: "85%",
          }}
        >
          <div className="p-2 d-flex flex-column" style={{ rowGap: "10px" }}>
            {NotesList.length > 0 ? (
              NotesList?.map((note) => (
                <>
                  <Card
                    key={note.id}
                    className="px-3 py-2"
                    style={{ backgroundColor: "#ececec", color: "black" }}
                  >
                    <Typography>
                      {note && note?.text?.length > 30
                        ? note?.text?.split(" ").slice(0, 12).join(" ") + "..."
                        : note?.text}
                    </Typography>
                    <div
                      style={{ float: "right" }}
                      className="linktoHl"
                      onClick={() => {
                        setLocation(note?.note_range);
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
                <p>No Notes</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </CustomDrawer>
  );
}

export default BookNotes;
