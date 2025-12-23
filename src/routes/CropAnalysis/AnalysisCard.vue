<template>
    <div class="max-w-5xl mx-auto space-y-8 font-sans antialiased text-slate-900 overflow-scroll rounded-2xl">
        
        <!-- Stepper -->
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-100 p-4 max-h-28 shadow-lg">
            <div class="relative flex items-center justify-between max-w-2xl mx-auto">
                <!-- Background track -->
                <div class="absolute top-[28px] left-0 w-full h-1 bg-slate-100 rounded-full"></div>
                <!-- Progress bar -->
                <div 
                    class="absolute top-[28px] left-0 h-1 bg-gradient-to-r from-emerald-500 to-emerald-600 transition-all duration-700 ease-in-out rounded-full"
                    :style="{ width: currentProgress + '%' }"
                ></div>

                <!-- Steps -->
                <div v-for="(step, i) in steps" :key="i" class="relative z-10 flex flex-col items-center group">
                    <div 
                        class="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 border-2 mb-3 group-hover:scale-110"
                        :class="[
                            currentStep >= i + 1 
                                ? 'bg-white border-emerald-500 shadow-lg shadow-emerald-100' 
                                : 'bg-white border-slate-200'
                        ]"
                    >
                        <font-awesome-icon 
                            v-if="currentStep > i + 1" 
                            :icon="['fas', 'check']" 
                            class="text-emerald-500 text-sm" 
                        />
                        <font-awesome-icon 
                            v-else 
                            :icon="['fas', step.icon]" 
                            class="text-lg"
                            :class="currentStep >= i + 1 ? 'text-emerald-600' : 'text-slate-400'"
                        />
                    </div>
                    <span class="text-xs font-semibold uppercase tracking-widest transition-colors" 
                          :class="currentStep >= i + 1 ? 'text-emerald-700' : 'text-slate-500'">
                        {{ step.label }}
                    </span>
                </div>
            </div>
        </div>

        <!-- Image Upload Section -->
        <section class="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-lg transition-all duration-300 max-h-96">
            <div class="p-1">
                <div v-if="!image" class="m-4">
                    <label class="relative block cursor-pointer group">
                        <input type="file" accept="image/*" @change="onFileSelected" class="hidden" />
                        <div class="border-3 border-dashed border-slate-200 rounded-2xl p-8 text-center group-hover:border-emerald-300 group-hover:bg-gradient-to-br from-emerald-50/30 to-white transition-all duration-300">
                            <div class="relative w-24 h-24 mx-auto mb-6">
                                <div class="absolute inset-0 bg-emerald-100 rounded-2xl rotate-6 group-hover:rotate-12 transition-transform duration-300"></div>
                                <div class="relative w-full h-full bg-white rounded-2xl shadow-md flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform duration-300">
                                    <font-awesome-icon :icon="['fas', 'cloud-arrow-up']" class="text-3xl" />
                                </div>
                            </div>
                            <h2 class="text-xl font-bold text-slate-800 mb-2">ফসলের ছবি আপলোড করুন</h2>
                            <p class="text-slate-500 text-sm max-w-xs mx-auto">AI রোগ শনাক্তকরণের জন্য ছবি দিন</p>
                            <div class="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-full text-xs text-slate-600 border border-slate-200">
                                <font-awesome-icon :icon="['fas', 'lightbulb']" class="text-amber-500" />
                                <span>স্পষ্ট ছবি = সঠিক ফলাফল</span>
                            </div>
                        </div>
                    </label>
                </div>

                <div v-else class="relative group m-2">
                    <div class="relative overflow-hidden rounded-2xl border-4 border-white shadow-lg">
                        <img :src="image" alt="Preview" class="w-full h-80 object-cover" />
                        
                        <!-- Loading overlay -->
                        <div v-if="isLoading" 
                             class="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] flex flex-col items-center justify-center text-white p-6 text-center">
                            <div class="relative w-20 h-20 mb-6">
                                <div class="absolute inset-0 border-4 border-white/20 rounded-full"></div>
                                <div class="absolute inset-0 border-4 border-emerald-400 rounded-full border-t-transparent animate-spin"></div>
                                <font-awesome-icon :icon="['fas', 'seedling']" class="absolute inset-0 m-auto text-2xl text-emerald-400 animate-pulse" />
                            </div>
                            <h3 class="text-xl font-bold mb-2">এআই বিশ্লেষণ চলছে...</h3>
                            <p class="text-emerald-100 opacity-80 max-w-[250px]">আপনার ফসলের স্বাস্থ্য এবং রোগ বিশ্লেষণ করা হচ্ছে</p>
                        </div>

                        <!-- Image controls -->
                        <div class="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button @click="$emit('reset-analysis')"
                                    class="bg-white/90 backdrop-blur text-red-600 p-2.5 rounded-xl shadow-lg hover:bg-red-50 transition-all border border-red-100">
                                <font-awesome-icon :icon="['fas', 'trash']" />
                            </button>
                            <label class="bg-white/90 backdrop-blur text-emerald-600 p-2.5 rounded-xl shadow-lg hover:bg-emerald-50 transition-all border border-emerald-100 cursor-pointer">
                                <input type="file" accept="image/*" @change="onFileSelected" class="hidden" />
                                <font-awesome-icon :icon="['fas', 'sync']" />
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Analysis Report Section -->
        <transition name="slide-up">
            <section v-if="cropInfo" class="space-y-6">
                <div class="bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-lg border border-slate-200 p-6 md:p-8">
                    <div class="flex items-center gap-4 mb-4">
                        <div class="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
                            <font-awesome-icon :icon="['fas', 'chart-line']" class="text-white text-lg" />
                        </div>
                        <div>
                            <h2 class="text-2xl font-bold text-slate-800">বিশ্লেষণ রিপোর্ট</h2>
                            <p class="text-slate-500">আপনার ফসলের স্বাস্থ্য বিশ্লেষণ</p>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
                        <!-- Health Status -->
                        <div class="md:col-span-4 flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                            <h3 class="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">স্বাস্থ্যের অবস্থা</h3>
                            <div class="relative flex items-center justify-center mb-4">
                                <svg class="w-36 h-36 transform -rotate-90">
                                    <circle cx="72" cy="72" r="66" stroke="currentColor" stroke-width="8" fill="transparent" class="text-slate-200" />
                                    <circle cx="72" cy="72" r="66" stroke="currentColor" stroke-width="8" fill="transparent" 
                                        :stroke-dasharray="414.7" :stroke-dashoffset="414.7 - (414.7 * healthPercentage) / 100"
                                        class="transition-all duration-1000 ease-out" 
                                        :class="healthPercentage > 70 ? 'text-emerald-500' : (healthPercentage > 40 ? 'text-amber-500' : 'text-rose-500')" />
                                </svg>
                                <span class="absolute text-3xl font-black text-slate-800">{{ healthPercentage }}%</span>
                            </div>
                            <p class="font-bold text-lg" :class="healthPercentage > 70 ? 'text-emerald-600' : 'text-rose-600'">
                                {{ healthPercentage > 70 ? 'সুস্থ অবস্থায় আছে' : 'যত্ন প্রয়োজন' }}
                            </p>
                        </div>

                        <!-- Analysis Details -->
                        <div class="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div class="p-5 rounded-2xl bg-gradient-to-br from-blue-50 to-white border border-blue-100">
                                <p class="text-xs font-bold text-blue-500 uppercase mb-1">শনাক্তকৃত ফসল</p>
                                <p class="text-2xl font-black text-blue-900">{{ cropInfo.name }}</p>
                            </div>
                            <div class="p-5 rounded-2xl bg-gradient-to-br from-rose-50 to-white border border-rose-100">
                                <p class="text-xs font-bold text-rose-500 uppercase mb-1">সম্ভাব্য রোগ</p>
                                <p class="text-2xl font-black text-rose-900">{{ cropInfo.disease }}</p>
                            </div>
                            <div class="sm:col-span-2 p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-white border border-emerald-100">
                                <h4 class="font-bold text-emerald-900 flex items-center gap-2 mb-3">
                                    <font-awesome-icon :icon="['fas', 'check-circle']" />
                                    করণীয় পদক্ষেপ
                                </h4>
                                <p class="text-emerald-800 leading-relaxed mb-4">{{ cropInfo.solution }}</p>
                                <div v-if="cropInfo.steps" class="space-y-2">
                                    <div v-for="(step, index) in cropInfo.steps" :key="index"
                                        class="flex items-start gap-2 text-sm text-emerald-700">
                                        <font-awesome-icon :icon="['fas', 'circle-check']" class="mt-0.5 flex-shrink-0 text-emerald-500" />
                                        <span>{{ step }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Action Buttons -->
                    <div class="mt-8 flex flex-wrap gap-3 border-t border-slate-100 pt-6">
                        <button @click="$emit('download-report')" 
                                class="flex-1 min-w-[150px] bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold py-3.5 px-6 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-100">
                            <font-awesome-icon :icon="['fas', 'download']" />
                            রিপোর্ট ডাউনলোড
                        </button>
                        <button @click="$emit('toggle-info')" 
                                class="flex-1 min-w-[150px] bg-gradient-to-r from-slate-100 to-slate-50 hover:from-slate-200 hover:to-slate-100 text-slate-700 font-bold py-3.5 px-6 rounded-xl transition-all flex items-center justify-center gap-2 border border-slate-200">
                            <font-awesome-icon :icon="showMoreInfo ? ['fas', 'eye-slash'] : ['fas', 'eye']" />
                            {{ showMoreInfo ? 'সরল দেখুন' : 'বিস্তারিত দেখুন' }}
                        </button>
                    </div>
                </div>
            </section>
        </transition>
    </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faCheck, faCamera, faCloudArrowUp, faSeedling,
    faTrash, faSync, faChartLine, faCheckCircle,
    faCircleCheck, faDownload, faEye, faEyeSlash,
    faArrowTrendUp, faLightbulb
} from '@fortawesome/free-solid-svg-icons'

