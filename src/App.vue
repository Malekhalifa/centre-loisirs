<script>
import { computed } from 'vue';
import { useAuthStore } from './stores/auth';
import { deconnexion } from './services/authService';

export default {
  setup() {
    const authStore = useAuthStore();
    const isUserAuthenticated = computed(() => authStore.isUserAuthenticated);
    const isAdmin = computed(() => authStore.isAdmin);
    const handleLogout = async () => {
      if(!isAdmin.value){
        try {
          await deconnexion();
        } catch (error) {
          console.error(error);
          return;
        }
      }
      authStore.logout();
    };
    return {
      isUserAuthenticated,
      isAdmin,
      handleLogout
    };
  }
};
</script>

<template>
  <nav>
    <router-link v-if="!isAdmin" to="/">Accueil </router-link> 
    <router-link v-if="isAdmin"  to="/tableauBordAdmin">Tableau de Bord </router-link>
    <router-link v-if="!isUserAuthenticated" to="/PageConnexion">Se connecter </router-link> 
    <router-link v-if="!isUserAuthenticated" to="/PageConnexionAdmin">Se connecter (admin) </router-link> 
    <router-link v-if="!isUserAuthenticated" to="/PageInscription">S'inscrire </router-link> 
    <router-link v-if="!isAdmin" to="/panier">Panier </router-link>
    <router-link v-if="isUserAuthenticated" @click.prevent="handleLogout" to="*">Déconnecter </router-link> 
  </nav>
  <router-view/>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
    &:not(:last-child){
      margin-right: 2px;
      border-right:  dashed 3px #2c3e50;
    }
  }
}
</style>
