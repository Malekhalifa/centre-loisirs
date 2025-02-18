import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";


// Fonction pour ajouter une activité
export const ajouterActivite = async (
  titre,
  typeActivite,
  cout,
  date,
  heure,
  descriptionCourte,
  description,
  imageURL,
  lieu,
  equipement,
  saison,
  ageAutorise,
  tailleAutorisee
) => {
  try {
    // Validation des données
    if (!titre || !description || !imageURL || !lieu || !saison) {
      throw new Error("Veuillez remplir tous les champs obligatoires (titre, description, image, lieu, saison).");
    }

    // Préparation des données
    const equipementArray = Array.isArray(equipement) ? equipement : equipement.split(",").map(item => item.trim());

    // Ajout à Firestore
    const docRef = await addDoc(collection(db, "activites"), {
      titre: titre,
      type_activite: typeActivite,
      cout: cout,
      date: date,
      heure: heure,
      description_courte: descriptionCourte,
      description: description,
      image: imageURL,
      lieu: lieu,
      equipement: equipementArray,
      saison: saison,
      age_autorise: ageAutorise,
      taille_autorisee: tailleAutorisee
    });

    console.log("Activité ajoutée avec ID :", docRef.id);
  } catch (error) {
    console.error("Erreur lors de l'ajout :", error);
    alert(error.message);
  }
};


// Fonction pour récupérer toutes les activités
export const obtenirActivites = async () => {

  const querySnapshot = await getDocs(collection(db, "activites"));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

};

//Fonction pour modifier une  activité
export const modifierActivite = async (id, updatedFields) => {
  try {
    // Validation de l'ID
    if (!id) {
      throw new Error("L'ID de l'activité est requis pour la mise à jour.");
    }

    // Préparation de la référence du document
    const activiteRef = doc(db, "activites", id);

    // Mise à jour du document
    await updateDoc(activiteRef, updatedFields);

    console.log("Activité mise à jour avec ID :", id);
  } catch (error) {
    console.error("Erreur lors de la mise à jour :", error);
    alert(error.message);
  }
};

// Fonction pour supprimer une activité
export const supprimerActivite = async (id) => {
  try {
    // Validation de l'ID
    if (!id) {
      throw new Error("L'ID de l'activité est requis pour la suppression.");
    }

    // Préparation de la référence du document
    const activiteRef = doc(db, "activites", id);

    // Suppression du document
    await deleteDoc(activiteRef);

    console.log("Activité supprimée avec ID :", id);
  } catch (error) {
    console.error("Erreur lors de la suppression :", error);
  }
};

// Fonction pour récupérer une activité par son ID
export const obtenirActiviteParId = async (id) => {
  try {
    // Validation de l'ID
    if (!id) {
      throw new Error("L'ID de l'activité est requis pour la récupération.");
    }

    // Préparation de la référence du document
    const activiteRef = doc(db, "activites", id);

    // Récupération du document
    const docSnapshot = await getDoc(activiteRef);

    if (docSnapshot.exists()) {
      return { id: docSnapshot.id, ...docSnapshot.data() };
    } else {
      throw new Error("Aucun document trouvé pour cet ID.");
    }
  } catch (error) {
    console.error("Erreur lors de la récupération :", error);
    alert(error.message);
  }
}

