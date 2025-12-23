<template>
    <div class="p-4 min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <!-- Simple Header -->
        <div class="text-center mb-6">
            <h1 class="text-2xl font-bold text-green-800 mb-2">
                <font-awesome-icon :icon="['fas', 'camera']" class="mr-2" />
                ফসলের ছবি দিয়ে রোগ নির্ণয়
            </h1>
            <p class="text-gray-600">সহজে আপনার ফসলের ছবি তুলে রোগ সম্পর্কে জানুন</p>
        </div>

        <!-- Main Content - Step by Step -->
        <div class="max-w-6xl mx-auto">
            <!-- Left Column for Main Content -->
            <div class="lg:grid lg:grid-cols-3 lg:gap-6 lg:items-start">
                <!-- Main Steps (2/3 width on desktop) -->
                <div class="lg:col-span-2 space-y-6">
                    <!-- Step 1: Upload Image -->
                    <div class="bg-white rounded-xl shadow-lg p-6">
                        <div class="flex items-center gap-3 mb-4">
                            <div
                                class="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                                ১</div>
                            <h2 class="text-xl font-semibold text-gray-800">ছবি তুলুন বা আপলোড করুন</h2>
                        </div>

                        <div v-if="!image" class="text-center">
                            <!-- Upload Button - Big and Simple -->
                            <label class="block cursor-pointer">
                                <input type="file" accept="image/*" @change="handleImageUpload" class="hidden" />
                                <div
                                    class="border-4 border-dashed border-green-300 rounded-xl p-10 hover:bg-green-50 transition-colors">
                                    <font-awesome-icon :icon="['fas', 'camera']" class="text-6xl text-green-500 mb-4" />
                                    <p class="text-xl font-medium text-gray-700 mb-2">এখানে ক্লিক করুন</p>
                                    <p class="text-gray-500">অথবা আপনার ফোন থেকে ছবি তুলুন</p>
                                    <div class="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
                                        <font-awesome-icon :icon="['fas', 'lightbulb']" />
                                        <span>স্পষ্ট ছবি তুললে ভালো রেজাল্ট পাবেন</span>
                                    </div>
                                </div>
                            </label>

                            <!-- Simple Tips -->
                            <div class="mt-6 bg-yellow-50 p-4 rounded-lg">
                                <p class="font-medium text-yellow-800 mb-2">
                                    <font-awesome-icon :icon="['fas', 'info-circle']" class="mr-2" />
                                    ছবি তোলার সময় যা মেনে চলবেন:
                                </p>
                                <ul class="text-sm text-yellow-700 grid grid-cols-1 md:grid-cols-2 gap-2">
                                    <li class="flex items-start gap-2">
                                        <font-awesome-icon :icon="['fas', 'check-circle']"
                                            class="text-green-500 mt-1" />
                                        <span>দিনের আলোতে ছবি তুলুন</span>
                                    </li>
                                    <li class="flex items-start gap-2">
                                        <font-awesome-icon :icon="['fas', 'check-circle']"
                                            class="text-green-500 mt-1" />
                                        <span>ফসলের কাছ থেকে ছবি তুলুন</span>
                                    </li>
                                    <li class="flex items-start gap-2">
                                        <font-awesome-icon :icon="['fas', 'check-circle']"
                                            class="text-green-500 mt-1" />
                                        <span>রোগগ্রস্ত পাতার ছবি তুলুন</span>
                                    </li>
                                    <li class="flex items-start gap-2">
                                        <font-awesome-icon :icon="['fas', 'check-circle']"
                                            class="text-green-500 mt-1" />
                                        <span>ছবি ঝাপসা না হয়</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <!-- Image Preview -->
                        <div v-if="image" class="mt-4">
                            <div class="flex items-center justify-between mb-2">
                                <p class="font-medium text-gray-700">আপনার তোলা ছবি:</p>
                                <button @click="resetAnalysis"
                                    class="text-sm bg-red-100 text-red-600 px-3 py-1 rounded-lg hover:bg-red-200">
                                    <font-awesome-icon :icon="['fas', 'trash']" class="mr-1" />
                                    পরিবর্তন করুন
                                </button>
                            </div>

                            <div class="relative">
                                <img :src="image" alt="ফসলের ছবি" class="w-full h-64 object-cover rounded-lg shadow" />

                                <!-- Loading Animation -->
                                <div v-if="isLoading"
                                    class="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex flex-col items-center justify-center">
                                    <div
                                        class="animate-spin rounded-full h-16 w-16 border-4 border-green-500 border-t-transparent">
                                    </div>
                                    <p class="mt-4 text-white text-lg font-medium">ছবি চেক করা হচ্ছে...</p>
                                    <p class="text-green-200 mt-2">অল্পক্ষণ অপেক্ষা করুন</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Step 2: Analysis Results -->
                    <div v-if="cropInfo" class="bg-white rounded-xl shadow-lg p-6">
                        <div class="flex items-center gap-3 mb-4">
                            <div
                                class="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                                ২</div>
                            <h2 class="text-xl font-semibold text-gray-800">আপনার ফসলের ফলাফল</h2>
                        </div>

                        <!-- Result Cards -->
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <!-- Crop Health -->
                            <div
                                class="bg-gradient-to-br from-green-50 to-emerald-100 p-4 rounded-xl border border-green-200">
                                <div class="flex items-center justify-between mb-2">
                                    <h3 class="font-semibold text-gray-800">ফসলের অবস্থা</h3>
                                    <font-awesome-icon :icon="['fas', 'heartbeat']" class="text-green-500" />
                                </div>
                                <div class="text-center">
                                    <div class="relative inline-block">
                                        <div
                                            class="w-24 h-24 rounded-full border-4 border-green-200 flex items-center justify-center">
                                            <span class="text-3xl font-bold text-green-700">{{ healthPercentage
                                                }}%</span>
                                        </div>
                                        <div
                                            class="absolute inset-0 w-24 h-24 rounded-full border-4 border-transparent border-t-green-500 animate-spin">
                                        </div>
                                    </div>
                                    <p class="mt-2 text-sm text-gray-600">
                                        <span v-if="healthPercentage >= 70" class="text-green-600 font-medium">ভালো
                                            অবস্থা</span>
                                        <span v-else-if="healthPercentage >= 40"
                                            class="text-yellow-600 font-medium">মাঝারি অবস্থা</span>
                                        <span v-else class="text-red-600 font-medium">সতর্কতা প্রয়োজন</span>
                                    </p>
                                </div>
                            </div>

                            <!-- Crop Name -->
                            <div
                                class="bg-gradient-to-br from-blue-50 to-sky-100 p-4 rounded-xl border border-blue-200">
                                <div class="flex items-center justify-between mb-2">
                                    <h3 class="font-semibold text-gray-800">ফসলের নাম</h3>
                                    <font-awesome-icon :icon="['fas', 'leaf']" class="text-blue-500" />
                                </div>
                                <p class="text-2xl font-bold text-center text-gray-800">{{ cropInfo.name }}</p>
                                <div class="mt-4 flex items-center justify-center gap-2 text-sm text-blue-600">
                                    <font-awesome-icon :icon="['fas', 'seedling']" />
                                    <span>প্রধান ফসল</span>
                                </div>
                            </div>

                            <!-- Disease Info -->
                            <div
                                class="bg-gradient-to-br from-orange-50 to-amber-100 p-4 rounded-xl border border-orange-200">
                                <div class="flex items-center justify-between mb-2">
                                    <h3 class="font-semibold text-gray-800">সম্ভাব্য রোগ</h3>
                                    <font-awesome-icon :icon="['fas', 'exclamation-triangle']"
                                        class="text-orange-500" />
                                </div>
                                <p class="text-lg font-bold text-center text-gray-800 mb-2">{{ cropInfo.disease }}</p>
                                <div class="text-xs text-orange-600 bg-orange-50 p-2 rounded">
                                    <font-awesome-icon :icon="['fas', 'info-circle']" class="mr-1" />
                                    এই রোগের জন্য নিচের সমাধান দেখুন
                                </div>
                            </div>
                        </div>

                        <!-- Solution Section -->
                        <div
                            class="bg-gradient-to-r from-green-100 to-emerald-50 p-5 rounded-xl border border-green-300">
                            <h3 class="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                                <font-awesome-icon :icon="['fas', 'check-circle']" class="text-green-600" />
                                কী করবেন?
                            </h3>

                            <div class="space-y-3">
                                <p class="text-gray-700">{{ cropInfo.solution }}</p>

                                <!-- Step by Step Solution -->
                                <div class="mt-4">
                                    <h4 class="font-medium text-gray-800 mb-2">ধাপে ধাপে সমাধান:</h4>
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <div v-for="(step, index) in cropInfo.steps" :key="index"
                                            class="flex items-start gap-3 bg-white p-3 rounded-lg border">
                                            <span
                                                class="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                                {{ index + 1 }}
                                            </span>
                                            <p class="text-sm text-gray-700">{{ step }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Action Buttons -->
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6">
                            <!-- More Details -->
                            <button @click="showMoreInfo = !showMoreInfo"
                                class="flex items-center justify-center gap-2 bg-blue-100 text-blue-700 p-3 rounded-lg hover:bg-blue-200">
                                <font-awesome-icon :icon="showMoreInfo ? ['fas', 'eye-slash'] : ['fas', 'eye']" />
                                {{ showMoreInfo ? 'কম দেখুন' : 'বিস্তারিত দেখুন' }}
                            </button>

                            <!-- Download Report -->
                            <button @click="downloadReport"
                                class="flex items-center justify-center gap-2 bg-green-500 text-white p-3 rounded-lg hover:bg-green-600">
                                <font-awesome-icon :icon="['fas', 'download']" />
                                রিপোর্ট নিন
                            </button>

                            <!-- New Analysis -->
                            <button @click="resetAnalysis"
                                class="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 p-3 rounded-lg hover:bg-gray-200">
                                <font-awesome-icon :icon="['fas', 'redo']" />
                                নতুন ছবি দিন
                            </button>
                        </div>

                        <!-- More Details Section -->
                        <div v-if="showMoreInfo" class="mt-6 bg-gray-50 p-5 rounded-xl">
                            <h4 class="font-bold text-gray-800 mb-3">বিস্তারিত তথ্য:</h4>
                            <p class="text-gray-700">{{ cropInfo.moreInfo }}</p>

                            <!-- Additional Tips -->
                            <div class="mt-4 bg-yellow-50 p-4 rounded-lg">
                                <h5 class="font-semibold text-yellow-800 mb-2 flex items-center gap-2">
                                    <font-awesome-icon :icon="['fas', 'lightbulb']" />
                                    বিশেষজ্ঞ পরামর্শ
                                </h5>
                                <p class="text-sm text-yellow-700">{{ cropInfo.expertTip }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Step 3: Previous Comparison -->
                    <div v-if="cropInfo" class="bg-white rounded-xl shadow-lg p-6">
                        <div class="flex items-center gap-3 mb-4">
                            <div
                                class="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">
                                ৩</div>
                            <h2 class="text-xl font-semibold text-gray-800">পূর্বের ফলাফলের সাথে তুলনা</h2>
                        </div>

                        <div class="bg-gradient-to-r from-purple-50 to-pink-50 p-5 rounded-xl">
                            <div class="grid grid-cols-2 gap-4">
                                <div class="text-center">
                                    <p class="text-sm text-gray-600 mb-1">গত মাস</p>
                                    <p class="text-3xl font-bold text-gray-800">৬০%</p>
                                    <div class="w-full bg-gray-200 rounded-full h-3 mt-2">
                                        <div class="bg-yellow-500 h-3 rounded-full" style="width: 60%"></div>
                                    </div>
                                </div>

                                <div class="text-center">
                                    <p class="text-sm text-gray-600 mb-1">এখন</p>
                                    <p class="text-3xl font-bold text-gray-800">{{ healthPercentage }}%</p>
                                    <div class="w-full bg-gray-200 rounded-full h-3 mt-2">
                                        <div class="bg-green-500 h-3 rounded-full"
                                            :style="{ width: healthPercentage + '%' }"></div>
                                    </div>
                                </div>
                            </div>

                            <div class="mt-4 text-center">
                                <p class="text-gray-700">
                                    <span v-if="healthPercentage > 60" class="text-green-600 font-medium">
                                        <font-awesome-icon :icon="['fas', 'arrow-up']" class="mr-1" />
                                        আগের চেয়ে {{ healthPercentage - 60 }}% উন্নতি হয়েছে!
                                    </span>
                                    <span v-else-if="healthPercentage < 60" class="text-red-600 font-medium">
                                        <font-awesome-icon :icon="['fas', 'arrow-down']" class="mr-1" />
                                        সতর্ক: আরও যত্ন প্রয়োজন
                                    </span>
                                    <span v-else class="text-gray-600">
                                        অবস্থা অপরিবর্তিত
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right Column for FAQ (1/3 width on desktop) -->
                <div class="lg:col-span-1">
                    <!-- Help Section - Fixed Height with Scroll -->
                    <div class="bg-white rounded-xl shadow-lg p-6 h-full overflow-y-auto sidebar-scroll">
                        <!-- Quick Tips -->
                        <div
                            class="mb-4 bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
                            <h4 class="font-bold text-green-800 mb-2 flex items-center gap-2">
                                <font-awesome-icon :icon="['fas', 'star']" class="text-yellow-500" />
                                দ্রুত পরামর্শ
                            </h4>
                            <ul class="space-y-2">
                                <li class="flex items-start gap-2">
                                    <font-awesome-icon :icon="['fas', 'sun']" class="text-amber-500 mt-1" />
                                    <span class="text-sm text-gray-700">সকালের আলোয় ছবি তুলুন</span>
                                </li>
                                <li class="flex items-start gap-2">
                                    <font-awesome-icon :icon="['fas', 'hand-holding-water']"
                                        class="text-blue-500 mt-1" />
                                    <span class="text-sm text-gray-700">সেচের পর ছবি তুলবেন না</span>
                                </li>
                                <li class="flex items-start gap-2">
                                    <font-awesome-icon :icon="['fas', 'crop']" class="text-green-500 mt-1" />
                                    <span class="text-sm text-gray-700">একবারে এক ধরনের ফসল</span>
                                </li>
                            </ul>
                        </div>

                        <!-- FAQ Section -->
                        <div class="mb-6">
                            <div class="flex items-center gap-3 mb-4">
                                <div
                                    class="w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center">
                                    <font-awesome-icon :icon="['fas', 'question-circle']" />
                                </div>
                                <h2 class="text-xl font-semibold text-gray-800">সাধারণ প্রশ্ন</h2>
                            </div>
                            <div class="space-y-2">
                                <div v-for="(item, index) in faq" :key="index"
                                    class="border border-gray-200 rounded-lg overflow-hidden">
                                    <!-- FAQ Question -->
                                    <button @click="toggleFAQ(index)"
                                        class="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 flex items-center justify-between transition-colors">
                                        <div class="flex items-center gap-3">
                                            <font-awesome-icon :icon="item.icon" :class="item.iconColor" />
                                            <span class="font-medium text-gray-800">{{ item.question }}</span>
                                        </div>
                                        <font-awesome-icon
                                            :icon="activeFAQ === index ? ['fas', 'chevron-up'] : ['fas', 'chevron-down']"
                                            class="text-gray-500" />
                                    </button>

                                    <!-- FAQ Answer -->
                                    <div v-if="activeFAQ === index" class="p-3 bg-white">
                                        <p class="text-sm text-gray-700">{{ item.answer }}</p>

                                        <!-- Additional tips for some FAQs -->
                                        <div v-if="item.tips" class="mt-2 pl-4 border-l-2 border-green-300">
                                            <p class="text-xs font-medium text-green-700 mb-1">পরামর্শ:</p>
                                            <ul class="text-xs text-green-600 space-y-1">
                                                <li v-for="(tip, tipIndex) in item.tips" :key="tipIndex"
                                                    class="flex items-start gap-1">
                                                    <font-awesome-icon :icon="['fas', 'check']"
                                                        class="w-3 h-3 mt-0.5 flex-shrink-0" />
                                                    <span>{{ tip }}</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Emergency Help -->
                        <div class="bg-gradient-to-r from-red-50 to-pink-50 p-4 rounded-lg border border-red-200 mt-4">
                            <div class="flex items-center gap-3 mb-3">
                                <div
                                    class="w-10 h-10 bg-red-500 text-white rounded-lg flex items-center justify-center">
                                    <font-awesome-icon :icon="['fas', 'phone-alt']" class="text-lg" />
                                </div>
                                <div>
                                    <h3 class="font-bold text-red-700">জরুরি সাহায্য প্রয়োজন?</h3>
                                    <p class="text-sm text-red-600">কৃষি বিশেষজ্ঞের সাথে সরাসরি কথা বলুন</p>
                                </div>
                            </div>
                            <button
                                class="w-full bg-red-500 text-white px-4 py-3 rounded-lg hover:bg-red-600 transition-colors font-medium">
                                এখনই কল করুন: ১৬১২৩
                            </button>
                            <p class="text-xs text-red-600 mt-2 text-center">২৪/৭ ফ্রি হেল্পলাইন</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Bottom Banner -->
        <div class="mt-8 bg-gradient-to-r from-green-600 to-emerald-700 rounded-xl p-6 text-white text-center">
            <h3 class="text-xl font-bold mb-2">
                <font-awesome-icon :icon="['fas', 'shield-alt']" class="mr-2" />
                আপনার ফসল সুরক্ষিত রাখুন
            </h3>
            <p class="mb-4">নিয়মিত চেক করুন এবং সময়মতো ব্যবস্থা নিন</p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import {
    faCamera,
    faLightbulb,
    faInfoCircle,
    faCheckCircle,
    faHeartbeat,
    faLeaf,
    faExclamationTriangle,
    faEye,
    faEyeSlash,
    faDownload,
    faRedo,
    faTrash,
    faArrowUp,
    faArrowDown,
    faQuestionCircle,
    faPhone,
    faPhoneAlt,
    faSeedling,
    faChevronUp,
    faChevronDown,
    faCheck,
    faStar,
    faSun,
    faHandHoldingWater,
    faCrop,
    faShareAlt,
    faShieldAlt,
    faCalendarAlt,
    faClock,
    faPills,
    faHeadset
} from '@fortawesome/free-solid-svg-icons'

// Add icons to library
library.add(fab,
    faCamera, faLightbulb, faInfoCircle, faCheckCircle, faHeartbeat,
    faLeaf, faExclamationTriangle, faEye, faEyeSlash, faDownload,
    faRedo, faTrash, faArrowUp, faArrowDown, faQuestionCircle,
    faPhone, faPhoneAlt, faSeedling, faChevronUp, faChevronDown,
    faCheck, faStar, faSun, faHandHoldingWater, faCrop, faShareAlt,
    faShieldAlt, faCalendarAlt, faClock, faPills, faHeadset
)

// Reactive variables
const image = ref(null)
const cropInfo = ref(null)
const isLoading = ref(false)
const showMoreInfo = ref(false)
const healthPercentage = ref(0)
const activeFAQ = ref(null)

// Enhanced FAQ Data with icons and colors
const faq = [
    {
        question: "কী ধরনের ছবি দেব?",
        answer: "রোগগ্রস্ত পাতার বা ফসলের কাছ থেকে তোলা স্পষ্ট ছবি দিন। দিনের আলোয় তোলা ছবি ভালো কাজ করে।",
        tips: [
            "ফোন ক্যামেরা দিয়ে কাছ থেকে ছবি তুলুন",
            "ছবিতে শুধু ফসল থাকুক",
            "পটভূমি পরিষ্কার রাখুন"
        ],
        icon: 'camera',
        iconColor: 'text-blue-500'
    },
    {
        question: "ফলাফল কতটা সঠিক?",
        answer: "আমাদের AI ৮৫-৯০% সঠিক ফলাফল দেয়। তবে গুরুতর সমস্যায় স্থানীয় কৃষি অফিসের পরামর্শ নিন।",
        tips: [
            "বিভিন্ন কোণ থেকে ছবি তুলুন",
            "বিভিন্ন সময়ে চেক করুন",
            "সন্দেহ হলে আবার ছবি দিন"
        ],
        icon: 'check-circle',
        iconColor: 'text-green-500'
    },
    {
        question: "ফলাফল পেতে কতক্ষণ লাগবে?",
        answer: "সাধারণত ২-৩ সেকেন্ডের মধ্যে ফলাফল পেয়ে যাবেন। ইন্টারনেট ধীর হলে ৫-১০ সেকেন্ড লাগতে পারে।",
        tips: [
            "ভাল ইন্টারনেট কানেকশন ব্যবহার করুন",
            "পাতা টিউন না করলে পুনরায় চেষ্টা করুন",
            "অপেক্ষার সময় অন্য কাজ করুন"
        ],
        icon: 'clock',
        iconColor: 'text-purple-500'
    },
    {
        question: "রিপোর্ট ডাউনলোড করতে পারব?",
        answer: "হ্যাঁ, রিপোর্ট ডাউনলোড বাটনে ক্লিক করে রিপোর্ট নিতে পারবেন। এই রিপোর্ট কৃষি অফিসে দেখাতে পারেন।",
        tips: [
            "রিপোর্টে ফোন নম্বর যোগ করুন",
            "ছবি রিপোর্টের সাথে সংরক্ষণ করুন",
            "পরবর্তী চেকআপের তারিখ নোট করুন"
        ],
        icon: 'download',
        iconColor: 'text-indigo-500'
    },
    {
        question: "কোন ঔষধ কোথায় পাব?",
        answer: "কৃষি দোকান বা উপজেলা কৃষি অফিস থেকে ঔষধ পাবেন। ওষুধ কেনার সময় রিপোর্টটি সাথে নিন।",
        tips: [
            "কৃষি সম্প্রসারণ কর্মীর সহায়তা নিন",
            "মেয়াদোত্তীর্ণ ওষুধ কিনবেন না",
            "নির্দেশিত মাত্রায় ব্যবহার করুন"
        ],
        icon: 'pills',
        iconColor: 'text-red-500'
    },
    {
        question: "বিনামূল্যে পরামর্শ পাব?",
        answer: "হ্যাঁ, আমাদের হেল্পলাইন ১৬১২৩ এ কল করে বিনামূল্যে পরামর্শ পেতে পারেন। বিশেষজ্ঞরা আপনাকে সাহায্য করবেন।",
        tips: [
            "সকাল ৯টা থেকে সন্ধ্যা ৫টা পর্যন্ত কল করুন",
            "আপনার জমির তথ্য প্রস্তুত রাখুন",
            "প্রয়োজনে ভিডিও কলের ব্যবস্থা রয়েছে"
        ],
        icon: 'headset',
        iconColor: 'text-amber-500'
    }
]

const toggleFAQ = (index) => {
    activeFAQ.value = activeFAQ.value === index ? null : index
}

const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
        // Create image URL for preview
        image.value = URL.createObjectURL(file)

        // Start analysis
        analyzeCrop()
    }
}

