<template>
  <section class="bg-white rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-scroll">
    <div class="bg-gradient-to-r from-purple-900 to-purple-800 p-6 text-white flex items-center justify-between">
      <div class="flex items-center gap-4">
        <div class="p-3 bg-purple-500/20 rounded-xl">
          <font-awesome-icon :icon="['fas', 'robot']" class="text-2xl text-purple-400 animate-bounce" />
        </div>
        <div>
          <h2 class="text-2xl font-bold">AI বিশ্লেষণ ও সুপারিশ</h2>
          <p class="text-purple-300 text-sm mt-1">ডেটা ভিত্তিক কৃষি সিদ্ধান্ত</p>
        </div>
      </div>
      <span class="text-sm bg-white/10 px-4 py-2 rounded-full border border-white/20 font-medium">
        {{ isLoading ? 'প্রসেসিং...' : 'প্রস্তুত' }}
      </span>
    </div>

    <div class="p-6 md:p-8">
      <!-- Analysis Progress -->
      <div v-if="isLoading" class="text-center py-4">
        <font-awesome-icon :icon="['fas', 'spinner']" class="text-4xl text-purple-500 animate-spin mb-4" />
        <p class="text-lg text-slate-700 font-medium">AI আপনার খামারের তথ্য বিশ্লেষণ করছে...</p>
        <p class="text-sm text-slate-500 mt-2">ড্রোন ইমেজ, সেন্সর ডেটা এবং ঐতিহাসিক তথ্য মিলিয়ে সুপারিশ তৈরি হচ্ছে</p>
        <div class="w-full bg-slate-200 rounded-full h-2 mt-6">
          <div class="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-1000" 
               :style="`width: ${analysisProgress}%`"></div>
        </div>
        <p class="text-sm text-slate-600 mt-2">{{ analysisProgress }}% সম্পূর্ণ</p>
      </div>

      <!-- Analysis Button (shown when not loading) -->
      <div v-else class="h-full flex flex-col">
        <button
          @click="$emit('analyzeData')"
          :disabled="!isFormValid"
          :class="[
            'flex-1 flex flex-col items-center justify-center gap-4 p-6 rounded-2xl text-white font-bold transition-all transform',
            isFormValid 
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover:scale-[1.01] shadow-xl' 
              : 'bg-gradient-to-r from-slate-400 to-slate-500 opacity-70 cursor-not-allowed'
          ]"
        >
          <font-awesome-icon :icon="['fas', 'robot']" class="text-4xl" />
          <div class="text-center">
            <div class="text-xl md:text-2xl">{{ analysisResult ? 'পুনরায় বিশ্লেষণ করুন' : 'AI বিশ্লেষণ শুরু করুন' }}</div>
            <div class="text-sm font-normal opacity-90 mt-1">সব তথ্য সংগ্রহ হয়েছে - এখন AI সুপারিশ পান</div>
          </div>
          <font-awesome-icon 
            v-if="isFormValid" 
            :icon="['fas', 'arrow-right-long']" 
            class="text-xl mt-2 animate-pulse" 
          />
        </button>

        <!-- Quick Analysis Results (shown only after analysis) -->
        <div v-if="quickAnalysis && analysisResult" class="mt-6 p-5 bg-gradient-to-br from-green-50 to-white rounded-2xl border border-green-100">
          <h4 class="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <font-awesome-icon :icon="['fas', 'bolt']" class="text-yellow-500" />
            দ্রুত বিশ্লেষণ ফলাফল
          </h4>
          <div class="grid grid-cols-3 gap-3">
            <div class="text-center p-3 bg-white rounded-xl">
              <div class="text-xl font-bold text-green-600 mb-1">{{ quickAnalysis.healthScore }}%</div>
              <div class="text-xs text-slate-700">ফসল স্বাস্থ্য</div>
              <div class="text-xs text-slate-500 mt-1">মোটামুটি ভাল</div>
            </div>
            <div class="text-center p-3 bg-white rounded-xl">
              <div class="text-xl font-bold text-blue-600 mb-1">{{ quickAnalysis.waterNeed }}</div>
              <div class="text-xs text-slate-700">পানি প্রয়োজন</div>
              <div class="text-xs text-slate-500 mt-1">পরবর্তী ৩ দিনে</div>
            </div>
            <div class="text-center p-3 bg-white rounded-xl">
              <div class="text-xl font-bold text-purple-600 mb-1">{{ quickAnalysis.nutrientLevel }}</div>
              <div class="text-xs text-slate-700">পুষ্টি স্তর</div>
              <div class="text-xs text-slate-500 mt-1">সার প্রয়োজন</div>
            </div>
          </div>
          <button 
            @click="$emit('showFullResults')"
            class="w-full mt-4 py-2 text-sm text-green-600 hover:text-green-700 font-medium flex items-center justify-center gap-2"
          >
            সম্পূর্ণ ফলাফল দেখুন
            <font-awesome-icon :icon="['fas', 'arrow-right']" />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  isLoading: Boolean,
  isFormValid: Boolean,
  analysisProgress: Number,
  analysisResult: [Object, null],
  quickAnalysis: [Object, null]
})

defineEmits(['analyzeData', 'showFullResults'])
</script>