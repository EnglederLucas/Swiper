import { auth } from "./../firebaseconfig";

export class SwipeCollection {
  constructor(
    public name: string,
    public creatorUID: string,
    public creationDate: Date,
    public members: string[],

    public id?: string,

    public plannedDate?: Date,

    public filter?: SwipeFilter,
    public movieIdList?: number[],
    public tmdbListId?: number
  ) {}

  public isCreator(): boolean {
    return (
      auth()?.currentUser?.uid && this.creatorUID === auth()?.currentUser?.uid
    );
  }
}

export interface SwipeCollectionCreationDto {
  name: string;
  plannedDate?: Date;

  filter?: SwipeFilter;
  movieIdList?: number[];
  tmdbListId?: number;
}

interface SwipeFilter {
  genre?: string;
}
