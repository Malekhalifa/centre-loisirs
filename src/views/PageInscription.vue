<script setup>
import { ref } from "vue";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const errorMsg = ref("");
const router = useRouter();

const handleInscription = async () => {
  if (password.value !== confirmPassword.value) {
    errorMsg.value = "Les mots de passe ne correspondent pas.";
    return;
  }
  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value);
    router.push("/PageConnexion"); // Redirige vers la connexion après inscription
  } catch (error) {
    console.error(error);
    errorMsg.value = "Erreur lors de l'inscription.";
  }
};
</script>

<template>
  <div class="container">
    <div class="form-container">
      <h2>Inscription</h2>
      <form @submit.prevent="handleInscription">
        <div class="input-group">
          <label>Email</label>
          <input v-model="email" type="email" required />
        </div>
        <div class="input-group">
          <label>Mot de passe</label>
          <input v-model="password" type="password" required />
        </div>
        <div class="input-group">
          <label>Confirmer le mot de passe</label>
          <input v-model="confirmPassword" type="password" required />
        </div>
        <p v-if="errorMsg" class="error-msg">{{ errorMsg }}</p>
        <button type="submit">S'inscrire</button>
      </form>
      <p class="link-text">
        Déjà un compte ?
        <router-link to="/PageConnexion" class="login-link">Se connecter</router-link>
      </p>
    </div>
  </div>
</template>

<style scoped>
/* Styles généraux */
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f3f4f6;
  padding: 20px;
}

.form-container {
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 400px;
  max-width: 90%;
  text-align: center;
}

/* Titres */
h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
}

/* Champs de formulaire */
.input-group {
  margin-bottom: 15px;
  text-align: left;
}

.input-group label {
  display: block;
  margin-bottom: 5px;
  color: #666;
  font-size: 14px;
}

.input-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  transition: border-color 0.3s;
}

.input-group input:focus {
  border-color: #28a745;
  outline: none;
}

/* Message d'erreur */
.error-msg {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}

/* Bouton */
button {
  width: 100%;
  padding: 10px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
}

button:hover {
  background: #218838;
}

/* Lien vers la connexion */
.link-text {
  margin-top: 15px;
  color: #555;
  font-size: 14px;
}

.login-link {
  color: #007bff;
  text-decoration: none;
  font-weight: bold;
}

.login-link:hover {
  text-decoration: underline;
}
</style>
