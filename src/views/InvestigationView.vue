<template>
  <div class="min-h-screen bg-base-200 flex flex-col">
    <div class="container mx-auto px-4 py-8">
      <button @click="goBack" class="btn btn-secondary mb-4">
        กลับไปเลือกสายงาน
      </button>
      <div class="bg-base-100 shadow-lg rounded-lg p-6">
        <h2 class="text-xl font-semibold mb-4">แบบฟอร์มงานสืบสวน</h2>
        <!-- เพิ่มฟอร์มงานสืบสวนที่นี่ -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goBack = () => {
  router.push({ name: "home" });
};
</script>
