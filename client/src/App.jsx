
import { useEffect, useState } from "react";

import UploadForm from "./components/UploadForm";
import PhotoGallery from "./components/Photogallery";
import ConfirmDialog from "./components/ConfirmDialog";
import DeletePasswordModal from "./components/DeletePasswordModal";
import CategoryFilter from "./components/CategoryFilter";

import {
  getPhotos,
  uploadPhoto,
  deletePhoto,
} from "./services/photoApi";

import "./App.css";

function App() {
  const [photos, setPhotos] = useState([]);

  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("");

  const [photoToConfirm, setPhotoToConfirm] = useState(null);
  const [photoToDelete, setPhotoToDelete] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState("");

  // Fetch certificates whenever the selected category changes
  useEffect(() => {
    let isActive = true;

    async function fetchPhotos() {
      try {
        setIsLoading(true);
        setError("");

        const result = await getPhotos(selectedCategory);

        if (isActive) {
          setPhotos(result.data || []);
        }
      } catch (error) {
        if (isActive) {
          setError(error.message || "Unable to load certificates.");
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    fetchPhotos();

    return () => {
      isActive = false;
    };
  }, [selectedCategory]);

  // Upload certificate to backend
  async function handleUpload(certificate) {
    try {
      setIsUploading(true);
      setError("");

      await uploadPhoto(certificate);

      // Refresh gallery using the currently selected category
      const result = await getPhotos(selectedCategory);

      setPhotos(result.data || []);
    } catch (error) {
      throw new Error(error.message || "Certificate upload failed.");
    } finally {
      setIsUploading(false);
    }
  }

  // Download certificate
  async function handleDownload(photo) {
    try {
      const response = await fetch(photo.imageUrl);

      if (!response.ok) {
        throw new Error("Unable to download certificate.");
      }

      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = downloadUrl;
      link.download = `${photo.rollNumber}-${photo.name}.png`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      setTimeout(() => {
        URL.revokeObjectURL(downloadUrl);
      }, 1000);

    } catch (error) {
      console.error("Download error:", error);
      alert("Download failed. Please try again.");
    }
  }

  // Open delete confirmation dialog
  function handleDeleteRequest(photo) {
    setPhotoToConfirm(photo);
  }

  // Move to password verification
  function handleConfirmDelete() {
    setPhotoToDelete(photoToConfirm);
    setPhotoToConfirm(null);
    setDeleteMessage("");
  }

  // Delete certificate through backend
  async function handlePasswordSubmit(password) {
    try {
      setDeleteMessage("Deleting certificate...");

      await deletePhoto(photoToDelete._id, password);

      setPhotos((currentPhotos) =>
        currentPhotos.filter(
          (photo) => photo._id !== photoToDelete._id
        )
      );

      closeDeleteModal();

    } catch (error) {
      setDeleteMessage(
        error.message || "Unable to delete certificate."
      );
    }
  }

  // Close password modal
  function closeDeleteModal() {
    setPhotoToDelete(null);
    setDeleteMessage("");
  }

  return (
    <main className="page">

      {/* Header */}
      <header className="page-header">
        <div className="brand-mark">SG</div>

        <p className="eyebrow">STUDENT COMMUNITY</p>

        <h1>Student Certificate Gallery</h1>

        <p className="subtitle">
          A shared space for student certificates. Upload, explore and download.
        </p>
      </header>

      {/* Upload Form */}
      <UploadForm
        onUpload={handleUpload}
        isUploading={isUploading}
      />

      {/* Category Filter and Gallery */}
      <section>

        {error && (
          <p className="message error" role="alert">
            {error}
          </p>
        )}

        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {isLoading ? (
          <p>Loading certificates...</p>
        ) : (
          <PhotoGallery
            photos={photos}
            onDownload={handleDownload}
            onDelete={handleDeleteRequest}
          />
        )}

      </section>

      {/* Footer */}
      <footer className="page-footer">
        <span>Student Certificate Gallery</span>
        <span>Made for the student community</span>
      </footer>

      {/* Delete Confirmation */}
      <ConfirmDialog
        photo={photoToConfirm}
        onCancel={() => setPhotoToConfirm(null)}
        onConfirm={handleConfirmDelete}
      />

      {/* Password Verification */}
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
