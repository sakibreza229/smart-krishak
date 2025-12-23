<template>
  <aside class="bg-gradient-to-b from-slate-50 to-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden font-sans">
    
    <header class="p-5 bg-gradient-to-r from-white to-emerald-50 border-b border-slate-100">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-sm">
          <font-awesome-icon :icon="['fas', 'lightbulb']" class="text-white text-lg" />
        </div>
        <div>
          <h2 class="text-xl font-bold text-slate-800">কীভাবে ব্যবহার করবেন</h2>
          <p class="text-xs text-slate-500 mt-1">সেরা ফলাফলের জন্য নির্দেশিকা</p>
        </div>
      </div>
    </header>

    <div class="p-5 space-y-6">
      
      <!-- Quick Tips Grid -->
      <section>
        <div class="flex items-center gap-2 mb-4">
          <div class="w-2 h-5 bg-emerald-500 rounded-full"></div>
          <h3 class="text-sm font-bold text-slate-700">দ্রুত পরামর্শ</h3>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div v-for="tip in QUICK_TIPS" :key="tip.text" 
            class="bg-white p-4 rounded-xl border border-slate-100 hover:border-emerald-200 hover:shadow-md transition-all duration-300 group">
            <div :class="['w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-transform group-hover:scale-110', tip.bgColor]">
              <font-awesome-icon :icon="tip.icon" :class="[tip.iconColor, 'text-lg']" />
            </div>
            <h4 class="font-semibold text-slate-800 text-sm mb-1">{{ tip.title }}</h4>
            <p class="text-xs text-slate-500 leading-relaxed">{{ tip.desc }}</p>
          </div>
        </div>
      </section>

      <!-- FAQ Section -->
      <section>
        <div class="flex items-center gap-2 mb-4">
          <div class="w-2 h-5 bg-blue-500 rounded-full"></div>
          <h3 class="text-sm font-bold text-slate-700">সাধারণ জিজ্ঞাসা</h3>
        </div>
        <div class="space-y-3">
          <div v-for="(item, index) in FAQ_DATA" :key="index"
            class="bg-white rounded-xl border border-slate-200 overflow-hidden transition-all duration-300 hover:shadow-sm"
            :class="{ 'ring-1 ring-emerald-500 border-emerald-500': activeFAQ === index }">
            
            <button 
              @click="$emit('toggle-faq', index)"
              class="w-full text-left p-4 flex items-center justify-between group outline-none"
              :aria-expanded="activeFAQ === index"
            >
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-lg flex items-center justify-center"
                  :class="activeFAQ === index ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'">
                  <font-awesome-icon :icon="['fas', item.icon]" class="text-sm" />
                </div>
                <span class="font-semibold text-sm text-slate-700">
                  {{ item.question }}
                </span>
              </div>
              <font-awesome-icon
                :icon="['fas', 'chevron-down']"
                class="text-slate-400 transition-transform duration-300"
                :class="{ 'rotate-180 text-emerald-500': activeFAQ === index }" 
              />
            </button>

            <transition name="expand">
              <div v-if="activeFAQ === index" class="px-4 pb-4">
                <p class="text-sm text-slate-600 leading-relaxed mb-4">{{ item.answer }}</p>

                <div v-if="item.tips" class="bg-emerald-50 rounded-lg p-3">
                  <div class="flex items-center gap-2 mb-2">
                    <font-awesome-icon :icon="['fas', 'star']" class="text-emerald-500 text-xs" />
                    <h4 class="text-xs font-bold text-emerald-700">সেরা টিপস</h4>
                  </div>
                  <ul class="space-y-2">
                    <li v-for="(tip, tipIndex) in item.tips" :key="tipIndex"
                      class="flex items-start gap-2 text-xs text-emerald-700">
                      <font-awesome-icon :icon="['fas', 'check']" class="mt-0.5 flex-shrink-0 text-xs" />
                      <span>{{ tip }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </section>
    </div>
  </aside>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faStar, faSun, faHandHoldingWater, faCrop,
    faQuestionCircle, faChevronDown, faCircleCheck, 
    faLightbulb, faCamera, faCheck, faUserShield, 
    faWandMagicSparkles, faCheckCircle
} from '@fortawesome/free-solid-svg-icons'

