
import PhotoCard from "./PhotoCard";
import "../styles/photo-gallery.css";

function PhotoGallery({ photos, onDownload, onDelete }) {
  return (
    <section className="gallery-section">
      <div className="gallery-heading">
        <div>
          <p className="eyebrow">THE COLLECTION</p>
          <h2>Available Certificates</h2>
        </div>

        <span className="photo-count">
          {photos.length} {photos.length === 1 ? "CERTIFICATE" : "CERTIFICATES"}
        </span>
      </div>

      {photos.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon" aria-hidden="true">
            ▧
          </div>

          <h3>Your gallery starts here</h3>

          <p>
            No certificates yet. Upload the first student certificate to get started.
          </p>
        </div>
      ) : (
        <div className="photo-grid">
          {photos.map((photo) => (
            <PhotoCard
              key={photo._id}
              photo={photo}
              onDownload={onDownload}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default PhotoGallery;
