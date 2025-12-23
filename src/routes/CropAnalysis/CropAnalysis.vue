<template>
  <div class="max-w-7xl mx-auto px-4 py-8 font-sans antialiased text-slate-900">    
    <!-- Main Content Row with Equal Heights -->
    <div class="flex flex-col lg:flex-row gap-8 mb-8 justify-between">
      <!-- Left Column - Analysis Card -->
      <div class="lg:w-[60%] flex-1">
        <div class="h-full">
          <AnalysisCard 
            :image="image"
            :cropInfo="cropInfo"
            :isLoading="isLoading"
            :healthPercentage="healthPercentage"
            :showMoreInfo="showMoreInfo"
            @image-uploaded="handleImageUpload"
            @reset-analysis="resetAnalysis"
            @toggle-info="toggleMoreInfo"
            @download-report="downloadReport"
            class="h-full w-full"
          />
        </div>
      </div>

      <!-- Right Column - Guidelines Sidebar -->
      <div class="lg:w-[40%]">
        <div class="h-full">
          <div class="bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-xl border border-slate-200 overflow-hidden h-full">
            <GuidelinesSidebar
              :activeFAQ="activeFAQ"
              @toggle-faq="toggleFAQ"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Support & Info Cards Section -->
    <div class="space-y-8">
      <!-- Support Cards Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Expert Support Card -->
        <div class="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white relative overflow-hidden group shadow-xl hover:shadow-2xl transition-all duration-300">
          <div class="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full -mr-10 -mt-10 blur-xl"></div>
          <div class="relative z-10">
            <div class="flex items-center gap-4 mb-5">
              <div class="w-14 h-14 rounded-xl bg-emerald-500/20 backdrop-blur-sm flex items-center justify-center border border-emerald-400/20">
                <font-awesome-icon :icon="['fas', 'headset']" class="text-emerald-300 text-xl" />
              </div>
              <div>
                <h4 class="font-bold text-xl mb-1">বিশেষজ্ঞ সহায়তা</h4>
                <p class="text-slate-300 text-sm">এআই রিপোর্টের পর আলোচনা</p>
              </div>
            </div>
            <p class="text-slate-200 text-sm mb-6 leading-relaxed">
              আমাদের সার্টিফাইড কৃষি বিশেষজ্ঞরা সরাসরি সাহায্য করতে প্রস্তুত।
            </p>
            <div class="flex gap-3 mb-6">
              <button class="flex-1 py-3.5 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-semibold transition-all shadow-lg shadow-emerald-900/30 hover:shadow-emerald-900/50 flex items-center justify-center gap-3 group">
                <font-awesome-icon :icon="['fas', 'comments']" class="group-hover:scale-110 transition-transform" />
                লাইভ চ্যাট
              </button>
              <button class="px-5 py-3.5 bg-white/10 hover:bg-white/20 rounded-xl font-semibold transition-all flex items-center justify-center gap-3 group">
                <font-awesome-icon :icon="['fas', 'phone']" class="group-hover:scale-110 transition-transform" />
                কল করুন
              </button>
            </div>
            <div class="pt-5 border-t border-white/10 flex items-center justify-between">
              <span class="flex items-center gap-2 text-sm text-slate-300">
                <div class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span>২৪/৭ উপলব্ধ</span>
              </span>
              <span class="flex items-center gap-2 text-sm text-slate-300">
                <font-awesome-icon :icon="['fas', 'user-check']" class="text-xs" />
                <span>প্রশিক্ষিত বিশেষজ্ঞ</span>
              </span>
            </div>
          </div>
        </div>

        <!-- Quick Tips Card -->
        <div class="bg-gradient-to-br from-emerald-50 to-white rounded-2xl p-6 border border-emerald-100 shadow-lg hover:shadow-xl transition-all duration-300">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center shadow-sm">
              <font-awesome-icon :icon="['fas', 'lightbulb']" class="text-emerald-600 text-xl" />
            </div>
            <div>
              <h4 class="font-bold text-xl text-slate-800 mb-1">দ্রুত পরামর্শ</h4>
              <p class="text-slate-500 text-sm">সেরা ফলাফলের জন্য</p>
            </div>
          </div>
          <div class="space-y-4">
            <div v-for="tip in quickTips" :key="tip.title"
              class="flex items-start gap-4 p-4 bg-white rounded-xl border border-slate-100 hover:border-emerald-200 hover:shadow-md transition-all duration-300 group">
              <div :class="['w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0', tip.bgColor]">
                <font-awesome-icon :icon="tip.icon" :class="tip.iconColor" />
              </div>
              <div>
                <p class="font-semibold text-slate-800 text-sm mb-1">{{ tip.title }}</p>
                <p class="text-slate-500 text-xs">{{ tip.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Statistics Card -->
        <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-50 flex items-center justify-center shadow-sm">
              <font-awesome-icon :icon="['fas', 'chart-line']" class="text-blue-600 text-xl" />
            </div>
            <div>
              <h4 class="font-bold text-xl text-slate-800 mb-1">আমাদের সাফল্য</h4>
              <p class="text-slate-500 text-sm">গবেষণাভিত্তিক ফলাফল</p>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4 mb-6">
            <div v-for="stat in statistics" :key="stat.label"
              class="bg-white p-4 rounded-xl border border-slate-100 text-center">
              <p class="text-2xl font-black mb-1" :class="stat.color">{{ stat.value }}</p>
              <p class="text-xs text-slate-500">{{ stat.label }}</p>
            </div>
          </div>
          <div class="pt-4 border-t border-blue-200">
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium text-slate-700">গড় সঠিকতা</span>
              <div class="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                <div class="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full" style="width: 95%"></div>
              </div>
              <span class="text-sm font-bold text-emerald-600">৯৫%</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Trust & Assurance Banner -->
      <div class="bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl p-6 border border-slate-200 shadow-lg mb-12">
        <div class="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div class="text-center lg:text-left">
            <h4 class="font-bold text-2xl text-slate-800 mb-3">আপনার ফসলের বিশ্বস্ত সঙ্গী</h4>
            <p class="text-slate-600">আমরা আপনার কৃষি সাফল্য নিশ্চিত করতে উন্নত প্রযুক্তি ও বিশেষজ্ঞ জ্ঞান একত্রিত করেছি</p>
          </div>
          <div class="flex flex-wrap justify-center gap-4">
            <div class="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm">
              <div class="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span class="text-sm font-medium text-slate-700">এআই বিশ্লেষণ</span>
            </div>
            <div class="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm">
              <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span class="text-sm font-medium text-slate-700">বিশেষজ্ঞ পরামর্শ</span>
            </div>
            <div class="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm">
              <div class="w-2 h-2 bg-amber-500 rounded-full"></div>
              <span class="text-sm font-medium text-slate-700">২৪/৭ সাপোর্ট</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import AnalysisCard from './AnalysisCard.vue'
import GuidelinesSidebar from './GuidelinesSidebar.vue'
import { 
  faHeadset, faPhone, faComments,
  faClock, faUserCheck, faCamera,
  faLeaf, faRefresh, faLightbulb,
  faChartLine
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faHeadset, faPhone, faComments,
  faClock, faUserCheck, faCamera,
  faLeaf, faRefresh, faLightbulb,
  faChartLine
)

const currentStep = computed(() => {
  if (!image.value) return 1
  if (isLoading.value) return 2
  if (cropInfo.value) return 3
  return 1
})

const image = ref(null)
const cropInfo = ref(null)
const isLoading = ref(false)
const showMoreInfo = ref(false)
const healthPercentage = ref(0)
const activeFAQ = ref(null)

// Quick tips data
const quickTips = [
  {
    title: 'স্পষ্ট ছবি তুলুন',
    description: 'দিনের আলোয়, কাছ থেকে তোলা ছবি',
    icon: 'camera',
    iconColor: 'text-blue-500',
    bgColor: 'bg-blue-50'
  },
  {
    title: 'ফসলের অংশ চিহ্নিত করুন',
    description: 'রোগগ্রস্ত পাতা বা কাণ্ড দেখান',
    icon: 'leaf',
    iconColor: 'text-amber-500',
    bgColor: 'bg-amber-50'
  },
  {
    title: 'পরবর্তী পর্যবেক্ষণ',
    description: '৭ দিন পর আবার ছবি তুলুন',
    icon: 'refresh',
    iconColor: 'text-emerald-500',
    bgColor: 'bg-emerald-50'
  }
]

// Statistics data
const statistics = [
  { value: '২৪/৭', label: 'সেবা প্রাপ্তি', color: 'text-blue-600' },
  { value: '১০০০+', label: 'সফল বিশ্লেষণ', color: 'text-emerald-600' },
  { value: '৫ মি.', label: 'গড় প্রতিক্রিয়া', color: 'text-indigo-600' },
  { value: '৯৫%', label: 'সঠিক বিশ্লেষণ', color: 'text-amber-600' }
]

const handleImageUpload = (file) => {
  if (file) {
    if (image.value) URL.revokeObjectURL(image.value)
    image.value = URL.createObjectURL(file)
    analyzeCrop()
  }
}

const analyzeCrop = () => {
  isLoading.value = true
  cropInfo.value = null
  setTimeout(() => {
    healthPercentage.value = 85 
    cropInfo.value = {
        name: "ধান",
        disease: "ব্লাস্ট রোগ",
        solution: "অনুমোদিত ছত্রাকনাশক সঠিক মাত্রায় ব্যবহার করুন।",
        steps: ["জমি পরিষ্কার রাখুন", "সুষম সার দিন"]
    }
    isLoading.value = false
  }, 2000)
}

const resetAnalysis = () => {
  image.value = null
  cropInfo.value = null
  healthPercentage.value = 0
}

const toggleMoreInfo = () => (showMoreInfo.value = !showMoreInfo.value)
const toggleFAQ = (index) => (activeFAQ.value = activeFAQ.value === index ? null : index)

const downloadReport = () => {
  alert("রিপোর্ট ডাউনলোড হচ্ছে...")
}
</script>

<style scoped>
/* Ensure both columns take full available height */
.lg\:w-7\/12,
.lg\:w-5\/12 {
  display: flex;
  flex-direction: column;
}

/* Make AnalysisCard take full height */
.h-full {
  display: flex;
  flex-direction: column;
  min-height: 0; /* Important for flex children */
}

/* Ensure the inner AnalysisCard component fills the space */
.h-full > * {
  flex: 1;
  min-height: 0; /* Allow flex item to shrink below content size */
}

/* Ensure GuidelinesSidebar also takes full height */
.rounded-2xl {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>