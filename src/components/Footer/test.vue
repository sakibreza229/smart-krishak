<template>
  <footer class="bg-gradient-to-b from-green-800 to-green-900 text-white">
    <!-- Main Footer -->
    <div class="container mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Logo & Description -->
        <div class="space-y-4">
          <div class="flex items-center space-x-3">
            <div class="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
              <font-awesome-icon :icon="['fas', 'seedling']" class="w-6 h-6 text-green-300" />
            </div>
            <div>
              <h2 class="text-2xl font-bold text-white">স্মার্ট কৃষক</h2>
              <p class="text-green-200 text-sm">বুদ্ধিমত্তার সাথে কৃষি</p>
            </div>
          </div>
          <p class="text-green-100 leading-relaxed">
            বাংলাদেশের কৃষকদের জন্য প্রযুক্তি নির্ভর সমাধান প্রদানকারী প্ল্যাটফর্ম। 
            আধুনিক কৃষি প্রযুক্তি ও বিশেষজ্ঞ পরামর্শের মাধ্যমে কৃষি উৎপাদন বৃদ্ধিতে সহায়তা।
          </p>
          
          <!-- Social Media -->
          <div class="pt-4">
            <h3 class="text-lg font-semibold mb-3">সামাজিক যোগাযোগ</h3>
            <div class="flex space-x-3">
              <a 
                v-for="social in socialLinks" 
                :key="social.name"
                :href="social.link"
                target="_blank"
                :class="social.class"
                class="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
              >
                <font-awesome-icon :icon="social.icon" class="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-xl font-semibold mb-6 pb-2 border-b border-green-700">দ্রুত লিংক</h3>
          <ul class="space-y-3">
            <li v-for="link in quickLinks" :key="link.name">
              <router-link 
                :to="link.path" 
                class="flex items-center space-x-2 text-green-100 hover:text-white transition-colors group"
              >
                <font-awesome-icon :icon="['fas', 'chevron-right']" class="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                <span>{{ link.name }}</span>
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Contact Information -->
        <div>
          <h3 class="text-xl font-semibold mb-6 pb-2 border-b border-green-700">যোগাযোগ</h3>
          <div class="space-y-4">
            <div v-for="contact in contactInfo" :key="contact.title" class="flex items-start space-x-3">
              <div class="w-8 h-8 bg-green-700 rounded-full flex items-center justify-center flex-shrink-0">
                <font-awesome-icon :icon="contact.icon" class="w-4 h-4 text-green-200" />
              </div>
              <div>
                <h4 class="font-medium">{{ contact.title }}</h4>
                <p class="text-green-200 text-sm mt-1">{{ contact.value }}</p>
              </div>
            </div>
          </div>
          
          <!-- Emergency Contact -->
          <div class="mt-8 p-4 bg-green-700/30 rounded-lg border border-green-600">
            <h4 class="font-semibold mb-2 flex items-center">
              <font-awesome-icon :icon="['fas', 'phone-alt']" class="mr-2 text-red-300" />
              জরুরী কৃষি হেল্পলাইন
            </h4>
            <p class="text-2xl font-bold text-white">১৬১২৩</p>
            <p class="text-sm text-green-200 mt-1">২৪/৭ সার্বক্ষণিক সেবা</p>
          </div>
        </div>

        <!-- Newsletter & Apps -->
        <div>
          <h3 class="text-xl font-semibold mb-6 pb-2 border-b border-green-700">আপডেট থাকুন</h3>
          
          <!-- Newsletter -->
          <div class="mb-8">
            <p class="text-green-100 mb-4">নতুন কৃষি প্রযুক্তি ও তথ্য পান</p>
            <div class="flex">
              <input 
                type="email" 
                v-model="email"
                placeholder="আপনার ইমেইল দিন"
                class="flex-grow px-4 py-2 rounded-l-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button 
                @click="subscribeNewsletter"
                class="bg-gradient-to-r from-green-500 to-green-600 px-4 py-2 rounded-r-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center space-x-2"
              >
                <font-awesome-icon :icon="['fas', 'paper-plane']" />
                <span>সাবস্ক্রাইব</span>
              </button>
            </div>
            <p class="text-xs text-green-300 mt-2">আমরা আপনার ইমেইল শেয়ার করব না</p>
          </div>

          <!-- Download App -->
          <div>
            <h4 class="font-semibold mb-3">মোবাইল অ্যাপ ডাউনলোড করুন</h4>
            <div class="space-y-3">
              <a 
                href="#"
                class="flex items-center space-x-3 bg-black/20 p-3 rounded-lg hover:bg-black/30 transition-colors"
              >
                <font-awesome-icon :icon="['fab', 'google-play']" class="w-6 h-6 text-green-300" />
                <div>
                  <p class="text-sm">Google Play Store</p>
                  <p class="text-xs text-green-300">Android অ্যাপ</p>
                </div>
              </a>
              <a 
                href="#"
                class="flex items-center space-x-3 bg-black/20 p-3 rounded-lg hover:bg-black/30 transition-colors"
              >
                <font-awesome-icon :icon="['fab', 'apple']" class="w-6 h-6 text-green-300" />
                <div>
                  <p class="text-sm">App Store</p>
                  <p class="text-xs text-green-300">iOS অ্যাপ</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Partners/Sponsors -->
      <div class="mt-12 pt-8 border-t border-green-700">
        <h3 class="text-center text-lg font-semibold mb-6">আমাদের সহযোগী প্রতিষ্ঠান</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          <div 
            v-for="partner in partners" 
            :key="partner.name"
            class="bg-white/5 p-4 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer"
            @click="partner.clickHandler"
          >
            <div class="text-center">
              <font-awesome-icon :icon="partner.icon" class="w-8 h-8 text-green-300 mb-2 mx-auto" />
              <p class="text-sm text-green-200">{{ partner.name }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Footer -->
    <div class="bg-green-900/50 py-6">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <!-- Copyright -->
          <div class="mb-4 md:mb-0 text-center md:text-left">
            <p class="text-green-300">
              © {{ currentYear }} স্মার্ট কৃষক. সকল অধিকার সংরক্ষিত।
            </p>
          </div>

          <!-- Additional Links -->
          <div class="flex flex-wrap justify-center space-x-4">
            <router-link 
              v-for="link in bottomLinks" 
              :key="link.name"
              :to="link.path"
              class="text-green-300 hover:text-white transition-colors text-sm"
            >
              {{ link.name }}
            </router-link>
          </div>

          <!-- Language Selector -->
          <div class="mt-4 md:mt-0">
            <select 
              v-model="selectedLanguage"
              @change="changeLanguage"
              class="bg-green-800 border border-green-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="bn">বাংলা</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>

        <!-- Government Badges -->
        <div class="mt-6 pt-6 border-t border-green-800 text-center">
          <div class="flex flex-wrap justify-center items-center gap-4">
            <div class="flex items-center space-x-2 bg-green-800/50 px-4 py-2 rounded-lg">
              <font-awesome-icon :icon="['fas', 'shield-alt']" class="text-green-300" />
              <span class="text-sm text-green-200">সরকার অনুমোদিত প্ল্যাটফর্ম</span>
            </div>
            <div class="flex items-center space-x-2 bg-green-800/50 px-4 py-2 rounded-lg">
              <font-awesome-icon :icon="['fas', 'lock']" class="text-green-300" />
              <span class="text-sm text-green-200">১০০% নিরাপদ ডেটা</span>
            </div>
            <div class="flex items-center space-x-2 bg-green-800/50 px-4 py-2 rounded-lg">
              <font-awesome-icon :icon="['fas', 'award']" class="text-yellow-300" />
              <span class="text-sm text-green-200">ডিজিটাল বাংলাদেশ পুরস্কার ২০২৩</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Back to Top Button -->
    <button 
      v-if="showBackToTop"
      @click="scrollToTop"
      class="fixed bottom-6 right-6 w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full shadow-lg flex items-center justify-center hover:from-green-600 hover:to-green-700 hover:shadow-xl transition-all duration-300 z-50"
      :class="{ 'animate-bounce': !scrolled }"
    >
      <font-awesome-icon :icon="['fas', 'arrow-up']" class="w-5 h-5 text-white" />
    </button>
  </footer>
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
  faHandHoldingUsd, faMicroscope
} from '@fortawesome/free-solid-svg-icons'
import { 
  faFacebookF, faTwitter, faYoutube, 
  faInstagram, faLinkedinIn, faGooglePlay,
  faApple
} from '@fortawesome/free-brands-svg-icons'

