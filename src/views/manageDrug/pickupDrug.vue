<style xmlns="">
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

@keyframes flash {

  0%,
  50%,
  100% {
    opacity: 1;
  }

  25%,
  75% {
    opacity: 0;
  }
}

@media (min-width: 576px) {

  /* กฎ CSS สำหรับหน้าจอขนาดเล็ก */
  .tableCart {
    overflow-x: auto;
  }
}

@media (min-width: 768px) {
  /* กฎ CSS สำหรับหน้าจอขนาดกลาง */
}

@media (min-width: 992px) {
  /* กฎ CSS สำหรับหน้าจอขนาดใหญ่ */
}

.flash-label {
  animation: flash 5s infinite;
  font-weight: bold;
  color: red;
  font-size: smaller;
}
</style>

<template>
  <div class="p-4 sm:ml-12">
    <div class="p-4 mt-8">
      <div class="ml-8">
        <div class="flex flex-row">
          <div class="w-3/5 flex justify-start flex-col">
            <div class="mt-1 mb-1 m-2">
              <div class="flex justify-start">
                <Icon class="mr-1" icon="mdi:drugs" width="16" />
                รายการยา
              </div>
              <div class=" mb-1 border-b border-gray-200 dark:border-gray-700">
                <ul id="myTab" class="flex flex-wrap -mb-px text-sm font-medium text-center justify-between"
                  data-tabs-toggle="#myTabContent" role="tablist">
                  <div ref="" class="flex flex-row">
                  </div>
                  <div>
                    <SearchOrder :searchBar="textInput" @search="handleSearch" />
