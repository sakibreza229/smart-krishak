<template>
  <div class="min-h-screen bg-gradient-to-b from-emerald-50 to-green-50 p-3 md:p-4">
    <!-- Welcome Bar - Simple & Clear -->
    <div class="mb-4 md:mb-6 bg-white rounded-2xl p-4 shadow-md">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <!-- Profile Avatar -->
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
            <p class="text-gray-600 text-sm">আজকের তারিখ: {{ currentDate }}</p>
          </div>
        </div>
        
        <!-- Quick Stats -->
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

    <!-- Main Grid - Mobile First, Simple Layout -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
      <!-- Left Column (2/3 on desktop) -->
      <div class="lg:col-span-2 space-y-4 md:space-y-6">
        <!-- Weather Card - Simple & Clear -->
        <div class="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-5 text-white shadow-xl">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h2 class="text-xl font-bold mb-1">আজকের আবহাওয়া</h2>
              <div class="flex items-center gap-2 text-sm opacity-90">
                <font-awesome-icon :icon="['fas', 'map-marker-alt']" class="w-4 h-4" />
                <span>বানিয়াচং, হবিগঞ্জ</span>
              </div>
            </div>
            <div class="text-right">
              <div class="text-3xl font-bold">{{ weather?.temperature || '৩২°C' }}</div>
              <div class="text-sm opacity-90">{{ weather?.condition || 'রোদেলা দিন' }}</div>
            </div>
          </div>
          
          <!-- Simple Weather Info -->
          <div class="grid grid-cols-3 gap-3 mt-6">
            <div class="bg-white/20 p-3 rounded-xl text-center">
              <font-awesome-icon :icon="['fas', 'tint']" class="w-5 h-5 mb-1" />
              <div class="text-xs">আর্দ্রতা</div>
              <div class="font-bold text-lg">৭০%</div>
            </div>
            <div class="bg-white/20 p-3 rounded-xl text-center">
              <font-awesome-icon :icon="['fas', 'wind']" class="w-5 h-5 mb-1" />
              <div class="text-xs">বাতাস</div>
              <div class="font-bold text-lg">১০ কিমি</div>
            </div>
            <div class="bg-white/20 p-3 rounded-xl text-center">
              <font-awesome-icon :icon="['fas', 'cloud-rain']" class="w-5 h-5 mb-1" />
              <div class="text-xs">বৃষ্টি</div>
              <div class="font-bold text-lg">৩০%</div>
            </div>
          </div>
          
          <!-- Simple Suggestion -->
          <div class="mt-6 pt-4 border-t border-white/30">
            <div class="flex items-start gap-2">
              <div class="bg-white/20 p-2 rounded-lg">
                <font-awesome-icon :icon="['fas', 'lightbulb']" class="w-4 h-4" />
              </div>
              <p class="text-sm opacity-90">আজ বিকেলে হালকা বৃষ্টির সম্ভাবনা। সকালেই ফসলের সেচ দিন।</p>
            </div>
          </div>
        </div>

        <!-- Quick Actions - Big Buttons for Easy Touch -->
        <div class="bg-white rounded-2xl p-5 shadow-md">
          <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <div class="p-2 bg-green-100 rounded-lg">
              <font-awesome-icon :icon="['fas', 'bolt']" class="w-5 h-5 text-green-600" />
            </div>
            তাড়াতাড়ি যা করণীয়
          </h2>
          
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
            <router-link 
              v-for="action in quickActions" 
              :key="action.id"
              :to="action.link"
              class="group bg-gradient-to-b from-white to-gray-50 p-4 rounded-xl border-2 border-gray-100 hover:border-green-300 hover:shadow-lg transition-all active:scale-95"
            >
              <div class="flex flex-col items-center text-center">
                <div :class="`p-3 rounded-full ${action.bgColor} mb-2`">
                  <font-awesome-icon 
                    :icon="action.icon" 
                    class="w-6 h-6"
                    :class="action.textColor"
                  />
                </div>
                <span class="font-semibold text-gray-800 text-sm mb-1">{{ action.label }}</span>
                <span class="text-xs text-gray-500">{{ action.description }}</span>
              </div>
            </router-link>
          </div>
        </div>

        <!-- Today's Work - Simple Task List -->
        <div class="bg-white rounded-2xl p-5 shadow-md">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-bold text-gray-800 flex items-center gap-2">
              <div class="p-2 bg-orange-100 rounded-lg">
                <font-awesome-icon :icon="['fas', 'tasks']" class="w-5 h-5 text-orange-600" />
              </div>
              আজকের কাজ
            </h2>
            <button class="text-sm text-green-600 font-semibold">সব দেখুন →</button>
          </div>
          
          <div class="space-y-3">
            <div 
              v-for="task in todaysTasks" 
              :key="task.id"
              class="flex items-center justify-between p-3 rounded-xl border border-gray-200 hover:bg-green-50"
            >
              <div class="flex items-center gap-3">
                <div :class="`p-2 rounded-lg ${task.iconBg}`">
                  <font-awesome-icon :icon="task.icon" :class="task.iconColor" class="w-5 h-5" />
                </div>
                <div>
                  <p class="font-semibold text-gray-800">{{ task.title }}</p>
                  <div class="flex items-center gap-2 text-sm text-gray-500">
                    <font-awesome-icon :icon="['fas', 'clock']" class="w-3 h-3" />
                    {{ task.time }}
                  </div>
                </div>
              </div>
              <div class="flex flex-col items-end gap-1">
                <span :class="`px-3 py-1 rounded-full text-xs font-medium ${task.statusClass}`">
                  {{ task.status }}
                </span>
                <font-awesome-icon 
                  :icon="['fas', 'chevron-right']" 
                  class="w-4 h-4 text-gray-400"
                />
              </div>
            </div>
          </div>
          
          <button class="w-full mt-4 bg-green-50 text-green-700 py-3 rounded-xl font-semibold hover:bg-green-100 active:scale-95 transition-all flex items-center justify-center gap-2">
            <font-awesome-icon :icon="['fas', 'plus']" class="w-4 h-4" />
            নতুন কাজ যোগ করুন
          </button>
        </div>
      </div>

      <!-- Right Column -->
      <div class="space-y-4 md:space-y-6">
        <!-- Current Crops - Simple Cards -->
        <div class="bg-white rounded-2xl p-5 shadow-md">
          <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <div class="p-2 bg-green-100 rounded-lg">
              <font-awesome-icon :icon="['fas', 'leaf']" class="w-5 h-5 text-green-600" />
            </div>
            চলতি ফসল
          </h2>
          
          <div class="space-y-4">
            <div 
              v-for="crop in currentCrops" 
              :key="crop.id"
              class="p-4 rounded-xl border border-gray-200"
            >
              <div class="flex justify-between items-start mb-3">
                <div class="flex items-center gap-3">
                  <div :class="`p-2 rounded-lg ${crop.iconBg}`">
                    <font-awesome-icon :icon="crop.icon" class="w-5 h-5" :class="crop.iconColor" />
                  </div>
                  <div>
                    <p class="font-bold text-gray-800">{{ crop.name }}</p>
                    <p class="text-sm text-gray-500">{{ crop.area }} বিঘা জমি</p>
                  </div>
                </div>
                <span :class="`px-3 py-1 rounded-full text-xs font-semibold ${crop.statusClass}`">
                  {{ crop.status }}
                </span>
              </div>
              
              <!-- Simple Progress -->
              <div>
                <div class="flex justify-between text-sm mb-1">
                  <span class="text-gray-600">কতদূর:</span>
                  <span class="font-semibold">{{ crop.progress }}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    :class="`h-2 rounded-full ${crop.progressColor}`"
                    :style="`width: ${crop.progress}%`"
                  ></div>
                </div>
                <div class="text-xs text-gray-500 mt-1">{{ crop.daysLeft }} দিন বাকি</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Market Price - Simple Table -->
        <div class="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-5 text-white shadow-xl">
          <h2 class="text-xl font-bold mb-4 flex items-center gap-2">
            <div class="p-2 bg-white/20 rounded-lg">
              <font-awesome-icon :icon="['fas', 'money-bill-wave']" class="w-5 h-5" />
            </div>
            আজকের দাম
          </h2>
          
          <div class="space-y-3">
            <div 
              v-for="item in marketPrices" 
              :key="item.id"
              class="flex justify-between items-center p-3 bg-white/10 rounded-xl"
            >
              <div class="flex items-center gap-3">
                <div class="p-2 bg-white/20 rounded-lg">
                  <font-awesome-icon :icon="item.icon" class="w-4 h-4" />
                </div>
                <div>
                  <p class="font-semibold">{{ item.crop }}</p>
                  <p class="text-xs opacity-80">{{ item.market }}</p>
                </div>
              </div>
              <div class="text-right">
                <p class="text-lg font-bold">{{ item.price }}</p>
                <div class="flex items-center justify-end gap-1">
                  <font-awesome-icon 
                    :icon="item.change >= 0 ? 'arrow-up' : 'arrow-down'" 
                    class="w-3 h-3" 
                    :class="item.change >= 0 ? 'text-green-300' : 'text-red-300'" 
                  />
                  <span :class="`text-xs ${item.change >= 0 ? 'text-green-300' : 'text-red-300'}`">
                    {{ item.change >= 0 ? '+' : '' }}{{ item.change }}%
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <button class="w-full mt-4 bg-white text-amber-600 py-3 rounded-xl font-semibold hover:bg-gray-100 active:scale-95 transition-all flex items-center justify-center gap-2">
            <font-awesome-icon :icon="['fas', 'list']" class="w-4 h-4" />
            সব দাম দেখুন
          </button>
        </div>

        <!-- Important Notifications -->
        <div class="bg-white rounded-2xl p-5 shadow-md">
          <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <div class="p-2 bg-red-100 rounded-lg">
              <font-awesome-icon :icon="['fas', 'bell']" class="w-5 h-5 text-red-600" />
            </div>
            গুরুত্বপূর্ণ খবর
          </h2>
          
          <div class="space-y-3">
            <div 
              v-for="update in updates" 
              :key="update.id"
              class="p-3 rounded-xl border border-gray-200"
              :class="{ 'border-green-200 bg-green-50': update.isNew }"
            >
              <div class="flex gap-3">
                <div :class="`p-2 rounded-lg ${update.iconBg} flex-shrink-0`">
                  <font-awesome-icon :icon="update.icon" class="w-4 h-4" />
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-800">{{ update.text }}</p>
                  <div class="flex items-center gap-2 mt-2">
                    <font-awesome-icon :icon="['fas', 'clock']" class="w-3 h-3 text-gray-400" />
                    <span class="text-xs text-gray-500">{{ update.date }}</span>
                    <span v-if="update.isNew" class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded font-semibold">
                      নতুন
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Stats - Simple & Clear -->
    <div class="mt-4 md:mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
      <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">মোট ফসল</p>
            <p class="text-xl font-bold text-gray-800">৪ টি</p>
          </div>
          <div class="p-2 bg-green-100 rounded-lg">
            <font-awesome-icon :icon="['fas', 'leaf']" class="w-5 h-5 text-green-600" />
          </div>
        </div>
      </div>
      
      <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">সেচ বাকি</p>
            <p class="text-xl font-bold text-gray-800">২ টি</p>
          </div>
          <div class="p-2 bg-blue-100 rounded-lg">
            <font-awesome-icon :icon="['fas', 'tint']" class="w-5 h-5 text-blue-600" />
          </div>
        </div>
      </div>
      
      <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">এই মাসে আয়</p>
            <p class="text-xl font-bold text-gray-800">৫৪,২০০ ৳</p>
          </div>
          <div class="p-2 bg-emerald-100 rounded-lg">
            <font-awesome-icon :icon="['fas', 'money-bill-wave']" class="w-5 h-5 text-emerald-600" />
          </div>
        </div>
      </div>
      
      <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">ফসল ভালো</p>
            <p class="text-xl font-bold text-gray-800">৮৯%</p>
          </div>
          <div class="p-2 bg-purple-100 rounded-lg">
            <font-awesome-icon :icon="['fas', 'heart']" class="w-5 h-5 text-purple-600" />
          </div>
        </div>
      </div>
    </div>

    <!-- Emergency Contact Card -->
    <div class="mt-4 md:mt-6 bg-gradient-to-r from-red-500 to-orange-600 rounded-2xl p-5 text-white shadow-xl">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="p-3 bg-white/20 rounded-xl">
            <font-awesome-icon :icon="['fas', 'phone-alt']" class="w-6 h-6" />
          </div>
          <div>
            <h3 class="text-lg font-bold">জরুরি সাহায্য চাই?</h3>
            <p class="text-sm opacity-90">কৃষি বিশেষজ্ঞের সাথে কথা বলুন</p>
          </div>
        </div>
        <a 
          href="tel:16123" 
          class="bg-white text-red-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 active:scale-95 transition-all flex items-center gap-2"
        >
          <font-awesome-icon :icon="['fas', 'phone']" class="w-4 h-4" />
          কল করুন
        </a>
      </div>
      <p class="text-sm mt-3 opacity-80">সকাল ৮টা থেকে রাত ১০টা পর্যন্ত</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { 
  // Simple icons
  faUser,
  faMapMarkerAlt,
  faTint,
  faWind,
  faCloudRain,
  faLightbulb,
  faBolt,
  faTasks,
  faClock,
  faChevronRight,
  faPlus,
  faLeaf,
  faMoneyBillWave,
  faBell,
  faArrowUp,
  faArrowDown,
  faList,
  faHeart,
  faPhoneAlt,
  faPhone,
  // Quick action icons
  faMagnifyingGlass,
  faTractor,
  faCreditCard,
  faChartLine,
  faFlask,
  faBug,
  faComments,
  // Crop icons
  faWheatAwn,
  faCarrot,
  faSeedling,
} from '@fortawesome/free-solid-svg-icons'

