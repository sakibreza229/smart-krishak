import { createRouter, createWebHistory } from 'vue-router'

// Import your pages (create these files later)
import Dashboard from './Dashboard/Dashboard.vue'
import CropAnalysis from './CropAnalysis/CropAnalysis.vue'
import CropMaintenance from './CropMaintenance/CropMaintenance.vue'
import AgriculturalLoans from './AgriculturalLoans/AgriculturalLoans.vue'
import Profile from './Profile/Profile.vue'
import Settings from './Settings/Settings.vue'

const routes = [
  { path: '/', name: 'Dashboard', component: Dashboard },
  { path: '/crop-analysis', name: 'CropAnalysis', component: CropAnalysis },
  { path: '/crop-maintenance', name: 'CropMaintenance', component: CropMaintenance },
  { path: '/agri-loans', name: 'AdditionalInfo', component: AgriculturalLoans },
  { path: '/profile-page', name: 'Profile', component: Profile },
  { path: '/settings', name: 'Settings', component: Settings },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router