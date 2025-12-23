<template>
  <div>
    <!-- Header -->
    <header 
      class="fixed bg-gradient-to-r from-green-50 to-white h-16 top-0 left-0 w-full px-4 shadow-sm z-50 flex items-center transition-all duration-300 ease-linear"
    >
      <nav class="nav text-gray-800 flex justify-between items-center mx-auto max-w-7xl w-full transition-all duration-200 ease-linear">
        <!-- Logo Section -->
        <div class="flex items-center gap-x-3 nav-logo group cursor-pointer">
          <div class="relative">
            <img 
              src="/images/logo.png" 
              alt="Smart Farmer Logo" 
              class="w-8 h-8 sm:w-10 sm:h-10 object-contain transform transition-transform duration-300 group-hover:scale-110"
            />
            <div class="absolute -inset-1 bg-green-200 rounded-full blur-sm opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
          </div>
          <a
            href="/"
            class="font-bold text-xl sm:text-2xl font-sans text-green-600 tracking-tight"
          >
            স্মার্ট কৃষক
            <span class="text-green-500 animate-pulse">.</span>
          </a>
        </div>

        <!-- Desktop Navigation Links -->
        <div class="flex items-center gap-x-8">
          <!-- Main Navigation for Desktop -->
          <div class="nav-menu hidden lg:block" id="nav-menu">
            <ul class="flex justify-around items-center gap-x-8">
              <NavItem 
                v-for="nav in mainNavItems"
                :key="nav.id"
                :section-id="nav.id"
                :nav-name="nav.name"
                :nav-icon="nav.icon"
              />
            </ul>
          </div>

          <!-- User Profile/Dropdown for Desktop -->
          <div class="hidden lg:flex items-center gap-x-4">
            <button 
              @click="toggleNotifications"
              class="relative p-2 rounded-full hover:bg-green-100 transition-colors"
            >
              <BellIcon class="w-6 h-6 text-gray-600" />
              <span 
                v-if="notificationCount > 0"
                class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
              >
                {{ notificationCount }}
              </span>
            </button>
            
            <!-- User Avatar -->
            <div class="relative group">
              <button 
                @click="toggleUserMenu"
                class="flex items-center gap-x-2 p-2 rounded-lg hover:bg-green-50 transition-colors"
              >
                <div class="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                  <UserIcon class="w-5 h-5 text-white" />
                </div>
                <ChevronDownIcon class="w-4 h-4 text-gray-500" />
              </button>
              
              <!-- User Dropdown Menu -->
              <div 
                v-if="isUserMenuOpen"
                class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-100"
              >
                <ExtraLinks 
                  v-for="link in userMenuLinks"
                  :key="link.addr"
                  :page-addr="link.addr"
                  :page-name="link.name"
                  @link-clicked="closeAllMenus"
                />
              </div>
            </div>
          </div>

          <!-- Mobile Menu Toggle Button -->
          <button
            @click="toggleMobileMenu"
            class="lg:hidden p-2 rounded-lg text-green-600 hover:bg-green-100 transition-colors focus:outline-none focus:ring-2 focus:ring-green-300"
            :class="{ 'bg-green-100': isMobileMenuOpen }"
          >
            <span class="sr-only">{{ isMobileMenuOpen ? 'Close menu' : 'Open menu' }}</span>
            <div class="relative w-6 h-6">
              <Bars3Icon 
                v-if="!isMobileMenuOpen"
                class="absolute inset-0 w-6 h-6 transition-all duration-300"
              />
              <XMarkIcon 
                v-else
                class="absolute inset-0 w-6 h-6 transition-all duration-300"
              />
            </div>
          </button>
        </div>
      </nav>
    </header>

    <!-- Mobile Menu Overlay -->
    <transition name="slide-fade">
      <div 
        v-if="isMobileMenuOpen"
        class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        @click="closeAllMenus"
      ></div>
    </transition>

    <!-- Mobile Menu Panel -->
    <transition name="slide-right">
      <div 
        v-if="isMobileMenuOpen"
        class="fixed top-0 right-0 h-full w-80 max-w-full bg-gradient-to-b from-green-50 to-white shadow-2xl z-50 lg:hidden transform transition-transform duration-300 ease-out"
      >
        <!-- Mobile Menu Header -->
        <div class="flex items-center justify-between p-6 border-b border-green-100">
          <div class="flex items-center gap-x-3">
            <div class="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
              <UserIcon class="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 class="font-semibold text-gray-800">কৃষক ব্যবহারকারী</h3>
              <p class="text-sm text-gray-500">Premium Member</p>
            </div>
          </div>
          <button
            @click="closeAllMenus"
            class="p-2 rounded-full hover:bg-green-100 transition-colors"
          >
            <XMarkIcon class="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <!-- Mobile Navigation -->
        <div class="p-4 overflow-y-auto h-[calc(100%-140px)]">
          <!-- Main Navigation -->
          <div class="mb-8">
            <h4 class="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-4 px-2">মূল মেনু</h4>
            <ul class="space-y-1">
              <NavItem 
                v-for="nav in mainNavItems"
                :key="nav.id"
                :section-id="nav.id"
                :nav-name="nav.name"
                :nav-icon="nav.icon"
                mobile
                @nav-click="closeAllMenus"
              />
            </ul>
          </div>

          <!-- Extra Links -->
          <div class="mb-8">
            <h4 class="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-4 px-2">অন্যান্য লিংক</h4>
            <ul class="space-y-1">
              <ExtraLinks 
                v-for="link in extraLinks"
                :key="link.addr"
                :page-addr="link.addr"
                :page-name="link.name"
                @link-clicked="closeAllMenus"
              />
            </ul>
          </div>

          <!-- Quick Actions -->
          <div>
            <h4 class="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-4 px-2">দ্রুত অ্যাকশন</h4>
            <div class="grid grid-cols-2 gap-3">
              <button 
                @click="quickAction('scan')"
                class="flex flex-col items-center justify-center p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors group"
              >
                <QrCodeIcon class="w-8 h-8 text-green-600 mb-2 group-hover:scale-110 transition-transform" />
                <span class="text-sm font-medium text-gray-700">স্ক্যান করুন</span>
              </button>
              <button 
                @click="quickAction('help')"
                class="flex flex-col items-center justify-center p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors group"
              >
                <QuestionMarkCircleIcon class="w-8 h-8 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
                <span class="text-sm font-medium text-gray-700">সাহায্য</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Mobile Footer -->
        <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-green-100 bg-white">
          <div class="flex items-center justify-between">
            <button 
              @click="toggleDarkMode"
              class="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <SunIcon v-if="isDarkMode" class="w-5 h-5 text-gray-600" />
              <MoonIcon v-else class="w-5 h-5 text-gray-600" />
            </button>
            <button 
              @click="logout"
              class="flex items-center gap-x-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
            >
              <ArrowRightIcon class="w-5 h-5" />
              <span class="font-medium">লগ আউট</span>
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import NavItem from './NavItem.vue'
import ExtraLinks from './ExtraLinks.vue'
import {
  HomeIcon,
  BuildingStorefrontIcon,
  QrCodeIcon,
  Squares2X2Icon,
  UserCircleIcon,
  BellIcon,
  UserIcon,
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
  QuestionMarkCircleIcon,
  SunIcon,
  MoonIcon,
  ArrowRightIcon
} from '@heroicons/vue/24/outline'

