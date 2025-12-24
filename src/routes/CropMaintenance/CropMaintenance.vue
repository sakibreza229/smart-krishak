<template>
  <div class="min-h-screen bg-gradient-to-b from-slate-50 to-green-50 p-4 md:p-8 font-sans antialiased text-slate-800">
    <header class="text-center mb-10">
      <div class="inline-flex items-center justify-center p-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl mb-6 text-white shadow-lg">
        <font-awesome-icon :icon="['fas', 'seedling']" class="text-4xl mr-3" />
        <span class="text-xl font-bold">ডিজিটাল খামার ব্যবস্থাপনা</span>
      </div>
      <h1 class="text-4xl md:text-6xl font-extrabold text-slate-900 mb-4 tracking-tight">
        স্মার্ট <span class="text-green-600">কৃষি</span> বিশ্লেষণ প্ল্যাটফর্ম
      </h1>
      <p class="text-slate-600 text-lg max-w-3xl mx-auto leading-relaxed mb-6">
        কৃত্রিম বুদ্ধিমত্তা, IoT সেন্সর এবং ড্রোন টেকনোলজির মাধ্যমে সম্পূর্ণ ডিজিটাল খামার ব্যবস্থাপনা
      </p>
      <div class="flex flex-wrap justify-center gap-4">
        <div class="flex items-center text-sm bg-white px-4 py-2 rounded-full shadow">
          <font-awesome-icon :icon="['fas', 'brain']" class="text-green-500 mr-2" />
          <span>AI বিশ্লেষণ</span>
        </div>
        <div class="flex items-center text-sm bg-white px-4 py-2 rounded-full shadow">
          <font-awesome-icon :icon="['fas', 'satellite']" class="text-blue-500 mr-2" />
          <span>স্যাটেলাইট ইমেজিং</span>
        </div>
        <div class="flex items-center text-sm bg-white px-4 py-2 rounded-full shadow">
          <font-awesome-icon :icon="['fas', 'sensor']" class="text-purple-500 mr-2" />
          <span>IoT সেন্সর</span>
        </div>
        <div class="flex items-center text-sm bg-white px-4 py-2 rounded-full shadow">
          <font-awesome-icon :icon="['fas', 'robot']" class="text-orange-500 mr-2" />
          <span>স্বয়ংক্রিয় ব্যবস্থাপনা</span>
        </div>
      </div>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
      <!-- Main Content Area -->
      <div class="lg:col-span-8 space-y-8">
        <!-- Farm Input Section -->
        <FarmInputSection
          :fieldType="fieldType"
          :cropType="cropType"
          :soilType="soilType"
          :landArea="landArea"
          :plantingDate="plantingDate"
          :irrigationType="irrigationType"
          @update:fieldType="fieldType = $event"
          @update:cropType="cropType = $event"
          @update:soilType="soilType = $event"
          @update:landArea="landArea = $event"
          @update:plantingDate="plantingDate = $event"
          @update:irrigationType="irrigationType = $event"
          @suggestCrops="suggestCrops"
          @selectCrop="selectCrop"
        />

        <!-- Drone & IoT Monitoring Section -->
        <DroneMonitoringSection
          :droneConnected="droneConnected"
          :weather="weather"
          @toggleDroneConnection="toggleDroneConnection"
          @startDroneSurvey="startDroneSurvey"
          @analyzeSatelliteData="analyzeSatelliteData"
        />
      </div>

      <!-- Sidebar -->
      <aside class="lg:col-span-4 space-y-6">
        <!-- Weather Card -->
        <WeatherCard :weather="weather" />

        <!-- Disease Detection -->
        <DiseaseDetectionCard @showDiseaseDetails="showDiseaseDetails" />

        <!-- Quick Stats -->
        <QuickStatsCard @showDetailedStats="showDetailedStats" />

        <!-- Support Section -->
        <SupportSection @connectWithOfficer="connectWithOfficer" />

        <!-- Recent Activities -->
        <RecentActivitiesCard />
      </aside>
    </div>

    <div>
      <!-- AI Analysis & Recommendations -->
        <AIAnalysisSection
          :isLoading="isLoading"
          :isFormValid="isFormValid"
          :analysisProgress="analysisProgress"
          :analysisResult="analysisResult"
          :quickAnalysis="quickAnalysis"
          @analyzeData="analyzeData"
        />
    </div>

    <!-- Results Section -->
    <div v-if="analysisResult" class="mt-12 animate-fade-in">
      <h2 class="text-3xl font-bold text-slate-900 mb-8 text-center">বিশ্লেষণ ফলাফল ও সুপারিশ</h2>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Add detailed analysis results components here -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faSeedling, faBrain, faSatellite, faRobot,
  faArrowRightLong, faCloudSun, faCloudRain, faSun,
  faDroplet, faWind, faBolt, faSink
} from '@fortawesome/free-solid-svg-icons'

