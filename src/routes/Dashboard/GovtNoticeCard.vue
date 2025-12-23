<template>
  <div class="bg-white rounded-2xl p-5 shadow-md">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xl font-bold text-gray-800 flex items-center gap-2">
        <div class="p-2 bg-blue-100 rounded-lg">
          <font-awesome-icon :icon="['fas', 'newspaper']" class="w-5 h-5 text-blue-600" />
        </div>
        সরকারি নোটিশ ও কৃষি খবর
      </h2>
      <button class="text-sm text-blue-600 font-semibold">সব খবর →</button>
    </div>
    
    <div class="space-y-3">
      <div 
        v-for="notice in notices" 
        :key="notice.id"
        class="p-4 rounded-xl border border-gray-200 hover:border-green-200 hover:bg-green-50 transition-all"
        :class="`hover:border-${notice.color}-200 hover:bg-${notice.color}-50`"
      >
        <div class="flex items-start gap-3">
          <div :class="`p-2 rounded-lg bg-${notice.color}-100 text-${notice.color}-600 flex-shrink-0`">
            <font-awesome-icon :icon="notice.icon" class="w-5 h-5" />
          </div>
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-2">
              <span :class="`px-2 py-1 bg-${notice.color}-100 text-${notice.color}-800 text-xs font-semibold rounded-full`">
                {{ notice.tag }}
              </span>
              <span class="text-xs text-gray-500">{{ notice.date }}</span>
            </div>
            <h3 class="font-bold text-gray-800 mb-1">{{ notice.title }}</h3>
            <div v-if="notice.extraInfo" class="flex items-center gap-2 mt-2">
              <font-awesome-icon :icon="notice.extraIcon" class="w-3 h-3 text-gray-400" />
              <span class="text-xs text-gray-500">{{ notice.extraInfo }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <button class="w-full mt-4 bg-blue-50 text-blue-700 py-3 rounded-xl font-semibold hover:bg-blue-100 active:scale-95 transition-all flex items-center justify-center gap-2">
      <font-awesome-icon :icon="['fas', 'external-link-alt']" class="w-4 h-4" />
      কৃষি মন্ত্রণালয়ের ওয়েবসাইট দেখুন
    </button>
  </div>
</template>

<script setup>
defineProps({
  notices: {
    type: Array,
    required: true
  }
})
</script>