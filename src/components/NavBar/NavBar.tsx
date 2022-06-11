import React, { useEffect, useRef } from 'react';
import { useAuth } from 'hooks/useAuth';
import M from 'materialize-css';

export const NavBar = () => {
  const { handleSighOut } = useAuth();
  const refDropdownTrigger = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (refDropdownTrigger.current) {
      const dropdown = M.Dropdown.init(refDropdownTrigger.current);
      return () => dropdown.destroy();
    }
  }, []);

  return (
    <nav className="no-select top-nav">
      <div className="nav-wrapper teal darken-1 z-depth-3">
        <a data-target="slide-out" className="sidenav-overlay">
          <i className="material-icons">menu</i>
        </a>
        <a className="brand-logo center">
          <i className="large material-icons">flash_on</i>
          <span className="flow-text">QMes</span>
        </a>
        <ul className="right">
          <li>
            <a ref={refDropdownTrigger} className="dropdown-trigger" data-target="dropdown-menu">
              <i className="material-icons">more_vert</i>
            </a>
          </li>
          <ul id="dropdown-menu" className="dropdown-content">
            <li>
              <a>Профиль</a>
            </li>
            <li>
              <a className="waves-effect waves-light modal-trigger" href="#ModalSearch">
                Поиск QIN
              </a>
            </li>
            <li className="divider"></li>
            <li>
              <a onClick={handleSighOut}>Выйти</a>
            </li>
          </ul>
        </ul>
      </div>
    </nav>
  );
};
