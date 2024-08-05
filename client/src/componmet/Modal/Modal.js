import React from 'react'
import './style.css';

const Modal = (props) => {
    const { active } = props;
    const { onCancel } = props
    return active &&(
        <div className='modal-container' onClick={() => onCancel()}>
            <div className='modal-contant' onClick={(event) => event.stopPropagation()}>
                {props.children}
            </div>

        </div>
    )
}

Modal.defaultProps = {
    active :false,
    onCancel : () => {}
}
export default Modal