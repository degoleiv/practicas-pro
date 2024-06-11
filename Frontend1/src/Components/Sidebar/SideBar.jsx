import { BsList } from "react-icons/bs";
import "./SideBar.css";

import { DropDown } from "../DropDown/DropDown";

import {useUpdateUi} from "../../Hocks/useUpdateUi"
export function SideBar({ closeModal }) {
  const handleItemClick = (value) => {
    localStorage.setItem('dropdownItemId', value);
    
  };
  
  const {data} = useUpdateUi('sidebar');

  const logoPath =
    "https://www.uniminuto.edu/sites/default/files/2023-02/uniminuto%20blanco_2.png";

  return (
    <div
      className="sidebar-container"
      onClick={(e) => {
        if (e.target.className === "sidebar-container") {
          closeModal();
        }
      }}
    >
      <aside className="sidebar">
        <div className="menu-item">
          <button
            className="sidebar-btn"
            onClick={() => {
              closeModal();
            }}
          >
            <BsList className="sidebar-menu" />
          </button>
          <img src={logoPath} alt="logo" className="logoNav" />
        </div>
        <div className="sidebar-content">
          <a href="/" className="dropdown-btn">Noticias</a>
          
          {data.map((dic, idx) => (
            <DropDown
              key={idx} 
              title={dic.title}
              items={dic.items}
              type={dic.type}
              redic={dic.href}
              href_items={dic.href_items}
              position="right"
              onItemClick={(id) => {
                handleItemClick(id);
              }}
            />
          ))}
        </div>
      </aside>
    </div>
  );
}
