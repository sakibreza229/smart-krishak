<template>
  <div class="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-5 text-white shadow-xl">
    <h2 class="text-xl font-bold mb-4 flex items-center gap-2">
      <div class="p-2 bg-white/20 rounded-lg">
        <font-awesome-icon :icon="['fas', 'money-bill-wave']" class="w-5 h-5" />
      </div>
      আজকের দাম
    </h2>
    
    <div class="space-y-3">
      <div 
        v-for="item in prices" 
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
</template>

<script setup>
defineProps({
  prices: {
    type: Array,
    required: true
  }
})
</script>