const analyzeCrop = () => {
    isLoading.value = true
    cropInfo.value = null
    showMoreInfo.value = false
    healthPercentage.value = 0
    activeFAQ.value = null // Close any open FAQ

    // Simulate API call with delay
    setTimeout(() => {
        // Generate dynamic crop data
        const cropData = {
            name: "ধান",
            disease: "পাতায় দাগ রোগ",
            solution: "প্রতি একর জমিতে ২ গ্রাম প্রোপিকোনাজল ২ লিটার পানিতে মিশিয়ে স্প্রে করুন।",
            moreInfo: "এটি একটি ছত্রাকজনিত রোগ যা পাতায় বাদামি দাগ তৈরি করে। সকালে বা সন্ধ্যায় স্প্রে করা ভালো।",
            expertTip: "সার প্রয়োগের ৩ দিন পর পানি দেবেন না। রোগ দেখা দিলে আবার স্প্রে করুন।",
            steps: [
                "প্রথমে জমির পানি শুকিয়ে দিন",
                "ঔষধ কিনুন কৃষি দোকান থেকে",
                "নির্দেশমতো পানিতে মিশান",
                "সমস্ত পাতায় স্প্রে করুন",
                "৩ দিন পর ফলাফল দেখুন"
            ]
        }

        // Random health percentage between 30-95
        const health = Math.floor(Math.random() * (95 - 30 + 1)) + 30
        healthPercentage.value = health

        cropInfo.value = cropData
        isLoading.value = false
    }, 2000)
}

