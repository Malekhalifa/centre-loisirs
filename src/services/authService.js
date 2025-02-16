import { auth } from "@/firebaseConfig";

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

// Fonction pour inscrire un utilisateur
export const inscription = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("Utilisateur inscrit :", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error.message);
    throw error;
  }
};

// Fonction pour connecter un utilisateur
export const connexion = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Utilisateur connecté :", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Erreur lors de la connexion :", error.message);
    throw error;
  }
};

// Fonction pour déconnecter un utilisateur
export const deconnexion = async () => {
  try {
    await signOut(auth);
    console.log("Utilisateur déconnecté");
  } catch (error) {
    console.error("Erreur lors de la déconnexion :", error.message);
    throw error;
  }
};
