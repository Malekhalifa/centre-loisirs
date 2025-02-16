<script setup>
import { auth } from "@/firebaseConfig";
import { ref, computed } from "vue";
import { signOut } from "firebase/auth";
import { useRouter } from "vue-router";

const router = useRouter();
const user = ref(auth.currentUser);

auth.onAuthStateChanged((u) => (user.value = u));

const deconnexion = async () => {
  await signOut(auth);
  router.push("/connexion");
};
</script>

<template>
  <nav class="bg-gray-800 p-4 text-white flex justify-between">
    <router-link to="/" class="text-lg font-bold">Centre Loisirs</router-link>
    <div>
      <router-link v-if="!user" to="/connexion" class="mr-4">Connexion</router-link>
      <router-link v-if="!user" to="/inscription" class="mr-4">Inscription</router-link>
      <button v-if="user" @click="deconnexion" class="bg-red-500 px-3 py-1 rounded">Déconnexion</button>
    </div>
  </nav>
</template>
