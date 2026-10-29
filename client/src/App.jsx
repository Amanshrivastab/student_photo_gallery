
import { useEffect, useState } from "react";

import UploadForm from "./components/UploadForm";
import PhotoGallery from "./components/Photogallery";
import ConfirmDialog from "./components/ConfirmDialog";
import DeletePasswordModal from "./components/DeletePasswordModal";

import "./App.css";

function App() {
  const [photos, setPhotos] = useState([]);
  const [photoToConfirm, setPhotoToConfirm] = useState(null);
  const [photoToDelete, setPhotoToDelete] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState("");

  // Release temporary browser image URLs when they are no longer needed.
  useEffect(() => {
    return () => {
      photos.forEach((photo) => {
        URL.revokeObjectURL(photo.previewUrl);
      });
    };
  }, [photos]);

  function handleUpload({ name, rollNumber, file }) {
    const previewUrl = URL.createObjectURL(file);

    const newPhoto = {
      id: crypto.randomUUID(),
      name,
      rollNumber,
      file,
      previewUrl,
    };

    setPhotos((currentPhotos) => [newPhoto, ...currentPhotos]);
  }

  function handleDownload(photo) {
    const link = document.createElement("a");

    link.href = photo.previewUrl;
    link.download = `${photo.rollNumber}-${photo.name}.png`;

    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  function handleDeleteRequest(photo) {
    setPhotoToConfirm(photo);
  }

  function handleConfirmDelete() {
    setPhotoToDelete(photoToConfirm);
    setPhotoToConfirm(null);
    setDeleteMessage("");
  }

  function handlePasswordSubmit(password) {
    // Backend verification will be implemented in a later phase.
    // Never verify a private deletion password in frontend code.
    void password;
    setDeleteMessage(
      "Backend verification is not connected yet. No photo was deleted."
    );
  }

  function closeDeleteModal() {
    setPhotoToDelete(null);
    setDeleteMessage("");
  }

  return (
    <main className="page">
      <header className="page-header">
        <div className="brand-mark">SG</div>

        <p className="eyebrow">STUDENT COMMUNITY</p>

        <h1>Student Photo Gallery</h1>

        <p className="subtitle">
          A shared space for student photos. Upload, explore and download.
        </p>
      </header>

      <UploadForm onUpload={handleUpload} />

      <PhotoGallery
        photos={photos}
        onDownload={handleDownload}
        onDelete={handleDeleteRequest}
      />

      <footer className="page-footer">
        <span>Student Photo Gallery</span>
        <span>Made for the student community</span>
      </footer>

      <ConfirmDialog
        photo={photoToConfirm}
        onCancel={() => setPhotoToConfirm(null)}
        onConfirm={handleConfirmDelete}
      />

      <DeletePasswordModal
        photo={photoToDelete}
        onCancel={closeDeleteModal}
        onSubmit={handlePasswordSubmit}
        message={deleteMessage}
      />
    </main>
  );
}

export default App;
