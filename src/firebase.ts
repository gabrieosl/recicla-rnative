/* eslint-disable lines-between-class-members */
/* eslint-disable import/no-duplicates */
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyAj4I-j3R9JAONhkuE0yi7dE2HW-rN9NOk',
  projectId: 'recicla-d2c0f',
  appId: '1:1024708658714:web:f30b2661f9c239f664b3a3',
  // authDomain: "recicla-d2c0f.firebaseapp.com",
  // databaseURL: "https://recicla-d2c0f.firebaseio.com",
  // storageBucket: "recicla-d2c0f.appspot.com",
  // messagingSenderId: "1024708658714",
};

interface DocumentData {
  id: string;
}

class Firebase {
  private auth: app.auth.Auth;
  private database: app.firestore.Firestore;

  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.database = app.firestore();
    // this.auth.settings.appVerificationDisabledForTesting = true;
  }

  // Auth API
  public async signInWithEmailAndPassword({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<string | null | undefined> {
    try {
      this.auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    }

    return this.auth.currentUser?.displayName;
  }

  public async signUpWithEmailAndPassword({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }): Promise<string | null | undefined> {
    try {
      await this.auth.createUserWithEmailAndPassword(email, password);
      await this.auth.currentUser?.updateProfile({
        displayName: name,
      });
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    }
    return this.auth.currentUser?.displayName;
  }

  public signOut(): void {
    this.auth.signOut();
  }

  public async writeToFirestore(
    collection: string,
    data: any,
  ): Promise<boolean> {
    if (!this.auth.currentUser) return false;

    try {
      await this.database.collection(collection).add({
        ...data,
        userId: this.auth.currentUser.uid,
        createdAt: new Date(),
      });
      return true;
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    }
    return false;
  }

  public async readLatestDocumentsFromFirestore(
    collection: string,
    startDate: Date,
  ): Promise<any[] | undefined> {
    try {
      const documents = await this.database
        .collection(collection)
        .where('createdAt', '>=', startDate)
        .get();

      const objectParsedDocuments: any[] = [];
      documents.forEach(document => {
        objectParsedDocuments.push({ id: document.id, ...document.data() });
      });

      return objectParsedDocuments;
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      return undefined;
    }
  }
}

export default new Firebase();
