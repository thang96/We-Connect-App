import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';

const ModalContext = createContext();

export const useModal = () => {
  return useContext(ModalContext);
};

const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState(false);
  const [content, setContent] = useState();

  useEffect(() => {
    if (modal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [modal]);

  const openModal = (content) => {
    setContent(content);
    setModal(true);
  };

  return (
    <ModalContext.Provider value={{ openModal }}>
      {children}
      {modal && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          {content}
        </div>
      )}
    </ModalContext.Provider>
  );
};
ModalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ModalProvider;
