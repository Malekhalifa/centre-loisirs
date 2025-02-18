import PageConnexionAdmin from '@/views/PageConnexionAdmin.vue';
import { createRouter, createWebHistory, } from 'vue-router';
import PageInscription from '@/views/PageInscription.vue';
import PageConnexion from '@/views/PageConnexion.vue';

import TableauBordAdmin from '../pages/TableauBordAdmin.vue';
import CarteActivite from '../components/CarteActivite.vue';
import ModifieActivite from '../views/ModifieActivite.vue';
import AjoutActivite from '../views/AjoutActivite.vue';
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
    path: "/AjoutActivite", 
    component: AjoutActivite,
    name: 'AjoutActivite'
  },
  { 
    path: "/ModifieActivite/:id", 
    component: ModifieActivite,
    name: 'ModifieActivite',
    props: true
  },
  { 
    path: "/panier", 
    component: Panier,
    name: 'Panier',
  },

  {
    path: '/CarteActivite/:id',
    name: 'CarteActivite',
    component: CarteActivite
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;