<!--                    <input type="text" >-->
                  </div>
                </ul>
              </div>
            </div>
            <div class="m-2 mt-0 h-[550px] overflow-y-scroll">
              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <TableItem :columns="tableColumns" :data="filteredDrug">
                  <template v-slot:nameDrug="{ row }">
                    <div class="text-start">
                      {{ row.nameDrug }}
                    </div>
                  </template>

                  <template v-slot:status="{ row }">
                    <div class="flex justify-center items-center">
                      <button v-if="row.stock <= 0"
                        class=" text-white cursor-not-allowed bg-red-500  font-medium  px-4 rounded-md text-sm" disabled
                        type="button">
                        <!--                        <Icon color="white" height="20" icon="pepicons-pop:plus" width="20"/>-->
                        หมด
                      </button>
                      <button v-else
                        class=" text-white bg-green-500 hover:bg-green-800 font-medium px-4 rounded-md text-sm"
                        type="button" @click="addCart(row.id, row.nameDrug, row.stock)">
                        <!--                        <Icon color="white" height="20" icon="pepicons-pop:plus" width="20"/>-->
                        เพิ่ม
                      </button>
                    </div>
                  </template>
                </TableItem>
              </table>

            </div>
          </div>

          <div class=" w-2/5 flex justify-start flex-col">
            <div class="mt-1 mb-1 m-2">
              <div class="flex justify-start items-center align-middle">
                <Icon class="mr-1" icon="solar:cart-plus-outline" width="16" />
                รายการยาที่เลือก {{ CartData.length }} รายการ
              </div>
              <div class=" mb-1 border-b border-gray-200 dark:border-gray-700">
              </div>
            </div>
            <div class="h-full overflow-y-scroll mt-0 mb-1 m-2">
              <table class="text-sm text-left text-gray-500 dark:text-gray-400">
                <tableCart :columns="tableColumnsCart" :data="CartData">

                  <template v-slot:nameDrug="{ row }">
                    <div class="text-start">
                      {{ row.nameDrug }}
                    </div>
                  </template>

                  <template v-slot:drugId="{ row }">
                    <div class="flex justify-center items-center">
                      <button class=" text-white bg-red-500 hover:bg-red-800 font-medium rounded-sm text-sm"
                        type="button" @click="deleteCart(row.drugId)">
                        <Icon color="white" height="20" icon="tabler:minus" width="20" />
                      </button>
                    </div>
                  </template>

                  <template v-slot:balanceStock="{ row }">

                    <span
                      class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">{{
                      row.balanceStock
                    }}</span>

                  </template>

                  <template v-slot:stock="{ row }">
                    <span
                      class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                      -{{
                      row.stock
                    }}</span>


                  </template>

                  <template v-slot:lastStock="{ row }">
                    <span
                      class="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">{{
                      row.lastStock
                    }}</span>


                  </template>
                </tableCart>
              </table>
            </div>
            <div class="flex justify-end mt-0 mb-1 m-2">
              <button
                class="flex justify-center items-center w-32 h-8 text-white bg-red-700 hover:bg-red-800 focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 mr-2"
                type="button">
                เคลียร์ข้อมูล
              </button>
              <button
                class=" flex justify-center items-center w-24 h-8  text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-xs px-5 py-2.5 mr-2"
                type="button" @click="showCreateAction">
                สร้างใบเบิก
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-if="showcreate" aria-hidden="true"
    class="fixed flex justify-center bg-gray-500 bg-opacity-80 top-10 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
    tabindex="-1">
    <div class="relative w-full max-w-2xl max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div class="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
          <Icon class="mr-3" icon="emojione-v1:document" width="24" />
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            สร้างใบเบิก
          </h3>
          <button
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="defaultModal" type="button" @click="showCreateAction">
            <Icon icon="heroicons:x-mark-20-solid" width="24" />
          </button>
        </div>
        <!-- Modal body -->
        <div class="p-6 space-y-6">
          <div class="flex flex-row justify-between">
            <div><span class="mr-5">เลขที่ : 1/66</span><span>ผู้เบิก : {{ fullname }}</span></div>

            <!--            <div>วันที่ : {{ formattedDate }}</div>-->
            <div>วันที่ :
              <input ref="smallInput" type="text" id="small-input"
                class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            </div>
          </div>
          <div class="border-b"></div>
          <div class="flex flex-row justify-center">
            <div>สรุปรายการเบิก</div>
          </div>
          <div class="flex flex-row justify-center w-full">
            <div class="h-[300px] w-[650px] overflow-y-scroll mt-0 mb-1 m-2">
              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <tableCart :columns="tableColumnsPrePo" :data="CartData">

                  <template v-slot:nameDrug="{ row }">
                    <div class="text-start">
                      {{ row.nameDrug }}
                    </div>
                  </template>
                </tableCart>
              </table>
            </div>
          </div>
          <div class="flex flex-row">
            <span class="w-3/5">จำนวนยาที่เบิก : {{ CartData.length }} </span>
            <select id="PayUser" v-model="PayUser" @change="changePayUser"
              class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
              <option selected disabled>เลือกผู้จ่ายยา</option>
              <option value="นางวิชชุดา เชื้อแป้น">นางวิชชุดา เชื้อแป้น</option>
              <option value="นางสาวทำรงรักษ์ สีท้าว">นางสาวทำรงรักษ์ สีท้าว</option>
            </select>
          </div>
        </div>
        <!-- Modal footer -->
        <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
          <button
            class=" flex justify-center items-center w-24 h-8  text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-xs px-5 py-2.5 mr-1"
            type="button" @click="addRequis(PayUsers)">
            บันทึก
          </button>
          <button
            class="flex justify-center items-center w-24 h-8 text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2"
            type="button" @click="showCreateAction">
            ปิด
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TableItem from '../../components/table.vue';
import TableCart from '../../components/table.vue';
import Table from '../../components/table.vue';
import { useDataCartStore, useGetDrug, useRequisData } from '../../stores'
import { computed, onMounted, ref } from "vue";
import { Icon } from '@iconify/vue';
import Search from "@/components/Search.vue";
import SearchOrder from "@/components/Search.vue";
import Swal from "sweetalert2";
import router from "@/router/index.js";