// Add only essential icons
library.add(
  faUser, faMapMarkerAlt, faTint, faWind, faCloudRain, faLightbulb,
  faBolt, faTasks, faClock, faChevronRight, faPlus, faLeaf,
  faMoneyBillWave, faBell, faArrowUp, faArrowDown, faList,
  faHeart, faPhoneAlt, faPhone,
  faMagnifyingGlass, faTractor, faCreditCard, faChartLine,
  faFlask, faBug, faComments,
  faWheatAwn, faCarrot, faSeedling
)

// Simple reactive state
const weather = ref(null)
const currentDate = ref('')

// Get current date in Bangla
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

// Today's farming tasks - SIMPLE
const todaysTasks = ref([
  { 
    id: 1, 
    title: "ধান ক্ষেতে সেচ দিন", 
    time: "সকাল ৭টায়",
    icon: faTint,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    status: "বাকি",
    statusClass: "bg-yellow-100 text-yellow-800"
  },
  { 
    id: 2, 
    title: "সার ছিটান", 
    time: "সকাল ১০টায়",
    icon: faFlask,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    status: "করা হয়েছে",
    statusClass: "bg-green-100 text-green-800"
  },
  { 
    id: 3, 
    title: "ফসল দেখুন", 
    time: "বিকাল ৩টায়",
    icon: faMagnifyingGlass,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    status: "বাকি",
    statusClass: "bg-yellow-100 text-yellow-800"
  }
])

