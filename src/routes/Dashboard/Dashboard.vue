<template>
  <div class="min-h-screen bg-gradient-to-b from-emerald-50 to-green-50 p-3 md:p-4 pb-20">
    
    <!-- ওয়েলকাম বার -->
    <div class="mb-4 md:mb-6 bg-white rounded-2xl p-4 shadow-md">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="relative">
            <div class="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center">
              <font-awesome-icon :icon="['fas', 'user']" class="w-6 h-6 text-white" />
            </div>
            <div class="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
              <div class="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
          <div>
            <h1 class="text-xl md:text-2xl font-bold text-gray-800">স্বাগতম, রহিম ভাই!</h1>
            <p class="text-gray-600 text-sm">আজ: {{ currentDate }}</p>
          </div>
        </div>
        <div class="hidden md:flex items-center gap-3">
          <div class="text-center">
            <div class="text-lg font-bold text-green-600">৪</div>
            <div class="text-xs text-gray-500">ফসল</div>
          </div>
          <div class="h-8 w-px bg-gray-300"></div>
          <div class="text-center">
            <div class="text-lg font-bold text-blue-600">৭২%</div>
            <div class="text-xs text-gray-500">অগ্রগতি</div>
          </div>
        </div>
      </div>
    </div>

    <!-- মেইন কন্টেন্ট -->
    <div class="space-y-4 md:space-y-6 w-full">
      <!-- সারি ১: আবহাওয়া ও চলতি ফসল -->
      <div class="flex flex-col lg:flex-row gap-4 md:gap-6">
        <!-- বাম কলাম -->
        <div class="flex flex-col lg:w-2/3 space-y-4 md:space-y-6">
          <WeatherCard :weather="weather" class="flex-1" />
          <QuickActions :actions="quickActions" class="flex-1" />
        </div>
        
        <!-- ডান কলাম -->
        <CurrentCrops :crops="currentCrops" class="lg:w-1/3" />
      </div>

      <!-- সারি ২: আজকের কাজ ও বাজার দর -->
      <div class="flex flex-col lg:flex-row gap-4 md:gap-6">
        <!-- বাম কলাম -->
        <TodayTasks :tasks="todaysTasks" class="lg:w-2/3" />
        
        <!-- ডান কলাম -->
        <!-- এখানে prop নাম ঠিক করুন: prices => marketPrices -->
        <MarketPrices :prices="marketPrices" class="lg:w-1/3" />
      </div>

      <!-- সারি ৩: টুলস ও সরকারি নোটিশ -->
      <div class="flex flex-col lg:flex-row gap-4 md:gap-6">
        <!-- বাম কলাম -->
        <QuickTools :tools="govtTools" :links="quickLinks" class="lg:w-2/3" />
        
        <!-- ডান কলাম -->
        <GovtNoticeCard :notices="govtNotices" class="lg:w-1/3" />
      </div>
    </div>
    
    <!-- নিচের স্ট্যাটস -->
    <div class="mt-4 md:mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
      <div v-for="stat in stats" :key="stat.id" class="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">{{ stat.label }}</p>
            <p class="text-xl font-bold text-gray-800">{{ stat.value }}</p>
          </div>
          <div :class="`p-2 ${stat.iconBg} rounded-lg`">
            <font-awesome-icon :icon="stat.icon" :class="stat.iconColor" class="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

// আইকন ইমপোর্ট - নতুন আইকন যোগ করুন
import {
  faUser, faMapMarkerAlt, faTint, faWind, faCloudRain,
  faLightbulb, faBolt, faTasks, faClock, faChevronRight,
  faPlus, faLeaf, faMoneyBillWave, faBell, faArrowUp,
  faArrowDown, faList, faHeart, faPhoneAlt, faPhone,
  faMagnifyingGlass, faTractor, faCreditCard, faChartLine,
  faFlask, faBug, faComments, faWheatAwn, faCarrot,
  faSeedling, faNewspaper, faLandmark, faCalendar,
  faGraduationCap, faHandHoldingUsd, faExternalLinkAlt,
  faTools, faCalculator, faBookOpen, faGlobe, faMobileAlt,
  faCloudSun, faChartBar, faVideo, faSun, faSyncAlt, faPepperHot // নতুন আইকন যোগ করুন
} from '@fortawesome/free-solid-svg-icons'

