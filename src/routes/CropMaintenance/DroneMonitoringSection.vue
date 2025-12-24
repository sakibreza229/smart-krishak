<template>
  <div class="min-h-screen bg-slate-50 font-sans text-slate-900">
    
    <transition name="page-fade" mode="out-in">
      <div v-if="!isConnected" class="min-h-screen flex items-center justify-center p-4 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-emerald-600">
        <div class="max-w-md w-full bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden">
          <div class="p-8 text-center">
            <div class="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 ring-8 ring-emerald-50">
              <font-awesome-icon :icon="['fas', 'seedling']" class="text-4xl" />
            </div>
            <h1 class="text-3xl font-black text-slate-800 mb-2">খামার বন্ধু</h1>
            <p class="text-slate-500 font-medium">আপনার ডিজিটাল কৃষি সহকারী</p>
          </div>

          <div class="px-8 pb-10 space-y-6">
            <div class="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <div class="flex items-center gap-4 mb-4">
                <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white animate-pulse">
                  <font-awesome-icon :icon="['fas', 'wifi']" />
                </div>
                <div class="text-left">
                  <p class="text-xs text-slate-400 uppercase font-bold tracking-wider">নেটওয়ার্ক স্ট্যাটাস</p>
                  <p class="text-slate-700 font-bold">সিগন্যাল খুব ভালো (৯২%)</p>
                </div>
              </div>
              <p class="text-sm text-slate-600 leading-relaxed text-left">
                সিস্টেমটি ব্যবহারের জন্য প্রস্তুত। ড্রোন এবং সেন্সরগুলোর সাথে সংযোগ স্থাপন করতে নিচের বোতামটি চাপুন।
              </p>
            </div>

            <button
              @click="connectToSystem"
              :disabled="isConnecting"
              class="w-full py-5 rounded-2xl font-bold text-xl transition-all shadow-lg active:scale-95 flex items-center justify-center gap-4"
              :class="isConnecting ? 'bg-slate-200 text-slate-400' : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-200'"
            >
              <font-awesome-icon :icon="['fas', isConnecting ? 'spinner' : 'power-off']" :class="{'animate-spin': isConnecting}" />
              {{ isConnecting ? 'সংযোগ হচ্ছে...' : 'কাজ শুরু করুন' }}
            </button>
          </div>
        </div>
      </div>

      <div v-else class="pb-20">
        <nav class="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 py-4">
          <div class="max-w-5xl mx-auto flex justify-between items-center">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                <font-awesome-icon :icon="['fas', 'leaf']" />
              </div>
              <h2 class="font-black text-xl tracking-tight text-slate-800">আমার খামার</h2>
            </div>
            <button @click="isConnected = false" class="bg-red-50 text-red-600 px-4 py-2 rounded-xl text-sm font-bold border border-red-100">
              বন্ধ করুন
            </button>
          </div>
        </nav>

        <main class="max-w-5xl mx-auto p-4 md:p-6 space-y-6">
          
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div v-for="(val, key) in weatherIcons" :key="key" class="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
              <div :class="['w-12 h-12 rounded-2xl flex items-center justify-center text-xl', val.bg]">
                <font-awesome-icon :icon="['fas', val.icon]" :class="val.color" />
              </div>
              <div>
                <p class="text-[10px] uppercase font-bold text-slate-400">{{ val.label }}</p>
                <p class="text-lg font-black text-slate-800">{{ weatherData[key] }}</p>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 relative overflow-hidden group">
              <div class="flex justify-between items-start mb-6">
                <div>
                  <h3 class="text-2xl font-black text-slate-800 mb-1">মাটির আর্দ্রতা</h3>
                  <p class="text-slate-500">ক্ষেতের মাটির বর্তমান পানি ধারণ ক্ষমতা</p>
                </div>
                <div class="p-4 bg-blue-50 text-blue-600 rounded-3xl text-2xl">
                  <font-awesome-icon :icon="['fas', 'droplet']" />
                </div>
              </div>
              
              <div class="flex items-end gap-4 mb-4">
                <span class="text-6xl font-black text-slate-900">{{ soilMoisture }}%</span>
                <span :class="['mb-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest', soilMoistureStatus.color]">
                  {{ soilMoistureStatus.text }}
                </span>
              </div>
              
              <div class="w-full bg-slate-100 h-4 rounded-full overflow-hidden">
                <div class="h-full transition-all duration-1000 bg-gradient-to-r from-blue-400 to-blue-600" :style="{ width: soilMoisture + '%' }"></div>
              </div>
            </div>

            <div class="bg-slate-900 p-8 rounded-[2.5rem] shadow-xl text-white relative overflow-hidden">
              <div class="absolute top-0 right-0 p-8 opacity-10">
                <font-awesome-icon :icon="['fas', 'paper-plane']" class="text-8xl" />
              </div>
              <h3 class="text-2xl font-black mb-6 flex items-center gap-3">
                <font-awesome-icon :icon="['fas', 'location-crosshairs']" class="text-emerald-400" />
                ড্রোন কন্ট্রোল
              </h3>
              
              <div class="space-y-6 mb-8">
                <div class="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10">
                  <span class="text-slate-400 font-bold text-sm">ব্যাটারি লাইফ</span>
                  <div class="flex items-center gap-3">
                    <span class="font-black text-emerald-400">৭৮%</span>
                    <font-awesome-icon :icon="['fas', 'battery-three-quarters']" class="text-emerald-400 text-xl" />
                  </div>
                </div>
              </div>

              <button @click="startDroneSurvey" :disabled="!droneConnected"
                class="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-900 rounded-2xl font-black text-lg transition-all active:scale-95 disabled:opacity-20">
                সার্ভে শুরু করুন
              </button>
            </div>
          </div>

          <div class="bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-sm">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-xl font-black text-slate-800 flex items-center gap-2">
                <font-awesome-icon :icon="['fas', 'map-location-dot']" class="text-emerald-600" />
                ক্ষেতের লাইভ ভিউ
              </h3>
              <span class="bg-red-100 text-red-600 px-3 py-1 rounded-full text-[10px] font-black animate-pulse">LIVE</span>
            </div>
            <div class="aspect-video bg-slate-200 rounded-3xl overflow-hidden relative border-4 border-white shadow-inner">
              <img src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=1000" class="w-full h-full object-cover" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div class="absolute bottom-6 left-6 text-white">
                <p class="text-xs font-bold uppercase opacity-80">বর্তমান অবস্থান</p>
                <p class="font-black">উত্তর-পশ্চিম ব্লক (ধানের জমি)</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const isConnected = ref(false)
