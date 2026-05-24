import './Modal.css';

const Modal = ({
    isOpen,
    onClose,
    children,
    width = 500
}) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="modalOverlay">
            <div className="modalContainer" style={{ width: `${width}px` }}>
                <button className="modalCloseButton" onClick={onClose}>
                    ×
                </button>

                {children}
            </div>
        </div>
    );
};

export default Modal;