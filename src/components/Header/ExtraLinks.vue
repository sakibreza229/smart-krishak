<template>
  <li 
    class="extra-link"
    @click="handleClick"
  >
    <router-link
      :to="pageAddr"
      class="flex items-center justify-between p-3 rounded-lg transition-all duration-200 group"
      :class="[
        isActive 
          ? 'bg-gradient-to-r from-green-50 to-green-100 text-green-700 border border-green-200 shadow-sm' 
          : 'hover:bg-green-50 hover:text-green-600 text-gray-600'
      ]"
    >
      <div class="flex items-center gap-x-3">
        <div 
          class="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
          :class="isActive ? 'bg-green-100' : 'bg-gray-100 group-hover:bg-green-100'"
        >
          <component
            :is="linkIcon"
            class="w-4 h-4"
            :class="isActive ? 'text-green-600' : 'text-gray-500 group-hover:text-green-600'"
          />
        </div>
        <span class="text-sm font-medium">{{ pageName }}</span>
      </div>
      <ChevronRightIcon 
        class="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
        :class="isActive ? 'text-green-600' : 'text-gray-400'"
      />
    </router-link>
  </li>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import {
  Cog6ToothIcon,
  InformationCircleIcon,
  BookOpenIcon,
  ShieldCheckIcon,
  LifebuoyIcon,
  ChatBubbleLeftRightIcon,
  UserIcon,
  MapIcon,
  ShoppingBagIcon,
  ChevronRightIcon
} from '@heroicons/vue/24/outline'

const props = defineProps({
  pageAddr: {
    type: String,
    required: true
  },
  pageName: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['link-clicked'])

const route = useRoute()

const isActive = computed(() => route.path === props.pageAddr)

// Map page addresses to icons
const iconMap = {
  '/settings': Cog6ToothIcon,
  '/about-us': InformationCircleIcon,
  '/app-instruction': BookOpenIcon,
  '/privacy-policy': ShieldCheckIcon,
  '/support': LifebuoyIcon,
  '/feedback': ChatBubbleLeftRightIcon,
  '/profile': UserIcon,
  '/my-farms': MapIcon,
  '/orders': ShoppingBagIcon,
  // Default icon for unknown routes
  'default': InformationCircleIcon
}

const linkIcon = computed(() => iconMap[props.pageAddr] || iconMap.default)

const handleClick = () => {
  emit('link-clicked')
  // Add any additional click handling here
}
</script>

<style scoped>
.extra-link {
  cursor: pointer;
}

.extra-link:active {
  transform: scale(0.98);
  transition: transform 0.1s ease;
}
</style>