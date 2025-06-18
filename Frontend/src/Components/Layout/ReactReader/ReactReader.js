import React from "react";
import "./ReactReader.css";
import { ReactReader } from "react-reader";
import RestrictScreenshot from "./RestrictScreenshot";

function ReactEpubReader({
  epubFile,
  location,
  locationChanged,
  header,
  getRendition,
  hLSlideOpen,
  notesSlideOpen,
  CustomMenu,
  HighlightDrawer,
  NotesDrawer,
  epubInitOptions,
  Chatbot,
  reviewOpen,
}) {
  // RestrictScreenshot();
  return (
    <>
      <div
        className={`reader-container  ${
          hLSlideOpen || notesSlideOpen ? "drawer-open" : ""
        } `}
      >
        {header && header}
        <ReactReader
          url={epubFile}
          // url="/alice.epub"
          location={location}
          locationChanged={locationChanged}
          epubOptions={{
            allowPopups: true, // Adds `allow-popups` to sandbox-attribute
            allowScriptedContent: true, // Adds `allow-scripts` to sandbox-attribute
            allowLocalStorage: true,
            allowSameOrigin: true,
          }}
          epubInitOptions={epubInitOptions && epubInitOptions}
          getRendition={(rendition) => {
            if (rendition && getRendition) getRendition(rendition);
          }}
        />
        {Chatbot && Chatbot}
        {reviewOpen && reviewOpen}
        {CustomMenu && CustomMenu}
        {HighlightDrawer && HighlightDrawer}
        {NotesDrawer && NotesDrawer}
      </div>
    </>
  );
}

export default ReactEpubReader;
