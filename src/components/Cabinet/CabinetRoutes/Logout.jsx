function Logout({ onLogout, closeModal, closeModalOnClickOut, isOpen }) {
  return (
    <div className={`modal ${isOpen ? "modal-isActive" : ""}`}>
      <div className="modal__overlay" onClick={closeModalOnClickOut} data-lp>
        <div className="modal__content cabinet-modal">
          <h6 className="cabinet-modal__title">Бажаєте вийти з <br/> облікового запису?</h6>
          <div className="cabinet-modal__btns">
            <button className="btn btn-transparent" onClick={closeModal}>Ні</button>
            <button className="btn" onClick={onLogout}>Так</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Logout;
