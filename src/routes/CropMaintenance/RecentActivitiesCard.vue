<template>
  <div class="bg-white rounded-3xl p-6 shadow-xl border border-slate-100">
    <h3 class="text-lg font-bold mb-4 flex items-center gap-3">
      <div class="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg text-white">
        <font-awesome-icon :icon="['fas', 'clock-rotate-left']" />
      </div>
      সাম্প্রতিক কার্যক্রম
    </h3>
    <div class="space-y-3">
      <div v-for="activity in recentActivities" :key="activity.id" 
           class="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-xl transition-colors">
        <div :class="['w-10 h-10 rounded-lg flex items-center justify-center', activity.bgColor]">
          <font-awesome-icon :icon="['fas', activity.icon]" :class="activity.textColor" />
        </div>
        <div class="flex-1">
          <p class="font-medium text-slate-800">{{ activity.title }}</p>
          <p class="text-xs text-slate-500">{{ activity.time }}</p>
        </div>
        <span :class="['text-xs px-2 py-1 rounded-full', activity.statusColor]">{{ activity.status }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const recentActivities = [
  { id: 1, title: "ড্রোন সার্ভে সম্পন্ন", time: "৩০ মিনিট আগে", icon: "drone", bgColor: "bg-blue-100", textColor: "text-blue-600", status: "সম্পূর্ণ", statusColor: "bg-green-100 text-green-700" },
  { id: 2, title: "মাটির নমুনা বিশ্লেষণ", time: "২ ঘন্টা আগে", icon: "flask", bgColor: "bg-purple-100", textColor: "text-purple-600", status: "প্রক্রিয়াধীন", statusColor: "bg-yellow-100 text-yellow-700" },
  { id: 3, title: "সেচ ব্যবস্থা চালু", time: "৫ ঘন্টা আগে", icon: "droplet", bgColor: "bg-cyan-100", textColor: "text-cyan-600", status: "সম্পূর্ণ", statusColor: "bg-green-100 text-green-700" },
  { id: 4, title: "রোগ সনাক্তকরণ", time: "১ দিন আগে", icon: "shield-virus", bgColor: "bg-red-100", textColor: "text-red-600", status: "সতর্কতা", statusColor: "bg-red-100 text-red-700" }
]
</script>