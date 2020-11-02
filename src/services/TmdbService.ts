import { CrewDepartment, CrewPerson } from "./../contracts/TmdbTypes";
import { nameof } from "./../utils/Utils";
import {
  ImagesResponse,
  SimilarResponse,
  KeywordsResponse,
  AlternativeTitlesResponse,
  ReviewResult,
  ImageSize,
  ImageBackdropSize,
  ImagePosterSize,
  ImageProfileSize,
  ImageLogoSize,
  ImageStillSize,
} from "../contracts/TmdbTypes";
import {
  MovieResponse,
  CreditsResponse,
  VideosResponse,
} from "../contracts/tmdbTypes";
import { TMDB_API_KEY } from "@env";
import Axios, { AxiosError, AxiosInstance } from "axios";
import { ImageSourcePropType } from "react-native";

// type ResponseWithAppend<T, U> = ;

const aspectRatio16_9 = 16 / 9;

export type AppendOptions =
  | "videos"
  | "credits"
  | "keywords"
  | "images"
  | "similar"
  | "alternative_titles"
  | "reviews";

export type AppendType = {
  credits: CreditsResponse | undefined;
  videos: VideosResponse | undefined;
  images: ImagesResponse | undefined;
  similar: SimilarResponse | undefined;
  keywords: KeywordsResponse | undefined;
  alternative_titles: AlternativeTitlesResponse | undefined;
  reviews: ReviewResult | undefined;
};

export type ImageDimensions = {
  width: number;
  height: number;
  aspectRatio?: number;
};

export class TmdbService {
  private static instance: TmdbService | undefined = undefined;
  private apiKey: string;

  private axiosInstance: AxiosInstance;
  private axiosInit() {
    this.axiosInstance = Axios.create({
      baseURL: "https://api.themoviedb.org/3/",
      params: {
        api_key: this.apiKey,
      },
    });

    this.axiosInstance.interceptors.response.use(
      response => {
        console.log(response.status + " " + response.statusText);
        return response;
      },
      (error: AxiosError) => {
        console.log(error.message);
        return Promise.reject(error);
      }
    );
  }

  //https://api.themoviedb.org/3/movie/550?api_key=dc73a84a68599fc5020c628884422957

  private constructor() {
    this.apiKey = TMDB_API_KEY;
    this.axiosInit();
  }

  public static getInstance(): TmdbService {
    if (TmdbService.instance === undefined) this.instance = new TmdbService();

    return this.instance;
  }

  public async fetchMovie<T extends AppendOptions>(
    movieId: number
  ): Promise<MovieResponse> {
    const res = await this.axiosInstance.get<MovieResponse & AppendType>(
      `/movie/${movieId}`
    );

    return res.data;
  }

  public async fetchMovieWithAppend(
    movieId: number,
    ...append: AppendOptions[]
  ): Promise<MovieResponse & AppendType> {
    const res = await this.axiosInstance.get<MovieResponse & AppendType>(
      `/movie/${movieId}`,
      {
        params: {
          append_to_response: append.join(","),
        },
      }
    );

    return res.data;
  }

  public async fetchMovieWithAppendGeneric<T extends AppendOptions>(
    movieId: number,
    withAppend: T
  ): Promise<MovieResponse & Pick<AppendType, T>> {
    const res = await this.axiosInstance.get<
      MovieResponse & Pick<AppendType, T>
    >(`/movie/${movieId}`, {
      params: {
        append_to_response: withAppend,
      },
    });

    return res.data;
  }

  public static getImageLink<T extends ImageSize>(
    imgFile: string,
    size: Extract<ImageSize, T>
  ): string {
    if (!imgFile) {
      return "";
    }

    return `https://image.tmdb.org/t/p/${size}${imgFile}`;
  }

  public static getImageSource<T extends ImageSize>(
    imgFile: string,
    size: Extract<ImageSize, T>
  ): ImageSourcePropType {
    if (!imgFile) {
      return {};
    }

    return { uri: `https://image.tmdb.org/t/p/${size}${imgFile}` };
  }

  public static extractYoutubeTrailerKey(
    movie: MovieResponse & { videos: VideosResponse }
  ): string | null {
    if (movie?.videos.results?.length === 0) return null;

    const firstResult = movie?.videos.results[0];
    if (!firstResult || firstResult?.site !== "YouTube") {
      return null;
    }

    return firstResult.key;
  }

  public static getBackdropDimensions(
    inputDimension: { width: number } | { height: number }
  ): ImageDimensions {
    if ("width" in inputDimension) {
      return {
        width: inputDimension.width,
        height: inputDimension.width * aspectRatio16_9,
      };
    }

    if ("height" in inputDimension) {
      return {
        width: inputDimension.height / aspectRatio16_9,
        height: inputDimension.height,
      };
    }
  }

  public static getOrderedCrewByImportance(crew: CrewPerson[]): CrewPerson[] {
    if (crew === null || crew === undefined) return [];

    crew.sort((a, b) => {
      if (!a.profile_path) return 1;
      if (!b.profile_path) return -1;

      return CrewDepartment[a.department] - CrewDepartment[b.department];
    });

    return crew;
  }

  public setNewApikey(newApiKey: string): void {
    this.apiKey = newApiKey;
    this.axiosInit();
  }
}
