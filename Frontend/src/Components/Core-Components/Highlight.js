import React from "react";
import { MdStar } from "react-icons/md";
import "./Highlight.css"

export function Review() {
  return (
    <div className="review d-flex">
      <span>
        4 <MdStar size={18} />
      </span>
      <p className="ms-2 mb-0" style={{color:"#5e5e5e",fontWeight:"500"}}>( 1200 reviews)</p>
    </div>
  );
}
