<template>
  <div class="p-4 md:p-8 max-w-7xl mx-auto font-sans antialiased text-slate-800">
    <header class="text-center mb-10">
      <div class="inline-flex items-center justify-center p-3 bg-green-100 rounded-2xl mb-4 text-green-700">
        <font-awesome-icon :icon="['fas', 'seedling']" class="text-3xl" />
      </div>
      <h1 class="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
        ফসল <span class="text-green-600">রক্ষণাবেক্ষণ</span> হাব
      </h1>
      <p class="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
        AI এবং ড্রোন প্রযুক্তির সমন্বয়ে আপনার খামারকে করুন আরও স্মার্ট ও লাভজনক।
      </p>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div class="lg:col-span-8 space-y-8">
        
        <section class="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          <div class="bg-slate-900 p-6 text-white flex items-center justify-between">
            <h2 class="text-xl font-bold flex items-center gap-3">
              <font-awesome-icon :icon="['fas', 'tractor']" class="text-green-400" />
              জমির তথ্য ইনপুট
            </h2>
            <span class="text-xs bg-white/10 px-3 py-1 rounded-full border border-white/20">ধাপ ১/২</span>
          </div>

          <div class="p-6 md:p-8 space-y-8">
            <div>
              <label class="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 block">জমির ধরন</label>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button
                  v-for="option in fieldTypeOptions"
                  :key="option"
                  type="button"
                  @click="fieldType = option"
                  :class="[
                    'group flex flex-col items-center p-4 rounded-2xl border-2 transition-all duration-300',
                    fieldType === option 
                      ? 'border-green-500 bg-green-50/50 scale-[1.02] shadow-md' 
                      : 'border-slate-100 hover:border-green-200 hover:bg-slate-50'
                  ]"
                >
                  <div :class="[
                    'w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-colors', 
                    fieldType === option ? 'bg-green-500 text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-green-100'
                  ]">
                    <font-awesome-icon :icon="['fas', getFieldIcon(option)]" class="text-xl" />
                  </div>
                  <span class="text-sm font-bold">{{ option }}</span>
                </button>
              </div>
            </div>

            <div class="relative">
              <label class="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2 block">ফসলের নাম</label>
              <div class="relative group">
                <input
                  type="text"
                  v-model="cropType"
                  placeholder="যেমন: ধান, গম..."
                  class="w-full p-4 pl-12 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all outline-none"
                  @input="suggestCrops"
                />
                <font-awesome-icon :icon="['fas', 'magnifying-glass']" class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
              
              <div v-if="cropSuggestions.length > 0 && cropType" 
                   class="absolute z-30 w-full mt-2 bg-white border border-slate-200 rounded-2xl shadow-2xl p-2 max-h-60 overflow-y-auto">
                <div v-for="suggestion in cropSuggestions" :key="suggestion"
                     @click="selectCrop(suggestion)"
                     class="flex items-center justify-between p-3 hover:bg-green-50 rounded-xl cursor-pointer">
                  <span class="font-medium text-slate-700">{{ suggestion }}</span>
                  <font-awesome-icon :icon="['fas', 'plus']" class="text-slate-300" />
                </div>
              </div>
            </div>

            <div>
              <label class="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 block">মাটির বৈশিষ্ট্য</label>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div
                  v-for="soil in soilOptions" :key="soil.type"
                  @click="soilType = soil.type"
                  :class="[
                    'relative cursor-pointer rounded-2xl border-2 overflow-hidden transition-all duration-300 group',
                    soilType === soil.type ? 'border-green-500 ring-4 ring-green-100' : 'border-slate-100'
                  ]"
                >
                  <img :src="soil.image" class="w-full h-24 object-cover" />
                  <div class="p-3 bg-white">
                    <p class="font-bold text-xs text-slate-800">{{ soil.type }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div class="flex flex-col sm:flex-row gap-4">
          <button
            @click="analyzeData"
            :disabled="isLoading || !isFormValid"
            class="flex-1 flex items-center justify-center gap-3 p-5 rounded-2xl text-white font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50"
          >
            <font-awesome-icon :icon="['fas', isLoading ? 'spinner' : 'wand-magic-sparkles']" :class="{'animate-spin': isLoading}" />
            {{ isLoading ? 'বিশ্লেষণ চলছে...' : 'AI স্মার্ট বিশ্লেষণ শুরু করুন' }}
          </button>
        </div>
      </div>

      <aside class="lg:col-span-4 space-y-6">
        <div class="bg-gradient-to-br from-blue-500 to-blue-700 rounded-3xl p-6 text-white shadow-xl">
          <div class="flex justify-between items-start mb-6">
            <h3 class="text-3xl font-bold">{{ weather?.temperature || '২৯°C' }}</h3>
            <font-awesome-icon :icon="['fas', 'cloud-sun']" class="text-4xl text-yellow-300" />
          </div>
          <div class="grid grid-cols-2 gap-3">
             <div class="bg-white/10 p-3 rounded-2xl text-xs">
                <p class="opacity-70">আর্দ্রতা</p>
                <p class="font-bold">{{ weather?.humidity || '৬৫%' }}</p>
             </div>
             <div class="bg-white/10 p-3 rounded-2xl text-xs">
                <p class="opacity-70">বাতাস</p>
                <p class="font-bold">{{ weather?.windSpeed || '১০ কিমি' }}</p>
             </div>
          </div>
        </div>

        <div class="bg-slate-900 rounded-3xl p-6 text-white">
          <h3 class="text-lg font-bold mb-4 flex items-center gap-2">
            <font-awesome-icon :icon="['fas', 'headset']" class="text-green-400" />
            লাইভ সাপোর্ট
          </h3>
          <button @click="connectWithOfficer" class="w-full py-4 bg-green-600 rounded-2xl font-bold hover:bg-green-500 transition-colors">
            কল শুরু করুন
          </button>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
// Ensure all used icons are imported
import { 
  faSeedling, faTractor, faWheatAwn, faCarrot, faAppleWhole, 
  faMapLocationDot, faMagnifyingGlass, faPlus, faSpinner, 
  faWandMagicSparkles, faSatelliteDish, faSquarePollVertical, 
  faLightbulb, faCircleCheck, faCloudSun, faDroplet, 
  faWind, faHeadset, faVideo, faCheck
} from '@fortawesome/free-solid-svg-icons'

// Add icons to library
library.add(
  faSeedling, faTractor, faWheatAwn, faCarrot, faAppleWhole, 
  faMapLocationDot, faMagnifyingGlass, faPlus, faSpinner, 
  faWandMagicSparkles, faSatelliteDish, faSquarePollVertical, 
  faLightbulb, faCircleCheck, faCloudSun, faDroplet, 
  faWind, faHeadset, faVideo, faCheck
)

const fieldTypeOptions = ["ফসলি জমি", "সবজি ক্ষেত", "ফলের বাগান", "অন্যান্য"]
const soilOptions = [
  { type: "দোআঁশ মাটি", image: "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?w=200" },
  { type: "কাদা মাটি", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200" },
  { type: "বালি মাটি", image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=200" },
  { type: "পলি মাটি", image: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=200" }
]
const commonCrops = ["ধান", "গম", "ভুট্টা", "আলু", "পাট", "সরিষা", "টমেটো", "বেগুন"]

const droneConnected = ref(false)
const fieldType = ref('')
const cropType = ref('')
const soilType = ref('')
const analysisResult = ref(null)
const isLoading = ref(false)
const cropSuggestions = ref([])
const weather = ref({ temperature: "২৯°C", humidity: "৬৫%", windSpeed: "১০ কিমি", condition: "পরিষ্কার" })

const isFormValid = computed(() => fieldType.value && cropType.value && soilType.value)

const getFieldIcon = (type) => {
  const map = { 'ফসলি জমি': 'wheat-awn', 'সবজি ক্ষেত': 'carrot', 'ফলের বাগান': 'apple-whole' }
  return map[type] || 'map-location-dot'
}

const suggestCrops = () => {
  if (!cropType.value) {
    cropSuggestions.value = []
    return
  }
  cropSuggestions.value = commonCrops.filter(c => c.includes(cropType.value)).slice(0, 5)
}

const selectCrop = (crop) => {
  cropType.value = crop
  cropSuggestions.value = []
}

const analyzeData = () => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
    analysisResult.value = { healthScore: 88, recommendations: ["নিয়মিত সেচ দিন"] }
  }, 2000)
}

const connectWithOfficer = () => alert("সংযুক্ত হচ্ছে...")
</script>