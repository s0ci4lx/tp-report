<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import dayjs from "dayjs";
import buddhistEra from "dayjs/plugin/buddhistEra";
import "dayjs/locale/th"; // นำเข้า locale ภาษาไทย

// ใช้ plugin BuddhistEra และตั้งค่า locale เป็นภาษาไทย
dayjs.extend(buddhistEra);
dayjs.locale("th"); // ตั้งค่า locale เป็นภาษาไทย

const router = useRouter();

const goBack = () => {
  router.push({ name: "home" });
};

const selectedWorkType = ref(""); // สายงานที่เลือก
const formData = ref({
  dateTime: dayjs().format("YYYY-MM-DDTHH:mm"), // วันที่และเวลาปัจจุบัน
  workType: "งานป้องกันปราบปราม", // สายงานที่เลือก
  teamLeader: "", // รายชื่อหัวหน้าชุดปฏิบัติที่เลือก
  teamName: "", // ชื่อชุดปฏิบัติที่เลือก
  actions: [], // ว.4 อะไรบ้าง

  // ตรวจเยี่ยมสถานที่
  gasStationCount: 0, // ปั้มน้ำมัน
  bankCount: 0, // ธนาคาร
  goldShopCount: 0, // ร้านทอง
  convenienceStoreCount: 0, // ร้านสะดวกซื้อ
  atmCount: 0, // ตู้กดเงินสด ATM
  riskPointCount: 0, // จุดเสี่ยง / สะพาน / ท่อลอด

  // POP UP ถนนสายหลัก
  mainRoadCarCount: 0, // รถยนต์
  mainRoadMotorcycleCount: 0, // รถ จยย.

  // POP UP ถนนสายรอง
  sideRoadCarCount: 0, // รถยนต์
  sideRoadMotorcycleCount: 0, // รถ จยย.

  // ผลการปฏิบัติ Line bot
  lineBotCarCount: 0, // รถยนต์
  lineBotMotorcycleCount: 0, // จยย.
  lineBotPersonCount: 0, // บุคคล

  // มาตรการป้องกันปราบปรามการแข่งรถในทาง
  racingSignalCount: 0, // เปิดสัญญาณไฟ/ลว.เส้นทางตรวจสอบกลุ่มรถซิ่ง
  racingRepairShopCount: 0, // ตรวจร้านซ่อมรถ/ขายอะไหล่ และประชาสัมพันธ์
  racingRiskProfileCount: 0, // จัดทำประวัติบุคคลที่มีพฤติกรรมเสี่ยงแข่งรถ ฯ
  racingConfiscateCount: 0, // ตรวจยึด จยย. แต่งซิ่ง อุปกรณ์ส่วนควบไม่ครบ
  racingWarningCount: 0, // ประชาสัมพันธ์แจ้งเตือนรถยนต์เฝ้าระวังพิเศษสูงสุด

  // ตรวจยึดยานพาหนะ ตรวจสอบ
  confiscateCarCount: 0, // รถยนต์
  confiscateMotorcycleCount: 0, // จยย.

  // ทำประวัติกลุ่มเสี่ยง / จัดเก็บ DNA / พิมพ์มือ
  riskProfileCount: 0, // ทำประวัติบุคคลกลุ่มเสี่ยง
  dnaCollectionCount: 0, // จัดเก็บ DNA
  fingerprintCount: 0, // พิมพ์ลายนิ้วมือ

  // ผลการจับกุมข้อหาต่าง ๆ
  drugArrestCount: 0, // พ.ร.บ.ยาเสพติด
  gunArrestCount: 0, // พ.ร.บ.อาวุธปืน
  gamblingArrestCount: 0, // พ.ร.บ.การพนัน
  otherArrestCount: 0, // ข้อหาอื่น ๆ
  localWarrantCount: 0, // หมายจับ สภ.เทพา
  otherWarrantCount: 0, // หมายจับอื่น ๆ
});

