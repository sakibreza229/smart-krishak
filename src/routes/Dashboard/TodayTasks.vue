<template>
  <div class="bg-white rounded-2xl p-5 shadow-md">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xl font-bold text-gray-800 flex items-center gap-2">
        <div class="p-2 bg-orange-100 rounded-lg">
          <font-awesome-icon :icon="['fas', 'tasks']" class="w-5 h-5 text-orange-600" />
        </div>
        আজকের কাজ
      </h2>
      <button class="text-sm text-green-600 font-semibold">সব দেখুন →</button>
    </div>
    
    <div class="space-y-3">
      <div 
        v-for="task in tasks" 
        :key="task.id"
        class="flex items-center justify-between p-3 rounded-xl border border-gray-200 hover:bg-green-50"
      >
        <div class="flex items-center gap-3">
          <div :class="`p-2 rounded-lg bg-${task.color}-100`">
            <font-awesome-icon :icon="task.icon" :class="`text-${task.color}-600`" class="w-5 h-5" />
          </div>
          <div>
            <p class="font-semibold text-gray-800">{{ task.title }}</p>
            <div class="flex items-center gap-2 text-sm text-gray-500">
              <font-awesome-icon :icon="['fas', 'clock']" class="w-3 h-3" />
              {{ task.time }}
            </div>
          </div>
        </div>
        <div class="flex flex-col items-end gap-1">
          <span :class="`px-3 py-1 rounded-full text-xs font-medium ${
            task.status === 'বাকি' ? 'bg-yellow-100 text-yellow-800' :
            task.status === 'করা হয়েছে' ? 'bg-green-100 text-green-800' :
            'bg-blue-100 text-blue-800'
          }`">
            {{ task.status }}
          </span>
          <font-awesome-icon 
            :icon="['fas', 'chevron-right']" 
            class="w-4 h-4 text-gray-400"
          />
        </div>
      </div>
    </div>
    
    <button class="w-full mt-4 bg-green-50 text-green-700 py-3 rounded-xl font-semibold hover:bg-green-100 active:scale-95 transition-all flex items-center justify-center gap-2">
      <font-awesome-icon :icon="['fas', 'plus']" class="w-4 h-4" />
      নতুন কাজ যোগ করুন
    </button>
  </div>
</template>

<script setup>
defineProps({
  tasks: {
    type: Array,
    required: true
  }
})
</script>