const isConnecting = ref(false)
const droneConnected = ref(true)
const soilMoisture = ref(68)

const weatherData = {
  temp: '২৮°C',
  humid: '৬৫%',
  wind: '১২কিমি',
  uv: 'উচ্চ'
}

const weatherIcons = {
  temp: { label: 'তাপমাত্রা', icon: 'temperature-high', color: 'text-orange-500', bg: 'bg-orange-50' },
  humid: { label: 'আর্দ্রতা', icon: 'droplet', color: 'text-blue-500', bg: 'bg-blue-50' },
  wind: { label: 'বাতাস', icon: 'wind', color: 'text-slate-500', bg: 'bg-slate-100' },
  uv: { label: 'সূর্যালোক', icon: 'sun', color: 'text-yellow-500', bg: 'bg-yellow-50' }
}

const soilMoistureStatus = computed(() => {
  if (soilMoisture.value > 70) return { text: 'খুব ভালো', color: 'bg-emerald-100 text-emerald-700' }
  if (soilMoisture.value > 40) return { text: 'স্বাভাবিক', color: 'bg-blue-100 text-blue-700' }
  return { text: 'পানি প্রয়োজন', color: 'bg-red-100 text-red-700 animate-bounce' }
})

const connectToSystem = () => {
  isConnecting.value = true
  setTimeout(() => {
    isConnecting.value = false
    isConnected.value = true
  }, 1500)
}

const startDroneSurvey = () => {
  alert('ড্রোন উড়ছে... আপনার ক্ষেত পরিদর্শন করা হচ্ছে।')
}
</script>

<style scoped>
.page-fade-enter-active, .page-fade-leave-active {
  transition: all 0.5s ease;
}
.page-fade-enter-from, .page-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* Custom font feeling */
@import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;600;700&display=swap');
* {
  font-family: 'Hind Siliguri', sans-serif;
}
</style>