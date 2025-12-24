<template>
  <div class="bg-white rounded-3xl p-6 shadow-xl border border-slate-100">
    <h3 class="text-lg font-bold mb-6 flex items-center gap-3">
      <div class="p-2 bg-gradient-to-r from-red-500 to-orange-600 rounded-lg text-white">
        <font-awesome-icon :icon="['fas', 'shield-virus']" />
      </div>
      রোগ সনাক্তকরণ
    </h3>
    <div class="space-y-4">
      <div class="p-4 bg-red-50 rounded-xl border border-red-100">
        <div class="flex items-start justify-between mb-2">
          <span class="font-medium text-red-700">ব্লাইট রোগ</span>
          <span class="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">সতর্কতা</span>
        </div>
        <p class="text-sm text-red-600 mb-3">টমেটো পাতায় প্রথম লক্ষণ দেখা দিয়েছে</p>
        <button @click="$emit('showDiseaseDetails')" class="text-sm text-red-700 hover:text-red-800 font-medium">
          বিস্তারিত দেখুন →
        </button>
      </div>
      <div class="p-4 bg-yellow-50 rounded-xl border border-yellow-100">
        <div class="flex items-start justify-between mb-2">
          <span class="font-medium text-yellow-700">পোকামাকড়</span>
          <span class="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">নিরীক্ষণ</span>
        </div>
        <p class="text-sm text-yellow-600">সাধারণ মাত্রায় পোকামাকড়ের উপস্থিতি</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineEmits(['showDiseaseDetails'])
</script>