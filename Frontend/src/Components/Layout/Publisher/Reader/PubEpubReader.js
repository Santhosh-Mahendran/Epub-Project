import React, { useEffect, useState } from "react";
import ReactEpubReader from "../../ReactReader/ReactReader";
import { useLocation, useNavigate } from "react-router-dom";
import { Base_Url } from "../../../../Environment/Base_Url";
import { IconButton, Tooltip } from "@mui/material";
import { IoExitOutline } from "react-icons/io5";
import "../../User/Reader/Reader.css";

function PubEpubReader() {
  const navigate = useNavigate();
  const location = useLocation();
  const [epubUrl, setEpubUrl] = useState(null);
  const [rendition, setRendition] = useState();
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

  const Header = () => {
    return (
      <div className="header-content">
        <Tooltip title="Exit">
          <IconButton
            onClick={() => {
              if (rendition) {
                try {
                  rendition.destroy?.();
                } catch (error) {
                  console.error("Error destroying rendition:", error);
                }
              }
              setTimeout(() => {
                setRendition(null);
              }, 100);
              setRendition(null);
              handleNav();
            }}
          >
            <IoExitOutline size={25} />
          </IconButton>
        </Tooltip>
      </div>
    );
  };

  return (
    <ReactEpubReader
      epubFile={epubUrl}
      getRendition={(rendition) => getRendition(rendition)}
      header={<Header />}
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
