<script setup>
import { ref } from "vue";
import dayjs from "dayjs";
import buddhistEra from "dayjs/plugin/buddhistEra";
import "dayjs/locale/th"; // นำเข้า locale ภาษาไทย

// ใช้ plugin BuddhistEra และตั้งค่า locale เป็นภาษาไทย
dayjs.extend(buddhistEra);
dayjs.locale("th"); // ตั้งค่า locale เป็นภาษาไทย

const selectedWorkType = ref(""); // สายงานที่เลือก
const formData = ref({
  dateTime: dayjs().format("YYYY-MM-DDTHH:mm"), // วันที่และเวลาปัจจุบัน
  workType: "",
  teamLeader: "", // รายชื่อหัวหน้าชุดปฏิบัติที่เลือก
  teamName: "ชป.สายฟ้า",
  actions: [],
  actionCount: 0,
});

const teamLeaders = ref([
  "ร.ต.อ.พชรพล หัสมาน รอง สวป.สภ.เทพา",
  "ร.ต.อ.สุพจน์ แทนมาก รอง สวป.สภ.เทพา",
  "ร.ต.อ.ชาตรี เพชรบุญวรรโณ รอง สวป.สภ.เทพา",
  "ร.ต.อ.อดิเรก จะโรจน์หวัง รอง สว.สส.สภ.เทพา",
]);

const teamNames = ref([
  "ชป.สายฟ้า",
  "ชป.เมฆา",
  "ชป.ภูผา",
  "ชป.สืบสวน",
  "ข่ายจราจร",
  "ชป.รถไฟเทพา",
  "ชป.รถไฟเกาะสะบ้า",
  "ชป.รถไฟท่าแมงลัก",
  "ประจำวัน",
]);

const predefinedActions = ref([
  "ตรวจร้านทอง",
  "ตรวจโรงไฟฟ้าชีวมวลบ่อน้ำส้ม",
  "ตรวจสอบยานพาหนะ",
  "ตรวจสอบบุคคล",
]);

const newAction = ref("");

const addNewAction = () => {
  if (
    newAction.value.trim() &&
    !predefinedActions.value.includes(newAction.value.trim())
  ) {
    predefinedActions.value.push(newAction.value.trim());
    formData.value.actions.push(newAction.value.trim());
    newAction.value = "";
  }
};

const report = ref("");

const generateReport = () => {
  const formattedDate = dayjs(formData.value.dateTime).format(
    "D MMMM BB เวลา HH:mm น."
  );
  report.value = `:: เรียน ผู้บังคับบัญชา\nสภ.เทพา วันที่ ${formattedDate}\nภายใต้การอำนวยการของ
 พ.ต.อ.เฉลิมชัย เพชรกาศ ผกก.สภ.เทพา
มอบหมายให้
 พ.ต.ท.สุรเดช เส็นยีหีม รอง ผกก.ป.สภ.เทพา , พ.ต.ท.พิสิทธิ์ โรจชะยะ สวป.สภ.เทพา , พ.ต.ท.วิสันต์ ดิสถาพร สวป.สภ.เทพา
 สั่งการให้
      ${formData.value.teamLeader} พร้อม ${
    formData.value.teamName
  } ว.4\n${formData.value.actions.join(
    ", "
  )}\n\nผลการปฏิบัติ ดังนี้\n\n🔹 ${formData.value.actions.join(
    "\n🔹 "
  )}\n\nไม่พบสิ่งผิดกฎหมายแต่อย่างใด\nจึงเรียนมาเพื่อโปรดทราบ`;
};

const copyReport = () => {
  navigator.clipboard.writeText(report.value).then(() => {
    alert("คัดลอกข้อความเรียบร้อยแล้ว");
  });
};

// ฟังก์ชันเลือกสายงาน
const selectWorkType = (workType) => {
  selectedWorkType.value = workType;
  formData.value.workType = workType;
};

// ฟังก์ชันรีเซ็ตการเลือกสายงาน
const resetWorkType = () => {
  selectedWorkType.value = "";
  formData.value.workType = "";
};
</script>