const teamLeaders = ref([
  "ร.ต.อ.พชรพล หัสมาน รอง สวป.สภ.เทพา",
  "ร.ต.อ.สุพจน์ แทนมาก รอง สวป.สภ.เทพา",
  "ร.ต.อ.ชาตรี เพชรบุญวรรโณ รอง สวป.สภ.เทพา",
  "ร.ต.อ.ภาโชค บุญไชยสุริยา ผบ.มว.สภ.เทพา",
  "ร.ต.อ.สัมพันธ์ กาลรัตน์ รอง สวป.สภ.เทพา",
  "ร.ต.อ.สราวุธ สังข์ศิริ รอง สวป.สภ.เทพา",
  "ร.ต.ท.สุวิทย์ ณ นคร รอง สว. (ผช.พงส.) สภ.เทพา",
  "ร.ต.ต.สุเทพ นุ้ยเลิศ รอง สว.(ป.) สภ.เทพา",
  "ร.ต.ต.อนันต์ นะมะณี รอง สว.(ป.) สภ.เทพา",
  "ร.ต.ต.ประคอง ช่วยนุกูล รอง สว.(นปพ.) สภ.เทพา",
  "ด.ต.องอาจ ชุมพราม ผบ.หมู่ (ป.) สภ.เทพา",
  "ร.ต.ท.สุธรรม กล่อมเมือง รอง สว.(ป.) สภ.เทพา",
  "ร.ต.ต.สุธี ช่วยมาก รอง สว.(ป.) สภ.เทพา",
  "ด.ต.นพดล ดำรงฤทธิ์ ผบ.หมู่ (ป.) สภ.เทพา",
  "ด.ต.สายัญ พูลสวัสดิ์ ผบหมู่ (นปพ.) สภ.เทพา",
  "ด.ต.ทรงวุธ อินทรัตน์ ผบ.หมู่ (นปพ.) สภ.เทพา",
  "ร.ต.อ.ปรีชา ขาวสังข์ รอง สว.(ป.) สภ.เทพา",
  "ร.ต.ท.วิรุณ ศิริรัตน์ รอง สว.(ป.) สภ.เทพา",
  "ร.ต.ท.ไชยสิทธิ์ แก้วเกาะสะบ้า รอง สว.(นปพ.) สภ.เทพา",
  "ด.ต.เสกสรร ไชยของพรม ผบ.หมู่ (ป.) สภ.เทพา",
  "ด.ต.เสรี สายอ๋อง ผบ.หมู่ (คผศ.) สภ.เทพา",
  "ด.ต.สานนท์ แดงทองเกลี้ยง ผบ.หมู่ (ป.) สภ.เทพา",
  "ด.ต.ณเรศ ทะสะระ ผบ.หมู่ (นปพ.) สภ.เทพา",
]);

const teamNames = ref([
  "ชป.สายฟ้า",
  "ชป.เมฆา",
  "ชป.ภูผา",
  "ข่ายจราจร",
  "ชป.รถไฟเทพา",
  "ชป.รถไฟเกาะสะบ้า",
  "ชป.รถไฟท่าแมงลัก",
]);

