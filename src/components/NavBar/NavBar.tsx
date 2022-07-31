import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from 'hooks/useAuth';
import M from 'materialize-css';
import { MobileMenu, Nav } from './styled';
import { useServices } from 'hooks/useServices';
import { ETypeEvent } from 'service/enums';

export const NavBar = () => {
  const { handleSighOut } = useAuth();
  const { EventService } = useServices();
  const refDropdownTrigger = useRef<HTMLAnchorElement>(null);
  const [isVisibleOpenMobile, setIsVisibleOpenMobile] = useState(false);

  useEffect(() => {
    if (refDropdownTrigger.current) {
      const dropdown = M.Dropdown.init(refDropdownTrigger.current);

      return () => {
        dropdown.destroy();
      };
    }
  }, []);

  const handleClickOpenMobileMenu: React.MouseEventHandler<HTMLAnchorElement> = event => {
    event.preventDefault();
    EventService.dispatch(ETypeEvent.OPEN_LIST_CHAT);
    setIsVisibleOpenMobile(true);
  };

  const handleClickCloseMobileMenu: React.MouseEventHandler<HTMLAnchorElement> = event => {
    event.preventDefault();
    EventService.dispatch(ETypeEvent.CLOSE_LIST_CHAT);
    setIsVisibleOpenMobile(false);
  };

  const handleClickSearch: React.MouseEventHandler<HTMLAnchorElement> = event => {
    event.preventDefault();
    EventService.dispatch(ETypeEvent.OPEN_MODAL_SEARCH_USER);
  };

  return (
    <Nav className="no-select top-nav">
      <div className="nav-wrapper light-green lighten-3 z-depth-3">
        {!isVisibleOpenMobile ? (
          <MobileMenu className="sidenav-trigger" onClick={handleClickOpenMobileMenu}>
            <i className="material-icons green-text text-darken-4">menu</i>
          </MobileMenu>
        ) : (
          <MobileMenu className="sidenav-trigger" onClick={handleClickCloseMobileMenu}>
            <i className="material-icons green-text text-darken-4">close</i>
          </MobileMenu>
        )}
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
        </ul>
        <ul id="dropdown-menu" className="dropdown-content">
          <li>
            <a className="green-text text-darken-4">Профиль</a>
          </li>
          <li>
            <a className="green-text text-darken-4" onClick={handleClickSearch}>
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
      </div>
    </Nav>
  );
};
