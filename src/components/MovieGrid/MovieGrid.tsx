import css from "../MovieGrid/MovieGrid.module.css";
import type { Movie } from "../../types/movie";

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
  const baseImgPath = "https://image.tmdb.org/t/p/w500/";
  const baseImg =
    "https://micras.org/wiki/images/7/78/Image_placeholder.jpg?20151026233600";

  return (
    <ul className={css.grid}>
      {movies.map((movie) => (
        <li
          onClick={() => onSelect(movie)}
          className="movieItem"
          key={movie.id}
        >
          <div className={css.card}>
            <img
              data-id={movie.id}
              className={css.image}
              src={baseImgPath ? baseImgPath + movie.poster_path : baseImg}
              alt={movie.title}
              loading="lazy"
            />
            <h2 className={css.title}>{movie.title}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
}
