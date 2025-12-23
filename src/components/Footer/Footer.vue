<template>
  <!-- Your Original Desktop Footer - EXACTLY as you had it -->
  <footer class="bg-gradient-to-b from-green-900 to-green-950 text-white hidden md:block">
    <!-- Main Footer Content -->
    <div class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Left Column - Brand & Description -->
        <div class="space-y-4">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
              <font-awesome-icon :icon="['fas', 'seedling']" class="w-5 h-5 text-green-300" />
            </div>
            <div>
              <h2 class="text-xl font-bold text-white">স্মার্ট কৃষক</h2>
              <p class="text-green-200 text-xs">স্মার্ট কৃষির জন্য স্মার্ট সমাধান</p>
            </div>
          </div>
          <p class="text-green-100 text-sm leading-relaxed">
            কৃষকদের জন্য আধুনিক প্রযুক্তি নির্ভর প্ল্যাটফর্ম। 
            ফসল বিশ্লেষণ, রোগ নির্ণয় ও কৃষি পরামর্শ একই স্থানে।
          </p>
          
          <!-- Social Media -->
          <div class="pt-2">
            <p class="text-green-300 text-sm mb-2">আমাদের সাথে যুক্ত থাকুন</p>
            <div class="flex space-x-2">
              <a 
                v-for="social in socialLinks" 
                :key="social.name"
                :href="social.link"
                target="_blank"
                :class="social.class"
                class="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                :title="social.name"
              >
                <font-awesome-icon :icon="social.icon" class="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <!-- Middle Column - Quick Links -->
        <div>
          <h3 class="text-lg font-semibold mb-3 text-green-300">দ্রুত লিংক</h3>
          <ul class="space-y-1">
            <li v-for="link in quickLinks" :key="link.name">
              <router-link 
                :to="link.path" 
                class="flex items-center space-x-2 text-green-100 hover:text-white transition-colors"
              >
                <span>› {{ link.name }}</span>
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Right Column - Contact & Newsletter -->
        <div class="space-y-4">
          <!-- Download App -->
          <div>
              <div class="flex item-center justify-between">
                <div>
                    <h3 class="text-lg font-semibold mb-3 text-green-300">যোগাযোগ</h3>
            <div class="space-y-2">
              <div class="flex items-center space-x-2 text-sm">
                <font-awesome-icon :icon="['fas', 'envelope']" class="w-4 h-4 text-green-300" />
                <span>support@smartkrishi.com</span>
              </div>
              <div class="flex items-center space-x-2 text-sm">
                <font-awesome-icon :icon="['fas', 'phone']" class="w-4 h-4 text-green-300" />
                <span>+৮৮০ ১৭XX-XXXXXX</span>
              </div>
            </div>
                </div>
              <div>

            <h4 class="text-lg font-semibold mb-3 text-green-300">ডাউনলোড মোবাইল অ্যাপ:</h4>
            <a 
                href="#"
                class="flex items-center space-x-3 bg-black/20 p-3 rounded-lg hover:bg-black/30 transition-colors w-max"
              >
                <font-awesome-icon :icon="['fab', 'google-play']" class="w-6 h-6 text-green-300" />
                <div>
                  <p class="text-sm">Google Play Store</p>
                  <p class="text-xs text-green-300">Android অ্যাপ</p>
                </div>
              </a>
              </div>
              
              </div>
          </div>

          <!-- Newsletter -->
          <div>
            <p class="text-green-300 text-sm mb-2">নতুন আপডেট পান</p>
            <div class="flex">
              <input 
                type="email" 
                v-model="email"
                placeholder="ইমেইল"
                class="flex-grow px-3 py-2 text-sm rounded-l-lg text-gray-800 focus:outline-none ring-1 ring-green-300 focus:ring-green-500"
              />
              <button 
                @click="subscribeNewsletter"
                class="bg-green-600 px-3 py-2 rounded-r-lg hover:bg-green-700 transition-colors text-sm flex items-center"
              >
                <font-awesome-icon :icon="['fas', 'paper-plane']" class="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="mt-8 pt-6 border-t border-green-800">
        <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <!-- Copyright -->
          <div class="text-green-300 text-sm">
            © {{ currentYear }} স্মার্ট কৃষক প্রজেক্ট | তৈরি হয়েছে কৃষকদের জন্য
          </div>

          <!-- Bottom Links -->
          <div class="flex flex-wrap justify-center space-x-4">
            <router-link 
              v-for="link in bottomLinks" 
              :key="link.name"
              :to="link.path"
              class="text-green-300 hover:text-white transition-colors text-xs"
            >
              {{ link.name }}
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Back to Top Button -->
    <button 
      v-if="showBackToTop"
      @click="scrollToTop"
      class="fixed bottom-4 right-4 w-10 h-10 bg-green-600 rounded-full shadow-md flex items-center justify-center hover:bg-green-700 hover:shadow-lg transition-all duration-300 z-50"
      title="উপরে যান"
    >
      <font-awesome-icon :icon="['fas', 'arrow-up']" class="w-4 h-4 text-white" />
    </button>
  </footer>

  <!-- MOBILE ONLY: Simple Bottom Navigation (No Footer) -->
  <nav class="md:hidden fixed bottom-0 left-0 right-0 bg-green-900 border-t border-green-800 z-50">
    <div class="grid grid-cols-4">
      <router-link 
        v-for="nav in mobileNav" 
        :key="nav.name"
        :to="nav.path"
        :class="[
          'flex flex-col items-center justify-center py-3',
          $route.path === nav.path 
            ? 'text-green-300 bg-green-800/50' 
            : 'text-green-200 hover:text-white'
        ]"
      >
        <font-awesome-icon :icon="nav.icon" class="w-5 h-5 mb-1" />
        <span class="text-xs">{{ nav.name }}</span>
      </router-link>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { 
  faSeedling, faChevronRight, faMapMarkerAlt, 
  faPhoneAlt, faEnvelope, faClock, faPaperPlane,
  faArrowUp, faShieldAlt, faLock, faAward,
  faLeaf, faTractor, faUsers, faUniversity,
  faHandHoldingUsd, faMicroscope,
  faHome, faChartLine, faComments, faUser
} from '@fortawesome/free-solid-svg-icons'
import { 
  faFacebookF, faTwitter, faYoutube, 
  faInstagram, faLinkedinIn, faGooglePlay,
  faApple, faWhatsapp
} from '@fortawesome/free-brands-svg-icons'

