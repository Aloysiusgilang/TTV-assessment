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
  name: "HeartRateChart",
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
      console.log("chartdata", this.data);
      return {
        labels: this.data.map((entry) => entry.timestamp),
        datasets: [
          {
            label: "Heart Rate",
            borderColor: "#4A5568",
            data: this.data.map((entry) => entry.heartRate),
            fill: false,
          },
        ],
      };
    },
  },
};
</script>
