interface GeneralResponse {
  backdrop_path: string | null;
  genres: Genre[];
  homepage: string;
  id: number;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: ProductionCompany[] | Network[];
  status: string;
  vote_average: number;
  vote_count: number;
  title: string | undefined;
  name: string | undefined;
}

export class TvShow implements GeneralResponse {
  backdrop_path: string;
  genres: Genre[];
  homepage: string;
  id: number;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[] | Network[];
  status: string;
  vote_average: number;
  vote_count: number;
  name: string | undefined;

  first_air_date: Date;
  release_date: Date;

  get title(): string {
    return this.name;
  }

  get releaseYear(): string {
    return new Date(this.release_date ?? this.first_air_date)
      .getFullYear()
      .toString();
  }
}

export interface MovieResponse extends Omit<GeneralResponse, "name"> {
  adult: boolean;
  belongs_to_collection: BelongsToCollection;
  budget: number;
  imdb_id: string;
  original_title: string;
  production_countries: ProductionCountry[];
  release_date: Date;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  tagline: string;
  title: string;
  video: boolean;
}

export interface TvResponse extends Omit<GeneralResponse, "title"> {
  created_by: CreatedBy[];
  episode_run_time: number[];
  first_air_date: Date;
  in_production: boolean;
  languages: string[];
  last_air_date: Date;
  last_episode_to_air: TEpisodeToAir;
  name: string;
  next_episode_to_air: TEpisodeToAir;
  networks: Network[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_name: string;
  seasons: Season[];
  type: string;
}

export interface VideosResponse {
  id?: number;
  results: VideoResult[];
}

export interface KeywordsResponse {
  keywords: Keyword[];
}

export interface ImagesResponse {
  backdrops: Image[];
  posters: Image[];
}

export interface CreditsResponse {
  id?: number;
  cast: CastPerson[];
  crew: CrewPerson[];
}

export interface ReleasesResponse {
  countries: Release[];
}

export interface SimilarResponse {
  page: number;
  results: SimilarResult[];
  total_pages: number;
  total_results: number;
}

export interface AlternativeTitlesResponse {
  titles: Title[];
}

export interface ReviewsResponse {
  page: number;
  results: ReviewResult[];
  total_pages: number;
  total_results: number;
}

export interface ReviewResult {
  author: string;
  content: string;
  id: string;
  url: string;
}

export interface Title {
  iso_3166_1: string;
  title: string;
  type: string;
}

export interface SimilarResult {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  popularity: number;
}

export interface Release {
  certification: string;
  iso_3166_1: string;
  primary: boolean;
  release_date: Date;
}

export interface BelongsToCollection {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
}

export interface Genre {
  id: number;
  name: string;
}

export type Keyword = Genre;

export interface ProductionCompany {
  id: number;
  logo_path: null | string;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  iso_639_1: string;
  name: string;
}

export interface CastPerson {
  cast_id: number;
  character: string;
  credit_id: string;
  gender: number;
  id: number;
  name: string;
  order: number;
  profile_path: null | string;
}

export interface CrewPerson {
  credit_id: string;
  department: CrewDepartment;
  gender: number;
  id: number;
  job: string;
  name: string;
  profile_path: null | string;
}

export interface VideoResult {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
}

export interface CreatedBy {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: null;
}

export interface TEpisodeToAir {
  air_date: Date;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  season_number: number;
  show_id: number;
  still_path: null | string;
  vote_average: number;
  vote_count: number;
}

export interface Network {
  name: string;
  id: number;
  logo_path: null | string;
  origin_country: string;
}

export interface Season {
  air_date: Date;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: null | string;
  season_number: number;
}

export interface Image {
  aspect_ratio: number;
  file_path: string;
  height: number;
  iso_639_1: null | string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface MovieList {
  created_by: string;
  description: string;
  favorite_count: number;
  id: string;
  items: MovieItem[];
  item_count: number;
  iso_639_1: string;
  name: string;
  poster_path: string;
}

export interface MovieItem {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  media_type: MediaType;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface PersonResult {
  adult: boolean;
  gender: number;
  id: number;
  known_for: MovieItem[];
  known_for_department: string;
  name: string;
  popularity: number;
  profile_path: string;
}

export interface PagedResult<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export enum MediaType {
  Movie = "movie",
}

// export type ImageLogoSize = 45 | 92 | 154 | 185 | 300 | 500 | "original";

// export type ImageBackdropSize = 300 | 780 | 1280 | "original";

// export type ImagePosterSize = 92 | 154 | 185 | 342 | 500 | 780 | "original";

export type ImageBackdropSize = "w300" | "w780" | "w1280" | "original";

export type ImageProfileSize = "w45" | "w185" | "h632" | "original";

export type ImageLogoSize =
  | "w45"
  | "w92"
  | "w154"
  | "w185"
  | "w300"
  | "w500"
  | "original";

export type ImagePosterSize =
  | "w92"
  | "w154"
  | "w185"
  | "w342"
  | "w500"
  | "w780"
  | "original";

export type ImageStillSize = "w92" | "w185" | "w300" | "original";

export type ImageSize =
  | ImageBackdropSize
  | ImageProfileSize
  | ImageProfileSize
  | ImagePosterSize
  | ImageStillSize;

export enum CrewDepartment {
  "Director" = 0,
  "Directing" = 1,
  "Writing" = 2,
  "Story" = 3,
  "Screenplay" = 4,
  "Art" = 5,
  "Visual Effects" = 6,
  "Crew" = 7,
  "Editing" = 8,
  "Production" = 9,
  "Sound" = 10,
  "Costume & Make-Up" = 11,
  "Camera" = 12,
}
