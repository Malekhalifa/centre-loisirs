import { defineStore } from 'pinia';

export const usePanierStore = defineStore('panier', {
  state: () => ({
    activites: []
  }),
  getters: {
    totalItems: (state) => state.activites.length,
    totalPrix: (state) => state.activites.reduce((total, activite) => total + (Number(activite.cout) || 0), 0)
  },
  actions: {
    ajouterActivite(activite) {
      if (!this.activites.some(a => a.id === activite.id)) {
        this.activites.push(activite);
      }
    },
    supprimerActivite(id) {
      this.activites = this.activites.filter(a => a.id !== id);
    },
    viderPanier() {
      this.activites = [];
    }
  }
});