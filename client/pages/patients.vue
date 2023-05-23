<template>
  <div class="min-h-full">
    <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <img class="h-20 w-20" src="/logo-kp.svg" alt="Your Company" />
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
            v-for="data in patientData"
            :key="data.name"
            class="mb-4 hover:bg-gray-100 cursor-pointer"
            @click="fetchPatientTtvs(data.id, data.name)"
          >
            <div class="border px-4 py-2 flex justify-between">
              <p>{{ data.name }}</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="{1.5}"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"
                />
              </svg>
            </div>
          </div>
        </div>

        <!-- Statistic Modal -->
        <div
          v-if="showModal"
          class="fixed inset-0 flex items-center justify-center z-50"
        >
          <div class="fixed inset-0 bg-black opacity-50"></div>
          <!-- Dark overlay -->

          <div class="bg-white rounded-lg shadow-lg p-6 relative">
            <h2 class="text-xl font-bold mb-4">Patient's statistics</h2>
            <div>
              <p class="text-md mb-4">Nama pasien : {{ selectedName }}</p>
            </div>
            <div class="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p class="text-sm text-gray-400 text-center">Blood Pressure</p>
                <BloodPressureChart
                  :data="selectedBloodPressure"
                  :options="chartOptions"
                />
              </div>
              <div>
                <p class="text-sm text-gray-400 text-center">Temperature</p>
                <TemperatureChart
                  :data="selectedTemperature"
                  :options="chartOptions"
                />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4 mb-8">
              <div>
                <p class="text-sm text-gray-400 text-center">Heart Rate</p>
                <HeartRateChart
                  :data="selectedHeartRate"
                  :options="chartOptions"
                />
              </div>
              <div>
                <p class="text-sm text-gray-400 text-center">
                  Respiratory Rate
                </p>
                <RespiratoryRateChart
                  :data="selectedRespiratoryRate"
                  :options="chartOptions"
                />
              </div>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full border-collapse">
                <thead>
                  <tr>
                    <th class="border px-4 py-2">Temperature</th>
                    <th class="border px-4 py-2">Heart Rate</th>
                    <th class="border px-4 py-2">Blood Pressure</th>
                    <th class="border px-4 py-2">Respiratory Rate</th>
                    <th class="border px-4 py-2">Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="isLoading" class="text-gray-700">
                    <td colspan="6" class="py-2">Loading...</td>
                  </tr>
                  <tr v-else-if="error" class="text-red-500">
                    <td colspan="6" class="py-2">{{ error }}</td>
                  </tr>
                  <tr
                    v-else
                    v-for="vitalSign in selectedTTv"
                    :key="vitalSign.name"
                    class="mb-4 hover:bg-gray-100"
                  >
                    <td class="border px-4 py-2 text-center">
                      <span
                        class="inline-block h-2 w-2 rounded-full"
                        :class="{
                          'bg-green-400':
                            vitalSign.temperature >= 97.7 &&
                            vitalSign.temperature <= 99.5,
                          'bg-yellow-400':
                            vitalSign.temperature < 97.7 ||
                            vitalSign.temperature > 99.5,
                        }"
                        :title="
                          vitalSign.temperature >= 97.7 &&
                          vitalSign.temperature <= 99.5
                            ? 'Normal'
                            : 'Abnormal'
                        "
                      ></span>
                      {{ vitalSign.temperature }}
                    </td>
                    <td class="border px-4 py-2 text-center">
                      <span
                        class="inline-block h-2 w-2 rounded-full"
                        :class="{
                          'bg-green-400':
                            vitalSign.heart_rate >= 60 &&
                            vitalSign.heart_rate <= 100,
                          'bg-yellow-400':
                            vitalSign.heart_rate < 60 ||
                            vitalSign.heart_rate > 100,
                        }"
                        :title="
                          vitalSign.heart_rate >= 60 &&
                          vitalSign.heart_rate <= 100
                            ? 'Normal'
                            : 'Abnormal'
                        "
                      ></span>
                      {{ vitalSign.heart_rate }}
                    </td>
                    <td class="border px-4 py-2 text-center">
                      <span
                        class="inline-block h-2 w-2 rounded-full"
                        :class="{
                          'bg-green-400':
                            vitalSign.blood_pressure_systolic >= 90 &&
                            vitalSign.blood_pressure_systolic <= 120 &&
                            vitalSign.blood_pressure_diastolic >= 60 &&
                            vitalSign.blood_pressure_diastolic <= 80,
                          'bg-yellow-400':
                            vitalSign.blood_pressure_systolic < 90 ||
                            vitalSign.blood_pressure_systolic > 120 ||
                            vitalSign.blood_pressure_diastolic < 60 ||
                            vitalSign.blood_pressure_diastolic > 80,
                        }"
                        :title="
                          vitalSign.blood_pressure_systolic >= 90 &&
                          vitalSign.blood_pressure_systolic <= 120 &&
                          vitalSign.blood_pressure_diastolic >= 60 &&
                          vitalSign.blood_pressure_diastolic <= 80
                            ? 'Normal'
                            : 'Abnormal'
                        "
                      ></span>
                      {{ vitalSign.blood_pressure_systolic }}/{{
                        vitalSign.blood_pressure_diastolic
                      }}
                    </td>
                    <td class="border px-4 py-2 text-center">
                      <span
                        class="inline-block h-2 w-2 rounded-full"
                        :class="{
                          'bg-green-400':
                            vitalSign.respiratory_rate >= 12 &&
                            vitalSign.respiratory_rate <= 20,
                          'bg-yellow-400':
                            vitalSign.respiratory_rate < 12 ||
                            vitalSign.respiratory_rate > 20,
                        }"
                        :title="
                          vitalSign.respiratory_rate >= 12 &&
                          vitalSign.respiratory_rate <= 20
                            ? 'Normal'
                            : 'Abnormal'
                        "
                      ></span>
                      {{ vitalSign.respiratory_rate }}
                    </td>
                    <td class="border px-4 py-2">
                      {{ formatTimestamp(vitalSign.timestamp) }}
                    </td>
                  </tr>
                  <tr v-if="selectedTTv.length === 0" class="text-gray-700">
                    <td colspan="6" class="py-2">No results found.</td>
                  </tr>
                </tbody>
              </table>
            </div>

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
import BloodPressureChart from "../components/BloodPressureChart.vue";
import HeartRateChart from "../components/HeartRateChart.vue";
import TemperatureChart from "../components/TemperatureChart.vue";
import RespiratoryRateChart from "../components/RespiratoryRateChart.vue";

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
      patientData: [],
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
      selectedName: null,
      selectedTTv: null,
      selectedPatientId: null,
      selectedBloodPressure: null,
      selectedHeartRate: null,
      selectedTemperature: null,
      selectedRespiratoryRate: null,
      chartOptions: {
        responsive: true,
      },
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
        const response = await axios.get(
          "https://impossible-gold-cod.cyclic.app/patients",
          {
            params: { name: this.searchQuery },
          }
        );
        console.log(response.data);
        this.patientData = response.data.data;
      } catch (error) {
        this.error = "An error occurred while fetching vital sign data.";
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },

    async fetchPatientTtvs(patientsId, name) {
      this.isLoading = true;
      this.error = null;
      this.selectedPatientId = patientsId;
      this.selectedName = name;

      try {
        const response = await axios.get(
          `https://impossible-gold-cod.cyclic.app/ttv/patient/${patientsId}`
        );
        this.selectedTTv = response.data.data;
        console.log("tes", response.data.data);

        const bloodPressureData = this.selectedTTv.map((entry) => ({
          timestamp: this.formatTimestampShorter(entry.timestamp),
          systolic: entry.blood_pressure_systolic,
          diastolic: entry.blood_pressure_diastolic,
        }));

        const temperatureData = this.selectedTTv.map((entry) => ({
          timestamp: this.formatTimestampShorter(entry.timestamp),
          temperature: entry.temperature,
        }));

        const heartRateData = this.selectedTTv.map((entry) => ({
          timestamp: this.formatTimestampShorter(entry.timestamp),
          heartRate: entry.heart_rate,
        }));

        const respiratoryRateData = this.selectedTTv.map((entry) => ({
          timestamp: this.formatTimestampShorter(entry.timestamp),
          respiratoryRate: entry.respiratory_rate,
        }));

        this.selectedBloodPressure = bloodPressureData;
        this.selectedTemperature = temperatureData;
        this.selectedHeartRate = heartRateData;
        this.selectedRespiratoryRate = respiratoryRateData;
      } catch (error) {
        this.error = "An error occurred while fetching vital sign data.";
        console.error(error);
      } finally {
        this.isLoading = false;
      }

      this.showModal = true;
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

    formatTimestampShorter(timestamp) {
      const date = new Date(timestamp);
      const formattedDate = date.toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "2-digit",
      });
      const formattedTime = date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
      return `${formattedDate} ${formattedTime}`;
    },
  },

  created() {
    this.search();
  },
};
</script>
