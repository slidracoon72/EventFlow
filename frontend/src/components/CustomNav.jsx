import React, { useState } from "react";
import { NavLink } from 'react-router-dom';

const CustomNav = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(prevState => !prevState);
  };

  return (
    <nav className="navbar-menu" style={{ width: isOpen ? 225 : 60 }}>
      <div className="burger" onClick={toggleMenu}>
        <img src="img/menu.svg" alt="burger" />
      </div>
      <ul className="navbar__list">
        {items.map((item, i) => (
          <li className="navbar__li-box" key={i}>
            <NavLink to={item[2]} className="navbar__link" activeClassName="active">
              <div className="navbar__item">
                <img
                  src={item[1]}
                  alt={item[1]}
                  className="navbar__image"
                />
                {isOpen && <span className="navbar__text">{item[0]}</span>}
              </div>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CustomNav;
