import { createRouter, createWebHistory } from 'vue-router'

// Import your pages (create these files later)
const Home = () => import('../views/Home.vue')
const CropAnalysis = () => import('../views/CropAnalysis.vue')
const CropMaintenance = () => import('../views/CropMaintenance.vue')
const AgriculturalLoans = () => import('../views/AgriculturalLoans.vue')
const Profile = () => import('../views/Profile.vue')
const Settings = () => import('../views/Settings.vue')
const AboutUs = () => import('../views/AboutUs.vue')
const Instructions = () => import('../views/Instructions.vue')
const PrivacyPolicy = () => import('../views/PrivacyPolicy.vue')

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/crop-analysis', name: 'CropAnalysis', component: CropAnalysis },
  { path: '/crop-maintenance', name: 'CropMaintenance', component: CropMaintenance },
  { path: '/agri-loans', name: 'AdditionalInfo', component: AgriculturalLoans },
  { path: '/profile-page', name: 'Profile', component: Profile },
  { path: '/settings', name: 'Settings', component: Settings },
  { path: '/about-us', name: 'AboutUs', component: AboutUs },
  { path: '/app-instruction', name: 'Instructions', component: Instructions },
  { path: '/privacy-policy', name: 'PrivacyPolicy', component: PrivacyPolicy },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router