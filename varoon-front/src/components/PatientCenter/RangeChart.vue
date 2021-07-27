<template>
  <article class="range-chart-component">
    <div class="range-setting" ref="rangeSet">
      <div class="setting-title">측정 날짜</div>
      <ul class="range-ul">
        <li class="range-li" v-for="(date, index) in recentDate" :key="index">
          <input
            class="range-radio"
            type="radio"
            :value="index"
            v-model="selectDateIndex"
          />
          <div class="range-radio-tag">{{ date }}</div>
        </li>
      </ul>
    </div>
    <div class="range-chart-in">
      <div class="range-box">
        <div class="rangebox-id">좌안</div>
        <VueApexCharts
          class="range-chart"
          type="radar"
          width="375"
          height="375"
          :options="chartOptions"
          :series="leftSeries"
        ></VueApexCharts>
      </div>
      <div class="range-box">
        <div class="rangebox-id">우안</div>
        <VueApexCharts
          class="range-chart"
          type="radar"
          width="375"
          height="375"
          :options="chartOptions"
          :series="rightSeries"
        ></VueApexCharts>
      </div>
    </div>
  </article>
</template>
<script>
import VueApexCharts from "vue-apexcharts";

import { mapActions } from "vuex";

export default {
  components: {
    VueApexCharts,
  },
  watch: {
    selectDateIndex() {
      this.updateChart();
    },
  },
  data() {
    return {
      rangeDataArr: [],
      recentDate: [],
      selectDateIndex: "",
      angleL: 12,
      angleR: 13,
      startDay: "2019.09.01",
      endDay: "2019.09.12",
      leftSeries: [
        {
          name: "init_R",
          data: [31.8, 39.69, 47.39, 52.71, 47.76, 49.23, 46.39, 40.74],
        },
        {
          name: "rangeR",
          data: [],
        },
      ],
      rightSeries: [
        {
          name: "init_L",
          data: [31.8, 39.69, 47.39, 52.71, 47.76, 49.23, 46.39, 40.74],
        },
        {
          name: "rangeL",
          data: [],
        },
      ],
      chartOptions: {
        legend: {
          show: true,
          fontSize: "22px",
        },
        plotOptions: {
          bar: {
            horizontal: false,
            dataLabels: {
              position: "top",
            },
          },
        },
        dataLabels: {
          enabled: true,
          offsetX: -6,
          style: {
            fontSize: "12px",
            colors: ["#fff"],
          },
        },
        stroke: {
          show: true,
          width: 1,
          colors: ["#fff"],
        },

        xaxis: {
          categories: [
            "up",
            "rightup",
            "right",
            "rightdown",
            "down",
            "leftdown",
            "left",
            "leftup",
          ],
        },
      },
    };
  },
  methods: {
    ...mapActions(["RANGE_CHART"]),
    updateChart() {
      let newData = [
        this.rangeDataArr[this.selectDateIndex].leftRange.up,
        this.rangeDataArr[this.selectDateIndex].leftRange.rightUp,
        this.rangeDataArr[this.selectDateIndex].leftRange.right,
        this.rangeDataArr[this.selectDateIndex].leftRange.rightDown,
        this.rangeDataArr[this.selectDateIndex].leftRange.down,
        this.rangeDataArr[this.selectDateIndex].leftRange.leftDown,
        this.rangeDataArr[this.selectDateIndex].leftRange.left,
        this.rangeDataArr[this.selectDateIndex].leftRange.leftUp,
      ];
      let newData_init = [
        this.rangeDataArr[this.rangeDataArr.length - 1].leftRange.up,
        this.rangeDataArr[this.rangeDataArr.length - 1].leftRange.rightUp,
        this.rangeDataArr[this.rangeDataArr.length - 1].leftRange.right,
        this.rangeDataArr[this.rangeDataArr.length - 1].leftRange.rightDown,
        this.rangeDataArr[this.rangeDataArr.length - 1].leftRange.down,
        this.rangeDataArr[this.rangeDataArr.length - 1].leftRange.leftDown,
        this.rangeDataArr[this.rangeDataArr.length - 1].leftRange.left,
        this.rangeDataArr[this.rangeDataArr.length - 1].leftRange.leftUp,
      ];
      this.leftSeries = [
        {
          name: "init_L",
          data: newData_init,
        },
        {
          name: "rangeL",
          data: newData,
        },
      ];
      newData = [
        this.rangeDataArr[this.selectDateIndex].rightRange.up,
        this.rangeDataArr[this.selectDateIndex].rightRange.rightUp,
        this.rangeDataArr[this.selectDateIndex].rightRange.right,
        this.rangeDataArr[this.selectDateIndex].rightRange.rightDown,
        this.rangeDataArr[this.selectDateIndex].rightRange.down,
        this.rangeDataArr[this.selectDateIndex].rightRange.leftDown,
        this.rangeDataArr[this.selectDateIndex].rightRange.left,
        this.rangeDataArr[this.selectDateIndex].rightRange.leftUp,
      ];
      newData_init = [
        this.rangeDataArr[this.rangeDataArr.length - 1].rightRange.up,
        this.rangeDataArr[this.rangeDataArr.length - 1].rightRange.rightUp,
        this.rangeDataArr[this.rangeDataArr.length - 1].rightRange.right,
        this.rangeDataArr[this.rangeDataArr.length - 1].rightRange.rightDown,
        this.rangeDataArr[this.rangeDataArr.length - 1].rightRange.down,
        this.rangeDataArr[this.rangeDataArr.length - 1].rightRange.leftDown,
        this.rangeDataArr[this.rangeDataArr.length - 1].rightRange.left,
        this.rangeDataArr[this.rangeDataArr.length - 1].rightRange.leftUp,
      ];
      this.rightSeries = [
        {
          name: "init_R",
          data: newData_init,
        },
        {
          name: "rangeR",
          data: newData,
        },
      ];
    },
    scrollTest() {
      const height = this.$refs.rangeSet.scrollHeight;
      this.$refs.rangeSet.scrollTo(0, height);
    },
  },
  mounted() {
    const data = [
      {
        date: "2021/07/26",
        rightRange: {
          up: "1",
          rightUp: "1",
          right: "1",
          rightDown: "1",
          down: "1",
          leftDown: "1",
          left: "1",
          leftUp: "1",
        },
        leftRange: {
          up: "1",
          rightUp: "1",
          right: "1",
          rightDown: "1",
          down: "1",
          leftDown: "1",
          left: "1",
          leftUp: "1",
        },
      },
      {
        date: "2021/07/26",
        rightRange: {
          up: "2",
          rightUp: "2",
          right: "2",
          rightDown: "2",
          down: "2",
          leftDown: "2",
          left: "2",
          leftUp: "2",
        },
        leftRange: {
          up: "2",
          rightUp: "2",
          right: "2",
          rightDown: "2",
          down: "2",
          leftDown: "2",
          left: "2",
          leftUp: "2",
        },
      },
      {
        date: "2021/07/26",
        rightRange: {
          up: "3",
          rightUp: "3",
          right: "3",
          rightDown: "3",
          down: "3",
          leftDown: "3",
          left: "3",
          leftUp: "3",
        },
        leftRange: {
          up: "3",
          rightUp: "3",
          right: "3",
          rightDown: "3",
          down: "3",
          leftDown: "3",
          left: "3",
          leftUp: "3",
        },
      },
      {
        date: "2021/07/26",
        rightRange: {
          up: "4",
          rightUp: "4",
          right: "4",
          rightDown: "4",
          down: "4",
          leftDown: "4",
          left: "4",
          leftUp: "4",
        },
        leftRange: {
          up: "4",
          rightUp: "4",
          right: "4",
          rightDown: "4",
          down: "4",
          leftDown: "4",
          left: "4",
          leftUp: "4",
        },
      },
      {
        date: "2021/07/26",
        rightRange: {
          up: "5",
          rightUp: "5",
          right: "5",
          rightDown: "5",
          down: "5",
          leftDown: "5",
          left: "5",
          leftUp: "5",
        },
        leftRange: {
          up: "5",
          rightUp: "5",
          right: "5",
          rightDown: "5",
          down: "5",
          leftDown: "5",
          left: "5",
          leftUp: "5",
        },
      },
      {
        date: "2021/07/26",
        rightRange: {
          up: "6",
          rightUp: "6",
          right: "6",
          rightDown: "6",
          down: "6",
          leftDown: "6",
          left: "6",
          leftUp: "6",
        },
        leftRange: {
          up: "6",
          rightUp: "6",
          right: "6",
          rightDown: "6",
          down: "6",
          leftDown: "6",
          left: "6",
          leftUp: "6",
        },
      },
      {
        date: "2021/07/26",
        rightRange: {
          up: "7",
          rightUp: "7",
          right: "7",
          rightDown: "7",
          down: "7",
          leftDown: "7",
          left: "7",
          leftUp: "7",
        },
        leftRange: {
          up: "7",
          rightUp: "7",
          right: "7",
          rightDown: "7",
          down: "7",
          leftDown: "7",
          left: "7",
          leftUp: "7",
        },
      },
      {
        date: "2021/07/26",
        rightRange: {
          up: "8",
          rightUp: "8",
          right: "8",
          rightDown: "8",
          down: "8",
          leftDown: "8",
          left: "8",
          leftUp: "8",
        },
        leftRange: {
          up: "8",
          rightUp: "8",
          right: "8",
          rightDown: "8",
          down: "8",
          leftDown: "8",
          left: "8",
          leftUp: "8",
        },
      },
      {
        date: "2021/07/26",
        rightRange: {
          up: "9",
          rightUp: "9",
          right: "9",
          rightDown: "9",
          down: "9",
          leftDown: "9",
          left: "9",
          leftUp: "9",
        },
        leftRange: {
          up: "9",
          rightUp: "9",
          right: "9",
          rightDown: "9",
          down: "9",
          leftDown: "9",
          left: "9",
          leftUp: "9",
        },
      },
      {
        date: "2021/07/26",
        rightRange: {
          up: "10",
          rightUp: "10",
          right: "10",
          rightDown: "10",
          down: "10",
          leftDown: "10",
          left: "10",
          leftUp: "10",
        },
        leftRange: {
          up: "10",
          rightUp: "10",
          right: "10",
          rightDown: "10",
          down: "10",
          leftDown: "10",
          left: "10",
          leftUp: "10",
        },
      },
    ];
    this.rangeDataArr = data.reverse();
    this.recentDate = Array.from(data, (data) => data.date);
    this.selectDateIndex = 0;
  },
  updated() {},
};
</script>
<style>
.range-chart-component {
  display: flex;
  margin: 30px auto;
  width: 100%;
}
@media screen and (max-width: 1160px) {
  .range-chart-component {
    flex-direction: column;
    align-items: center;
  }
}
.range-setting {
  width: 274px;
  overflow: scroll;
  border-radius: 3px;
  box-shadow: 0 10px 60px 0 rgba(217, 217, 217, 0.43);
  background-color: #ffffff;
  padding: 20px 10px;
}
@media screen and (max-width: 1160px) {
  .range-setting {
    width: 867px;
  }
}
.range-chart-in {
  display: flex;
  width: 867px;
  border-radius: 3px;
  box-shadow: 0 10px 60px 0 rgba(217, 217, 217, 0.43);
  background-color: #ffffff;
}
.range-box {
  height: 613px;
  width: 433.5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.rangebox-id {
  width: 43px;
  height: 27px;
  font-family: NanumBarunGothicOTF;
  font-size: 24px;
  text-align: left;
  color: #000000;
}
@media screen and (max-width: 1160px) {
  .range-ul {
    display: flex;
    flex-wrap: wrap;
  }
}
.range-li {
  display: flex;
  font-size: 24px;
  align-items: center;
  margin-bottom: 10px;
}
@media screen and (max-width: 1160px) {
  .range-li {
    margin-bottom: 0px;
    margin-right: 10px;
  }
}
.range-li > input {
  margin-right: 10px;
}
.setting-title {
  font-family: NanumBarunGothicOTF;
  font-size: 18px;
  line-height: 2.5;
  margin-bottom: 26px;
}
</style>