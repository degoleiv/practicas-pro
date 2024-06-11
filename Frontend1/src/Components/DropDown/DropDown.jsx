import { useState } from "react";
import "./DropDown.css";

export function DropDown({ title, items, type, redic, position, href_items, onItemClick }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown">
      <a 
        className="dropdown-btn" 
        onClick={toggleDropdown} 
        href={type === "button" ? redic : "#"}  // Use "#" if not a button to maintain correct anchor behavior
      >
        {title}
      </a>
      {isOpen && (
        <div className={`dropdown-menu ${position}`}>
          {items && items.map((value, idx) => (
            <a 
              href={href_items[idx]} 
              key={idx} 
              className="dropdown-item"
              onClick={(e) => {
                onItemClick(value);
              }}
            >
              {value}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
