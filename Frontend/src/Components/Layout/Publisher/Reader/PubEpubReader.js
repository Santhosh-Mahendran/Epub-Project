import React, { useEffect, useState } from "react";
import ReactEpubReader from "../../ReactReader/ReactReader";
import { useLocation, useNavigate } from "react-router-dom";
import { Base_Url } from "../../../../Environment/Base_Url";
// import Reader from "../../ReactReader/Reader";

function PubEpubReader() {
  const navigate = useNavigate();
  const location = useLocation();
  const [epubUrl, setEpubUrl] = useState(null);
  const token = localStorage.getItem("Publisher_Auth_Token");
  const FileName = location.state;
  const handleNav = () => {
    navigate("/publisher/dashboard/library");
  };
  useEffect(() => {
    const fetchEpubUrl = async () => {
      try {
        const streamUrl = `${Base_Url}/book/stream/${FileName}`;
        setEpubUrl(streamUrl);
      } catch (error) {
        console.error("Error fetching EPUB URL:", error);
      }
    };

    fetchEpubUrl();
  }, [FileName]);

  return (
    <ReactEpubReader
      // epubFile="https://react-reader.metabits.no/files/alice.epub"
      //  epubFile="/alice.epub"
      epubFile={epubUrl}
      handleNav={handleNav}
      role="publisher"
      epubInitOptions={{
        openAs: "epub",
        requestHeaders: {
          Authorization: ` Bearer ${token}`,
        },
      }}
    />
  );
}

export default PubEpubReader;
