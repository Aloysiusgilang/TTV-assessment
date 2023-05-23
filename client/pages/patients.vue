<template>
  <div class="min-h-full">
    <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <img
                class="h-8 w-8"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                alt="Your Company"
              />
            </div>
            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline space-x-4">
                <NuxtLink
                  v-for="item in navigation"
                  :key="item.name"
                  :to="item.href"
                  :class="[
                    item.current
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'rounded-md px-3 py-2 text-sm font-medium',
                  ]"
                  :aria-current="item.current ? 'page' : undefined"
                  >{{ item.name }}</NuxtLink
                >
              </div>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="ml-4 flex items-center md:ml-6">
              <button
                type="button"
                class="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span class="sr-only">View notifications</span>
                <BellIcon class="h-6 w-6" aria-hidden="true" />
              </button>

              <!-- Profile dropdown -->
              <Menu as="div" class="relative ml-3">
                <div>
                  <MenuButton
                    class="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span class="sr-only">Open user menu</span>
                    <img
                      class="h-8 w-8 rounded-full"
                      :src="user.imageUrl"
                      alt=""
                    />
                  </MenuButton>
                </div>
                <transition
                  enter-active-class="transition ease-out duration-100"
                  enter-from-class="transform opacity-0 scale-95"
                  enter-to-class="transform opacity-100 scale-100"
                  leave-active-class="transition ease-in duration-75"
                  leave-from-class="transform opacity-100 scale-100"
                  leave-to-class="transform opacity-0 scale-95"
                >
                  <MenuItems
                    class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  >
                    <MenuItem
                      v-for="item in userNavigation"
                      :key="item.name"
                      v-slot="{ active }"
                    >
                      <a
                        :href="item.href"
                        :class="[
                          active ? 'bg-gray-100' : '',
                          'block px-4 py-2 text-sm text-gray-700',
                        ]"
                        >{{ item.name }}</a
                      >
                    </MenuItem>
                  </MenuItems>
                </transition>
              </Menu>
            </div>
          </div>
          <div class="-mr-2 flex md:hidden">
            <!-- Mobile menu button -->
            <DisclosureButton
              class="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span class="sr-only">Open main menu</span>
              <Bars3Icon
                v-if="!open"
                class="block h-6 w-6"
                aria-hidden="true"
              />
              <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel class="md:hidden">
        <div class="space-y-1 px-2 pb-3 pt-2 sm:px-3">
          <DisclosureButton
            v-for="item in navigation"
            :key="item.name"
            as="a"
            :href="item.href"
            :class="[
              item.current
                ? 'bg-gray-900 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
              'block rounded-md px-3 py-2 text-base font-medium',
            ]"
            :aria-current="item.current ? 'page' : undefined"
            >{{ item.name }}</DisclosureButton
          >
        </div>
        <div class="border-t border-gray-700 pb-3 pt-4">
          <div class="flex items-center px-5">
            <div class="flex-shrink-0">
              <img class="h-10 w-10 rounded-full" :src="user.imageUrl" alt="" />
            </div>
            <div class="ml-3">
              <div class="text-base font-medium leading-none text-white">
                {{ user.name }}
              </div>
              <div class="text-sm font-medium leading-none text-gray-400">
                {{ user.email }}
              </div>
            </div>
            <button
              type="button"
              class="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span class="sr-only">View notifications</span>
              <BellIcon class="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div class="mt-3 space-y-1 px-2">
            <DisclosureButton
              v-for="item in userNavigation"
              :key="item.name"
              as="a"
              :href="item.href"
              class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
              >{{ item.name }}</DisclosureButton
            >
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>

    <header class="bg-white shadow">
      <div
        class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between"
      >
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">
          Daftar Pasien
        </h1>
        <button
          @click="openModal"
          class="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Add Entry
        </button>
      </div>
    </header>
    <main class="w-full">
      <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <!-- Search form -->

        <div class="search-form mb-6 flex">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Enter patient's name"
            class="border w-full border-gray-300 px-4 py-2 rounded-lg mr-2"
          />
          <button
            @click="search"
            class="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Search
          </button>
        </div>

        <!-- Results -->
        <div class="overflow-x-auto">
          <div v-if="isLoading" class="text-gray-700">
            <td colspan="6" class="py-2">Loading...</td>
          </div>
          <div v-else-if="error" class="text-red-500">
            <div colspan="6" class="py-2">{{ error }}</div>
          </div>
          <div
            v-else
            v-for="vitalSign in vitalSigns"
            :key="vitalSign.name"
            class="mb-4 hover:bg-gray-100"
          >
            <div class="border px-4 py-2">{{ vitalSign.name }}</div>
          </div>
        </div>

        <!-- Vital Sign Assessment Form -->
        <div
          v-if="showModal"
          class="fixed inset-0 flex items-center justify-center z-50"
        >
          <div class="fixed inset-0 bg-black opacity-50"></div>
          <!-- Dark overlay -->

          <div class="bg-white rounded-lg shadow-lg p-6 relative">
            <h2 class="text-xl font-bold mb-4">Patient's statistics</h2>
            <form @submit.prevent="submitVitalSign">
              <div class="mb-4">
                <label for="patientName" class="font-bold"
                  >Patient's Name</label
                >
                <input
                  type="text"
                  v-model="patientName"
                  id="patientName"
                  class="border border-gray-300 px-4 py-2 rounded-lg w-full"
                  placeholder="Enter patient's name"
                />
              </div>
              <div class="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label for="temperature" class="font-bold">Temperature</label>
                  <input
                    type="number"
                    v-model="temperature"
                    id="temperature"
                    class="border border-gray-300 px-4 py-2 rounded-lg w-full"
                    placeholder="Enter temperature"
                  />
                </div>
                <div>
                  <label for="heartRate" class="font-bold">Heart Rate</label>
                  <input
                    type="number"
                    v-model="heartRate"
                    id="heartRate"
                    class="border border-gray-300 px-4 py-2 rounded-lg w-full"
                    placeholder="Enter heart rate"
                  />
                </div>
              </div>
              <div class="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label for="systolicBP" class="font-bold"
                    >Blood Pressure (Systolic)</label
                  >
                  <input
                    type="number"
                    v-model="systolicBP"
                    id="systolicBP"
                    class="border border-gray-300 px-4 py-2 rounded-lg w-full"
                    placeholder="Enter systolic blood pressure"
                  />
                </div>
                <div>
                  <label for="diastolicBP" class="font-bold"
                    >Blood Pressure (Diastolic)</label
                  >
                  <input
                    type="number"
                    v-model="diastolicBP"
                    id="diastolicBP"
                    class="border border-gray-300 px-4 py-2 rounded-lg w-full"
                    placeholder="Enter diastolic blood pressure"
                  />
                </div>
              </div>
              <div class="mb-4">
                <label for="respiratoryRate" class="font-bold"
                  >Respiratory Rate</label
                >
                <input
                  type="number"
                  v-model="respiratoryRate"
                  id="respiratoryRate"
                  class="border border-gray-300 px-4 py-2 rounded-lg w-full"
                  placeholder="Enter respiratory rate"
                />
              </div>
              <button
                type="submit"
                class="bg-blue-500 text-white px-4 py-2 rounded-lg w-full"
              >
                Submit
              </button>
            </form>

            <!-- Close button -->
            <button
              @click="showModal = false"
              class="absolute top-0 right-0 mt-2 mr-2 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/vue/24/outline";

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
  { name: "Dashboard", href: "/", current: false },
  { name: "Patients", href: "/patients", current: true },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];
