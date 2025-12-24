<template>
  <div class="bg-white rounded-2xl p-6 shadow-xl border border-slate-100">
    <h3 class="text-lg font-bold mb-4 flex items-center gap-3">
      <div class="p-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg text-white">
        <font-awesome-icon :icon="['fas', 'tags']" />
      </div>
      বাজার দর
    </h3>
    <div class="space-y-3">
      <div 
        v-for="item in prices" 
        :key="item.crop" 
        class="flex justify-between items-center p-3 hover:bg-orange-50 rounded-xl transition-colors"
      >
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
            <!-- ভিন্ন ফসলের জন্য ভিন্ন আইকন -->
            <font-awesome-icon 
              :icon="getCropIcon(item.crop)" 
              class="text-orange-600" 
            />
          </div>
          <div>
            <p class="font-medium text-slate-800">{{ item.crop }}</p>
            <p class="text-xs text-slate-500">প্রতি কেজি</p>
          </div>
        </div>
        <div class="text-right">
          <p class="font-bold text-slate-900">৳{{ item.price }}</p>
          <p 
            :class="[
              'text-xs font-medium', 
              item.change >= 0 ? 'text-green-600' : 'text-red-600'
            ]"
          >
            {{ item.change >= 0 ? '↑' : '↓' }} {{ Math.abs(item.change) }}%
          </p>
        </div>
      </div>
    </div>
    
    <!-- রিফ্রেশ বাটন -->
    <div class="mt-4 pt-4 border-t border-gray-100">
      <button 
        @click="$emit('refresh')"
        class="w-full py-2 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        <font-awesome-icon :icon="['fas', 'sync-alt']" />
        <span>হালনাগাদ করুন</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps({
  prices: {
    type: Array,
    required: true,
    default: () => []
  }
})

defineEmits(['refresh'])

// ফসলের নাম অনুযায়ী আইকন বেছে নিন
const getCropIcon = (cropName) => {
  const iconMap = {
    'ধান': 'wheat-awn',
    'গম': 'wheat-awn',
    'ভুট্টা': 'corn',
    'আলু': 'carrot',
    'পাট': 'leaf',
    'টমেটো': 'apple-whole',
    'বেগুন': 'eggplant',
    'মরিচ': 'pepper-hot',
    'ডাল': 'seedling',
    'সবজি': 'carrot'
  }
  
  // আইকন খুঁজে পাওয়া গেলে তা রিটার্ন করুন, না হলে ডিফল্ট আইকন
  const iconName = iconMap[cropName] || 'wheat-awn'
  
  // icon name স্ট্রিং হিসেবে রিটার্ন করুন
  return iconName
}
</script>