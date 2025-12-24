<template>
  <section class="bg-white rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
    <div class="bg-gradient-to-r from-slate-900 to-slate-800 p-6 text-white flex items-center justify-between">
      <div class="flex items-center gap-4">
        <div class="p-3 bg-green-500/20 rounded-xl animate-pulse">
          <font-awesome-icon :icon="['fas', 'tractor']" class="text-2xl text-green-400" />
        </div>
        <div>
          <h2 class="text-2xl font-bold">খামার তথ্য ও বিশ্লেষণ</h2>
          <p class="text-slate-300 text-sm mt-1">সম্পূর্ণ তথ্য প্রদান করে AI সুপারিশ পান</p>
        </div>
      </div>
      <span class="text-sm bg-white/10 px-4 py-2 rounded-full border border-white/20 font-medium">
        ধাপ ১/৪
      </span>
    </div>

    <div class="p-6 md:p-8 space-y-10">
      <!-- Field Information Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Field Type -->
        <div>
          <label class="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
            <font-awesome-icon :icon="['fas', 'map-marked-alt']" />
            জমির ধরন
          </label>
          <div class="grid grid-cols-2 gap-3">
            <button
              v-for="option in fieldTypeOptions"
              :key="option"
              type="button"
              @click="$emit('update:fieldType', option)"
              :class="[
                'group flex items-center gap-3 p-4 rounded-2xl border-2 transition-all duration-300',
                fieldType === option 
                  ? 'border-green-500 bg-gradient-to-r from-green-50 to-white shadow-lg shadow-green-100' 
                  : 'border-slate-100 hover:border-green-300 hover:bg-slate-50'
              ]"
            >
              <div :class="[
                'w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300', 
                fieldType === option 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' 
                  : 'bg-slate-100 text-slate-400 group-hover:bg-green-100 group-hover:text-green-600'
              ]">
                <font-awesome-icon :icon="['fas', getFieldIcon(option)]" class="text-xl" />
              </div>
              <div class="text-left">
                <span class="text-sm font-bold text-slate-700 block">{{ option }}</span>
                <span v-if="fieldType === option" class="text-xs text-green-600 font-medium mt-1">
                  <font-awesome-icon :icon="['fas', 'check-circle']" class="mr-1" />
                  নির্বাচিত
                </span>
              </div>
            </button>
          </div>
        </div>

        <!-- Soil Properties -->
        <div>
          <label class="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
            <font-awesome-icon :icon="['fas', 'mountain']" />
            মাটির ধরন
          </label>
          <div class="grid grid-cols-2 gap-3">
            <div
              v-for="soil in soilOptions" :key="soil.type"
              @click="$emit('update:soilType', soil.type)"
              :class="[
                'relative cursor-pointer rounded-2xl border-2 overflow-hidden transition-all duration-300 group',
                soilType === soil.type 
                  ? 'border-green-500 ring-2 ring-green-100 shadow-lg' 
                  : 'border-slate-100 hover:border-green-300'
              ]"
            >
              <div class="relative overflow-hidden h-24">
                <div class="absolute inset-0 bg-gradient-to-br from-transparent to-slate-900/30"></div>
                <div class="absolute top-2 right-2 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
                  <font-awesome-icon 
                    v-if="soilType === soil.type" 
                    :icon="['fas', 'check']" 
                    class="text-white text-xs" 
                  />
                </div>
                <div class="p-3">
                  <p class="font-bold text-sm text-white drop-shadow-lg">{{ soil.type }}</p>
                </div>
              </div>
              <div class="p-3 bg-white">
                <p class="text-xs text-slate-500">{{ soil.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Crop Selection with AI Suggestions -->
      <div class="relative">
        <div class="flex items-center justify-between mb-2">
          <label class="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
            <font-awesome-icon :icon="['fas', 'wheat-awn']" />
            ফসল নির্বাচন
          </label>
          <span class="text-xs text-green-600 font-medium flex items-center gap-1">
            <font-awesome-icon :icon="['fas', 'robot']" />
            AI সুপারিশ
          </span>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Manual Input -->
          <div>
            <div class="relative group mb-4">
              <input
                type="text"
                :value="cropType"
                @input="handleCropInput($event)"
                placeholder="ফসলের নাম লিখুন"
                class="w-full p-4 pl-12 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition-all outline-none"
              />
              <font-awesome-icon :icon="['fas', 'search']" class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
            
            <!-- Popular Crops Quick Select -->
            <div class="flex flex-wrap gap-2">
              <span class="text-xs text-slate-500 font-medium mb-2 block">জনপ্রিয় ফসল:</span>
              <button
                v-for="crop in popularCrops"
                :key="crop"
                @click="$emit('update:cropType', crop)"
                class="text-xs px-3 py-2 bg-slate-100 hover:bg-green-100 text-slate-700 hover:text-green-700 rounded-full transition-colors"
              >
                {{ crop }}
              </button>
            </div>
          </div>

          <!-- AI Suggested Crops -->
          <div class="bg-gradient-to-br from-green-50 to-white p-4 rounded-2xl border border-green-100">
            <h4 class="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
              <font-awesome-icon :icon="['fas', 'lightbulb']" class="text-yellow-500" />
              বর্তমান মৌসুমের জন্য সুপারিশ
            </h4>
            <div class="space-y-2">
              <div 
                v-for="suggestion in aiCropSuggestions" 
                :key="suggestion.name"
                @click="$emit('selectCrop', suggestion.name)"
                class="flex items-center justify-between p-3 hover:bg-white rounded-xl cursor-pointer transition-colors group border border-transparent hover:border-green-200"
              >
                <div class="flex items-center">
                  <div class="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center mr-3">
                    <font-awesome-icon :icon="['fas', 'leaf']" class="text-green-600 text-sm" />
                  </div>
                  <div>
                    <span class="text-sm font-medium text-slate-800">{{ suggestion.name }}</span>
                    <p class="text-xs text-slate-500">{{ suggestion.reason }}</p>
                  </div>
                </div>
                <font-awesome-icon :icon="['fas', 'chevron-right']" class="text-slate-400 text-sm group-hover:text-green-500 transition-colors" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Additional Farm Details Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label class="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
            <font-awesome-icon :icon="['fas', 'ruler']" />
            জমির পরিমাণ
          </label>
          <div class="relative">
            <input
              type="number"
              :value="landArea"
              @input="$emit('update:landArea', $event.target.value)"
              placeholder="একর"
              class="w-full p-4 pl-12 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all outline-none"
            />
            <font-awesome-icon :icon="['fas', 'expand']" class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
          <p class="text-xs text-slate-500 mt-2">{{ calculateApproximateYield() }}</p>
        </div>
        
        <div>
          <label class="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
            <font-awesome-icon :icon="['fas', 'calendar-days']" />
            বপনের তারিখ
          </label>
          <div class="relative">
            <input
              type="date"
              :value="plantingDate"
              @input="$emit('update:plantingDate', $event.target.value)"
              class="w-full p-4 pl-12 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all outline-none"
            />
            <font-awesome-icon :icon="['fas', 'calendar']" class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
          <p class="text-xs text-slate-500 mt-2">{{ calculateDaysSincePlanting() }}</p>
        </div>

        <div>
          <label class="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
            <font-awesome-icon :icon="['fas', 'water']" />
            সেচের ধরন
          </label>
          <div class="relative">
            <select 
              :value="irrigationType"
              @change="$emit('update:irrigationType', $event.target.value)"
              class="w-full p-4 pl-12 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all outline-none appearance-none"
            >
              <option value="">সেচের ধরন নির্বাচন</option>
              <option value="manual">ম্যানুয়াল সেচ</option>
              <option value="drip">ড্রিপ সেচ</option>
              <option value="sprinkler">স্প্রিংকলার</option>
              <option value="flood">বন্যা সেচ</option>
            </select>
            <font-awesome-icon :icon="['fas', 'droplet']" class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
        </div>
      </div>

      <!-- Soil Health Indicators -->
      <div class="bg-gradient-to-br from-amber-50 to-white p-5 rounded-2xl border border-amber-100">
        <h4 class="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
          <font-awesome-icon :icon="['fas', 'flask']" />
          মাটির স্বাস্থ্য সূচক (IoT সেন্সর ডেটা)
        </h4>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div 
            v-for="indicator in soilHealthIndicators" 
            :key="indicator.name"
            class="text-center p-3 bg-white rounded-xl border border-slate-100"
          >
            <div class="text-2xl font-bold mb-1" :class="indicator.color">
              {{ indicator.value }}
            </div>
            <div class="text-xs text-slate-600">{{ indicator.name }}</div>
            <div class="text-xs text-slate-500 mt-1">{{ indicator.status }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  fieldType: String,
  cropType: String,
  soilType: String,
  landArea: [String, Number],
  plantingDate: String,
  irrigationType: String,
})

const emit = defineEmits([
  'update:fieldType',
  'update:cropType',
  'update:soilType',
  'update:landArea',
  'update:plantingDate',
  'update:irrigationType',
  'suggestCrops',
  'selectCrop'
])

const fieldTypeOptions = ["ফসলি জমি", "সবজি ক্ষেত", "ফলের বাগান", "ফুলের বাগান", "মিশ্র চাষ", "অন্যান্য"]

const soilOptions = [
  { 
    type: "দোআঁশ মাটি", 
    image: "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?w=400&auto=format&fit=crop", 
    description: "উর্বর, জল ধারণ ক্ষমতা ভাল" 
  },
  { 
    type: "কাদা মাটি", 
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&auto=format&fit=crop", 
    description: "জল ধারণ ক্ষমতা বেশি" 
  },
  { 
    type: "বালি মাটি", 
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&auto=format&fit=crop", 
    description: "জল দ্রুত শুষে নেয়" 
  },
  { 
    type: "পলি মাটি", 
    image: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=400&auto=format&fit=crop", 
    description: "উর্বর, নদী অববাহিকায়" 
  }
]

const popularCrops = ["ধান", "গম", "আলু", "টমেটো", "বেগুন", "মরিচ", "পাট", "ভুট্টা"]

const aiCropSuggestions = [
  { name: "ধান (বোরো)", reason: "বর্তমান মৌসুম ও মাটির জন্য আদর্শ" },
  { name: "গম", reason: "শীতকালীন ফসল, ভালো ফলনের সম্ভাবনা" },
  { name: "সরিষা", reason: "তেল বীজ, বাজার চাহিদা বেশি" }
]

const soilHealthIndicators = [
  { name: "pH মান", value: "৬.৫", status: "সহনশীল", color: "text-green-600" },
  { name: "জৈব পদার্থ", value: "২.৮%", status: "মাঝারি", color: "text-yellow-600" },
  { name: "নাইট্রোজেন", value: "২৫ পিপিএম", status: "সর্বোচ্চ", color: "text-blue-600" },
  { name: "ফসফরাস", value: "১৮ পিপিএম", status: "পর্যাপ্ত", color: "text-purple-600" }
]

const getFieldIcon = (type) => {
  const map = {
    'ফসলি জমি': 'wheat-awn',
    'সবজি ক্ষেত': 'carrot',
    'ফলের বাগান': 'apple-whole',
    'ফুলের বাগান': 'seedling',
    'মিশ্র চাষ': 'tractor',
    'অন্যান্য': 'map-marked-alt'
  }
  return map[type] || 'map-marked-alt'
}

const calculateApproximateYield = () => {
  if (!props.landArea || !props.cropType) return 'আনুমানিক ফলন দেখতে জমির পরিমাণ ও ফসল নির্বাচন করুন'
  const area = parseFloat(props.landArea)
  const yieldPerAcre = {
    'ধান': 25,
    'গম': 20,
    'আলু': 150,
    'টমেটো': 100,
    'বেগুন': 80,
    'মরিচ': 60,
    'পাট': 40,
    'ভুট্টা': 30
  }
  const baseYield = yieldPerAcre[props.cropType] || 50
  return `আনুমানিক ফলন: ${(area * baseYield).toLocaleString()} কেজি`
}

const calculateDaysSincePlanting = () => {
  if (!props.plantingDate) return 'বপনের তারিখ নির্বাচন করুন'
  const planting = new Date(props.plantingDate)
  const today = new Date()
  const diffTime = Math.abs(today - planting)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return `বপন হওয়ার পর ${diffDays} দিন অতিবাহিত`
}

const handleCropInput = (event) => {
  emit('update:cropType', event.target.value)
  emit('suggestCrops')
}
</script>