// Add icons to library
library.add(
  faSeedling, faChevronRight, faMapMarkerAlt, faPhoneAlt, 
  faEnvelope, faClock, faPaperPlane, faArrowUp, faShieldAlt,
  faLock, faAward, faLeaf, faTractor, faUsers, faUniversity,
  faHandHoldingUsd, faMicroscope,
  faFacebookF, faTwitter, faYoutube, faInstagram, faLinkedinIn,
  faGooglePlay, faApple
)

// Reactive state
const email = ref('')
const selectedLanguage = ref('bn')
const showBackToTop = ref(false)
const scrolled = ref(false)
const currentYear = new Date().getFullYear()

// Social media links
const socialLinks = [
  { name: 'Facebook', icon: ['fab', 'facebook-f'], link: 'https://facebook.com/smartkrishi', class: 'bg-blue-600 hover:bg-blue-700' },
  { name: 'Twitter', icon: ['fab', 'twitter'], link: 'https://twitter.com/smartkrishi', class: 'bg-sky-500 hover:bg-sky-600' },
  { name: 'YouTube', icon: ['fab', 'youtube'], link: 'https://youtube.com/smartkrishi', class: 'bg-red-600 hover:bg-red-700' },
  { name: 'Instagram', icon: ['fab', 'instagram'], link: 'https://instagram.com/smartkrishi', class: 'bg-pink-600 hover:bg-pink-700' },
  { name: 'LinkedIn', icon: ['fab', 'linkedin-in'], link: 'https://linkedin.com/company/smartkrishi', class: 'bg-blue-700 hover:bg-blue-800' },
]

