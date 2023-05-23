<template>
  <Line :data="chartData" :options="chartOptions" />
</template>

<script>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "vue-chartjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default {
  name: "RespiratoryRateChart",
  components: {
    Line,
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
    options: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    chartData() {
      return {
        labels: this.data.map((entry) => entry.timestamp),
        datasets: [
          {
            label: "Respiratory Rate",
            borderColor: "#4A5568",
            data: this.data.map((entry) => entry.respiratoryRate),
            fill: false,
          },
        ],
      };
    },
  },
};
</script>
