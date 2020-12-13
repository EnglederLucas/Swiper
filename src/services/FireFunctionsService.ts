import { MovieResponse } from "../contracts/tmdbTypes";
import Axios, { AxiosError, AxiosInstance } from "axios";
import { auth } from "../firebaseconfig";

export type SwipeResult = "like" | "nope" | "superLike";

export class FireFunctionsService {
  private static instance: FireFunctionsService | undefined = undefined;

  private axiosInstance: AxiosInstance;
  private axiosInit() {
    this.axiosInstance = Axios.create({
      baseURL: "https://us-central1-swiper-9cfe9.cloudfunctions.net/webApi/",
    });

    this.axiosInstance.interceptors.response.use(
      response => {
        // console.debug(response.status + " " + response.statusText);
        return response;
      },
      (error: AxiosError) => {
        console.log(error.message);
        return Promise.reject(error);
      }
    );
  }
  public async sendSwipeResult(
    swipeCollectionId: string,
    movieId: number,
    swipeResult: SwipeResult
  ): Promise<boolean> {
    const uid = auth()?.currentUser?.uid;
    console.log(uid);

    if (!uid) return null;

    const res = await this.axiosInstance.post<{ match: boolean }>("swipe", {
      swipeCollectionId: swipeCollectionId,
      movieId: movieId,
      swipeResult: swipeResult,
      userId: uid,
    });

    return res.data.match;
  }

  private constructor() {
    this.axiosInit();
  }

  public static getInstance(): FireFunctionsService {
    if (FireFunctionsService.instance === undefined)
      this.instance = new FireFunctionsService();

    return this.instance;
  }
}
