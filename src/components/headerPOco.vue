<template>
  <nav
      class="fixed top-0 z-40 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="px-3 py-2 lg:px-5 lg:pl-3">

      <div class="flex items-center justify-between">
        <div class="flex justify-start">
          <div class="text-center">
            <button
                aria-controls="drawer-navigation"
                class="inline-flex items-center p-2 pt-0 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                data-drawer-show="drawer-navigation" data-drawer-target="drawer-navigation"
                type="button">
              <Icon height="24" icon="bi:list" width="24"/>
            </button>
          </div>
          <div class="flex-row flex">
            <a class="flex items-center ml-7 mr-2" href="#">
              <Icon icon="healthicons:rx-outline"  width="36" height="36" />
              <span
                  class="self-center text-sm font-semibold whitespace-nowrap dark:text-white"
              >ระบบจัดการคลังยา</span
              >
            </a>
          </div>

        </div>
        <div class="flex items-center">
          <div class="flex items-center ml-3">
            <div>
              <button
                  aria-expanded="false"
                  class="flex text-sm rounded-full dark:focus:ring-gray-600"
                  data-dropdown-toggle="dropdown-user"
                  type="button"
              >
                <Icon icon="icon-park:user" width="24" height="24" />
              </button>
            </div>
            <div
                id="dropdown-user"
                class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
            >
              <div class="px-4 py-3" role="none">
                <span
                    class="block text-sm text-gray-900 dark:text-white text-center"
                ><div v-if="user">{{ user.fullname }}</div></span
                >
                <span
                    class="block text-sm text-gray-500 truncate dark:text-gray-400 text-center"
                >manage drug</span
                >
              </div>
              <ul class="py-1" role="none">
                <li>
                  <a
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                      href="/logout"
                      role="menuitem"
                  >ออกจากระบบ</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>

</template>


<script>
import {onMounted} from "vue";
import {initDropdowns} from "flowbite";
import {useAuthStore} from "../stores";
import {Icon} from '@iconify/vue';

export default {
  components: {
    Icon
  },
  setup() {
    onMounted(() => {
      initDropdowns();
    });
    const authStore = useAuthStore();
    const user = authStore.user;
    return {user};
  },
};
</script>
