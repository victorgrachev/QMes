import React, { useEffect, useRef, useState } from 'react';
import M from 'materialize-css';
import { useSearchUser } from 'hooks/useSearchUser';
import { Loader } from 'components/Loader';
import { InputQIN } from './styled';
import { useChat } from 'hooks/useChat';

export type TPropsModalSearch = {
  onCreateChat: ReturnType<typeof useChat>['createChat'];
};

export const ModalSearch: React.FC<TPropsModalSearch> = props => {
  const { onCreateChat } = props;
  const refModalElement = useRef<HTMLDivElement>(null);
  const refInputValueQIN = useRef<HTMLInputElement>(null);

  const [userQIN, setUserQIN] = useState<number>();
  const [loadAddContact, setLoadAddContact] = useState(false);

  const { searchUser, loading } = useSearchUser(userQIN);

  const handleSearchUser = () => setUserQIN(Number(refInputValueQIN.current?.value));

  const handleCreateChat = () => {
    if (searchUser) {
      setLoadAddContact(true);

      onCreateChat(searchUser).then(({ error }) => {
        setLoadAddContact(false);

        if (error) {
          M.toast({ html: error.message });
        } else {
          M.toast({ html: `Создан чат ${searchUser.firstName} ${searchUser.lastName}` });
        }
      });
    }
  };

  useEffect(() => {
    if (refModalElement.current) {
      const modalWindow = M.Modal.init(refModalElement.current);
      return () => modalWindow.destroy();
    }
  }, []);

  let contentResultSearch: JSX.Element | null = null;

  if (loading) {
    contentResultSearch = (
      <div className="container center-align">
        <Loader />
      </div>
    );
  } else if (loading != null) {
    if (searchUser) {
      contentResultSearch = (
        <div className="container center-align">
          <span className="flow-text">Найден пользователь</span>
          <p className="flow-text">{`${searchUser.firstName} ${searchUser.lastName}`}</p>
          <button className="waves-effect waves-light btn" onClick={handleCreateChat}>
            {loadAddContact ? <Loader /> : <span>Создать чат</span>}
          </button>
        </div>
      );
    } else {
      contentResultSearch = (
        <div className="container center-align">
          <span className="flow-text">Пользователь не найден</span>
        </div>
      );
    }
  }

  return (
    <div id="ModalSearch" ref={refModalElement} className="modal bottom-sheet">
      <div className="modal-content">
        <h4>Поиск пользователей по QIN</h4>
        <div className="row">
          <div className="input-field col s12 m2">
            <InputQIN id="input_qin" type="number" ref={refInputValueQIN} />
            <label htmlFor="input_qin">QIN</label>
          </div>
          <div className="input-field col s12 m2">
            <button className="waves-effect waves-light btn" onClick={handleSearchUser}>
              Поиск
            </button>
          </div>
          <div className="input-field col s12 m8 no-select">
            <div className="container center-align">{contentResultSearch}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