// আইকন লাইব্রেরিতে যোগ করুন
library.add(
  faUser, faMapMarkerAlt, faTint, faWind, faCloudRain, faLightbulb,
  faBolt, faTasks, faClock, faChevronRight, faPlus, faLeaf,
  faMoneyBillWave, faBell, faArrowUp, faArrowDown, faList,
  faHeart, faPhoneAlt, faPhone, faMagnifyingGlass, faTractor,
  faCreditCard, faChartLine, faFlask, faBug, faComments,
  faWheatAwn, faCarrot, faSeedling, faNewspaper, faLandmark,
  faCalendar, faGraduationCap, faHandHoldingUsd, faExternalLinkAlt,
  faTools, faCalculator, faBookOpen, faGlobe, faMobileAlt,
  faCloudSun, faChartBar, faVideo, faSun, faSyncAlt, faPepperHot // নতুন আইকন যোগ করুন
)

// কম্পোনেন্ট ইমপোর্ট
import WeatherCard from '../../components/WeatherCard.vue'
import QuickActions from './QuickActions.vue'
import TodayTasks from './TodayTasks.vue'
import GovtNoticeCard from './GovtNoticeCard.vue'
import CurrentCrops from './CurrentCrops.vue'
import MarketPrices from './MarketPrices.vue' // কম্পোনেন্ট ইমপোর্ট নিশ্চিত করুন
import QuickTools from './QuickTools.vue'

// রিঅ্যাক্টিভ স্টেট
const currentDate = ref('')
const weather = ref({
  temperature: '৩২°C',
  condition: 'রোদেলা দিন',
  location: 'বানিয়াচং, হবিগঞ্জ'
})

// তথ্য সেটআপ
const quickActions = ref([
  { id: 1, icon: ['fas', 'magnifying-glass'], label: "ফসল স্ক্যান", description: "ছবি তুলে দেখুন", link: "/crop-analysis", color: "green" },
  { id: 2, icon: ['fas', 'bug'], label: "রোগ চিনুন", description: "পোকা সমস্যা", link: "/crop-disease-diagnosis", color: "red" },
  { id: 3, icon: ['fas', 'tractor'], label: "কৃষি গাইড", description: "যা করণীয়", link: "/crop-maintenance", color: "blue" },
  { id: 4, icon: ['fas', 'chart-line'], label: "বাজার দর", description: "আজকের দাম", link: "/agri-market", color: "amber" }
])

const todaysTasks = ref([
  { id: 1, title: "ধান ক্ষেতে সেচ দিন", time: "সকাল ৭টায়", icon: ['fas', 'tint'], color: "blue", status: "বাকি" },
  { id: 2, title: "সার ছিটান", time: "সকাল ১০টায়", icon: ['fas', 'flask'], color: "green", status: "করা হয়েছে" },
  { id: 3, title: "ফসল দেখুন", time: "বিকাল ৩টায়", icon: ['fas', 'magnifying-glass'], color: "purple", status: "বাকি" }
])

const govtNotices = ref([
  { id: 1, tag: 'সরকারি নোটিশ', date: '১৫ জানুয়ারি, ২০২৪', title: 'ধান ক্রয়ের নতুন দর ঘোষণা', icon: ['fas', 'landmark'], color: 'blue', extraInfo: 'শেষ তারিখ: ৩১ মার্চ, ২০২৪', extraIcon: ['fas', 'calendar'] },
  { id: 2, tag: 'নতুন জাত', date: '২ দিন আগে', title: 'ব্রি ধান-১০০ জাত চাষের নির্দেশিকা', icon: ['fas', 'seedling'], color: 'green' },
  { id: 3, tag: 'প্রশিক্ষণ', date: 'আগামী সপ্তাহে', title: 'জৈব কৃষি বিষয়ে বিনামূল্যে প্রশিক্ষণ', icon: ['fas', 'graduation-cap'], color: 'yellow', extraInfo: 'হবিগঞ্জ কৃষি অফিস', extraIcon: ['fas', 'map-marker-alt'] },
  { id: 4, tag: 'ভর্তুকি', date: 'সর্বশেষ আপডেট', title: 'সেচ পাম্পে ৫০% ভর্তুকি চলছে', icon: ['fas', 'hand-holding-usd'], color: 'purple' }
])

