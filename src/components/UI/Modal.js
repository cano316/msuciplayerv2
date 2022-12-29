import React from 'react';
import { createPortal } from 'react-dom';
import classes from './Modal.module.css'

const Backdrop = (props) => {
    return (
        <div className={classes.backdrop} onClick={props.onClick}></div>
    )
};

const ModalOverlay = (props) => {
    return (
        <div className={classes.modal}>
            {props.children}
        </div>
    )
};

const Modal = (props) => {
    return (
        <React.Fragment>
            {createPortal(<Backdrop onClick={props.onHideUploadModal} />, document.getElementById('backdrop'))}
            {createPortal(<ModalOverlay>{props.children}</ModalOverlay>, document.getElementById('modal-overlay'))}
        </React.Fragment>
    )
};

export default Modal;