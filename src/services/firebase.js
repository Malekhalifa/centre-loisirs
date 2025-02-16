import { db } from "@/firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";

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