// Add icons to library
library.add(
  faSeedling, faBrain, faSatellite, faRobot,
  faArrowRightLong, faCloudSun, faCloudRain, faSun,
  faDroplet, faWind, faBolt, faSink
)

// Import components
import FarmInputSection from './FarmInputSection.vue'
import DroneMonitoringSection from './DroneMonitoringSection.vue'
import AIAnalysisSection from './AIAnalysisSection.vue'
import WeatherCard from '../../components/WeatherCard.vue'
import DiseaseDetectionCard from './DiseaseDetectionCard.vue'
import QuickStatsCard from './QuickStatsCard.vue'
import SupportSection from './SupportSection.vue'
import RecentActivitiesCard from './RecentActivitiesCard.vue'

// Reactive state
const droneConnected = ref(false)
const fieldType = ref('')
const cropType = ref('')
const soilType = ref('')
const landArea = ref('')
const plantingDate = ref('')
const irrigationType = ref('')
const analysisResult = ref(null)
const quickAnalysis = ref(null)
const isLoading = ref(false)
const analysisProgress = ref(0)
const cropSuggestions = ref([])

const weather = ref({
  temperature: "২৯°C",
  humidity: "৬৫%",
  windSpeed: "১২ কিমি/ঘণ্টা",
  condition: "আংশিক মেঘলা",
  sunlight: "৭ ঘণ্টা",
  precipitation: "৩০%"
})

// Computed properties
const isFormValid = computed(() => {
  return fieldType.value && cropType.value && soilType.value && landArea.value
})

// Methods
const suggestCrops = () => {
  if (!cropType.value) {
    cropSuggestions.value = []
    return
  }
  const popularCrops = ["ধান", "গম", "আলু", "টমেটো", "বেগুন", "মরিচ", "পাট", "ভুট্টা"]
  cropSuggestions.value = popularCrops
    .filter(c => c.toLowerCase().includes(cropType.value.toLowerCase()))
    .slice(0, 5)
}

const selectCrop = (cropName) => {
  cropType.value = cropName
  cropSuggestions.value = []
}

const toggleDroneConnection = () => {
  droneConnected.value = !droneConnected.value
}

const startDroneSurvey = () => {
  if (!droneConnected.value) {
    alert('প্রথমে ড্রোন সংযুক্ত করুন')
    return
  }
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
    alert('ড্রোন সার্ভে সম্পন্ন হয়েছে! ৪.৫ জিবি ডাটা সংগ্রহ করা হয়েছে।')
  }, 5000)
}

const analyzeSatelliteData = () => {
  alert('স্যাটেলাইট ইমেজ বিশ্লেষণ শুরু হচ্ছে... এটি কিছু সময় নিতে পারে।')
}

const analyzeData = async () => {
  if (!isFormValid.value) {
    alert('দয়া করে সমস্ত প্রয়োজনীয় তথ্য প্রদান করুন')
    return
  }
  
  isLoading.value = true
  analysisProgress.value = 0
  
  const progressInterval = setInterval(() => {
    analysisProgress.value += 10
    if (analysisProgress.value >= 100) {
      clearInterval(progressInterval)
      completeAnalysis()
    }
  }, 300)
}

