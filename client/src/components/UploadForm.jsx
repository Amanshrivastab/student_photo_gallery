
import { useRef, useState } from "react";
import "../styles/upload-form.css";

const categories = [
  "Academic",
  "Course Completion",
  "Internship",
  "Hackathon",
  "Achievement",
  "Workshop & Webinar",
  "Other",
];

const ALLOWED_MIME_TYPES = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif",
  "image/bmp",
];

const ALLOWED_EXTENSIONS = [
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".gif",
  ".bmp",
];

const MAX_FILE_SIZE = 10 * 1024 * 1024;

function UploadForm({ onUpload, isUploading = false }) {
  const fileInputRef = useRef(null);

  const [name, setName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  function handleFileChange(event) {
    const selectedFile = event.target.files?.[0];

    setError("");
    setFile(null);

    if (!selectedFile) return;

    const fileName = selectedFile.name.toLowerCase();

    const hasValidExtension = ALLOWED_EXTENSIONS.some(
      (extension) => fileName.endsWith(extension)
    );

    const hasValidMimeType = ALLOWED_MIME_TYPES.includes(
      selectedFile.type
    );

    if (!hasValidExtension || !hasValidMimeType) {
      setError(
        "Unsupported file format. Please select PNG, JPG, JPEG, WEBP, GIF or BMP."
      );

      event.target.value = "";
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      setError("Image size must be 10 MB or less.");
      event.target.value = "";
      return;
    }

    setFile(selectedFile);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!name.trim() || !rollNumber.trim() || !category || !file) {
      setError(
        "Please fill in all fields and select a valid image."
      );
      return;
    }

    try {
      await onUpload({
        name: name.trim(),
        rollNumber: rollNumber.trim(),
        category,
        file,
      });

      setName("");
      setRollNumber("");
      setCategory("");
      setFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      setError(error.message || "Certificate upload failed.");
    }
  }

  return (
    <section className="upload-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">CONTRIBUTE</p>
          <h2>Upload New Certificate</h2>
          <p className="section-description">
            Add a student's certificate to the gallery.
          </p>
        </div>

        <span className="upload-icon" aria-hidden="true">↑</span>
      </div>

      <form onSubmit={handleSubmit}>
        <label className="file-drop">
          <input
            ref={fileInputRef}
            type="file"
            accept={ALLOWED_EXTENSIONS.join(",")}
            onChange={handleFileChange}
            disabled={isUploading}
          />

          <span className="file-icon" aria-hidden="true">▧</span>

          <strong>
            {file ? file.name : "Choose a certificate image"}
          </strong>

          <span>
            {file
              ? `${(file.size / (1024 * 1024)).toFixed(2)} MB`
              : "PNG, JPG, JPEG, WEBP, GIF, BMP · Maximum 10 MB"}
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
              disabled={isUploading}
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
              disabled={isUploading}
            />
          </div>

          <div className="field">
            <label htmlFor="certificate-category">
              Certificate Category
            </label>

            <select
              id="certificate-category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              required
              disabled={isUploading}
            >
              <option value="">Select category</option>

              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        {error && (
          <p className="message error" role="alert">
            {error}
          </p>
        )}

        <button
          className="upload-button"
          type="submit"
          disabled={isUploading}
        >
          {isUploading ? "Uploading..." : "Add Certificate to Gallery"}
          <span>→</span>
        </button>
      </form>
    </section>
  );
}

export default UploadForm;
