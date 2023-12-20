import { useEffect } from 'react';
import css from './index.module.css';
// import { AiOutlineClose } from 'react-icons/ai';

export function Modal({ closeModalBtn, modalImage }) {
  useEffect(() => {
    const handleEsc = e => {
      if (e.code === 'Escape') {
        closeModalBtn();
      }
    };
    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [closeModalBtn]);

  return (
    <div className={css.Overlay} onClick={closeModalBtn}>
      <div className={css.Modal} onClick={e => e.stopPropagation()}>
        {/* <button
            type="button"
            className={css.btnClose}
            aria-label="Close"
            onClick={closeModalBtn}
          >
            <AiOutlineClose className={css.icon} />
          </button> */}
        <div className="modal-content">
          <div className="modal-body">
            <img src={modalImage} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