</script>

<script>
import axios from "axios";

export default {
  data() {
    return {
      searchQuery: "",
      vitalSigns: [],
      isLoading: false,
      error: null,
      patientName: "",
      temperature: "",
      heartRate: "",
      systolicBP: "",
      diastolicBP: "",
      respiratoryRate: "",
      showModal: false,
      editVitalSignId: null,
    };
  },
  methods: {
    openModal() {
      this.showModal = true; // Show the modal when the button is clicked
    },

    async search() {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.get("http://localhost:3001/ttv", {
          params: { name: this.searchQuery },
        });
        console.log(response.data);
        this.vitalSigns = response.data.data;
      } catch (error) {
        this.error = "An error occurred while fetching vital sign data.";
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },

    async deleteVitalSign(vitalSignId) {
      try {
        await axios.delete(`http://localhost:3001/ttv/${vitalSignId}`);
        console.log(`Vital Sign with ID ${vitalSignId} deleted successfully.`);
        this.search(); // Refresh vital sign data
      } catch (error) {
        console.error(
          `Error deleting Vital Sign with ID ${vitalSignId}.`,
          error
        );
      }
    },

    async submitVitalSign() {
      try {
        if (this.editVitalSignId) {
          // Update existing vital sign
          const response = await axios.put(
            `http://localhost:3001/ttv/${this.editVitalSignId}`,
            {
              name: this.patientName,
              temperature: this.temperature,
              heart_rate: this.heartRate,
              blood_pressure_systolic: this.systolicBP,
              blood_pressure_diastolic: this.diastolicBP,
              respiratory_rate: this.respiratoryRate,
            }
          );
          console.log("response data", response.data);
          this.clearForm();
        } else {
          const response = await axios.post("http://localhost:3001/ttv", {
            name: this.patientName,
            temperature: this.temperature,
            heart_rate: this.heartRate,
            blood_pressure_systolic: this.systolicBP,
            blood_pressure_diastolic: this.diastolicBP,
            respiratory_rate: this.respiratoryRate,
          });
          console.log("response data", response.data);
        }

        // Clear form inputs
        this.clearForm();
        // Refresh vital sign data
        this.search();

        // Close the modal
        this.showModal = false;
      } catch (error) {
        console.error(error);
      }
    },

    formatTimestamp(timestamp) {
      const date = new Date(timestamp);
      const formattedDate = date.toLocaleString(); // customize the date formatting as per your requirement
      return formattedDate;
    },

    editVitalSign(vitalSign) {
      this.editVitalSignId = vitalSign.id;
      this.patientName = vitalSign.name;
      this.temperature = vitalSign.temperature;
      this.heartRate = vitalSign.heart_rate;
      this.systolicBP = vitalSign.blood_pressure_systolic;
      this.diastolicBP = vitalSign.blood_pressure_diastolic;
      this.respiratoryRate = vitalSign.respiratory_rate;
      this.showModal = true;
    },

    clearForm() {
      this.editVitalSignId = null;
      this.patientName = "";
      this.temperature = "";
      this.heartRate = "";
      this.systolicBP = "";
      this.diastolicBP = "";
      this.respiratoryRate = "";
    },
  },

  created() {
    this.search();
  },
};
</script>
