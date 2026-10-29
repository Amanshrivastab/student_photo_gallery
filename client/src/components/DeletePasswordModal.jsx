
import { useState } from "react";

function DeletePasswordModal({ photo, onCancel, onSubmit, message }) {
  const [password, setPassword] = useState("");

  if (!photo) return null;

  function handleSubmit(event) {
    event.preventDefault();

    if (!password.trim()) return;

    onSubmit(password);
    setPassword("");
  }

  return (
    <div className="modal-backdrop">
      <section
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-password-title"
      >
        <h2 id="delete-password-title">Private deletion access</h2>

        <p>
          Enter the private deletion password to continue deleting{" "}
          <strong>{photo.name}</strong>.
        </p>

        <form onSubmit={handleSubmit}>
          <label className="modal-label" htmlFor="delete-password">
            Deletion Password
          </label>

          <input
            id="delete-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter private password"
            autoComplete="current-password"
            required
          />

          {message && (
            <p className="modal-message" role="status">
              {message}
            </p>
          )}

          <div className="modal-actions">
            <button
              type="button"
              className="modal-secondary"
              onClick={onCancel}
            >
              Cancel
            </button>

            <button type="submit" className="modal-danger">
              Verify Password
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default DeletePasswordModal;