const resetAnalysis = () => {
    image.value = null
    cropInfo.value = null
    showMoreInfo.value = false
    healthPercentage.value = 0
    activeFAQ.value = null
}

const downloadReport = () => {
    if (!cropInfo.value) return

    // Create report content in simple language
    const reportContent = `
ফসল রোগ নির্ণয় রিপোর্ট
==========================

আপনার ফসলের তথ্য:
------------------
• ফসলের নাম: ${cropInfo.value.name}
• সম্ভাব্য রোগ: ${cropInfo.value.disease}
• ফসলের সুস্থতা: ${healthPercentage.value}%
• পরামর্শ: ${cropInfo.value.solution}

করণীয়:
-------
${cropInfo.value.steps.map((step, i) => `${i + 1}. ${step}`).join('\n')}

বিশেষ টিপস:
----------
${cropInfo.value.expertTip}

এই রিপোর্টটি সংরক্ষণ করুন এবং প্রয়োজনে কৃষি অফিসে দেখান।

হেল্পলাইন: ১৬১২৩
তৈরি করা হয়েছে: ${new Date().toLocaleDateString('bn-BD')}
`

    // Create and download file
    const blob = new Blob([reportContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'ফসল_রিপোর্ট.txt'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
}
</script>

<style scoped>

/* Custom scrollbar for sidebar */
.sidebar-scroll {
    scrollbar-width: thin;
    scrollbar-color: #c1c1c1 #f1f1f1;
    max-height: calc(100vh - 12rem);
}

.sidebar-scroll::-webkit-scrollbar {
    width: 6px;
}

.sidebar-scroll::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
    margin: 4px 0;
}

.sidebar-scroll::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 10px;
}

.sidebar-scroll::-webkit-scrollbar-thumb:hover {
    background: #a1a1a1;
}

/* Smooth transitions */
button {
    transition: all 0.2s ease;
}

/* Image upload area hover */
label div:hover {
    transform: translateY(-2px);
    transition: transform 0.3s ease;
}

/* FAQ accordion animation */
.faq-enter-active,
.faq-leave-active {
    transition: all 0.3s ease;
    max-height: 500px;
    overflow: hidden;
}

.faq-enter-from,
.faq-leave-to {
    opacity: 0;
    max-height: 0;
    transform: translateY(-10px);
}

/* Ensure proper height on mobile */
@media (max-width: 1023px) {
    .sidebar-scroll {
        max-height: none;
    }
}
</style>