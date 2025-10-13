import { createPortal } from "react-dom";
import css from "../MovieModal/MovieModal.module.css";
import { useEffect } from "react";
import type { Movie } from "../../types/movie";

interface ModalProps {
  onClose: () => void;
  movie: Movie;
}

export default function MovieModal({ onClose, movie }: ModalProps) {
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!movie) return null;

  return createPortal(
    <div
      onClick={handleBackdropClick}
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modal}>
        <button
          onClick={onClose}
          className={css.closeButton}
          aria-label="Close modal"
        >
          &times;
        </button>
        <img
          src={
            movie?.backdrop_path !== null
              ? `https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`
              : `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5JIXHk43XX3MJKvYX3c2SqMbrcgvY1GjWaA&s`
          }
          alt={movie?.title}
          className={css.image}
        />
        <div className={css.content}>
          <h2>{movie?.title}</h2>
          <p>{movie?.overview}</p>
          <p>
            <strong>Release Date:</strong> {movie?.release_date}
          </p>
          <p>
            <strong>Rating:</strong> {movie?.vote_average}/10
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}
