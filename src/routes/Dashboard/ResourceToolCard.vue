<template>
  <a 
    :href="link"
    :target="external ? '_blank' : '_self'"
    class="group p-4 rounded-xl border border-gray-200 hover:shadow-lg transition-all active:scale-95"
    :class="`hover:border-${color}-300 hover:bg-${color}-50`"
  >
    <div class="flex flex-col items-center text-center">
      <div :class="`p-3 bg-${color}-100 rounded-lg mb-2 group-hover:scale-110 transition-transform`">
        <font-awesome-icon :icon="icon" :class="`text-${color}-600`" class="w-6 h-6" />
      </div>
      <span class="font-semibold text-gray-800 text-sm mb-1">{{ title }}</span>
      <span class="text-xs text-gray-500">{{ description }}</span>
    </div>
  </a>
</template>

<script setup>
defineProps({
  title: String,
  description: String,
  icon: Array,
  color: {
    type: String,
    default: 'green'
  },
  link: String,
  external: {
    type: Boolean,
    default: false
  }
})
</script>