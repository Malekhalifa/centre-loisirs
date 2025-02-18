<template>
    <div class="section">
        <div class="adherant-header">
            <h2 class="section-title">Adherant Management</h2>
            <router-link to="/AjoutAdherant">
                <button class="add-button">Ajouter un Adherant</button>
            </router-link>
        </div>
        <table class="adherant-table">
            <thead>
                <tr>
                    <th class="table-header">Nom</th>
                    <th class="table-header">Prénom</th>
                    <th class="table-header">Email</th>
                    <th class="table-header">Téléphone</th>
                    <th class="table-header">Adresse</th>
                    <th class="table-header">Date de Naissance</th>
                    <th class="table-header">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="adherant in adherants" :key="adherant.id">
                    <td class="table-cell">{{ adherant.nom }}</td>
                    <td class="table-cell">{{ adherant.prenom }}</td>
                    <td class="table-cell">{{ adherant.email }}</td>
                    <td class="table-cell">{{ adherant.telephone }}</td>
                    <td class="table-cell">{{ adherant.adresse }}</td>
                    <td class="table-cell">{{ formatDate(adherant.date_naissance) }}</td>
                    <td class="table-cell">
                        <router-link :to="{ name: 'ModifieAdherant', params: { id: adherant.id } }">
                            <button class="edit-button">Edit</button>
                        </router-link>
                        <button @click="handleAdherantDelete(adherant.id)" class="delete-button">
                            Delete
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
// import { ref, onMounted } from "vue";
// import { obtenirTousLesUtilisateurs } from "../services/authService";

// const adherants = ref([]);
// const errorMsg = ref("");

// const loadAdherants = async () => {
//     try {
//         adherants.value = await obtenirTousLesUtilisateurs();
//     } catch (error) {
//         console.error("Error loading adherants:", error);
//         errorMsg.value = "Unable to load adherants.";
//     }
// };

// const formatDate = (date) => {
//     if (!date) {
//         return "Date invalide";
//     }
//     if (!date.seconds) {
//         const formattedDate = new Date(date);
//         if (isNaN(formattedDate.getTime())) {
//             return "Date invalide";
//         }
//         const options = { year: "numeric", month: "long", day: "numeric" };
//         return formattedDate.toLocaleDateString("fr-FR", options);
//     }

//     const formattedDate = new Date(date.seconds * 1000);

//     if (isNaN(formattedDate.getTime())) {
//         return "Date invalide";
//     }

//     const options = { year: "numeric", month: "long", day: "numeric" };
//     return formattedDate.toLocaleDateString("fr-FR", options);
// };

// const handleAdherantDelete = async (id) => {
//     try {
//         await supprimerUtilisateur(id);
//         await loadAdherants();
//     } catch (error) {
//         console.error("Error deleting adherant:", error);
//         errorMsg.value = "Unable to delete adherant.";
//     }
// };

// onMounted(loadAdherants);
</script>

<style scoped>
.section {
    background-color: #ffffff;
    padding: 1rem;
    border-radius: 0.25rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.section-title {
    font-size: 1.125rem;
    font-weight: bold;
    margin-bottom: 1rem;
}
.adherant-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.adherant-header h2 {
    margin-left: 40px;
}
.adherant-table {
    width: 100%;
    max-width: 1280px;
    border-collapse: collapse;
    background-color: #ffffff;
}
.adherant-table thead {
    max-width: 1280px;
}
.table-header {
    padding: 0.75rem;
    text-align: left;
    background-color: #edf2f7;
    border-bottom: 2px solid #e2e8f0;
}
.table-cell {
    border: 1px solid #e2e8f0;
    padding: 0.75rem;
}
.edit-button {
    background-color: #ecc94b;
    color: #ffffff;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    margin-right: 0.5rem;
}
.delete-button {
    background-color: #f56565;
    color: #ffffff;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
}
</style>
