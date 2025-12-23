<template>
  <div class="bg-white rounded-2xl p-5 shadow-md">
    <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
      <div class="p-2 bg-green-100 rounded-lg">
        <font-awesome-icon :icon="['fas', 'bolt']" class="w-5 h-5 text-green-600" />
      </div>
      তাড়াতাড়ি যা করণীয়
    </h2>
    
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      <router-link 
        v-for="action in actions" 
        :key="action.id"
        :to="action.link"
        class="group bg-gradient-to-b from-white to-gray-50 p-4 rounded-xl border-2 border-gray-100 hover:border-green-300 hover:shadow-lg transition-all active:scale-95"
      >
        <div class="flex flex-col items-center text-center">
          <div :class="`p-3 rounded-full bg-${action.color}-100 mb-2`">
            <font-awesome-icon 
              :icon="action.icon" 
              class="w-6 h-6"
              :class="`text-${action.color}-600`"
            />
          </div>
          <span class="font-semibold text-gray-800 text-sm mb-1">{{ action.label }}</span>
          <span class="text-xs text-gray-500">{{ action.description }}</span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
defineProps({
  actions: {
    type: Array,
    required: true
  }
})
</script>