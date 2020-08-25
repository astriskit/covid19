import * as firebase from "firebase/app";

export const login = (username, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(username, password)
    .then(() => ({ data: { token: firebase.auth().currentUser.uid } }));
};

export const logout = () => {
  return firebase.auth().signOut();
};

export const signup = (username, password) => {
  return firebase.auth().createUserWithEmailAndPassword(username, password);
};
