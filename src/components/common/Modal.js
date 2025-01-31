// components/common/Modal.jsx
import React from "react";
import ReactDOM from "react-dom";
import "./Modal.scss";

const Modal = ({ children, onClose }) => {
	return ReactDOM.createPortal(
		<div
			className='modal-overlay'
			onClick={onClose}>
			<div
				className='modal-content'
				onClick={(e) => e.stopPropagation()}>
				{children}
				<button
					className='modal-close'
					onClick={onClose}>
					&times;
				</button>
			</div>
		</div>,
		document.getElementById("modal-root")
	);
};

export default Modal;
