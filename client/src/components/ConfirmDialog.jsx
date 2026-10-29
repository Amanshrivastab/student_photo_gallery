
function ConfirmDialog({ photo, onCancel, onConfirm }) {
  if (!photo) return null;

  return (
    <div className="modal-backdrop">
      <section
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
      >
        <h2 id="confirm-title">Delete this photo?</h2>

        <p>
          You selected <strong>{photo.name}</strong> (Roll No:{" "}
          {photo.rollNumber}). Continue only if you intend to delete it.
        </p>

        <div className="modal-actions">
          <button
            type="button"
            className="modal-secondary"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            type="button"
            className="modal-danger"
            onClick={onConfirm}
          >
            Continue
          </button>
        </div>
      </section>
    </div>
  );
}

export default ConfirmDialog;
