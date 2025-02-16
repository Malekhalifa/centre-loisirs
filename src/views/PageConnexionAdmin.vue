<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
import { connexionAdmin } from "../services/authService";

const username = ref("");
const password = ref("");
const errorMsg = ref("");
const router = useRouter();
const authStore = useAuthStore();

const handleConnexionAdmin = async () => {
    try {
        await connexionAdmin(username.value, password.value);
        authStore.login("admin");
        router.push("/tableauBordAdmin"); // Redirige vers l'accueil après connexion
    } catch (error) {
        console.error(error);
        errorMsg.value = "Nom d'utilisateur ou mot de passe incorrect.";
    }
};
</script>

<template>
    <div class="container">
        <div class="form-container">
            <h2>Connexion Admin</h2>
            <form @submit.prevent="handleConnexionAdmin">
                <div class="input-group">
                    <label>Nom d'utilisateur</label>
                    <input v-model="username" type="text" required />
                </div>
                <div class="input-group">
                    <label>Mot de passe</label>
                    <input v-model="password" type="password" required />
                </div>
                <p v-if="errorMsg" class="error-msg">{{ errorMsg }}</p>
                <button type="submit">Se connecter</button>
            </form>
            <p class="link-text">
                Pas encore de compte ?
                <router-link to="/PageInscription" class="register-link">S'inscrire</router-link>
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
    border-color: #007bff;
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
    background: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.3s;
}

button:hover {
    background: #0056b3;
}

/* Lien vers l'inscription */
.link-text {
    margin-top: 15px;
    color: #555;
    font-size: 14px;
}

.register-link {
    color: #007bff;
    text-decoration: none;
    font-weight: bold;
}

.register-link:hover {
    text-decoration: underline;
}
</style>
