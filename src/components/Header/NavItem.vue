<template>
  <li class="nav__item" @click="handleClick">
    <router-link
      :to="sectionId"
      class="flex items-center gap-x-3 font-medium transition-all duration-200 group"
      :class="[
        mobile ? 'px-4 py-3 rounded-lg hover:bg-green-50' : 'hover:text-green-600',
        isActive ? 'text-green-600 bg-green-50 font-semibold' : 'text-gray-700 hover:text-green-600'
      ]"
    >
      <component
        :is="navIcon"
        class="w-5 h-5 transition-transform duration-200 group-hover:scale-110"
        :class="isActive ? 'text-green-600' : 'text-gray-500'"
      />
      <span class="text-sm lg:text-base whitespace-nowrap">{{ navName }}</span>
    </router-link>
  </li>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const props = defineProps({
  sectionId: {
    type: String,
    required: true
  },
  navName: {
    type: String,
    required: true
  },
  navIcon: {
    type: Object,
    required: true
  },
  mobile: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['nav-click'])

const route = useRoute()
const router = useRouter()

const isActive = computed(() => {
  if (props.sectionId === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(props.sectionId)
})

const handleClick = () => {
  emit('nav-click')
  // Smooth scroll to top if on same page
  if (route.path === props.sectionId) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
</script>