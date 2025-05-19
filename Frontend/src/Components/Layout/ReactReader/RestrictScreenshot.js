import { useEffect, useState } from "react";

const applyBlur = () => {
  document.documentElement.classList.add("screenshot-detected");
  const messageContainer = document.createElement("div");
  messageContainer.style.position = "fixed";
  messageContainer.style.top = "50%";
  messageContainer.style.left = "50%";
  messageContainer.style.transform = "translate(-50% , -50%)";
  messageContainer.style.backgroundColor = "white";
  messageContainer.style.color = "black";
  messageContainer.style.padding = "20px";
  messageContainer.style.borderRadius = "8px";
  messageContainer.style.zIndex = "10000";
  messageContainer.style.textAlign = "center";
  messageContainer.innerHTML = `<p className="mb-0">Screenshot Restricted</p>`;
  document.body.appendChild(messageContainer);
};

function RestrictScreenshot() {
  const [showWarning, setShowWarning] = useState(false);
  useEffect(() => {
    let isScreenshotDetected = false;
    const handleScreenshotDetection = () => {
      if (!isScreenshotDetected) {
        setShowWarning(true);
        document.documentElement.classList.add("screenshot-detected");
        isScreenshotDetected = true;
        applyBlur();
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === "PrintScreen" || e.key === "PrintScrn") {
        handleScreenshotDetection();
        // Attempt to overwrite clipboard (not reliable)
        navigator.clipboard.writeText("Screenshot blocked");
      }
    };

    const handleVisiblityChange = () => {
      if (document.visibilityState === "hidden") {
        handleScreenshotDetection();
      }
    };

    // window.addEventListener("blur", handleScreenshotDetection);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("visibilityChange", handleVisiblityChange);

    return () => {
      // window.removeEventListener("blur", handleScreenshotDetection);
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("visibilityChange", handleVisiblityChange);
    };
  }, []);
  return (
    <>
      {showWarning && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            color: "black",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "24px",
            zIndex: 10000,
          }}
        >
          Screenshot Restricted
        </div>
      )}
    </>
  );
}

export default RestrictScreenshot;