export default {
  components: {
    SearchOrder,
    Search,
    Table,
    Icon,
    TableCart,
    TableItem
  },
  setup() {
    const PayUsers = ref('');
    const PayUser = ref('เลือกผู้จ่ายยา');

    const dateInput = ref('');
    const changePayUser = async () => {
      PayUsers.value = PayUser.value
    };

    const tableColumns = computed(() => {
      return [
        { id: 'id', title: 'ลำดับ' },
        { id: 'nameDrug', title: 'ยา' },
        { id: 'qty', title: 'หน่วยนับ' },
        { id: 'qtyType', title: 'ประเภท' },
        { id: 'stock', title: 'จำนวนคงเหลือ' },
        { id: 'status', title: '#' },
      ];
    });

    const getDrugSe = useGetDrug();
    const getCart = useDataCartStore();
    const Requis = useRequisData();

    const drug = computed(() => {
      return getDrugSe.showSelectDrug;
    })

    const CartData = computed(() => {
      return getCart.showGetCart
    })


    const tableColumnsCart = computed(() => {
      return [
        { id: 'nameDrug', title: 'ชื่อยา' },
        { id: 'balanceStock', title: 'คลัง' },
        { id: 'stock', title: 'จำนวนที่เบิก' },
        { id: 'lastStock', title: 'คงเหลือ' },
        { id: 'drugId', title: '#' }
      ];
    });

    const tableColumnsPrePo = computed(() => {
      return [
        { id: 'id', title: 'ลำดับ' },
        { id: 'drugId', title: 'รหัส' },
        { id: 'nameDrug', title: 'ชื่อยา' },
        { id: 'stock', title: 'จำนวน' }
      ];
    });

    const addCart = async (id, name, stocks) => {
      console.log(id)
      Swal.fire({
        titleText: `${name}`,
        text: `จำนวนที่เบิกได้ : ${stocks}`,
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off',
          inputmode: 'numeric',
          pattern: '[0-9]*',
        },
        showCancelButton: true,
        cancelButtonText: 'ยกเลิก',
        confirmButtonText: 'ยืนยัน',
        confirmButtonColor: '#0E9F6E',
        showLoaderOnConfirm: true,
        preConfirm: async (stock) => {
          if (!stock) {
            Swal.showValidationMessage('กรุณากรอกจำนวนที่ต้องการเบิก');
          } else {
            if (!isNaN(parseInt(stock))) {
              if (parseInt(stocks) >= parseInt(stock)) {
                if (parseInt(stock) === 0) {
                  Swal.showValidationMessage('กรุณากรอกจำนวนที่ต้องการเบิก');
                } else {
                  return await getCart.addCart(id, stock);
                }
              } else {
                Swal.showValidationMessage('ไม่สามารถเบิกเกินจำนวนคงเหลือ!!!');
              }
            } else {
              Swal.showValidationMessage('กรุณากรอกตัวเลขเท่านั้น');
            }

          }
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then(async (result) => {
        if (result.isConfirmed) {
           // await getDrugSe.getDrugToSelect()
           // await getCart.getCart()
          window.location.reload()
        await router.push('/manageDrug/pickupDrug')
        }
      })

    }

    const deleteCart = async (id) => {
      console.log(id)
      await getCart.deleteCart(id)
      await getDrugSe.getDrugToSelect();
      await getCart.getCart();

    }

    // search bar start
    const textInput = ref("");
    const filteredDrug = computed(() => {
      if (!textInput.value) {
        return drug.value;
      }
      const keyword = textInput.value.toLowerCase();
      return drug.value.filter(
        (item) =>
          item.nameDrug.toLowerCase().includes(keyword) ||
          item.qtyType.toLowerCase().includes(keyword)
      );
    });

    const handleSearch = (searchText) => {
      textInput.value = searchText;
      // console.log(searchText+'art')
    };

    const showcreate = ref(false)
    const showCreateAction = () => {
      showcreate.value = !showcreate.value
    }


    onMounted(async () => {
      await getDrugSe.getDrugToSelect();
      await getCart.getCart()
      document.getElementById("table-search").focus();
      // this.$refs.searchInputRef.focus();
    })

    const fullname = ref(JSON.parse(localStorage.getItem("fname")))

    const currentDate = ref(new Date());
    const formattedDate = computed(() => {
      const date = currentDate.value;
      // Format the date as desired (e.g., YYYY-MM-dd)
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Add 1 because months are zero-based
      const day = String(date.getDate()).padStart(2, '0');

      return `${year}-${month}-${day}`;
    });
    const smallInput = ref(null);
    const addRequis = (PayUsers) => {
      console.log(PayUsers)
      const inputValue = smallInput.value.value;
      console.log(inputValue);
      Swal.fire({
        title: 'ยืนยันการเบิกยา',
        text: "กรุณากดยืนยันเพื่อดำเนินการต่อ",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#0E9F6E',
        cancelButtonColor: '#d33',
        cancelButtonText: 'ยกเลิก',
        confirmButtonText: 'ยืนยัน',
        customClass: {
          icon: 'custom-icon-class',
          popup: 'custom-popup-class',
          title: 'custom-title-class',
          content: 'custom-content-class',
          text: 'custom-content-class',
          confirmButton: 'custom-confirm-button-class',
          cancelButton: 'custom-cancel-button-class',
        },
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await Requis.addRequis(PayUsers, inputValue);
            await getDrugSe.getDrugToSelect();
            await getCart.getCart()
            showcreate.value = false

          } catch (error) {
            Swal.hideLoading();
            Swal.fire({
              icon: "error",
              title: "เกิดข้อผิดพลาด!",
              text: "ไม่สามารถพิมพ์ได้",
            });
          }
        }
      })
    }

    return {
      smallInput,
      dateInput,
      PayUsers,
      PayUser,
      tableColumnsPrePo,
      fullname,
      formattedDate,
      currentDate,
      showcreate,
      textInput,
      filteredDrug,
      CartData,
      tableColumns,
      tableColumnsCart,
      drug,
      addRequis,
      changePayUser,
      addCart,
      showCreateAction,
      handleSearch,
      deleteCart
    };
  }
};
</script>
