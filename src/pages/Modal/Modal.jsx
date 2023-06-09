import React from "react";
import styled from "styled-components";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) {
    return null; // Se o modal não estiver aberto, não renderize nada
  }

  return (
    <Main>
        <div className="modal">
        <div className="modal-content">
            <span className="close" onClick={onClose}>&times;</span>
            <h2>{title}</h2>
            <div>{children}</div>
        </div>
        </div>
    </Main>
  );
};

const Main = styled.div`
.modal {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }
  
.modal-content {
    background-color: #fefefe;
    padding: 20px;
    border: 1px solid #888;
    max-width: 400px;
  }
  
.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
  }
  
  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
  
`

export default Modal;
