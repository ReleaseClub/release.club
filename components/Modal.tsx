export const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "display-block" : "display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <button onClick={handleClose}>Close</button>
      </section>
    </div>
  );
};