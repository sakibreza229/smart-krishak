<template>
  <div class="bg-white rounded-2xl p-5 shadow-md h-full">
    <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
      <div class="p-2 bg-green-100 rounded-lg">
        <font-awesome-icon :icon="['fas', 'leaf']" class="w-5 h-5 text-green-600" />
      </div>
      চলতি ফসল
    </h2>
    
    <div class="space-y-4">
      <div 
        v-for="crop in crops" 
        :key="crop.id"
        class="p-4 rounded-xl border border-gray-200"
      >
        <div class="flex justify-between items-start mb-3">
          <div class="flex items-center gap-3">
            <div :class="`p-2 rounded-lg bg-${crop.color}-100`">
              <font-awesome-icon :icon="crop.icon" class="w-5 h-5" :class="`text-${crop.color}-600`" />
            </div>
            <div>
              <p class="font-bold text-gray-800">{{ crop.name }}</p>
              <p class="text-sm text-gray-500">{{ crop.area }} বিঘা জমি</p>
            </div>
          </div>
          <span :class="`px-3 py-1 rounded-full text-xs font-semibold ${
            crop.status === 'ভালো' ? 'bg-green-100 text-green-800' :
            crop.status === 'বিক্রি' ? 'bg-amber-100 text-amber-800' :
            'bg-blue-100 text-blue-800'
          }`">
            {{ crop.status }}
          </span>
        </div>
        
        <div>
          <div class="flex justify-between text-sm mb-1">
            <span class="text-gray-600">কতদূর:</span>
            <span class="font-semibold">{{ crop.progress }}%</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div 
              :class="`h-2 rounded-full bg-${crop.color}-500`"
              :style="`width: ${crop.progress}%`"
            ></div>
          </div>
          <div class="text-xs text-gray-500 mt-1">{{ crop.daysLeft }} দিন বাকি</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  crops: {
    type: Array,
    required: true
  }
})
</script>