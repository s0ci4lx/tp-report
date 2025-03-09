<template>
  <div class="h-96 bg-base-200 flex flex-col items-center justify-center">
    <div class="bg-base-100 shadow-lg rounded-lg p-6 text-center">
      <h2 class="text-xl font-semibold mb-4">กรุณาเลือกสายงาน</h2>
      <div class="space-x-4">
        <button @click="goToPrevention" class="btn btn-primary">
          งานป้องกันปราบปราม
        </button>
        <button @click="goToInvestigation" class="btn btn-neutral">
          งานสืบสวน
        </button>
        <!-- <button @click="goToInquiry" class="btn btn-warning">งานสอบสวน</button> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goToPrevention = () => {
  router.push({ name: "prevention" });
};

const goToInvestigation = () => {
  router.push({ name: "investigation" });
};

// const goToInquiry = () => {
//   router.push({ name: "inquiry" });
// };
</script>
