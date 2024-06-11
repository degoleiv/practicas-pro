import "./NavBar.css";
import { SearchBar } from "../SearchBar/SearchBar";
import { User } from "../User/User";
import { SideBar } from "../Sidebar/SideBar";
import { BsList } from "react-icons/bs";
import { useState } from "react";
import { FiHexagon } from "react-icons/fi";
import { DropDown } from "../DropDown/DropDown";
import {useAuthAndApi} from "../../Hocks/useAuthAndApi";

export function NavBar() {
  const { logout } = useAuthAndApi();
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const logoPath =
    "https://www.uniminuto.edu/sites/default/files/2023-02/uniminuto%20blanco_2.png";
  const list_config = ["logout"];

  return (
    <header>
      <nav className="nav-parent">
        <ul className="menu-nav">
          <li className="menu-item">
            <button
              className="sidebar-btn"
              onClick={() => {
                setSideBarOpen(true);
              }}
            >
              <BsList className="sidebar-menu" />
            </button>
            {sideBarOpen && (
              <SideBar
                closeModal={() => {
                  setSideBarOpen(false);
                }}
              />
            )}
            <img src={logoPath} className="logoNav" alt="logo"></img>
          </li>
         
          <li className="menu-item">
            <User name="Christian Pool Contreras" username="instagram" />
            
            
            <button onClick={logout} className="sidebar-btn"><FiHexagon /></button>
           
          
          </li>
        </ul>
      </nav>
    </header>
  );
}


// const [storedAuthState, setStoredAuthState] = useState();

// useEffect(() => {
//     const storedState = sessionStorage.getItem('isAuthenticated');
//     // setStoredAuthState(storedState === 'true');
// }, []);