// Quick links
const quickLinks = [
  { name: 'হোম', path: '/' },
  { name: 'ফসল বিশ্লেষণ', path: '/crop-analysis' },
  { name: 'রক্ষণাবেক্ষণ', path: '/crop-maintenance' },
  { name: 'কৃষি বাজার', path: '/agri-market' },
  { name: 'ঋণ ও অনুদান', path: '/agri-loans' },
  { name: 'কৃষি প্রশিক্ষণ', path: '/training' },
  { name: 'সফল কৃষকদের গল্প', path: '/success-stories' },
  { name: 'ক্যারিয়ার', path: '/career' },
]

// Contact information
const contactInfo = [
  { title: 'ঠিকানা', value: 'কৃষি মন্ত্রণালয়, বাংলাদেশ সচিবালয়, ঢাকা', icon: 'map-marker-alt' },
  { title: 'ফোন', value: '+৮৮০ ৯৬১২-৩৪৫৬৭৮', icon: 'phone-alt' },
  { title: 'ইমেইল', value: 'support@smartkrishi.gov.bd', icon: 'envelope' },
  { title: 'কার্যসময়', value: 'শনি-বৃহস্পতি, সকাল ৯টা - সন্ধ্যা ৫টা', icon: 'clock' },
]

// Partners/Sponsors
const partners = [
  { name: 'কৃষি মন্ত্রণালয়', icon: 'university', clickHandler: () => window.open('https://moa.gov.bd', '_blank') },
  { name: 'কৃষি সম্প্রসারণ অধিদপ্তর', icon: 'tractor', clickHandler: () => window.open('https://dae.gov.bd', '_blank') },
  { name: 'বিএডিসি', icon: 'seedling', clickHandler: () => window.open('https://barc.gov.bd', '_blank') },
  { name: 'কৃষি গবেষণা ফাউন্ডেশন', icon: 'microscope', clickHandler: () => window.open('https://agrf.gov.bd', '_blank') },
  { name: 'কৃষি উন্নয়ন ব্যাংক', icon: 'hand-holding-usd', clickHandler: () => window.open('https://bracbank.com', '_blank') },
  { name: 'কৃষক সমিতি', icon: 'users', clickHandler: () => window.open('https://krishok.org', '_blank') },
]

// Bottom links
const bottomLinks = [
  { name: 'গোপনীয়তা নীতি', path: '/privacy-policy' },
  { name: 'শর্তাবলী', path: '/terms' },
  { name: 'সাইট ম্যাপ', path: '/sitemap' },
  { name: 'সহায়তা', path: '/help' },
  { name: 'যোগাযোগ', path: '/contact' },
  { name: 'অভিযোগ', path: '/complaints' },
]

// Methods
const subscribeNewsletter = () => {
  if (!email.value) {
    alert('দয়া করে একটি ইমেইল ঠিকানা দিন')
    return
  }
  
  // Simulate subscription
  alert(`ধন্যবাদ! ${email.value} এই ঠিকানায় নিউজলেটার পাঠানো হবে`)
  email.value = ''
}

const changeLanguage = () => {
  // Implement language change logic
  console.log('Language changed to:', selectedLanguage.value)
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
  scrolled.value = window.scrollY > 100
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
/* Custom animations */
.animate-bounce {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* Custom transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Custom scrollbar for select */
select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2300a76f'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
}
</style>