const currentCrops = ref([
  { id: 1, name: "ব্রি ধান-২৯", area: "১.৫", status: "ভালো", progress: 65, daysLeft: "৪৫", icon: ['fas', 'wheat-awn'], color: "green" },
  { id: 2, name: "পাট", area: "০.৮", status: "বিক্রি", progress: 90, daysLeft: "১০", icon: ['fas', 'leaf'], color: "amber" },
  { id: 3, name: "আলু", area: "১.২", status: "রোপণ", progress: 15, daysLeft: "৭", icon: ['fas', 'carrot'], color: "blue" }
])

// marketPrices কে ref বা reactive করুন
const marketPrices = ref([
  { crop: "ধান", price: "৪২", change: 2.5 },
  { crop: "গম", price: "৩৫", change: 1.2 },
  { crop: "আলু", price: "২৫", change: -0.8 },
  { crop: "টমেটো", price: "৩০", change: 3.1 },
  { crop: "পাট", price: "৩৮", change: 1.5 },
  { crop: "ভুট্টা", price: "২৮", change: 0.5 }
])

const govtTools = ref([
  { id: 1, title: 'ঋণ ক্যালকুলেটর', description: 'মাসিক কিস্তি জানুন', icon: ['fas', 'calculator'], color: 'purple', link: '#' },
  { id: 2, title: 'কৃষি ইবুক', description: 'বিনামূল্যে ডাউনলোড', icon: ['fas', 'book-open'], color: 'green', link: '#' },
  { id: 3, title: 'কৃষি বাতায়ন', description: 'সরকারি ওয়েবসাইট', icon: ['fas', 'globe'], color: 'blue', link: 'http://krishi.gov.bd/', external: true },
  { id: 4, title: 'মোবাইল অ্যাপ', description: 'ডাউনলোড করুন', icon: ['fas', 'mobile-alt'], color: 'orange', link: '#' },
  { id: 5, title: 'আবহাওয়া পূর্বাভাস', description: '৭ দিনের', icon: ['fas', 'cloud-sun'], color: 'cyan', link: '#' },
  { id: 6, title: 'মাটি পরীক্ষা', description: 'ল্যাব তথ্য', icon: ['fas', 'flask'], color: 'yellow', link: '#' },
  { id: 7, title: 'বাজার তথ্য', description: 'দৈনিক দর', icon: ['fas', 'chart-bar'], color: 'emerald', link: '#' },
  { id: 8, title: 'ট্রেনিং ভিডিও', description: 'কৃষি টিপস', icon: ['fas', 'video'], color: 'red', link: '#' }
])

const quickLinks = ref([
  { id: 1, label: 'আবেদন ফরম', url: '#' },
  { id: 2, label: 'সার্টিফিকেট', url: '#' },
  { id: 3, label: 'হেল্পলাইন', url: '#' },
  { id: 4, label: 'ডাউনলোড', url: '#' },
  { id: 5, label: 'ফিডব্যাক', url: '#' }
])

const stats = ref([
  { id: 1, label: "মোট ফসল", value: "৪ টি", icon: ['fas', 'leaf'], iconBg: 'bg-green-100', iconColor: 'text-green-600' },
  { id: 2, label: "সেচ বাকি", value: "২ টি", icon: ['fas', 'tint'], iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
  { id: 3, label: "এই মাসে আয়", value: "৫৪,২০০ ৳", icon: ['fas', 'money-bill-wave'], iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600' },
  { id: 4, label: "ফসল ভালো", value: "৮৯%", icon: ['fas', 'heart'], iconBg: 'bg-purple-100', iconColor: 'text-purple-600' }
])

// রিফ্রেশ ফাংশন
const refreshMarketPrices = () => {
  // বাজার দর হালনাগাদের জন্য API কল বা সিমুলেশন
  console.log('বাজার দর হালনাগাদ হচ্ছে...')
  
  // সিমুলেটেড আপডেট
  marketPrices.value.forEach(item => {
    // এলোমেলোভাবে দাম পরিবর্তন করুন (সিমুলেশনের জন্য)
    const randomChange = (Math.random() * 4 - 2).toFixed(1) // -2 থেকে +2
    item.change = parseFloat(randomChange)
    
    // দাম সামান্য পরিবর্তন করুন
    const basePrice = parseInt(item.price)
    const newPrice = basePrice + (Math.random() > 0.5 ? 1 : -1)
    item.price = Math.max(20, Math.min(50, newPrice)).toString()
  })
}

onMounted(() => {
  updateDate()
})

const updateDate = () => {
  const now = new Date()
  const options = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }
  currentDate.value = now.toLocaleDateString('bn-BD', options)
}
</script>