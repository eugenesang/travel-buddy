import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { images } from "../constants";
import { useState } from "react";

const Navigation = () => {
  const user = useSelector((state) => state.user.user);

  const [navOpen, setNavOpen] = useState(false);

  const openCloseNav = ()=>{
    setNavOpen(!navOpen);
  }

  const closeNav = ()=>{
    setNavOpen(false);
  }

  const mainMenu = [
    {
      label: "Home",
      link: "/",
    },
    {
      label: "Trips",
      link: "/trips",
    },
    {
      label: "Explore",
      link: "/explore",
    },
    {
      label: "Contact Us",
      link: "/contact",
    },
  ];

  return (
    <nav className="navigation">
      <div className="brand-info">
        <Link>
          <img src={images.logos_black} />
          <h1>Travel <span>Connect</span></h1>
        </Link>
      </div>
      <div className="open-close pc-hidden" onClick={openCloseNav}>
          {!navOpen && <i className="fas fa-bars"/>}
          {navOpen && <i className="fas fa-xmark"/>}
        </div>
      <div className={`row nav-options ${navOpen && "nav-open"}`}>
        
        <div className="row menu-list">
          {mainMenu.map((item, index) => (
            <Link key={index} to={item.link} onClick={closeNav}>
              {item.label}
            </Link>
          ))}
        </div>
        {user ? (
          <div className="row">
            <Link to="/create-trip" onClick={closeNav} title="Create trip" className="button" style={{borderRadius: "50%", width: "32px", height: "32px", padding: "0px"}} onClick={closeNav}>
              <i className="fas fa-plus"></i>
            </Link>
            <Link to="/profile" className="button" style={{borderRadius: "50%", width: "32px", height: "32px", padding: "0px"}} onClick={closeNav}>
              <i className="fas fa-user"></i>
            </Link>
          </div>
        ) : (
          <div className="row">
            <Link to="/login" onClick={closeNav}>Login</Link>
            <Link to="/signup" className="button" onClick={closeNav}>
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