library.add(
    faCheck, faCamera, faCloudArrowUp, faSeedling,
    faTrash, faSync, faChartLine, faCheckCircle,
    faCircleCheck, faDownload, faEye, faEyeSlash,
    faArrowTrendUp, faLightbulb
)

const props = defineProps({
    image: String,
    cropInfo: Object,
    isLoading: Boolean,
    healthPercentage: Number,
    showMoreInfo: Boolean
})

const emit = defineEmits(['image-uploaded', 'reset-analysis', 'toggle-info', 'download-report'])

// Stepper data
const steps = [
    { label: 'ছবি আপলোড', icon: 'camera' },
    { label: 'বিশ্লেষণ চলছে', icon: 'seedling' },
    { label: 'ফলাফল প্রাপ্তি', icon: 'chart-line' }
]

// Compute current step and progress
const currentStep = computed(() => {
    if (!props.image) return 1
    if (props.isLoading) return 2
    if (props.cropInfo) return 3
    return 1
})

const currentProgress = computed(() => {
    return ((currentStep.value - 1) / (steps.length - 1)) * 100
})

const onFileSelected = (event) => {
    const file = event.target.files?.[0]
    if (file) emit('image-uploaded', file)
}
</script>

<style scoped>
/* Animations */
.slide-up-enter-active {
    transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-up-enter-from {
    opacity: 0;
    transform: translateY(30px);
}

/* Smooth SVG transition */
circle {
    transition: stroke-dashoffset 1.5s ease-in-out;
}
</style>