<template>
  <div class="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-5 text-white shadow-xl">
    <div class="flex items-center justify-between mb-4">
      <div>
        <h2 class="text-xl font-bold mb-1">আজকের আবহাওয়া</h2>
        <div class="flex items-center gap-2 text-sm opacity-90">
          <font-awesome-icon :icon="['fas', 'map-marker-alt']" class="w-4 h-4" />
          <span>{{ weather.location }}</span>
        </div>
      </div>
      <div class="text-right">
        <div class="text-3xl font-bold">{{ weather.temperature }}</div>
        <div class="text-sm opacity-90">{{ weather.condition }}</div>
      </div>
    </div>
    
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
    
    <div class="mt-6 pt-4 border-t border-white/30">
      <div class="flex items-start gap-2">
        <div class="bg-white/20 p-2 rounded-lg">
          <font-awesome-icon :icon="['fas', 'lightbulb']" class="w-4 h-4" />
        </div>
        <p class="text-sm opacity-90">আজ বিকেলে হালকা বৃষ্টির সম্ভাবনা। সকালেই ফসলের সেচ দিন।</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  weather: {
    type: Object,
    required: true
  }
})
</script>