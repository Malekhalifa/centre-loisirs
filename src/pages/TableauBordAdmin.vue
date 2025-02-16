<template>
    <div class="p-6">
      <h1 class="text-2xl font-bold">Tableau de bord Administrateur</h1>
      <button @click="deconnexion" class="bg-red-500 text-white px-4 py-2">Déconnexion</button>
    </div>
  </template>
  
  <script setup>
  const deconnexion = () => {
    console.log("Déconnexion en cours...");
  };
  </script>
  