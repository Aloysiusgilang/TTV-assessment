<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6">Vital Sign Assessment</h1>

    <!-- Search form -->
    <div class="search-form mb-6">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Enter patient's name"
        class="border border-gray-300 px-4 py-2 rounded-lg mr-2"
      />
      <button
        @click="search"
        class="bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        Search
      </button>
    </div>

    <!-- Results -->
    <div class="results">
      <div v-if="isLoading" class="text-gray-700">Loading...</div>
      <div v-else-if="error" class="text-red-500">{{ error }}</div>
      <div v-else>
        <div v-for="vitalSign in vitalSigns" :key="vitalSign.id" class="mb-4">
          <h3 class="text-lg font-bold">{{ vitalSign.patient_name }}</h3>
          <p>Temperature: {{ vitalSign.temperature }}</p>
          <p>Heart Rate: {{ vitalSign.heart_rate }}</p>
          <p>
            Blood Pressure: {{ vitalSign.blood_pressure_systolic }}/{{
              vitalSign.blood_pressure_diastolic
            }}
          </p>
          <p>Respiratory Rate: {{ vitalSign.respiratory_rate }}</p>
          <p>Oxygen Saturation: {{ vitalSign.oxygen_saturation }}</p>
          <hr class="my-2" />
        </div>
        <div v-if="vitalSigns.length === 0" class="text-gray-700">
          No results found.
        </div>
      </div>
    </div>

    <nuxt />
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      searchQuery: "",
      vitalSigns: [],
      isLoading: false,
      error: null,
    };
  },
  methods: {
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
  },
};
</script>