// Updates - SIMPLE
const updates = ref([
  { 
    id: 1, 
    text: "আগামীকাল বৃষ্টির সম্ভাবনা", 
    date: "আজ সকাল",
    isNew: true,
    icon: faCloudRain,
    iconBg: "bg-blue-100 text-blue-600"
  },
  { 
    id: 2, 
    text: "ধান বিক্রির ভালো দাম", 
    date: "গতকাল",
    isNew: true,
    icon: faMoneyBillWave,
    iconBg: "bg-green-100 text-green-600"
  },
  { 
    id: 3, 
    text: "কৃষি ঋণ আবেদনের সময়", 
    date: "২ দিন আগে",
    isNew: false,
    icon: faCreditCard,
    iconBg: "bg-yellow-100 text-yellow-600"
  }
])

// Quick Actions - BIG & SIMPLE
const quickActions = [
  { 
    id: 1, 
    icon: faMagnifyingGlass, 
    label: "ফসল স্ক্যান", 
    description: "ছবি তুলে দেখুন",
    link: "/crop-analysis", 
    bgColor: "bg-green-100", 
    textColor: "text-green-600"
  },
  { 
    id: 2, 
    icon: faBug, 
    label: "রোগ চিনুন", 
    description: "পোকা সমস্যা",
    link: "/crop-disease-diagnosis", 
    bgColor: "bg-red-100", 
    textColor: "text-red-600"
  },
  { 
    id: 3, 
    icon: faTractor, 
    label: "কৃষি গাইড", 
    description: "যা করণীয়",
    link: "/crop-maintenance", 
    bgColor: "bg-blue-100", 
    textColor: "text-blue-600"
  },
  { 
    id: 4, 
    icon: faChartLine, 
    label: "বাজার দর", 
    description: "আজকের দাম",
    link: "/agri-market", 
    bgColor: "bg-amber-100", 
    textColor: "text-amber-600"
  }
]