// Reactive state
const isMobileMenuOpen = ref(false)
const isUserMenuOpen = ref(false)
const isDarkMode = ref(false)
const notificationCount = ref(3)

// Navigation data
const mainNavItems = [
  { id: '/', name: 'হোম', icon: HomeIcon },
  { id: '/crop-analysis', name: 'ফসল বিশ্লেষণ', icon: QrCodeIcon },
  { id: '/crop-maintenance', name: 'রক্ষণাবেক্ষণ', icon: BuildingStorefrontIcon },
  { id: '/additional-info', name: 'অন্যান্য', icon: Squares2X2Icon },
  { id: '/profile-page', name: 'প্রোফাইল', icon: UserCircleIcon }
]

const extraLinks = [
  { addr: '/settings', name: 'সেটিংস' },
  { addr: '/about-us', name: 'আমাদের সম্পর্কে' },
  { addr: '/app-instruction', name: 'অ্যাপ নির্দেশিকা' },
  { addr: '/privacy-policy', name: 'গোপনীয়তা নীতি' },
  { addr: '/support', name: 'সাহায্য ও সমর্থন' },
  { addr: '/feedback', name: 'প্রতিক্রিয়া দিন' }
]

const userMenuLinks = [
  { addr: '/profile', name: 'আমার প্রোফাইল' },
  { addr: '/my-farms', name: 'আমার খামার' },
  { addr: '/orders', name: 'আমার অর্ডার' },
  { addr: '/settings', name: 'সেটিংস' }
]

// Methods
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  isUserMenuOpen.value = false
}

const toggleUserMenu = () => {
  isUserMenuOpen.value = !isUserMenuOpen.value
  isMobileMenuOpen.value = false
}

const toggleNotifications = () => {
  // Handle notification toggle
  notificationCount.value = 0
}

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  document.documentElement.classList.toggle('dark', isDarkMode.value)
}

const closeAllMenus = () => {
  isMobileMenuOpen.value = false
  isUserMenuOpen.value = false
}

const quickAction = (action) => {
  console.log('Quick action:', action)
  closeAllMenus()
  // Handle quick actions
}

const logout = () => {
  console.log('Logging out...')
  closeAllMenus()
  // Handle logout logic
}

// Close menus on ESC key press
const handleEscapeKey = (event) => {
  if (event.key === 'Escape') {
    closeAllMenus()
  }
}

// Close mobile menu on window resize (if resized to desktop)
const handleResize = () => {
  if (window.innerWidth >= 1024) {
    closeAllMenus()
  }
}

// Lifecycle hooks
onMounted(() => {
  window.addEventListener('keydown', handleEscapeKey)
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleEscapeKey)
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
/* Animation for mobile menu overlay */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
}

/* Animation for mobile menu panel */
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-right-enter-from {
  transform: translateX(100%);
}

.slide-right-leave-to {
  transform: translateX(100%);
}

/* Custom scrollbar for mobile menu */
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>