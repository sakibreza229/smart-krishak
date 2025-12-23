<template>
  <div class="p-4 md:p-6 max-w-6xl mx-auto">
    <!-- Header -->
    <div class="text-center mb-8">
      <h1 class="text-3xl md:text-4xl font-bold text-green-700 mb-3">
        <font-awesome-icon :icon="['fas', 'seedling']" class="mr-3" />
        ফসল রক্ষণাবেক্ষণ
      </h1>
      <p class="text-gray-600 text-lg max-w-3xl mx-auto">
        AI ও ড্রোন প্রযুক্তির মাধ্যমে আপনার ফসলের যত্ন নিন। বুদ্ধিমত্তা দিয়ে কৃষি ব্যবস্থাপনা করুন।
      </p>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left Column - Field Information & Actions -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Field Information Card -->
        <div class="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div class="bg-gradient-to-r from-green-500 to-green-600 p-4">
            <h2 class="text-xl font-semibold text-white flex items-center">
              <font-awesome-icon :icon="['fas', 'tractor']" class="mr-2" />
              জমির তথ্য ইনপুট
            </h2>
          </div>
          <div class="p-6">
            <!-- Field Type Selection -->
            <div class="mb-6">
              <label class="block text-sm font-medium mb-3 text-gray-700 flex items-center">
                <font-awesome-icon :icon="['fas', 'map']" class="mr-2" />
                জমির ধরন নির্বাচন করুন
              </label>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button
                  v-for="option in fieldTypeOptions"
                  :key="option"
                  @click="fieldType = option"
                  :class="[
                    'p-4 rounded-lg border transition-all duration-200',
                    fieldType === option 
                      ? 'bg-green-100 border-green-500 text-green-700 ring-2 ring-green-200' 
                      : 'bg-gray-50 hover:bg-gray-100 border-gray-200'
                  ]"
                >
                  <font-awesome-icon 
                    :icon="getFieldIcon(option)" 
                    class="w-6 h-6 mb-2 mx-auto block"
                    :class="fieldType === option ? 'text-green-600' : 'text-gray-500'"
                  />
                  <span class="text-sm font-medium">{{ option }}</span>
                </button>
              </div>
            </div>

            <!-- Crop Type Input -->
            <div class="mb-6">
              <label class="block text-sm font-medium mb-3 text-gray-700 flex items-center">
                <font-awesome-icon :icon="['fas', 'wheat-awn']" class="mr-2" />
                ফসলের ধরন
              </label>
              <div class="relative">
                <input
                  type="text"
                  v-model="cropType"
                  placeholder="যেমন: ধান, গম, ভুট্টা, আলু"
                  class="w-full p-4 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  @input="suggestCrops"
                />
                <font-awesome-icon 
                  :icon="['fas', 'search']" 
                  class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                
                <!-- Crop Suggestions -->
                <div v-if="cropSuggestions.length > 0 && cropType" 
                     class="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                  <div v-for="suggestion in cropSuggestions" 
                       :key="suggestion"
                       @click="selectCrop(suggestion)"
                       class="p-3 hover:bg-green-50 cursor-pointer border-b border-gray-100 last:border-b-0">
                    <font-awesome-icon :icon="['fas', 'check']" class="mr-2 text-green-500" />
                    {{ suggestion }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Soil Type Selection -->
            <div class="mb-6">
              <label class="block text-sm font-medium mb-3 text-gray-700 flex items-center">
                <font-awesome-icon :icon="['fas', 'mountain']" class="mr-2" />
                মাটির ধরন নির্বাচন করুন
              </label>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div
                  v-for="soil in soilOptions"
                  :key="soil.type"
                  @click="soilType = soil.type"
                  :class="[
                    'group cursor-pointer rounded-xl border overflow-hidden transition-all duration-300',
                    soilType === soil.type 
                      ? 'ring-2 ring-green-500 shadow-lg transform scale-105' 
                      : 'hover:shadow-md hover:border-green-300'
                  ]"
                >
                  <div class="relative h-32 overflow-hidden">
                    <img 
                      :src="soil.image" 
                      :alt="soil.type" 
                      class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div v-if="soilType === soil.type" 
                         class="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
                      <font-awesome-icon :icon="['fas', 'check']" />
                    </div>
                  </div>
                  <div class="p-3 bg-white">
                    <p class="font-medium text-gray-800">{{ soil.type }}</p>
                    <p class="text-xs text-gray-600 mt-1">{{ soil.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            @click="analyzeData"
            :disabled="isLoading || !isFormValid"
            :class="[
              'flex items-center justify-center gap-3 p-4 rounded-xl text-white font-medium transition-all duration-300',
              isLoading 
                ? 'bg-blue-400 cursor-not-allowed' 
                : !isFormValid 
                  ? 'bg-gray-300 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 hover:shadow-lg'
            ]"
          >
            <font-awesome-icon 
              :icon="isLoading ? ['fas', 'spinner'] : ['fas', 'chart-line']" 
              :class="isLoading ? 'animate-spin' : ''"
              class="w-5 h-5"
            />
            {{ isLoading ? 'বিশ্লেষণ চলছে...' : 'AI বিশ্লেষণ চালান' }}
          </button>

          <button
            @click="toggleDroneConnection"
            :class="[
              'flex items-center justify-center gap-3 p-4 rounded-xl font-medium transition-all duration-300',
              droneConnected
                ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
            ]"
          >
            <font-awesome-icon 
              :icon="droneConnected ? ['fas', 'drone'] : ['fas', 'drone']" 
              class="w-5 h-5"
            />
            {{ droneConnected ? 'ড্রোন সংযুক্ত ✅' : 'ড্রোন সংযুক্ত করুন' }}
          </button>
        </div>

        <!-- Drone Connection Message -->
        <div v-if="!droneConnected" class="bg-gradient-to-r from-yellow-50 to-yellow-100 border-l-4 border-yellow-400 p-4 rounded-r-lg">
          <div class="flex items-start">
            <font-awesome-icon :icon="['fas', 'lightbulb']" class="text-yellow-500 mt-1 mr-3" />
            <div>
              <p class="font-medium text-yellow-800">ড্রোন সংযোগের সুবিধা</p>
              <p class="text-sm text-yellow-700 mt-1">
                ড্রোন সংযুক্ত করলে ফসলের স্বাস্থ্য, রোগ বালাই এবং সেচের প্রয়োজনীয়তা সম্পর্কে আরও সঠিক তথ্য পাবেন।
              </p>
            </div>
          </div>
        </div>

        <!-- Analysis Result -->
        <div v-if="analysisResult" class="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div class="bg-gradient-to-r from-green-500 to-green-600 p-4">
            <h2 class="text-xl font-semibold text-white flex items-center">
              <font-awesome-icon :icon="['fas', 'chart-bar']" class="mr-2" />
              বিশ্লেষণ ফলাফল
            </h2>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Basic Info -->
              <div class="space-y-4">
                <h3 class="font-medium text-gray-700 mb-3">জমির তথ্য</h3>
                <div class="flex items-center p-3 bg-gray-50 rounded-lg">
                  <font-awesome-icon :icon="['fas', 'tractor']" class="text-green-500 mr-3" />
                  <div>
                    <p class="text-sm text-gray-500">জমির ধরন</p>
                    <p class="font-medium">{{ analysisResult.fieldType }}</p>
                  </div>
                </div>
                <div class="flex items-center p-3 bg-gray-50 rounded-lg">
                  <font-awesome-icon :icon="['fas', 'wheat-awn']" class="text-yellow-500 mr-3" />
                  <div>
                    <p class="text-sm text-gray-500">ফসলের ধরন</p>
                    <p class="font-medium">{{ analysisResult.cropType }}</p>
                  </div>
                </div>
                <div class="flex items-center p-3 bg-gray-50 rounded-lg">
                  <font-awesome-icon :icon="['fas', 'mountain']" class="text-brown-500 mr-3" />
                  <div>
                    <p class="text-sm text-gray-500">মাটির ধরন</p>
                    <p class="font-medium">{{ analysisResult.soilType }}</p>
                  </div>
                </div>
              </div>

              <!-- Recommendations -->
              <div>
                <h3 class="font-medium text-gray-700 mb-3">ফসলের অবস্থা ও পরামর্শ</h3>
                <div class="mb-4">
                  <div class="flex items-center mb-2">
                    <span class="text-2xl font-bold" :class="getHealthColor(analysisResult.healthScore)">
                      {{ analysisResult.healthScore }}%
                    </span>
                    <span class="ml-2 text-sm text-gray-600">স্বাস্থ্য স্কোর</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-green-500 h-2 rounded-full" :style="{ width: analysisResult.healthScore + '%' }"></div>
                  </div>
                </div>
                
                <div class="space-y-3">
                  <div v-for="(recommendation, index) in analysisResult.recommendations" 
                       :key="index"
                       class="flex items-start p-3 bg-green-50 rounded-lg">
                    <font-awesome-icon :icon="['fas', 'check-circle']" class="text-green-500 mt-1 mr-3" />
                    <p class="text-sm text-gray-700">{{ recommendation }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Connect with Officer -->
        <div class="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100 rounded-xl p-6">
          <div class="flex flex-col md:flex-row items-center justify-between">
            <div class="mb-4 md:mb-0">
              <h3 class="text-lg font-semibold text-purple-800 mb-2">
                <font-awesome-icon :icon="['fas', 'user-tie']" class="mr-2" />
                সরাসরি বিশেষজ্ঞের সাথে কথা বলুন
              </h3>
              <p class="text-purple-600">সরকারি কৃষি কর্মকর্তা বা বিশেষজ্ঞের সাথে ফ্রি কনসাল্টেশন</p>
            </div>
            <button
              @click="connectWithOfficer"
              class="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <font-awesome-icon :icon="['fas', 'phone-alt']" />
              এখনই যোগাযোগ করুন
            </button>
          </div>
        </div>
      </div>

      <!-- Right Column - Features & Stats -->
      <div class="space-y-6">
        <!-- Quick Features -->
        <div class="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">দ্রুত ফিচারসমূহ</h3>
          <div class="space-y-3">
            <div v-for="feature in quickFeatures" 
                 :key="feature.title"
                 @click="feature.action"
                 class="group p-4 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 cursor-pointer transition-all duration-200">
              <div class="flex items-center">
                <div class="w-12 h-12 rounded-lg flex items-center justify-center"
                     :class="feature.color">
                  <font-awesome-icon :icon="feature.icon" class="w-6 h-6 text-white" />
                </div>
                <div class="ml-4">
                  <p class="font-medium text-gray-800 group-hover:text-green-700">{{ feature.title }}</p>
                  <p class="text-sm text-gray-600 mt-1">{{ feature.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Weather Forecast -->
        <div class="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
          <h3 class="text-lg font-semibold text-blue-800 mb-4 flex items-center">
            <font-awesome-icon :icon="['fas', 'cloud-sun']" class="mr-2" />
            আবহাওয়া অবস্থা
          </h3>
          <div v-if="weather" class="text-center">
            <div class="text-5xl font-bold text-blue-600 mb-2">{{ weather.temperature }}</div>
            <p class="text-gray-700 mb-4">{{ weather.condition }}</p>
            <div class="grid grid-cols-3 gap-3 text-center">
              <div class="bg-white/50 p-3 rounded-lg">
                <font-awesome-icon :icon="['fas', 'wind']" class="text-blue-500 mb-1" />
                <p class="text-sm text-gray-600">বাতাস</p>
                <p class="font-semibold">{{ weather.windSpeed }}</p>
              </div>
              <div class="bg-white/50 p-3 rounded-lg">
                <font-awesome-icon :icon="['fas', 'tint']" class="text-blue-500 mb-1" />
                <p class="text-sm text-gray-600">আর্দ্রতা</p>
                <p class="font-semibold">{{ weather.humidity }}</p>
              </div>
              <div class="bg-white/50 p-3 rounded-lg">
                <font-awesome-icon :icon="['fas', 'cloud-rain']" class="text-blue-500 mb-1" />
                <p class="text-sm text-gray-600">বৃষ্টির সম্ভাবনা</p>
                <p class="font-semibold">{{ weather.precipitation }}</p>
              </div>
            </div>
          </div>
          <div v-else class="text-center py-8">
            <font-awesome-icon :icon="['fas', 'cloud']" class="w-12 h-12 text-blue-300 mb-3" />
            <p class="text-gray-500">আবহাওয়া তথ্য লোড হচ্ছে...</p>
          </div>
        </div>

        <!-- Stats Card -->
        <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
          <h3 class="text-lg font-semibold text-green-800 mb-4">আপনার কৃষি পরিসংখ্যান</h3>
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-gray-600">মোট বিশ্লেষণ</span>
              <span class="font-bold text-green-700">{{ stats.totalAnalysis }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600">সফল বিশ্লেষণ</span>
              <span class="font-bold text-green-700">{{ stats.successfulAnalysis }}%</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600">সময় সাশ্রয়</span>
              <span class="font-bold text-green-700">{{ stats.timeSaved }} ঘণ্টা</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600">উৎপাদন বৃদ্ধি</span>
              <span class="font-bold text-green-700">{{ stats.productivityIncrease }}%</span>
            </div>
          </div>
        </div>

        <!-- Emergency Help -->
        <div class="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-6 border border-red-100">
          <h3 class="text-lg font-semibold text-red-800 mb-3 flex items-center">
            <font-awesome-icon :icon="['fas', 'exclamation-triangle']" class="mr-2" />
            জরুরী সাহায্য
          </h3>
          <p class="text-red-600 text-sm mb-4">ফসলের জরুরী সমস্যা হলে এখনই সাহায্য পান</p>
          <button 
            @click="emergencyHelp"
            class="w-full flex items-center justify-center gap-2 p-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:shadow-lg transition-all duration-300">
            <font-awesome-icon :icon="['fas', 'phone-alt']" />
            জরুরী হেল্পলাইন: ১৬১২৩
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Reactive state
const droneConnected = ref(false)
const fieldType = ref('')
const cropType = ref('')
const soilType = ref('')
const analysisResult = ref(null)
const isLoading = ref(false)
const cropSuggestions = ref([])
const weather = ref(null)

// Form validation
const isFormValid = computed(() => {
  return fieldType.value && cropType.value && soilType.value
})

// Field type options
const fieldTypeOptions = ["ফসলি জমি", "সবজি ক্ষেত", "ফলের বাগান", "অন্যান্য"]

// Get field icon based on type
const getFieldIcon = (type) => {
  const iconMap = {
    'ফসলি জমি': 'wheat-awn',
    'সবজি ক্ষেত': 'carrot',
    'ফলের বাগান': 'apple-whole',
    'অন্যান্য': 'map'
  }
  return iconMap[type] || 'map'
}

// Soil type options
const soilOptions = [
  {
    type: "দোআঁশ মাটি",
    image: "/images/মাটি/দোআশ.jpg",
    description: "উর্বর মাটি, ফসলের জন্য আদর্শ"
  },
  {
    type: "কাদা মাটি",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop",
    description: "জল ধারণ ক্ষমতা বেশি"
  },
  {
    type: "বালি মাটি",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=200&fit=crop",
    description: "জল দ্রুত নিষ্কাশন হয়"
  },
  {
    type: "পলি মাটি",
    image: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=400&h=200&fit=crop",
    description: "পুষ্টিগুণ সমৃদ্ধ মাটি"
  }
]

// Quick features
const quickFeatures = [
  {
    title: "ফসল স্বাস্থ্য পরীক্ষা",
    description: "AI দ্বারা ফসলের স্বাস্থ্য বিশ্লেষণ",
    icon: 'heartbeat',
    color: 'bg-red-500',
    action: () => console.log('ফসল স্বাস্থ্য পরীক্ষা')
  },
  {
    title: "সেচ ব্যবস্থাপনা",
    description: "স্মার্ট সেচ পরামর্শ ও সময়সূচী",
    icon: 'tint',
    color: 'bg-blue-500',
    action: () => console.log('সেচ ব্যবস্থাপনা')
  },
  {
    title: "মাটির পুষ্টি পরীক্ষা",
    description: "মাটির পুষ্টি উপাদান বিশ্লেষণ",
    icon: 'flask',
    color: 'bg-yellow-500',
    action: () => console.log('মাটির পুষ্টি পরীক্ষা')
  },
  {
    title: "ড্রোন পরিচালনা",
    description: "ড্রোন দ্বারা জমি সার্ভে করুন",
    icon: 'drone',
    color: 'bg-purple-500',
    action: () => console.log('ড্রোন পরিচালনা')
  }
]

// Stats
const stats = ref({
  totalAnalysis: 47,
  successfulAnalysis: 92,
  timeSaved: 156,
  productivityIncrease: 35
})

// Common crop suggestions
const commonCrops = [
  "ধান", "গম", "ভুট্টা", "আলু", "পাট", "সরিষা", "তুলা", "আখ", 
  "ডাল", "পেঁয়াজ", "রসুন", "মরিচ", "বেগুন", "টমেটো", "শসা", "লাউ"
]

// Methods
const suggestCrops = () => {
  if (!cropType.value) {
    cropSuggestions.value = []
    return
  }
  cropSuggestions.value = commonCrops.filter(crop => 
    crop.toLowerCase().includes(cropType.value.toLowerCase())
  ).slice(0, 5)
}

const selectCrop = (crop) => {
  cropType.value = crop
  cropSuggestions.value = []
}

const analyzeData = () => {
  if (!isFormValid.value) {
    alert("দয়া করে আপনার জমির তথ্য পূরণ করুন।")
    return
  }

  isLoading.value = true
  
  // Simulate API call
  setTimeout(() => {
    const healthScore = droneConnected.value ? 85 + Math.floor(Math.random() * 15) : 70 + Math.floor(Math.random() * 15)
    
    analysisResult.value = {
      fieldType: fieldType.value,
      cropType: cropType.value,
      soilType: soilType.value,
      healthScore: healthScore,
      healthStatus: healthScore > 80 ? "খুব ভাল" : healthScore > 60 ? "ভাল" : "উন্নতির প্রয়োজন",
      recommendations: [
        `${soilType.value} এর জন্য উপযুক্ত সার প্রয়োগ করুন`,
        "নিয়মিত সেচ দিয়ে মাটির আর্দ্রতা বজায় রাখুন",
        droneConnected.value 
          ? "ড্রোন দ্বারা সপ্তাহে দুইবার ফসল পর্যবেক্ষণ করুন" 
          : "আরো সঠিক বিশ্লেষণের জন্য ড্রোন সংযুক্ত করুন",
        "ফসলের রোগ বালাইয়ের জন্য নিয়মিত পর্যবেক্ষণ করুন",
        "উন্নত বীজ ব্যবহার করে উৎপাদন বৃদ্ধি করুন"
      ]
    }
    isLoading.value = false
    
    // Update stats
    stats.value.totalAnalysis++
    stats.value.successfulAnalysis = Math.min(100, Math.floor((stats.value.successfulAnalysis * (stats.value.totalAnalysis - 1) + 100) / stats.value.totalAnalysis))
  }, 2000)
}

const toggleDroneConnection = () => {
  droneConnected.value = !droneConnected.value
}

const connectWithOfficer = () => {
  alert("সরকারি কৃষি কর্মকর্তার সাথে সংযুক্ত হচ্ছে...")
  setTimeout(() => {
    alert("কৃষি কর্মকর্তার সাথে সংযোগ সফল! তারা আপনার সাথে শীঘ্রই যোগাযোগ করবেন।")
  }, 2000)
}

const emergencyHelp = () => {
  if (confirm("আপনি কি জরুরী কৃষি হেল্পলাইনে কল করতে চান?")) {
    window.location.href = 'tel:16123'
  }
}

const getHealthColor = (score) => {
  if (score >= 80) return 'text-green-600'
  if (score >= 60) return 'text-yellow-600'
  return 'text-red-600'
}

// Fetch weather data
const fetchWeather = async () => {
  try {
    // Using OpenWeatherMap API (you'll need an API key)
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Dhaka,BD&units=metric&appid=YOUR_API_KEY`
    )
    const data = await response.json()
    
    weather.value = {
      temperature: `${Math.round(data.main.temp)}°C`,
      condition: "আংশিক মেঘলা",
      windSpeed: `${data.wind.speed} km/h`,
      humidity: `${data.main.humidity}%`,
      precipitation: "30%"
    }
  } catch (error) {
    // Fallback data
    weather.value = {
      temperature: "28°C",
      condition: "আংশিক মেঘলা",
      windSpeed: "12 km/h",
      humidity: "78%",
      precipitation: "30%"
    }
  }
}

onMounted(() => {
  fetchWeather()
})
</script>

<style scoped>
/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}

/* Smooth transitions */
* {
  transition: background-color 0.3s ease, border-color 0.3s ease, transform 0.3s ease;
}
</style>