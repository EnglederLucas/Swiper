import {
  MovieResponse,
  CreditsResponse,
  VideosResponse,
} from "./../contracts/tmdbTypes";
import { TMDB_API_KEY } from "@env";
import Axios from "axios";

export class TmdbHttpService {
  private static instance: TmdbHttpService | undefined = undefined;

  private constructor(private apiKey?: string) {
    if (!apiKey) {
      console.log(TMDB_API_KEY);
      this.apiKey = TMDB_API_KEY;
    }
  }

  public static getInstance() {
    if (TmdbHttpService.instance === undefined)
      this.instance = new TmdbHttpService();

    return this.instance;
  }

  public async fetchMovie(
    movieId: number,
    withCredits?: boolean,
    withVideos?: boolean
  ): Promise<MovieResponse> {
    withCredits = withCredits ?? false;
    withVideos = withVideos ?? false;

    // Axios.get<MovieResponse>();
    return;
  }

  public async fetchVideosOfMovie(movieId: number): Promise<VideosResponse> {
    return;
  }

  public async fetchCreditsOfMovie(movieId: number): Promise<CreditsResponse> {
    return;
  }

  public static extractYoutubeTrailerKey(movie: MovieResponse): string | null {
    if (movie.videos?.results?.length === 0) return null;

    const firstResult = movie.videos.results[0];
    if (!firstResult || firstResult?.site !== "YouTube") {
      return null;
    }

    return firstResult.key;
  }
}
