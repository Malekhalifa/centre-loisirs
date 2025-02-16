import PageConnexionAdmin from '@/views/PageConnexionAdmin.vue';
import { createRouter, createWebHistory, } from 'vue-router';
import GestionActivites from '@/views/GestionActivites.vue';
import PageInscription from '@/views/PageInscription.vue';
import PageConnexion from '@/views/PageConnexion.vue';

import TableauBordAdmin from '../pages/TableauBordAdmin.vue';
import CarteActivite from '../components/CarteActivite.vue';
import AccueilCentre from '../pages/AccueilCentre.vue';
import Panier from '../components/Panier.vue';


const routes = [ 
  { 
    path: "/", 
    component: AccueilCentre,
    name: 'AccueilCentre' 
  },
  { 
    path: "/tableauBordAdmin", 
    component: TableauBordAdmin, 
    meta: { requiresAuth: true },
    name: 'TableauBordAdmin'
  },
  { 
    path: "/PageConnexion", 
    component: PageConnexion,
    name: 'PageConnexion'
  },
  { 
    path: "/PageConnexionAdmin", 
    component: PageConnexionAdmin,
    name: 'PageConnexionAdmin'
  },
  { 
    path: "/PageInscription", 
    component: PageInscription,
    name: 'PageInscription'
  },
  { 
    path: "/GestionActivites", 
    component: GestionActivites,
    name: 'GestionActivites'
  },
  { 
    path: "/panier", 
    component: Panier,
    name: 'Panier',
  },

  {
    path: '/CarteActivite/:id',
    name: 'CarteActivite',
    component: CarteActivite,
    props: (route) => ({ id: route.query.id })
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;