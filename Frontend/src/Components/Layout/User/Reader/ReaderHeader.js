import { IconButton, Tooltip } from "@mui/material";
import { BsJournalBookmark } from "react-icons/bs";
import { LuNotebookPen } from "react-icons/lu";
import { PiSpeakerHighLight } from "react-icons/pi";
import { BsHighlighter } from "react-icons/bs";
import { VscMute } from "react-icons/vsc";
import { IoExitOutline } from "react-icons/io5";
import { CiStar } from "react-icons/ci";

function ReaderHeader({
  BookMarkActive,
  handleBookmark,
  isReading,
  stopReading,
  startReading,
  setHLSlideOpen,
  hLSlideOpen,
  setNotesSlideOpen,
  notesSlideOpen,
  handleNav,
  handleReviewOpen,
}) {
  return (
    <div className="header-content">
      <Tooltip title="Leave a Rating">
        <IconButton onClick={handleReviewOpen}>
          <CiStar size={25} />
        </IconButton>
      </Tooltip>
      <Tooltip title={BookMarkActive ? "Remove BookMark" : "Add BookMark"}>
        <IconButton
          onClick={handleBookmark}
          className={`${BookMarkActive ? "active" : ""}`}
        >
          <BsJournalBookmark size={21} />
        </IconButton>
      </Tooltip>
      <Tooltip title={isReading ? "stopReading" : "startReading"}>
        <IconButton
          onClick={isReading ? stopReading : startReading}
          className={`${isReading ? "active" : ""}`}
        >
          {isReading ? <PiSpeakerHighLight size={23} /> : <VscMute size={23} />}
        </IconButton>
      </Tooltip>
      <Tooltip title="Highlights">
        <IconButton
          onClick={() => {
            setHLSlideOpen(!hLSlideOpen);
            setNotesSlideOpen(false);
          }}
          className={`${hLSlideOpen ? "active" : ""}`}
        >
          <BsHighlighter size={23} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Notes">
        <IconButton
          onClick={() => {
            setNotesSlideOpen(!notesSlideOpen);
            setHLSlideOpen(false);
          }}
          className={`${notesSlideOpen ? "active" : ""}`}
        >
          <LuNotebookPen size={23} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Exit">
        <IconButton onClick={handleNav}>
          <IoExitOutline size={25} />
        </IconButton>
      </Tooltip>
    </div>
  );
}

export default ReaderHeader;
