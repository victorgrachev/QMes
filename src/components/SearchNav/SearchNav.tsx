import React, { useState } from 'react';

export type TPropsSearchNav = {
  onChange?: React.EventHandler<React.ChangeEvent<HTMLInputElement>>;
  onClose?: () => void;
};

export const SearchNav: React.FC<TPropsSearchNav> = ({ onChange, onClose }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleChange: React.EventHandler<React.ChangeEvent<HTMLInputElement>> = event => {
    setSearchValue(event.target.value);
    onChange?.(event);
  };

  const handleClose = () => {
    setSearchValue('');
    onClose?.();
  };

  return (
    <nav>
      <div className="nav-wrapper teal darken-1">
        <form>
          <div className="input-field">
            <input id="search" type="search" required placeholder="Поиск" value={searchValue} onChange={handleChange} />
            <label className="label-icon" htmlFor="search">
              <i className="material-icons no-select">search</i>
            </label>
            <i className="material-icons no-select" onClick={handleClose}>
              close
            </i>
          </div>
        </form>
      </div>
    </nav>
  );
};
