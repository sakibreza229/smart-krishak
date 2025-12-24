<template>
  <div class="bg-white rounded-3xl p-6 shadow-xl border border-slate-100">
    <h3 class="text-lg font-bold mb-6 flex items-center gap-3">
      <div class="p-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-white">
        <font-awesome-icon :icon="['fas', 'chart-simple']" />
      </div>
      লাইভ স্ট্যাটিস্টিক্স
    </h3>
    <div class="space-y-4">
      <div class="flex justify-between items-center p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer" 
           @click="$emit('showDetailedStats', 'health')">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-gradient-to-r from-green-100 to-emerald-100 flex items-center justify-center">
            <font-awesome-icon :icon="['fas', 'heart-pulse']" class="text-green-600" />
          </div>
          <div>
            <p class="font-medium text-slate-800">ফসলের স্বাস্থ্য</p>
            <p class="text-xs text-slate-500">NDVI সূচক</p>
          </div>
        </div>
        <div class="text-right">
          <p class="font-bold text-slate-900">৮৮%</p>
          <p class="text-xs text-green-600 font-medium">↑ ২%</p>
        </div>
      </div>
      
      <div class="flex justify-between items-center p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
           @click="$emit('showDetailedStats', 'moisture')">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-100 to-cyan-100 flex items-center justify-center">
            <font-awesome-icon :icon="['fas', 'droplet']" class="text-blue-600" />
          </div>
          <div>
            <p class="font-medium text-slate-800">মাটির আর্দ্রতা</p>
            <p class="text-xs text-slate-500">গড় ৩ সেন্টিমিটার</p>
          </div>
        </div>
        <div class="text-right">
          <p class="font-bold text-slate-900">৬৫%</p>
          <p class="text-xs text-red-600 font-medium">↓ ৫%</p>
        </div>
      </div>
      
      <div class="flex justify-between items-center p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
           @click="$emit('showDetailedStats', 'nutrient')">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-gradient-to-r from-orange-100 to-yellow-100 flex items-center justify-center">
            <font-awesome-icon :icon="['fas', 'flask-vial']" class="text-orange-600" />
          </div>
          <div>
            <p class="font-medium text-slate-800">পুষ্টি স্তর</p>
            <p class="text-xs text-slate-500">NPK অনুপাত</p>
          </div>
        </div>
        <div class="text-right">
          <p class="font-bold text-slate-900">৭২%</p>
          <p class="text-xs text-green-600 font-medium">↑ ৩%</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineEmits(['showDetailedStats'])
</script>