const completeAnalysis = () => {
  analysisResult.value = {
    healthScore: 88,
    recommendations: [
      "মাটির pH 6.5 এর কাছাকাছি নিয়ে আসুন",
      "প্রতি ১০ দিন পরপর সেচ দিন",
      "জৈব সার প্রয়োগ করুন",
      "রোগ প্রতিরোধের জন্য নিয়মিত পর্যবেক্ষণ",
      "পরবর্তী ১৫ দিনের মধ্যে নাইট্রোজেন সার প্রয়োগ করুন"
    ],
    predictedYield: `${landArea.value * 25} কেজি`,
    riskFactors: ["আগাম বৃষ্টির সম্ভাবনা", "পোকামাকড়ের আক্রমণ", "মাটির লবণাক্ততা বৃদ্ধি"],
    nextSteps: ["১৫ দিন পরপর নাইট্রোজেন সার প্রয়োগ", "আর্দ্রতা পর্যবেক্ষণ জারি রাখুন", "সপ্তাহে দুইবার ড্রোন সার্ভে"],
    aiInsights: ["ফসল ঘনত্ব সর্বোত্তম", "পানি ব্যবস্থাপনা উন্নয়ন প্রয়োজন", "জৈব সারের ব্যবহার বৃদ্ধি করুন"]
  }
  
  quickAnalysis.value = {
    healthScore: 88,
    waterNeed: "১২-১৫ মিমি",
    nutrientLevel: "৭২%",
    growthStage: "সক্রিয় বৃদ্ধি",
    diseaseRisk: "কম"
  }
  
  isLoading.value = false
  analysisProgress.value = 0
  
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth'
  })
}

const connectWithOfficer = (type) => {
  const types = {
    'video': 'ভিডিও কল',
    'chat': 'লাইভ চ্যাট',
    'call': 'ফোন কল'
  }
  alert(`${types[type]} শুরু হচ্ছে... বিশেষজ্ঞের সাথে সংযোগ হচ্ছে`)
}

const showDiseaseDetails = () => {
  alert('ব্লাইট রোগের বিস্তারিত:\n\nকারণ: ব্যাকটেরিয়া সংক্রমণ\nপ্রতিকার: কপার-ভিত্তিক ছত্রাকনাশক প্রয়োগ\nপরামর্শ: আক্রান্ত পাতা সরিয়ে ফেলুন এবং পোড়ান')
}

const showDetailedStats = (type) => {
  const stats = {
    'health': 'ফসলের স্বাস্থ্য বিশ্লেষণ',
    'moisture': 'মাটির আর্দ্রতা ট্রেন্ড',
    'nutrient': 'পুষ্টি উপাদান বিশ্লেষণ'
  }
  alert(`${stats[type]} দেখানো হচ্ছে...`)
}

// Initialize with current date
onMounted(() => {
  const today = new Date().toISOString().split('T')[0]
  plantingDate.value = today
  
  // Set default values for demonstration
  fieldType.value = 'ফসলি জমি'
  soilType.value = 'দোআঁশ মাটি'
  cropType.value = 'ধান'
  landArea.value = 5
  irrigationType.value = 'drip'
  
  // Generate quick analysis for demo
  quickAnalysis.value = {
    healthScore: 88,
    waterNeed: "১২-১৫ মিমি",
    nutrientLevel: "৭২%",
    growthStage: "সক্রিয় বৃদ্ধি",
    diseaseRisk: "কম"
  }
  
  // Simulate weather updates
  setInterval(() => {
    const temps = ["২৮°C", "২৯°C", "৩০°C", "৩১°C"]
    const conditions = ["পরিষ্কার", "আংশিক মেঘলা", "মেঘলা", "হালকা বৃষ্টি"]
    
    weather.value = {
      temperature: temps[Math.floor(Math.random() * temps.length)],
      humidity: `${60 + Math.floor(Math.random() * 10)}%`,
      windSpeed: `${8 + Math.floor(Math.random() * 8)} কিমি/ঘণ্টা`,
      condition: conditions[Math.floor(Math.random() * conditions.length)],
      sunlight: `${6 + Math.floor(Math.random() * 4)} ঘণ্টা`,
      precipitation: `${20 + Math.floor(Math.random() * 30)}%`
    }
  }, 60000)
})
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>