library.add(
    faStar, faSun, faHandHoldingWater, faCrop,
    faQuestionCircle, faChevronDown, faCircleCheck, 
    faLightbulb, faCamera, faCheck, faUserShield, 
    faWandMagicSparkles, faCheckCircle
)

defineProps({
    activeFAQ: { type: Number, default: null }
})

defineEmits(['toggle-faq'])

// Updated data structure
const QUICK_TIPS = [
    { 
      title: 'সঠিক সময়', 
      desc: 'সকালের আলোয় ছবি তুলুন', 
      icon: 'sun', 
      iconColor: 'text-amber-500', 
      bgColor: 'bg-amber-50' 
    },
    { 
      title: 'সেচের সময়', 
      desc: 'সেচের পরপরই ছবি তুলবেন না', 
      icon: 'hand-holding-water', 
      iconColor: 'text-blue-500', 
      bgColor: 'bg-blue-50' 
    },
    { 
      title: 'একটি ফসল', 
      desc: 'একবারে এক ধরনের ফসল বিশ্লেষণ করুন', 
      icon: 'crop', 
      iconColor: 'text-emerald-500', 
      bgColor: 'bg-emerald-50' 
    }
]

const FAQ_DATA = [
    {
        question: "কী ধরনের ছবি দেব?",
        answer: "রোগগ্রস্ত পাতার বা ফসলের কাছ থেকে তোলা স্পষ্ট ছবি দিন। দিনের আলোয় তোলা ছবি ভালো কাজ করে।",
        tips: ["ফোন ক্যামেরা দিয়ে কাছ থেকে ছবি তুলুন", "ছবিতে শুধু ফসল থাকুক"],
        icon: 'camera'
    },
    {
        question: "ফলাফল কতটা সঠিক?",
        answer: "আমাদের AI ৮৫-৯০% সঠিক ফলাফল দেয়। তবে গুরুতর সমস্যায় স্থানীয় কৃষি অফিসের পরামর্শ নিন।",
        tips: ["বিভিন্ন কোণ থেকে ছবি তুলুন", "সন্দেহ হলে আবার ছবি দিন"],
        icon: 'check-circle'
    }
]

const TRUST_CARDS = [
    { 
        title: 'গোপনীয়তা সুরক্ষা', 
        desc: 'আপনার আপলোড করা তথ্য এবং ছবি আমাদের কাছে সম্পূর্ণ নিরাপদ এবং এনক্রিপ্টেড।', 
        icon: 'user-shield', 
        iconColor: 'text-blue-500', 
        bgColor: 'bg-blue-50',
        badges: ['এনক্রিপ্টেড', 'বিশুদ্ধ'] 
    },
    { 
        title: 'সঠিক ফলাফল', 
        desc: 'উন্নত নিউরাল নেটওয়ার্ক আপনার ছবি বিশ্লেষণ করে দ্রুত এবং সঠিক সমাধান প্রদান করে।', 
        icon: 'wand-magic-sparkles', 
        iconColor: 'text-emerald-500', 
        bgColor: 'bg-emerald-50',
        badges: ['৯৫% সঠিক', 'দ্রুত'] 
    }
]
</script>

<style scoped>
/* Smooth Accordion Animation */
.expand-enter-active, .expand-leave-active {
  transition: all 0.3s ease-out;
  max-height: 200px;
  opacity: 1;
}
.expand-enter-from, .expand-leave-to {
  max-height: 0;
  opacity: 0;
  padding-bottom: 0 !important;
}

/* Subtle hover effects */
.group:hover .group-hover\:translate-y-\[-2px\] {
  transform: translateY(-2px);
}
</style>