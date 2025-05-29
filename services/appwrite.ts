//track the searches made by user
import { Account, Client, Databases, ID, Query } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;
const GENRE_ID = process.env.EXPO_PUBLIC_APPWRITE_GENRE_ID!;

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

type createUserAccount = {
  email: string;
  password: string;
  name: string;
};
type LogineUserAccount = {
  email: string;
  password: string;
};

//creating an account
const account = new Account(client);

export async function createAccount({
  email,
  password,
  name,
}: createUserAccount) {
  try {
    return await account.create(ID.unique(), email, password, name);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// login

export async function loginAccount({ email, password }: LogineUserAccount) {
  try {
    return await account.createEmailPasswordSession(email, password);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//current user

export async function getCurrentUser() {
  try {
    return await account.get();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//Logout
export async function logoutAccount() {
  try {
    return await account.deleteSession("current");
  } catch (error) {
    console.log(error);
    throw error;
  }
}

const database = new Databases(client);
export const updateSearchCount = async (query: string, movie: Movie) => {
  //check if the record of that search is already been stored
  //if a document is found increment the searchCount field
  //if no document is found create a new document in Appwrite database and make its count 1

  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", query),
    ]);

    if (result.documents.length > 0) {
      const existingMovie = result.documents[0];
      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        existingMovie.$id,
        {
          count: existingMovie.count + 1,
        }
      );
    } else {
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm: query,
        movie_id: movie.id,
        title: movie.title,
        count: 1,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });
    }
    console.log(result);
  } catch (error) {
    console.error("Error updating search count:", error);
    throw error;
  }
};

export const updateGenreCount = async (genreId: number, genreName: string) => {
  try {
    const result = await database.listDocuments(DATABASE_ID, GENRE_ID, [
      Query.equal("genreId", genreId),
    ]);

    if (result.documents.length > 0) {
      const doc = result.documents[0];
      await database.updateDocument(DATABASE_ID, GENRE_ID, doc.$id, {
        count: doc.count + 1,
      });
    } else {
      await database.createDocument(DATABASE_ID, GENRE_ID, ID.unique(), {
        genreId,
        name: genreName,
        count: 1,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const getTrendingMovies = async (): Promise<
  TrendingMovie[] | undefined
> => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(5),
      Query.orderDesc("count"),
    ]);
    return result.documents as unknown as TrendingMovie[];
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

export const getTopGenres = async (): Promise<number[] | undefined> => {
  try {
    const result = await database.listDocuments(DATABASE_ID, GENRE_ID, [
      Query.orderAsc("count"),
      Query.limit(2),
    ]);
    return result.documents.map((doc) => doc.genreId);
  } catch (err) {
    console.log(err);
    return [];
  }
};
