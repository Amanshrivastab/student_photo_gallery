
import "../styles/photo-card.css";

function PhotoCard({ photo, onDownload, onDelete }) {
  return (
    <article className="photo-card">
      <div className="photo-preview">
        <img src={photo.previewUrl} alt={`${photo.name}'s photo`} />
      </div>

      <div className="photo-details">
        <h3>{photo.name}</h3>
        <p>Roll No: {photo.rollNumber}</p>

        <div className="photo-actions">
          <button
            className="download-button"
            type="button"
            onClick={() => onDownload(photo)}
          >
            ↓ Download PNG
          </button>

          <button
            className="delete-button"
            type="button"
            onClick={() => onDelete(photo)}
            aria-label={`Delete photo of ${photo.name}`}
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}

export default PhotoCard;