<template>
  <div class="min-h-screen bg-base-200 flex flex-col">
    <!-- Header -->
    <header class="bg-primary text-primary-content py-4">
      <div class="container mx-auto px-4">
        <h1 class="text-2xl font-bold">ระบบรายงานการปฏิบัติงาน สภ.เทพา</h1>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-grow container mx-auto px-4 py-8">
      <!-- ส่วนเลือกสายงาน -->
      <div
        v-if="!selectedWorkType"
        class="bg-base-100 shadow-lg rounded-lg p-6 text-center"
      >
        <h2 class="text-xl font-semibold mb-4">กรุณาเลือกสายงาน</h2>
        <div class="space-x-4">
          <button
            @click="selectWorkType('งานป้องกันปราบปราม')"
            class="btn btn-primary"
          >
            งานป้องกันปราบปราม
          </button>
          <button @click="selectWorkType('งานสืบสวน')" class="btn btn-success">
            งานสืบสวน
          </button>
          <button @click="selectWorkType('งานสอบสวน')" class="btn btn-warning">
            งานสอบสวน
          </button>
        </div>
      </div>

      <!-- แสดงฟอร์มตามสายงานที่เลือก -->
      <div v-else>
        <!-- ปุ่มกลับไปเลือกสายงาน -->
        <button @click="resetWorkType" class="btn btn-ghost mb-4">
          กลับไปเลือกสายงาน
        </button>

        <!-- ฟอร์มสำหรับงานป้องกันปราบปราม -->
        <div
          v-if="selectedWorkType === 'งานป้องกันปราบปราม'"
          class="bg-base-100 shadow-lg rounded-lg p-6"
        >
          <h2 class="text-xl font-semibold mb-4">แบบฟอร์มงานป้องกันปราบปราม</h2>
          <form @submit.prevent="generateReport" class="space-y-6">
            <!-- ฟิลด์เฉพาะงานป้องกันปราบปราม -->
            <div>
              <label class="label">
                <span class="label-text">วันที่และเวลา</span>
              </label>
              <input
                type="datetime-local"
                v-model="formData.dateTime"
                class="input input-bordered w-full"
              />
            </div>

            <!-- หัวหน้าชุดปฏิบัติ (Dropdown) -->
            <div>
              <label class="label">
                <span class="label-text">หัวหน้าชุดปฏิบัติ</span>
              </label>
              <select
                required
                v-model="formData.teamLeader"
                class="select select-bordered w-full"
              >
                <option disabled value="">กรุณาเลือกหัวหน้าชุดปฏิบัติ</option>
                <option
                  v-for="(leader, index) in teamLeaders"
                  :key="index"
                  :value="leader"
                >
                  {{ leader }}
                </option>
              </select>
            </div>

            <!-- ชื่อชุดปฏิบัติ (Dropdown) -->
            <div>
              <label class="label">
                <span class="label-text">ชื่อชุดปฏิบัติ</span>
              </label>
              <select
                required
                v-model="formData.teamName"
                class="select select-bordered w-full"
              >
                <option disabled value="">กรุณาเลือกชื่อชุดปฏิบัติ</option>
                <option
                  v-for="(name, index) in teamNames"
                  :key="index"
                  :value="name"
                >
                  {{ name }}
                </option>
              </select>
            </div>

            <!-- สิ่งที่ทำ (เลือกได้หลายรายการ) -->
            <div>
              <label class="label">
                <span class="label-text">สิ่งที่ทำ (เลือกได้หลายรายการ)</span>
              </label>
              <div class="mt-2 space-y-2">
                <!-- Checkbox สำหรับรายการที่กำหนดไว้ -->
                <div
                  v-for="(action, index) in predefinedActions"
                  :key="index"
                  class="flex items-center"
                >
                  <input
                    type="checkbox"
                    :value="action"
                    v-model="formData.actions"
                    class="checkbox checkbox-primary"
                  />
                  <label class="ml-2 text-sm">{{ action }}</label>
                </div>

                <!-- ฟิลด์เพิ่มรายการใหม่ -->
                <div class="flex items-center">
                  <input
                    type="text"
                    v-model="newAction"
                    placeholder="เพิ่มรายการใหม่"
                    class="input input-bordered flex-grow"
                  />
                  <button
                    type="button"
                    @click="addNewAction"
                    class="btn btn-primary ml-2"
                  >
                    เพิ่ม
                  </button>
                </div>
              </div>
            </div>

            <!-- จำนวนครั้งของผลการปฏิบัติ -->
            <div>
              <label class="label">
                <span class="label-text">จำนวนครั้งของผลการปฏิบัติ</span>
              </label>
              <input
                required
                type="number"
                v-model="formData.actionCount"
                class="input input-bordered w-full"
              />
            </div>

            <!-- ปุ่มส่งฟอร์ม -->
            <button type="submit" class="btn btn-primary w-full">
              สร้างรายงาน
            </button>
          </form>
        </div>

        <!-- ฟอร์มสำหรับงานสืบสวนและงานสอบสวน -->
        <div v-else class="bg-base-100 shadow-lg rounded-lg p-6">
          <h2 class="text-xl font-semibold mb-4">
            แบบฟอร์ม{{ selectedWorkType }}
          </h2>
          <form @submit.prevent="generateReport" class="space-y-6">
            <!-- ฟิลด์ทั่วไป -->
            <div>
              <label class="label">
                <span class="label-text">วันที่และเวลา</span>
              </label>
              <input
                type="datetime-local"
                v-model="formData.dateTime"
                class="input input-bordered w-full"
              />
            </div>
            <!-- เพิ่มฟิลด์อื่นๆ ตามสายงาน -->
          </form>
        </div>
      </div>

      <!-- แสดงผลรายงาน -->
      <div v-if="report" class="mt-8 bg-base-100 shadow-lg rounded-lg p-6">
        <h2 class="text-xl font-semibold mb-4">รายงานที่สร้าง</h2>
        <textarea
          v-model="report"
          class="textarea textarea-bordered w-full h-64"
        ></textarea>
        <button @click="copyReport" class="btn btn-success w-full mt-4">
          คัดลอกข้อความ
        </button>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-primary text-primary-content py-4 mt-8">
      <div class="container mx-auto px-4 text-center">
        <p>&copy; 2023 ระบบรายงานการปฏิบัติงาน</p>
      </div>
    </footer>
  </div>
</template>