const predefinedActions = ref([
  "ว.43 ถนนสายหลัก",
  "ว.43 ถนนสายรอง",
  "ลว. / เปิดสัญญาณไฟวับวาบในเขตเทศบาล",
  "ตรวจ ธกส.",
  "ตรวจ ธ.ออมสิน",
  "ตรวจร้านทอง",
  "ตรวจร้านสะดวกซื้อ",
  "ลว. ถนนสาย 4085 / สายรอง",
  "ตรวจ รพ.เทพา",
  "ตรวจโรงไฟฟ้าชีวมวลบ่อน้ำส้ม",
  "ตรวจเซเว่น บ.ปากบางสะกอม",
  "ตรวจปั๊ม ปตท./เซเว่น บ.พระพุทธ",
  "ตรวจปั๊ม ปตท./เซเว่น บ.สวรรค์",
  "ตรวจสถานที่ราชการ / สถานที่สำคัญ",
  "ตรวจจุดเสี่ยง จุดสูงข่ม / สะพาน / ท่อลอด",
  "เปิดสัญญาณไฟวับวาบป้องกันการแข่งรถในทาง",
  "ประชาสัมพันธ์/แจ้งเตือนรถยนต์เฝ้าระวังพิเศษสูงสุดที่อาจจะนำไปใช้ก่อเหตุ",
  "ตรวจร้านซ่อมรถ/ขายอะไหล่ และประชาสัมพันธ์การป้องกันการแข่งรถในทาง",
  "ประชาสัมพันธ์ห้ามการลักลอบเล่นการพนันทายผลฟุตบอล",
  "สกัดกั้นแรงงานต่างด้าว การขนยาเสพติดและอาวุธสงคราม",
  "ตรวจสอบรถแต่งซิ่ง ท่อดัง ตามมาตรการป้องกันปราบปรามการแข่งรถในทาง",
  "ตรวจสอบยานพาหนะ บุคคลสุ่มเสี่ยง วัตถุต้องสงสัย",
  "อำนวยความสะดวกด้านการจราจร",
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

  let reportSections = [];

  reportSections.push(`:: เรียน ผู้บังคับบัญชา
 สภ.เทพา วันที่ ${formattedDate}
ภายใต้การอำนวยการของ 
 พ.ต.อ.เฉลิมชัย เพชรกาศ ผกก.สภ.เทพา
มอบหมายให้
 พ.ต.ท.สุรเดช เส็นยีหีม รอง ผกก.ป.สภ.เทพา , พ.ต.ท.พิสิทธิ์ โรจชะยะ สวป.สภ.เทพา , พ.ต.ท.วิสันต์ ดิสถาพร สวป.สภ.เทพา
สั่งการให้
 ${formData.value.teamLeader} พร้อม ${formData.value.teamName}
ว.4 ${formData.value.actions.join(", ")}

ผลการปฏิบัติ ดังนี้`);
  let riskCheck = [];
  if (formData.value.gasStationCount)
    riskCheck.push(`- ปั้มน้ำมัน ${formData.value.gasStationCount} ครั้ง`);
  if (formData.value.bankCount)
    riskCheck.push(`- ธนาคาร ${formData.value.bankCount} ครั้ง`);
  if (formData.value.goldShopCount)
    riskCheck.push(`- ร้านทอง ${formData.value.goldShopCount} ครั้ง`);
  if (formData.value.convenienceStoreCount)
    riskCheck.push(
      `- ร้านสะดวกซื้อ ${formData.value.convenienceStoreCount} ครั้ง`
    );
  if (formData.value.atmCount)
    riskCheck.push(`- ตู้กดเงินสด ${formData.value.atmCount} ครั้ง`);
  if (formData.value.riskPointCount)
    riskCheck.push(
      `- จุดเสี่ยง/สะพาน/ท่อลอด ฯลฯ ${formData.value.riskPointCount} จุด`
    );
  if (riskCheck.length)
    reportSections.push(`🔹 ตรวจจุดเสี่ยง :\n  ${riskCheck.join("\n  ")}`);

  let popUpMain = [];
  if (formData.value.mainRoadCarCount)
    popUpMain.push(`- รถยนต์ ${formData.value.mainRoadCarCount} คัน`);
  if (formData.value.mainRoadMotorcycleCount)
    popUpMain.push(`- รถ จยย. ${formData.value.mainRoadMotorcycleCount} คัน`);
  if (popUpMain.length)
    reportSections.push(`🔹 Pop up สายหลัก :\n  ${popUpMain.join("\n  ")}`);

  let popUpSide = [];
  if (formData.value.sideRoadCarCount)
    popUpSide.push(`- รถยนต์ ${formData.value.sideRoadCarCount} คัน`);
  if (formData.value.sideRoadMotorcycleCount)
    popUpSide.push(`- รถ จยย. ${formData.value.sideRoadMotorcycleCount} คัน`);
  if (popUpSide.length)
    reportSections.push(`🔹 Pop up สายรอง :\n  ${popUpSide.join("\n  ")}`);

  // ตรวจสอบ Line bot
  let lineBotCheck = [];
  if (formData.value.lineBotCarCount)
    lineBotCheck.push(`- รถยนต์ ${formData.value.lineBotCarCount} คัน`);
  if (formData.value.lineBotMotorcycleCount)
    lineBotCheck.push(`- จยย. ${formData.value.lineBotMotorcycleCount} ค้น`);
  if (formData.value.lineBotPersonCount)
    lineBotCheck.push(`- บุคคล ${formData.value.lineBotPersonCount} คน`);
  if (lineBotCheck.length)
    reportSections.push(
      `🔹 ตรวจสอบยานพาหนะ/บุคคล Line bot :\n  ${lineBotCheck.join("\n  ")}`
    );

  let racing = [];
  if (formData.value.racingSignalCount)
    racing.push(
      `- เปิดสัญญาณไฟ/ลว.เส้นทาง ${formData.value.racingSignalCount} จุด`
    );
  if (formData.value.racingRepairShopCount)
    racing.push(
      `- ตรวจร้านซ่อมรถ/ขายอะไหล่ ${formData.value.racingRepairShopCount} ครั้ง`
    );
  if (formData.value.racingRiskProfileCount)
    racing.push(
      `- ทำประวัติกลุ่มเสี่ยงแข่งรถ ${formData.value.racingRiskProfileCount} ราย`
    );
  if (formData.value.racingConfiscateCount)
    racing.push(
      `- ตรวจยึด จยย.แต่งซิ่ง ${formData.value.racingConfiscateCount} คัน`
    );
  if (formData.value.racingWarningCount)
    racing.push(
      `- แจ้งเตือนรถยนต์เฝ้าระวังพิเศษ ${formData.value.racingWarningCount} คัน`
    );
  if (racing.length)
    reportSections.push(`🔹 มาตรการแข่งรถในทาง :\n  ${racing.join("\n  ")}`);

  let confiscate = [];
  if (formData.value.confiscateCarCount)
    confiscate.push(`- รถยนต์ ${formData.value.confiscateCarCount} คัน`);
  if (formData.value.confiscateMotorcycleCount)
    confiscate.push(
      `- รถ จยย. ${formData.value.confiscateMotorcycleCount} คัน`
    );
  if (confiscate.length)
    reportSections.push(`🔹 ตรวจยึดยานพาหนะ :\n  ${confiscate.join("\n  ")}`);

  let arrests = [];
  if (formData.value.drugArrestCount)
    arrests.push(`- พ.ร.บ.ยาเสพติด ${formData.value.drugArrestCount} ราย`);
  if (formData.value.gunArrestCount)
    arrests.push(`- พ.ร.บ.อาวุธปืน ${formData.value.gunArrestCount} ราย`);
  if (formData.value.gamblingArrestCount)
    arrests.push(`- พ.ร.บ.การพนัน ${formData.value.gamblingArrestCount} ราย`);
  if (formData.value.otherArrestCount)
    arrests.push(`- ข้อหาอื่น ๆ ${formData.value.otherArrestCount} ราย`);
  if (formData.value.localWarrantCount)
    arrests.push(`- หมายจับ สภ.เทพา ${formData.value.localWarrantCount} หมาย`);
  if (formData.value.otherWarrantCount)
    arrests.push(`- หมายจับอื่น ๆ ${formData.value.otherWarrantCount} หมาย`);
  if (arrests.length)
    reportSections.push(`🔹 ผลการจับกุม :\n  ${arrests.join("\n  ")}`);

  // เงื่อนไขตัด "ไม่พบสิ่งผิดกฎหมายแต่อย่างใด" ออก หากมีผลการจับกุม
  if (!arrests.length) {
    reportSections.push(`ไม่พบสิ่งผิดกฎหมายแต่อย่างใด`);
  }

  reportSections.push(`จึงเรียนมาเพื่อโปรดทราบ`);

  report.value = reportSections.join("\n\n");
};

const copyReport = () => {
  navigator.clipboard.writeText(report.value).then(() => {
    alert("คัดลอกข้อความเรียบร้อยแล้ว");
  });
};
</script>
<template>
  <div class="min-h-screen bg-base-200 flex flex-col">
    <div class="container mx-auto px-4 py-8">
      <button @click="goBack" class="btn btn-secondary mb-4">
        กลับไปเลือกสายงาน
      </button>
      <div class="bg-base-100 shadow-lg rounded-lg p-6">
        <h2 class="text-xl font-semibold mb-4">แบบฟอร์มงานป้องกันปราบปราม</h2>

        <!-- เพิ่มฟอร์มงานป้องกันปราบปรามที่นี่ -->
        <form @submit.prevent="generateReport" class="space-y-6">
          <!-- ฟิลด์เฉพาะงานป้องกันปราบปราม -->
          <div>
            <label class="input w-full">
              <span class="label text-black">วันที่และเวลา</span>
              <input
                type="datetime-local"
                v-model="formData.dateTime"
                class="input input-bordered"
              />
            </label>
          </div>

          <div>
            <!-- หัวหน้าชุดปฏิบัติ (Dropdown) -->
            <label class="select w-full">
              <span class="label text-black">หัวหน้าชุดปฏิบัติ</span>
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
            </label>
          </div>

          <div>
            <!-- ชื่อชุดปฏิบัติ (Dropdown) -->
            <label class="select w-full">
              <span class="label text-black">ชื่อชุดปฏิบัติ</span>
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
            </label>
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

          <!-- จำนวนครั้งของผลการปฏิบัติ ตรวจรสถานที่-->
          <div>
            <label class="label">
              <span class="label-text mb-1"
                >ตรวจเยี่ยมสถานที่ ธนาคาร ร้านทอง ฯ</span
              >
            </label>

            <div class="grid grid-cols-2 grid-rows-3 gap-4">
              <div>
                <label class="input w-full">
                  <span class="label text-black">ปั้มน้ำมัน</span>
                  <input
                    type="number"
                    v-model="formData.gasStationCount"
                    class="input input-bordered"
                  />
                </label>
              </div>
              <div>
                <label class="input w-full">
                  <span class="label text-black">ธนาคาร</span>
                  <input
                    type="number"
                    v-model="formData.bankCount"
                    class="input input-bordered"
                  />
                </label>
              </div>
              <div>
                <label class="input w-full">
                  <span class="label text-black">ร้านทอง</span>
                  <input
                    type="number"
                    v-model="formData.goldShopCount"
                    class="input input-bordered"
                  />
                </label>
              </div>
              <div>
                <label class="input w-full">
                  <span class="label text-black">ร้านสะดวกซื้อ</span>
                  <input
                    type="number"
                    v-model="formData.convenienceStoreCount"
                    class="input input-bordered"
                  />
                </label>
              </div>
              <div>
                <label class="input w-full">
                  <span class="label text-black">ตู้กดเงินสด ATM</span>
                  <input
                    type="number"
                    v-model="formData.atmCount"
                    class="input input-bordered"
                  />
                </label>
              </div>
              <div>
                <label class="input w-full">
                  <span class="label text-black"
                    >จุดเสี่ยง / สะพาน / ท่อลอด</span
                  >
                  <input
                    type="number"
                    v-model="formData.riskPointCount"
                    class="input input-bordered"
                  />
                </label>
              </div>
            </div>
          </div>

          <!-- POP UP ถนนสายหลัก -->
          <div>
            <label class="label">
              <span class="label-text mb-1"
                >การรตั้งจุดตรวจ POP UP ถนนสายหลัก</span
              >
            </label>

            <div class="grid grid-cols-2 grid-rows-1 gap-4">
              <div>
                <label class="input w-full">
                  <span class="label text-black">รถยนต์</span>
                  <input
                    type="number"
                    v-model="formData.mainRoadCarCount"
                    class="input input-bordered"
                  />
                </label>
              </div>
              <div>
                <label class="input w-full">
                  <span class="label text-black">รถ จยย.</span>
                  <input
                    type="number"
                    v-model="formData.mainRoadMotorcycleCount"
                    class="input input-bordered"
                  />
                </label>
              </div>
            </div>
          </div>

          <!-- POP UP ถนนสายรอง -->
          <div>
            <label class="label">
              <span class="label-text mb-1"
                >การรตั้งจุดตรวจ POP UP ถนนสายรอง</span
              >
            </label>

            <div class="grid grid-cols-2 grid-rows-1 gap-4">
              <div>
                <label class="input w-full">
                  <span class="label text-black">รถยนต์</span>
                  <input
                    type="number"
                    v-model="formData.sideRoadCarCount"
                    class="input input-bordered"
                  />
                </label>
              </div>
              <div>
                <label class="input w-full">
                  <span class="label text-black">รถ จยย.</span>
                  <input
                    type="number"
                    v-model="formData.sideRoadMotorcycleCount"
                    class="input input-bordered"
                  />
                </label>
              </div>
            </div>
          </div>

          <!-- ผลการปฏิบัติ Line bot -->
          <div>
            <label class="label">
              <span class="label-text mb-1">ผลการปฏิบัติ Line bot</span>
            </label>

            <div class="grid grid-cols-2 grid-rows-2 gap-4">
              <div>
                <label class="input w-full">
                  <span class="label text-black">รถยนต์</span>
                  <input
                    type="number"
                    v-model="formData.lineBotCarCount"
                    class="input input-bordered"
                  />
                </label>
              </div>
              <div>
                <label class="input w-full">
                  <span class="label text-black">จยย.</span>
                  <input
                    type="number"
                    v-model="formData.lineBotMotorcycleCount"
                    class="input input-bordered"
                  />
                </label>
              </div>
              <div>
                <label class="input w-full">
                  <span class="label text-black">บุคคล</span>
                  <input
                    type="number"
                    v-model="formData.lineBotPersonCount"
                    class="input input-bordered"
                  />
                </label>
              </div>
            </div>
          </div>

          <!-- มาตรการป้องกันปราบปรามการแข่งรถในทาง -->
          <div>
            <label class="label">
              <span class="label-text mb-1"
                >มาตรการป้องกันปราบปรามการแข่งรถในทาง</span
              >
            </label>

            <div class="grid grid-cols-1 grid-rows-5 gap-4">
              <div>
                <label class="input w-full">
                  <span class="label text-black"
                    >เปิดสัญญาณไฟ/ลว.เส้นทางตรวจสอบกลุ่มรถซิ่ง</span
                  >
                  <input
                    type="number"
                    v-model="formData.racingSignalCount"
                    class="input input-bordered"
                  />
                </label>
              </div>
              <div>
                <label class="input w-full">
                  <span class="label text-black"
                    >ตรวจร้านซ่อมรถ/ขายอะไหล่ และประชาสัมพันธ์</span
                  >
                  <input
                    type="number"
                    v-model="formData.racingRepairShopCount"
                    class="input input-bordered"
                  />
                </label>
              </div>
              <div>
                <label class="input w-full">
                  <span class="label text-black"
                    >จัดทำประวัติบุคคลที่มีพฤติกรรมเสี่ยงแข่งรถ ฯ</span
                  >
                  <input
                    type="number"
                    v-model="formData.racingRiskProfileCount"
                    class="input input-bordered"
                  />
                </label>
              </div>
              <div>
                <label class="input w-full">
                  <span class="label text-black"
                    >ตรวจยึด จยย. แต่งซิ่ง อุปกรณ์ส่วนควบไม่ครบ</span
                  >
                  <input
                    type="number"
                    v-model="formData.racingConfiscateCount"
                    class="input input-bordered"
                  />
                </label>
              </div>
              <div>
                <label class="input w-full">
                  <span class="label text-black"
                    >ประชาสัมพันธ์แจ้งเตือนรถยนต์เฝ้าระวังพิเศษสูงสุด</span
                  >
                  <input
                    type="number"
                    v-model="formData.racingWarningCount"
                    class="input input-bordered"
                  />
                </label>
              </div>
            </div>
          </div>

          <!-- ตรวจยึดยานพาหนะ ตรวจสอบ -->
          <div>
            <label class="label">
              <span class="label-text mb-1">ตรวจยึดยานพาหนะ ตรวจสอบ</span>
            </label>

            <div class="grid grid-cols-2 grid-rows-1 gap-4">
              <div>
                <label class="input w-full">
                  <span class="label text-black">รถยนต์</span>
                  <input
                    type="number"
                    v-model="formData.confiscateCarCount"
                    class="input input-bordered"
                  />
                </label>
              </div>
              <div>
                <label class="input w-full">
                  <span class="label text-black">จยย.</span>
                  <input
                    type="number"
                    v-model="formData.confiscateMotorcycleCount"
                    class="input input-bordered"
                  />
                </label>
              </div>
            </div>
          </div>

          <!-- ทำประวัติกลุ่มเสี่ยง / จัดเก็บ DNA / พิมพ์มือ -->
          <div>
            <label class="label">
              <span class="label-text mb-1"
                >ทำประวัติกลุ่มเสี่ยง / จัดเก็บ DNA / พิมพ์มือ</span
              >
            </label>

            <div class="grid grid-cols-1 grid-rows-3 gap-4">
              <div>
                <label class="input w-full">
                  <span class="label text-black"
                    >ทำประวัติบุคคลกลุ่มเสี่ยง</span
                  >
                  <input
                    type="number"
                    v-model="formData.riskProfileCount"
                    class="input input-bordered"
                  />
                </label>
              </div>
              <div>
                <label class="input w-full">
                  <span class="label text-black">จัดเก็บ DNA</span>
                  <input
                    type="number"
                    v-model="formData.dnaCollectionCount"
                    class="input input-bordered"
                  />
                </label>
              </div>
              <div>
                <label class="input w-full">
                  <span class="label text-black">พิมพ์ลายนิ้วมือ</span>
                  <input
                    type="number"
                    v-model="formData.fingerprintCount"
                    class="input input-bordered"
                  />
                </label>
              </div>
            </div>
          </div>

          <!-- ผลการจับกุมข้อหาต่าง ๆ -->
          <div>
            <label class="label">
              <span class="label-text mb-1">ผลการจับกุมข้อหาต่าง ๆ</span>
            </label>

            <div class="grid grid-cols-2 grid-rows-3 gap-4">
              <div>
                <label class="input w-full">
                  <span class="label text-black">พ.ร.บ.ยาเสพติด</span>
                  <input
                    type="number"
                    v-model="formData.drugArrestCount"
                    class="input input-bordered"
                  />
                </label>
              </div>
              <div>
                <label class="input w-full">
                  <span class="label text-black">พ.ร.บ.อาวุธปืน</span>
                  <input
                    type="number"
                    v-model="formData.gunArrestCount"
                    class="input input-bordered"
                  />
                </label>
              </div>
              <div>
                <label class="input w-full">
                  <span class="label text-black">พ.ร.บ.การพนัน</span>
                  <input
                    type="number"
                    v-model="formData.gamblingArrestCount"
                    class="input input-bordered"
                  />
                </label>
              </div>
              <div>
                <label class="input w-full">
                  <span class="label text-black">ข้อหาอื่น ๆ</span>
                  <input
                    type="number"
                    v-model="formData.otherArrestCount"
                    class="input input-bordered"
                  />
                </label>
              </div>
              <div>
                <label class="input w-full">
                  <span class="label text-black">หมายจับ สภ.เทพา</span>
                  <input
                    type="number"
                    v-model="formData.localWarrantCount"
                    class="input input-bordered"
                  />
                </label>
              </div>
              <div>
                <label class="input w-full">
                  <span class="label text-black">หมายจับอื่น ๆ</span>
                  <input
                    type="number"
                    v-model="formData.otherWarrantCount"
                    class="input input-bordered"
                  />
                </label>
              </div>
            </div>
          </div>

          <!-- ปุ่มส่งฟอร์ม -->
          <button type="submit" class="btn btn-primary w-full">
            สร้างรายงาน
          </button>
        </form>
      </div>

      <!-- แสดงผลรายงาน -->
      <div v-if="report" class="mt-8 bg-base-100 shadow-lg rounded-lg p-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold">รายงานที่สร้าง</h2>
          <div class="text-sm text-gray-500">
            จำนวนตัวอักษร: {{ report.length }}
          </div>
        </div>
        <textarea
          v-model="report"
          class="textarea textarea-bordered w-full h-64"
        ></textarea>
        <button @click="copyReport" class="btn btn-info w-full mt-4">
          คัดลอกข้อความ
        </button>
      </div>
    </div>
  </div>
</template>
