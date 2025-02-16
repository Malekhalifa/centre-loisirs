<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="nav-bar">
      <div class="nav-title">Admin Dashboard</div>
      <div class="nav-actions">
        <button @click="logout" class="logout-button">se deconnecter</button>
      </div>
    </nav>
    <div class="container">
      <div class="grid-container">
        <section class="section">
            <div class="activities-header">
              <h2 class="section-title">Activities Management</h2>
              <button @click="showAddActivityModal" class="add-button">Add Activity</button>
            </div>
              <table class="activity-table">
                <thead>
                  <tr>
                    <th class="table-header">Titre</th>
                    <th class="table-header">Type</th>
                    <th class="table-header">Cout</th>
                    <th class="table-header">Date</th>
                    <th class="table-header">Description Courte</th>
                    <th class="table-header">Lieu</th>
                    <th class="table-header">Saison</th>
                    <th class="table-header">Âge Autorisé</th>
                    <th class="table-header">Taille Autorisée</th>
                    <th class="table-header">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="activity in activities" :key="activity.id">
                    <td class="table-cell" >{{ activity.titre }}</td>
                    <td class="table-cell">{{ activity.type_activite }}</td>
                    <td class="table-cell" >${{ activity.cout }}</td>
                    <td class="table-cell">{{ formatDate(activity.date) }} - {{ activity.heure }}</td>
                    <td class="table-cell">{{ activity.description_courte }}</td>
                    <td class="table-cell">{{ activity.lieu }}</td>
                    <td class="table-cell">{{ activity.saison }}</td>
                    <td class="table-cell">{{ activity.age_autorise }}</td>
                    <td class="table-cell">{{ activity.taille_autorisee }}</td>
                    <td class="table-cell">
                      <button @click="editActivity(activity)" class="edit-button">Edit</button>
                      <button @click="confirmDeleteActivity(activity.id)" class="delete-button">Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>
        </section>
        <section class="section">
          <h2 class="section-title">Adherents Management</h2>
          <button @click="showAddAdherentModal" class="add-button">Add Adherent</button>
          <ul>
            <li v-for="adherent in adherents" :key="adherent.id" class="adherent-item">
              <div class="adherent-info">
                <div>
                  <p>{{ adherent.name }} - {{ adherent.email }}</p>
                </div>
                <div>
                  <button @click="editAdherent(adherent)" class="edit-button">Edit</button>
                  <button @click="confirmDeleteAdherent(adherent.id)" class="delete-button">Delete</button>
                </div>
              </div>
            </li>
          </ul>
        </section>
        <section class="section">
          <h2 class="section-title">Sessions Management</h2>
          <button @click="showAddSessionModal" class="add-button">Add Session</button>
          <ul>
            <li v-for="session in sessions" :key="session.id" class="session-item">
              <div class="session-info">
                <div>
                  <p>{{ session.details }}</p>
                </div>
                <div>
                  <button @click="editSession(session)" class="edit-button">Edit</button>
                  <button @click="confirmDeleteSession(session.id)" class="delete-button">Delete</button>
                </div>
              </div>
            </li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { obtenirActivites } from "../services/firebase";

const activities = ref([]);
const errorMsg = ref("");
const router = useRouter();
const authStore = useAuthStore();

const loadActivities = async () => {
  try {
    activities.value = await obtenirActivites();
  } catch (error) {
    console.error("Error loading activities:", error);
    errorMsg.value = "Unable to load activities.";
  }
};

const formatDate = (date) => {
  if (!date || !date.seconds) {
    return 'Date invalide';
  }
  
  // Convert Firestore Timestamp to JavaScript Date
  const formattedDate = new Date(date.seconds * 1000); 

  // Ensure the date is valid
  if (isNaN(formattedDate.getTime())) {
    return 'Date invalide';
  }

  // Format the date
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return formattedDate.toLocaleDateString('fr-FR', options);
};

const logout = async () => {
  await authStore.logout();
  router.push('/');
};

onMounted(loadActivities);
</script>

<style>
.min-h-screen {
  min-height: 100vh;
}
.bg-gray-100 {
  background-color: #f7fafc;
}
.nav-bar {
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.nav-title {
  font-size: 1.25rem;
  font-weight: bold;
}
.nav-actions {
  display: flex;
  align-items: center;
}
.admin-name {
  margin-right: 1rem;
}
.logout-button {
  background-color: #f56565;
  color: #ffffff;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
}
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem;
}
.grid-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.activities-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.activities-header h2{
  margin-left: 40px;
}


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
.add-button {
  background-color: #4299e1;
  color: #ffffff;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
  display: inline-block;
  width: auto;
}
.activity-item, .adherent-item, .session-item {
  margin-bottom: 0.5rem;
}
.activity-table {
  width: 100%;
  max-width: 1280px;

  border-collapse: collapse;
  background-color: #ffffff;
}
.activity-table thead{
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
.adherent-info, .session-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
