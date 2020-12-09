import { TmdbService } from "./TmdbService";
import {
  SwipeCollection,
  SwipeCollectionCreationDto,
} from "./../contracts/Collection";
import { firestore, auth } from "./../firebaseconfig";

type FirestoreCollection = firebase.firestore.CollectionReference<
  firebase.firestore.DocumentData
>;

const swipeCollectionConverter: firebase.firestore.FirestoreDataConverter<SwipeCollection> = {
  toFirestore(coll: SwipeCollection): firebase.firestore.DocumentData {
    return { ...coll };
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): SwipeCollection {
    const data = snapshot?.data(options);
    if (!data) return null;

    return new SwipeCollection(
      data.name,
      data.creatorUID,
      data.creationDate,
      data.members,

      snapshot.id,

      data.plannedDate,
      data.filter,
      data.movieIdList,
      data.tmdbListId
    );
  },
};

export class FirestoreService {
  private static instance: FirestoreService | undefined = undefined;
  private firestore: firebase.firestore.Firestore;

  private swipeCollections: FirestoreCollection;
  private users: FirestoreCollection;

  private tmdbService: TmdbService;

  private constructor() {
    this.firestore = firestore();
    this.swipeCollections = firestore().collection("swipeCollection");
    this.users = firestore().collection("users");

    this.tmdbService = TmdbService.getInstance();
  }

  public static getInstance(): FirestoreService {
    if (FirestoreService.instance === undefined)
      this.instance = new FirestoreService();

    return this.instance;
  }

  public async getMovieListOfCollection(
    collectionId: string
  ): Promise<number[]> {
    const res = await this.getDocumentWithId<SwipeCollection>(
      this.swipeCollections,
      collectionId,
      swipeCollectionConverter
    );

    let allLists: number[] = [];

    if (res?.tmdbListId) {
      allLists = allLists.concat(
        await this.tmdbService.getIdsOfMovieList(res.tmdbListId)
      );
    }

    if (res?.movieIdList) {
      allLists = allLists.concat(res.movieIdList);
    }

    if (res?.filter) {
      console.log("No filters yet");
    }

    return allLists;
  }

  public async getUserSwipeCollections(): Promise<{
    creator: SwipeCollection[];
    member: SwipeCollection[];
  }> {
    const uid = auth()?.currentUser?.uid;

    if (!uid) return null;

    const creator = await this.swipeCollections
      .where("creatorUID", "==", uid)
      .withConverter(swipeCollectionConverter)
      .get();

    const member = await this.swipeCollections
      .where("members", "array-contains", uid)
      .withConverter(swipeCollectionConverter)
      .get();

    const creatorData = creator?.docs?.map(doc => doc.data());
    let memberData = member?.docs?.map(doc => doc.data());

    memberData = memberData.filter(
      c => creatorData.find(creator => creator.id === c.id) === null
    );

    return { creator: creatorData, member: memberData };
  }

  public async addSwipeCollection(
    newCollection: SwipeCollectionCreationDto
  ): Promise<SwipeCollection> {
    const uid = auth()?.currentUser?.uid;
    if (!uid) return null;

    const swipeCollection: SwipeCollection = {
      creationDate: new Date(),
      creatorUID: uid,
      members: [uid],
      ...newCollection,
    } as SwipeCollection;

    let newSwipeCollection: SwipeCollection;

    try {
      newSwipeCollection = await (
        await (
          await this.swipeCollections
            .withConverter(swipeCollectionConverter)
            .add(swipeCollection)
        ).get()
      ).data();

      return newSwipeCollection;
    } catch (err) {
      this.reportError(err);
    }

    return null;
  }

  // if (res.movieIdList) {
  //   return res.movieIdList;
  // } else if (res.tmdbListId) {
  //   return this.tmdbService.getIdsOfMovieList(res.tmdbListId);
  // } else if (res.filter) {
  //   console.log("No filters yet");
  // }

  private async getDocumentWithId<T>(
    collection: FirestoreCollection,
    id: string,
    converter?: firebase.firestore.FirestoreDataConverter<T>,
    options?: "cache" | "server" | "default"
  ): Promise<T | null> {
    if (!id) return null;

    const getOptions = {
      source: options ?? "default",
    };

    try {
      let doc: firebase.firestore.DocumentSnapshot<
        T | firebase.firestore.DocumentData
      >;

      if (converter)
        doc = await collection.withConverter(converter).doc(id).get(getOptions);
      else {
        doc = await collection.doc(id).get(getOptions);
      }

      if (!doc.exists) return null;

      return doc.data() as T;
    } catch (error) {
      this.reportError(error);
    }

    return null;
  }

  private reportError(error: any) {
    console.error("Error", error);
  }
}
