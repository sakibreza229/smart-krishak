<template>
  <div class="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 text-white shadow-xl">
    <h3 class="text-lg font-bold mb-4 flex items-center gap-3">
      <div class="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg">
        <font-awesome-icon :icon="['fas', 'headset']" />
      </div>
      বিশেষজ্ঞ সহায়তা
    </h3>
    <p class="text-slate-300 text-sm mb-6">কৃষি বিশেষজ্ঞদের সাথে সরাসরি পরামর্শ</p>
    
    <div class="space-y-3 mb-6">
      <div class="flex items-center gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer group" 
           @click="$emit('connectWithOfficer', 'video')">
        <div class="p-2 bg-green-500/20 rounded-lg">
          <font-awesome-icon :icon="['fas', 'video']" class="text-green-400" />
        </div>
        <div class="flex-1">
          <p class="font-medium">ভিডিও কনসাল্টেশন</p>
          <p class="text-xs text-slate-400">সরাসরি ভিডিও কল</p>
        </div>
        <font-awesome-icon :icon="['fas', 'chevron-right']" class="text-slate-400 group-hover:translate-x-1 transition-transform" />
      </div>
      
      <div class="flex items-center gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer group" 
           @click="$emit('connectWithOfficer', 'chat')">
        <div class="p-2 bg-blue-500/20 rounded-lg">
          <font-awesome-icon :icon="['fas', 'comment-dots']" class="text-blue-400" />
        </div>
        <div class="flex-1">
          <p class="font-medium">AI সহকারী</p>
          <p class="text-xs text-slate-400">24/7 চ্যাট সহায়তা</p>
        </div>
        <font-awesome-icon :icon="['fas', 'chevron-right']" class="text-slate-400 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
    
    <button @click="$emit('connectWithOfficer', 'call')" 
            class="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl font-bold hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg transform hover:scale-[1.02]">
      <font-awesome-icon :icon="['fas', 'phone']" class="mr-2" />
      বিশেষজ্ঞের সাথে কথা বলুন
    </button>
  </div>
</template>

<script setup>
defineEmits(['connectWithOfficer'])
</script>