
import { useRef, useState } from "react";
import "../styles/upload-form.css";

function UploadForm({ onUpload }) {
  const fileInputRef = useRef(null);

  const [name, setName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  function handleFileChange(event) {
    const selectedFile = event.target.files?.[0];

    setError("");
    setFile(null);

    if (!selectedFile) return;

    const isPng =
      selectedFile.type === "image/png" &&
      selectedFile.name.toLowerCase().endsWith(".png");

    if (!isPng) {
      setError("Please select a PNG image only.");
      event.target.value = "";
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      setError("Image size must be 10 MB or less.");
      event.target.value = "";
      return;
    }

    setFile(selectedFile);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!name.trim() || !rollNumber.trim() || !file) {
      setError("Please fill in all fields and select a PNG image.");
      return;
    }

    onUpload({
      name: name.trim(),
      rollNumber: rollNumber.trim(),
      file,
    });

    setName("");
    setRollNumber("");
    setFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  return (
    <section className="upload-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">CONTRIBUTE</p>
          <h2>Upload New Photo</h2>
          <p className="section-description">
            Add a student's photo to the gallery.
          </p>
        </div>

        <span className="upload-icon" aria-hidden="true">
          ↑
        </span>
      </div>

      <form onSubmit={handleSubmit}>
        <label className="file-drop">
          <input
            ref={fileInputRef}
            type="file"
            accept=".png,image/png"
            onChange={handleFileChange}
          />

          <span className="file-icon" aria-hidden="true">
            ▧
          </span>

          <strong>
            {file ? file.name : "Choose a PNG photo"}
          </strong>

          <span>
            {file
              ? `${(file.size / (1024 * 1024)).toFixed(2)} MB`
              : "PNG format only · Maximum 10 MB"}
          </span>
        </label>

        <div className="form-grid">
          <div className="field">
            <label htmlFor="student-name">Student Name</label>
            <input
              id="student-name"
              type="text"
              placeholder="Enter student's full name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              maxLength={100}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="roll-number">Roll Number</label>
            <input
              id="roll-number"
              type="text"
              placeholder="e.g. 230123"
              value={rollNumber}
              onChange={(event) => setRollNumber(event.target.value)}
              maxLength={30}
              required
            />
          </div>
        </div>

        {error && (
          <p className="message error" role="alert">
            {error}
          </p>
        )}

        <button className="upload-button" type="submit">
          Add Photo to Gallery <span>→</span>
        </button>
      </form>
    </section>
  );
}

export default UploadForm;
