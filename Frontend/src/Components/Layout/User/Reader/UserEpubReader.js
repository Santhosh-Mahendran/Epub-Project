import React, { useEffect, useState } from "react";
import ReactEpubReader from "../../ReactReader/ReactReader";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Get_highlight_Request,
  Get_Notes_Request,
  Get_progress_Request,
  Update_progress_Request,
} from "../../../../Redux/Action/UserAction/PreviewBookAction";
import { Button, Menu, MenuItem, TextField } from "@mui/material";
import { MdOutlineTranslate } from "react-icons/md";
import { GrNotes } from "react-icons/gr";
import {
  Add_highlight_Request,
  Add_Notes_Request,
} from "../../../../Redux/Action/UserAction/PreviewBookAction";
import ChatBot from "./ChatBot";
import ReaderHeader from "./ReaderHeader";
import BookHighlights from "./BookHighlight";
import BookNotes from "./BookNotes";
import "./Reader.css";
import { Base_Url } from "../../../../Environment/Base_Url";

function UserEpubReader() {
  const { Highlights, Notes, Progress } = useSelector(
    (state) => state.PreViewData
  );
  const [rendition, setRendition] = useState(null);
  const [firstRenderDone, setFirstRenderDone] = useState(false);
  const [currentProgress, setCurrentProgress] = useState();
  const [location, setLocation] = useState(Progress || 0);
  const [BookMarkActive, setBookMarkActive] = useState(false);
  const [percentage, setPercentage] = useState("");
  const [isReading, setIsReading] = useState(false);
  const [textToconvert, setTextToConvert] = useState(null);
  const [hLSlideOpen, setHLSlideOpen] = useState(false);
  const [notesSlideOpen, setNotesSlideOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(null);
  let speechSynthesis = window.speechSynthesis;
  const [anchorEl, setAnchorEl] = useState(null);
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });
  const [selectedText, setSelectedText] = useState(null);
  const [selectedCFI, setSelectedCFI] = useState(null);
  const [allHighlight, setAllHighLights] = useState([]);
  const [addNotesVis, setAddNotesVis] = useState(false);
  const [NotesContent, setNotesContent] = useState("");
  const [epubUrl, setEpubUrl] = useState(null);
  const token = localStorage.getItem("User_Auth_Token");
  const GetLoactionState = useLocation();
  const File = GetLoactionState?.state;

  const navigate = useNavigate();
  const handleNav = () => {
    navigate("/reader/dashboard/explore");
  };
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchEpubUrl = async () => {
      try {
        if (File) {
          const streamUrl = `${Base_Url}/book/stream/${File?.file_path}`;
          setEpubUrl(streamUrl);
        }
      } catch (error) {
        console.error("Error fetching EPUB URL:", error);
      }
    };

    fetchEpubUrl();
  }, [File?.epub_file]);

  useEffect(() => {
    setAllHighLights(Highlights);
  }, [Highlights]);

  useEffect(() => {
    setCurrentProgress(Progress);
  }, [Progress]);

  useEffect(() => {
    dispatch(Get_highlight_Request(File?.book_id));
    dispatch(Get_Notes_Request(File?.book_id));
    dispatch(Get_progress_Request(File?.book_id));
  }, []);

  // Load saved location on first render

  // useEffect(() => {
  //   if (currentProgress) {
  //     setLocation(currentProgress);
  //     setBookMarkActive(true);
  //     setCurrentPage(currentProgress);
  //   }
  //   setFirstRenderDone(true);
  // }, [currentProgress, Progress]);

  // useEffect(() => {
  //   if (currentProgress === currentPage) {
  //     setBookMarkActive(true);
  //   } else {
  //     setBookMarkActive(false);
  //   }
  // }, [location, currentProgress]);

  // Handle location change while reading
  const handlelocationChange = (epubcfi) => {
    // if (!firstRenderDone) return;
    setLocation(epubcfi);
    setCurrentPage(epubcfi);
  };

  //Restrict CustomMenu
  const handleContextMenu = (event) => {
    event.preventDefault();
    const existingMenu = document.getElementById("custom-context-menu");

    if (existingMenu) {
      existingMenu.remove();
    }
  };

  const handleRestrictCopy = (e) => {
    if (e.ctrlKey && (e.key === "c" || e.key === "x" || e.key === "a")) {
      e.preventDefault();
    }
  };

  //Rendition
  const getRendition = (rendition) => {
    if (rendition) {
      setRendition(rendition);
      rendition?.flow("paginated");
      rendition?.spread("always");

      rendition?.hooks.content.register((contents) => {
        const document = contents.window.document;
        if (document) {
          //Enable Scripts from Epub
          const scripts = document.querySelectorAll("script");
          scripts.forEach((script) => {
            const newScript = document.createElement("script");
            if (script.src.startsWith("blob:")) {
              fetch(script.src)
                .then((res) => res.text())
                .then((scriptText) => {
                  newScript.textContent = scriptText;
                  document.body.appendChild(newScript);
                })
                .catch((err) =>
                  console.error("Failed to load Blob script:", err)
                );
            } else {
              newScript.src = script.src;
              document.body.appendChild(newScript);
            }
          });

          const iframe = contents.window.frameElement;
          if (iframe) {
            iframe.setAttribute(
              "sandbox",
              "allow-scripts allow-same-origin allow-popups"
            );
          }

          //Custom ContextMenu
          document.addEventListener("contextmenu", handleContextMenu);

          // Block copy (Ctrl+C, Ctrl+X, Ctrl+A)
          document.addEventListener("keydown", handleRestrictCopy);

          //   FontAwesome Link
          let faScript = document.getElementById("fa-script");
          if (!faScript) {
            faScript = document.createElement("link");
            faScript.id = "fa-script";
            faScript.rel = "stylesheet";
            faScript.href =
              "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css";
            document.head.appendChild(faScript);
          }
        }
      });
    }
  };

  // Handle bookmarking
  const handleBookmark = () => {
    if (BookMarkActive) {
      setBookMarkActive(false);
      // localStorage.removeItem("persist-location");
    } else {
      if (currentPage && rendition.location) {
        // Get current position index
        const currentIndex = rendition.location.start.percentage;
        const percentage = Math.ceil((currentIndex * 100).toFixed(2));
        setPercentage(percentage);
        setBookMarkActive(true);
        dispatch(
          Update_progress_Request({
            book_id: File?.book_id,
            bookmark: currentPage,
            percentage: percentage,
          })
        );
      }
    }
  };

  //Audio Reading
  useEffect(() => {
    if (rendition) {
      rendition?.hooks.content.register((contents) => {
        const doc = contents.window.document;
        const text = doc.body.innerText;
        setTextToConvert(text);
      });
    }
  }, [rendition]);

  const startReading = () => {
    if (textToconvert) {
      let utterance = new SpeechSynthesisUtterance(textToconvert);

      // Track current word being spoken
      utterance.onboundary = (event) => {
        const wordStart = event.charIndex;
        const word = textToconvert.substring(wordStart).split(" ")[0];
        highlightWord(word);
      };

      speechSynthesis.speak(utterance);
      setIsReading(true);
    }
  };

  const stopReading = () => {
    speechSynthesis.cancel();
    setIsReading(false);
  };

  // Function to highlight the current Reading word
  const highlightWord = (word) => {
    if (!rendition || !word) return;

    try {
      // Find the word inside the EPUB
      if (rendition) {
        rendition?.hooks.content.register((contents) => {
          const doc = contents.window.document;
          const text = doc.body.innerText;
          // Find word position
          const wordIndex = text.indexOf(word);
          if (wordIndex === -1) return; // Word not found

          // Generate a rough CFI range (not 100% precise)
          const cfiRange =
            rendition?.location.start.cfi + `/text()[${wordIndex}]`;

          // Remove previous highlights
          rendition?.annotations.remove("highlight");

          // Add highlight
          rendition?.annotations.add(
            "highlight",
            cfiRange,
            {},
            () => console.log("Clicked highlight:", cfiRange),
            "my-class",
            { fill: "yellow" }
          );
        });
      }
    } catch (error) {}
  };

  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };

  //CustomMenu
  useEffect(() => {
    if (!rendition) return;

    rendition
      .display(currentProgress || 0)
      .then(() => rendition.book?.ready)
      .then(() => {
        if (rendition.book?.locations) {
          return rendition.book?.locations.generate();
        }
      })
      .then(() => {})
      .catch((err) => console.error("Error displaying EPUB:", err));

    const setRenderSelection = (cfiRange) => {
      if (rendition) {
        const text = rendition?.getRange(cfiRange).toString();
        setSelectedText(text);
        setSelectedCFI(cfiRange);

        // Get bounding box for position
        const range = rendition?.getRange(cfiRange);
        const rects = range.getClientRects();
        if (rects.length === 0) return;

        // Get the last rect (end of selection)
        const lastRect = rects[rects.length - 1];

        if (range) {
          // Get the iframe scroll position
          const iframe = document.querySelector("iframe");
          const iframeRect = iframe.getBoundingClientRect();
          const iframeWindow = iframe.contentWindow;

          // Adjust popup position relative to the document
          const top =
            lastRect.bottom + iframeRect.top + iframeWindow.scrollY + 5; // Slight offset below the text
          const left =
            lastRect.right + iframeRect.left + iframeWindow.scrollX + 5;
          setPopoverPosition({ top, left });
          setAnchorEl({
            top,
            left: left + 50,
          });
        }
      }
    };

    // Ensure "on" method exists before using it
    if (rendition.on) {
      rendition.on("selected", setRenderSelection);
    } else {
      console.warn("rendition.on is not available");
    }

    return () => {
      if (rendition?.off) {
        rendition.off("selected", setRenderSelection);
      } else {
        console.warn("rendition.off is not available");
      }
      if (rendition?.destroy) {
        rendition.destroy();
      }
    };
  }, [rendition]);

  //Hightlight Previous Highlights
  useEffect(() => {
    if (rendition && allHighlight?.length > 0) {
      allHighlight?.forEach((highlight) => {
        rendition?.annotations.add(
          "highlight",
          highlight.highlight_range,
          {},
          () => console.log("Clicked highlight:", highlight.cfiRange),
          "my-class",
          { fill: highlight.color }
        );
      });
    }
  }, [rendition, allHighlight]);

  useEffect(() => {
    setAllHighLights(Highlights);
  }, []);

  //highlightButton
  const handleHightlight = async (color) => {
    if (selectedCFI && rendition) {
      const newHighlight = {
        book_id: File?.book_id,
        text: selectedText,
        highlight_range: selectedCFI,
        color: color,
      };

      dispatch(Add_highlight_Request(newHighlight));

      rendition?.annotations.add(
        "highlight",
        selectedCFI,
        {},
        () => console.log("Clicked highlight:", selectedCFI),
        "my-class",
        { fill: color }
      );

      setSelectedText(null); // Clear selection
    }
    setAnchorEl(null);
    setSelectedText(null);
  };

  const [NotesList, setNoteList] = useState([]);

  useEffect(() => {
    setNoteList(Notes);
  }, [Notes]);

  const handleAddNotes = (e) => {
    e.preventDefault();
    if (NotesContent.trim() === "") return;
    const payload = {
      book_id: File?.book_id,
      text: NotesContent,
      note_range: selectedCFI,
    };

    dispatch(Add_Notes_Request(payload));

    setNotesContent("");
    setAddNotesVis(false);
  };

  const header = (
    <ReaderHeader
      BookMarkActive={BookMarkActive}
      handleBookmark={handleBookmark}
      isReading={isReading}
      stopReading={stopReading}
      startReading={startReading}
      setHLSlideOpen={setHLSlideOpen}
      hLSlideOpen={hLSlideOpen}
      setNotesSlideOpen={setNotesSlideOpen}
      notesSlideOpen={notesSlideOpen}
      rendition={rendition}
      setRendition={setRendition}
      setSelectedText={setSelectedText}
      setSelectedCFI={setSelectedCFI}
      setIsReading={setIsReading}
      setAnchorEl={setAnchorEl}
      handleNav={handleNav}
    />
  );

  const CustomMenu = (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      anchorReference="anchorPosition"
      anchorPosition={popoverPosition}
      // MenuListProps={{
      //   "aria-labelledby": "basic-button",
      // }}
    >
      <div style={{ width: "180px" }}>
        <div
          className="d-flex justify-content-between align-items-center g-3 px-2 mb-1"
          style={{ width: "100%" }}
        >
          {["#829dff", "#a68deb", "#ec7980", "#f7d755", "#76d45f"]?.map(
            (color, index) => (
              <div
                key={index}
                role="button"
                className="highlight-color"
                style={{ backgroundColor: color }}
                onClick={() => handleHightlight(color)}
              ></div>
            )
          )}
        </div>
        {addNotesVis ? (
          <div style={{ width: "180px", padding: "5px" }}>
            <form onSubmit={handleAddNotes}>
              <TextField
                id="standard-textarea"
                fullWidth
                placeholder="Add Notes..."
                multiline
                variant="standard"
                value={NotesContent}
                onChange={(e) => setNotesContent(e.target.value)}
              />
              <Button
                type="submit"
                className="my-2"
                sx={{ padding: "2px 8px", fontSize: "10px", float: "right" }}
              >
                Add Notes
              </Button>
            </form>
          </div>
        ) : (
          <>
            {" "}
            <MenuItem onClick={() => setAddNotesVis(true)}>
              <GrNotes className="me-2" size={14} />
              Notes
            </MenuItem>
            <MenuItem>
              <MdOutlineTranslate className="me-2" size={14} />
              Translate
            </MenuItem>
          </>
        )}
      </div>
    </Menu>
  );

  const HighlightDrawer = (
    <BookHighlights
      hLSlideOpen={hLSlideOpen}
      setHLSlideOpen={setHLSlideOpen}
      allHighlight={allHighlight}
      setLocation={setLocation}
    />
  );

  const NotesDrawer = (
    <BookNotes
      notesSlideOpen={notesSlideOpen}
      setNotesSlideOpen={setNotesSlideOpen}
      setHLSlideOpen={setHLSlideOpen}
      NotesList={NotesList}
      setLocation={setLocation}
    />
  );

  return (
    <ReactEpubReader
      epubFile={epubUrl}
      location={location}
      locationChanged={handlelocationChange}
      getRendition={(rendition) => getRendition(rendition)}
      epubInitOptions={{
        openAs: "epub",
        requestHeaders: {
          Authorization: ` Bearer ${token}`,
        },
      }}
      hLSlideOpen={hLSlideOpen}
      notesSlideOpen={notesSlideOpen}
      header={header}
      handleNav={handleNav}
      BookId={File?.book_id}
      Highlights={Highlights}
      Notes={Notes}
      CustomMenu={CustomMenu}
      HighlightDrawer={HighlightDrawer}
      NotesDrawer={NotesDrawer}
      Chatbot={<ChatBot bookId={File?.book_id} />}
    />
  );
}

export default UserEpubReader;