// Add icons to library - keeping your original ones
library.add(
  faSeedling, faChevronRight, faMapMarkerAlt, faPhoneAlt, 
  faEnvelope, faClock, faPaperPlane, faArrowUp, faShieldAlt,
  faLock, faAward, faLeaf, faTractor, faUsers, faUniversity,
  faHandHoldingUsd, faMicroscope,
  faFacebookF, faTwitter, faYoutube, faInstagram, faLinkedinIn,
  faGooglePlay, faApple, faWhatsapp,
  faHome, faChartLine, faComments, faUser
)

// Keep ALL your original reactive state and data
const email = ref('')
const showBackToTop = ref(false)
const currentYear = new Date().getFullYear()

// Your original socialLinks
const socialLinks = [
  { 
    name: 'Facebook', 
    icon: ['fab', 'facebook-f'], 
    link: '#', 
    class: 'bg-blue-600 hover:bg-blue-700' 
  },
  { 
    name: 'YouTube', 
    icon: ['fab', 'youtube'], 
    link: '#', 
    class: 'bg-red-600 hover:bg-red-700' 
  },
  { 
    name: 'WhatsApp', 
    icon: ['fab', 'whatsapp'], 
    link: '#', 
    class: 'bg-green-500 hover:bg-green-600' 
  },
]

// Your original quickLinks
const quickLinks = [
  { name: 'হোম', path: '/' },
  { name: 'বাজার দর', path: '/market' },
  { name: 'পরামর্শ', path: '/advice' },
  { name: 'গল্প', path: '/stories' },
]

// Your original bottomLinks
const bottomLinks = [
  { name: 'গোপনীয়তা', path: '/privacy' },
  { name: 'শর্তাবলী', path: '/terms' },
  { name: 'কুকি নীতি', path: '/cookies' },
  { name: 'ফিডব্যাক', path: '/feedback' },
]

// NEW: Simple mobile navigation only
const mobileNav = [
  { name: 'হোম', path: '/', icon: ['fas', 'home'] },
  { name: 'বাজার', path: '/market', icon: ['fas', 'chart-line'] },
  { name: 'পরামর্শ', path: '/advice', icon: ['fas', 'comments'] },
  { name: 'আমি', path: '/profile', icon: ['fas', 'user'] },
]

// Keep your original methods
const subscribeNewsletter = () => {
  if (!email.value) {
    alert('দয়া করে ইমেইল দিন')
    return
  }
  
  alert(`ধন্যবাদ! ${email.value} ঠিকানায় আপডেট পাঠানো হবে`)
  email.value = ''
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

// Handle scroll for back-to-top button
const handleScroll = () => {
  showBackToTop.value = window.scrollY > 300
}

// Lifecycle hooks
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* Keep your original styles */
footer {
  backdrop-filter: blur(10px);
}

* {
  transition: all 0.2s ease-in-out;
}

/* Mobile safe area */
@media (max-width: 768px) {
  nav {
    padding-bottom: env(safe-area-inset-bottom, 0);
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
  }
  
  /* Hide desktop footer on mobile */
  footer {
    display: none;
  }
}
</style>