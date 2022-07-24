import React, { useEffect, useRef } from 'react';
import { useAuth } from 'hooks/useAuth';
import M from 'materialize-css';
import { Nav, MobileMenu } from './styled';

type TPropsNavBar = {
  onClickMobileMenu: () => void;
};

export const NavBar: React.FC<TPropsNavBar> = props => {
  const { onClickMobileMenu } = props;
  const { handleSighOut } = useAuth();
  const refDropdownTrigger = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (refDropdownTrigger.current) {
      const dropdown = M.Dropdown.init(refDropdownTrigger.current);
      return () => dropdown.destroy();
    }
  }, []);

  const handleClickMenu: React.MouseEventHandler<HTMLAnchorElement> = event => {
    event.preventDefault();
    onClickMobileMenu();
  };

  return (
    <Nav className="no-select top-nav">
      <div className="nav-wrapper light-green lighten-3 z-depth-3">
        <MobileMenu href="#" className="sidenav-trigger" onClick={handleClickMenu}>
          <i className="material-icons green-text text-darken-4">menu</i>
        </MobileMenu>
        <a className="brand-logo center">
          <i className="large material-icons green-text text-darken-4">flash_on</i>
          <span className="flow-text green-text text-darken-4">QMes</span>
        </a>
        <ul className="right">
          <li>
            <a ref={refDropdownTrigger} className="dropdown-trigger" data-target="dropdown-menu">
              <i className="material-icons green-text text-darken-4">more_vert</i>
            </a>
          </li>
          <ul id="dropdown-menu" className="dropdown-content">
            <li>
              <a className="green-text text-darken-4">Профиль</a>
            </li>
            <li>
              <a className="waves-effect waves-light modal-trigger green-text text-darken-4" href="#ModalSearch">
                Поиск QIN
              </a>
            </li>
            <li className="divider"></li>
            <li>
              <a className="green-text text-darken-4" onClick={handleSighOut}>
                Выйти
              </a>
            </li>
          </ul>
        </ul>
      </div>
    </Nav>
  );
};
