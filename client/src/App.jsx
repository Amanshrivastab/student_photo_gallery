import { useRef, useState } from "react";
import "./App.css";

function App() {
  const fileInputRef = useRef(null);

  const [name, setName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [file, setFile] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleFileChange(event) {
    const selectedFile = event.target.files?.[0];

    setError("");
    setSuccess("");

    if (!selectedFile) return;

    if (
      selectedFile.type !== "image/png" ||
      !selectedFile.name.toLowerCase().endsWith(".png")
    ) {
      setError("Please select a PNG image.");
      event.target.value = "";
      setFile(null);
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      setError("Image size must be 10 MB or less.");
      event.target.value = "";
      setFile(null);
      return;
    }

    setFile(selectedFile);
  }

  function handleUpload(event) {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!name.trim() || !rollNumber.trim() || !file) {
      setError("Please fill in all fields and select a PNG image.");
      return;
    }

    const previewUrl = URL.createObjectURL(file);

    const newPhoto = {
      id: crypto.randomUUID(),
      name: name.trim(),
      rollNumber: rollNumber.trim(),
      file,
      previewUrl,
    };

    setPhotos((currentPhotos) => [newPhoto, ...currentPhotos]);
    setName("");
    setRollNumber("");
    setFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    setSuccess("Photo added to the gallery!");
  }

  function handleDownload(photo) {
    const link = document.createElement("a");
    link.href = photo.previewUrl;
    link.download = `${photo.rollNumber}-${photo.name}.png`;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  return (
    <main className="page">
      <header className="page-header">
        <div className="brand-mark">SC</div>
        <p className="eyebrow">STUDENT COMMUNITY</p>
        <h1>Student Photo Gallery</h1>
        <p className="subtitle">
          A shared space for student photos. Upload, explore and download.
        </p>
      </header>

      <section className="upload-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">CONTRIBUTE</p>
            <h2>Upload New Photo</h2>
            <p className="section-description">
              Add a student's photo to the gallery.
            </p>
          </div>
          <span className="upload-icon" aria-hidden="true">↑</span>
        </div>

        <form onSubmit={handleUpload}>
          <label className="file-drop">
            <input
              ref={fileInputRef}
              type="file"
              accept=".png,image/png"
              onChange={handleFileChange}
            />
            <span className="file-icon">▧</span>
            <strong>{file ? file.name : "Choose a PNG photo"}</strong>
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
            <p className="message error" role="alert">{error}</p>
          )}

          {success && (
            <p className="message success" role="status">{success}</p>
          )}

          <button className="upload-button" type="submit">
            Add Photo to Gallery <span>→</span>
          </button>
        </form>
      </section>

      <section className="gallery-section">
        <div className="gallery-heading">
          <div>
            <p className="eyebrow">THE COLLECTION</p>
            <h2>Available Photos</h2>
          </div>
          <span className="photo-count">
            {photos.length} {photos.length === 1 ? "PHOTO" : "PHOTOS"}
          </span>
        </div>

        {photos.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">▧</div>
            <h3>Your gallery starts here</h3>
            <p>
              No photos yet. Upload the first student photo to get started.
            </p>
          </div>
        ) : (
          <div className="photo-grid">
            {photos.map((photo) => (
              <article className="photo-card" key={photo.id}>
                <div className="photo-preview">
                  <img src={photo.previewUrl} alt={photo.name} />
                </div>

                <div className="photo-details">
                  <h3>{photo.name}</h3>
                  <p>Roll No: {photo.rollNumber}</p>
                  <button
                    className="download-button"
                    type="button"
                    onClick={() => handleDownload(photo)}
                  >
                    ↓ Download PNG
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <footer className="page-footer">
        <span>Student Photo Gallery</span>
        <span>Made for the student community</span>
      </footer>
    </main>
  );
}

export default App;