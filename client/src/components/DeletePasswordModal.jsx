
import { useState } from "react";

function DeletePasswordModal({ photo, onCancel, onSubmit, message }) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  if (!photo) return null;

  const isDeleting = message === "Deleting certificate...";

  function handleSubmit(event) {
    event.preventDefault();

    if (!password.trim() || isDeleting) return;

    onSubmit(password);
    setPassword("");
  }

  function handleCancel() {
    setPassword("");
    setShowPassword(false);
    onCancel();
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

          <div className="password-input-wrapper">
            <input
              id="delete-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter private password"
              autoComplete="current-password"
              required
              disabled={isDeleting}
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword((current) => !current)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {message && (
            <p className="modal-message" role="status">
              {message}
            </p>
          )}

          <div className="modal-actions">
            <button
              type="button"
              className="modal-secondary"
              onClick={handleCancel}
              disabled={isDeleting}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="modal-danger"
              disabled={isDeleting || !password.trim()}
            >
              {isDeleting ? "Deleting..." : "Verify Password"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default DeletePasswordModal;
