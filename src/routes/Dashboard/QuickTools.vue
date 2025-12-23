<template>
  <div class="bg-white rounded-2xl p-5 shadow-md">
    <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
      <div class="p-2 bg-purple-100 rounded-lg">
        <font-awesome-icon :icon="['fas', 'tools']" class="w-5 h-5 text-purple-600" />
      </div>
      সরকারি টুলস ও রিসোর্স
    </h2>
    
    <div class="grid grid-cols-2 gap-3">
      <a 
        v-for="tool in tools" 
        :key="tool.id"
        :href="tool.link"
        :target="tool.external ? '_blank' : '_self'"
        class="group p-4 rounded-xl border border-gray-200 hover:shadow-lg transition-all active:scale-95"
        :class="`hover:border-${tool.color}-300 hover:bg-${tool.color}-50`"
      >
        <div class="flex flex-col items-center text-center">
          <div :class="`p-3 bg-${tool.color}-100 rounded-lg mb-2 group-hover:scale-110 transition-transform`">
            <font-awesome-icon :icon="tool.icon" :class="`text-${tool.color}-600`" class="w-6 h-6" />
          </div>
          <span class="font-semibold text-gray-800 text-sm mb-1">{{ tool.title }}</span>
          <span class="text-xs text-gray-500">{{ tool.description }}</span>
        </div>
      </a>
    </div>
    
    <div class="mt-4 pt-4 border-t border-gray-200">
      <h3 class="text-sm font-semibold text-gray-700 mb-2">গুরুত্বপূর্ণ লিংক:</h3>
      <div class="flex flex-wrap gap-2">
        <a 
          v-for="link in links" 
          :key="link.id" 
          :href="link.url" 
          class="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-200"
        >
          {{ link.label }}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  tools: {
    type: Array,
    required: true
  },
  links: {
    type: Array,
    required: true
  }
})
</script>