// Current Crops - SIMPLE
const currentCrops = ref([
  { 
    id: 1, 
    name: "ব্রি ধান-২৯", 
    area: "১.৫", 
    status: "ভালো", 
    statusClass: "bg-green-100 text-green-800",
    progress: 65,
    progressColor: "bg-green-500",
    daysLeft: "৪৫",
    icon: faWheatAwn,
    iconBg: "bg-green-100",
    iconColor: "text-green-600"
  },
  { 
    id: 2, 
    name: "পাট", 
    area: "০.৮", 
    status: "বিক্রি", 
    statusClass: "bg-amber-100 text-amber-800",
    progress: 90,
    progressColor: "bg-amber-500",
    daysLeft: "১০",
    icon: faLeaf,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600"
  },
  { 
    id: 3, 
    name: "আলু", 
    area: "১.২", 
    status: "রোপণ", 
    statusClass: "bg-blue-100 text-blue-800",
    progress: 15,
    progressColor: "bg-blue-500",
    daysLeft: "৭",
    icon: faCarrot,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600"
  }
])

// Market Prices - SIMPLE
const marketPrices = ref([
  { id: 1, crop: "ধান", price: "১,২০০ ৳", market: "হবিগঞ্জ", change: 2.5, icon: faWheatAwn },
  { id: 2, crop: "পাট", price: "২,৮০০ ৳", market: "সিলেট", change: -1.2, icon: faLeaf },
  { id: 3, crop: "আলু", price: "৮০০ ৳", market: "সুনামগঞ্জ", change: 5.1, icon: faCarrot }
])

// Initialize
onMounted(() => {
  updateDate()
  // Simple weather data
  weather.value = {
    temperature: '৩২°C',
    condition: 'রোদেলা দিন'
  }
})

// Simple weather icon (removed complex mapping)
const getWeatherIcon = () => {
  return faCloudRain // Simple default
}
</script>

<style scoped>
/* Simple mobile-friendly styles */
.min-h-screen {
  min-height: 100vh;
  padding-bottom: 80px; /* Space for mobile bottom nav */
}

/* Larger touch targets for mobile */
button, 
a[class*="router-link"],
[role="button"] {
  min-height: 44px;
  min-width: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Active state feedback */
.active\:scale-95:active {
  transform: scale(0.95);
}

/* Simple card hover */
.hover\:shadow-lg:hover {
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
}

/* Better text contrast */
.text-gray-800 {
  color: #1f2937;
}

.text-gray-600 {
  color: #4b5563;
}

/* Responsive typography */
@media (max-width: 640px) {
  .text-xl {
    font-size: 1.125rem;
  }
  
  .text-lg {
    font-size: 1rem;
  }
  
  .text-sm {
    font-size: 0.875rem;
  }
  
  .text-xs {
    font-size: 0.75rem;
  }
}

/* Simple scrollbar */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>