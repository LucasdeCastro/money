import firebase from "firebase";
import { equals } from "ramda";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyDKngyUKDXjhQhySBSHbbJ12nEpl8Zw1gc",
  authDomain: "github-money.firebaseapp.com",
  databaseURL: "https://github-money.firebaseio.com",
  projectId: "github-money",
  storageBucket: "github-money.appspot.com",
  messagingSenderId: "306012055357"
};

firebase.initializeApp(config);

const TYPES = {
  SET_REHYDRATE_FIREBASE: "SET_REHYDRATE_FIREBASE",
  SET_REHYDRATE_FIREBASE_LOADING: "SET_REHYDRATE_FIREBASE_LOADING"
};

export const firebaseReducer = (state = { loading: true }, { type }) => {
  switch (type) {
  case TYPES.SET_REHYDRATE_FIREBASE_LOADING:
    return { ...state, loading: true };
  case TYPES.SET_REHYDRATE_FIREBASE:
    return { ...state, loading: false };
  default:
    return state;
  }
};

const createGithubProvider = () => {
  const provider = new firebase.auth.GithubAuthProvider();
  provider.setCustomParameters({
    allow_signup: "false"
  });

  return provider;
};

export const githubLogout = () => {
  firebase.auth().signOut();
  localStorage.removeItem("access_token");
  window.location.reload();
};

export const githubLogin = () => {
  const provider = createGithubProvider();

  return firebase
    .auth()
    .signInWithPopup(provider)
    .then(function(result) {
      const token = result.credential.accessToken;
      localStorage.setItem("access_token", token);
      window.location.reload();
      return result;
    });
};

const persistFirebase = (db, store, keys) => {
  const loop = () => {
    const id = setTimeout(() => {
      clearTimeout(id);

      const userId =
        firebase.auth().currentUser && firebase.auth().currentUser.uid;

      if (userId) {
        store.dispatch({ type: TYPES.SET_REHYDRATE_FIREBASE_LOADING });
        db.doc(`users/${userId}`)
          .get()
          .then(result => {
            const data = result.data();
            store.dispatch({
              type: TYPES.SET_REHYDRATE_FIREBASE,
              payload: keys.reduce(
                (acc, key) => ({ ...acc, [key]: data[key] }),
                {}
              )
            });
          })
          .catch(() => {
            store.dispatch({
              type: TYPES.SET_REHYDRATE_FIREBASE,
              payload: {}
            });
          });
      } else {
        loop();
      }
    }, 1000);
  };

  loop();
};

const firebaseMiddleware = middlewareConfig => {
  const db = firebase.firestore();
  db.settings({
    timestampsInSnapshots: true
  });

  return {
    persistor: reducer => (state, action) => {
      const { type, payload } = action;

      switch (type) {
      case TYPES.SET_REHYDRATE_FIREBASE:
        return reducer({ ...state, ...payload }, action);
      default:
        return reducer(state, action);
      }
    },
    firebase: store => next => {
      persistFirebase(db, store, middlewareConfig);
      return action => {
        const previosState = store.getState();
        next(action);
        const nextState = store.getState();
        const userId = firebase.auth().currentUser.uid;

        if (!userId) return;

        const storeData = middlewareConfig.reduce(
          (acc, key) => {
            if (!equals(previosState[key], nextState[key])) {
              acc.hasDiff = true;
            }
            acc.data[key] = nextState[key];
            return acc;
          },
          { hasDiff: false, data: {} }
        );

        if (storeData.hasDiff) {
          return db.doc(`users/${userId}`).set({
            ...storeData.data,
            author_id: firebase.auth().currentUser.uid
          });
        }
      };
    }
  };
};

export default firebaseMiddleware;
