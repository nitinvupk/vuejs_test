<template>
  <div class="w-50 mx-auto table-responsive">
    <b-table
      :striped="striped"
      :bordered="bordered"
      :borderless="borderless"
      :outlined="outlined"
      :small="small"
      :hover="hover"
      :dark="dark"
      :fixed="fixed"
      :foot-clone="footClone"
      :items="items"
      :tbody-tr-class="tbClass"
    >
      <template slot="d1" slot-scope="row">
        <div class="square-box" v-if="row.value === '+'">
        </div>
        <div v-if="row.value === '*'">
          *
        </div>
      </template>
      <template slot="d2" slot-scope="row">
        <div class="square-box" v-if="row.value === '+'">
        </div>
        <div v-if="row.value === '*'">
          *
        </div>
      </template>
      <template slot="d3" slot-scope="row">
        <div class="square-box" v-if="row.value === '+'">
        </div>
        <div v-if="row.value === '*'">
          *
        </div>
      </template>
      <template slot="d4" slot-scope="row">
        <div class="square-box" v-if="row.value === '+'">
        </div>
        <div v-if="row.value === '*'">
          *
        </div>
      </template>
      <template slot="d5" slot-scope="row">
        <div class="square-box" v-if="row.value === '+'">
        </div>
        <div v-if="row.value === '*'">
          *
        </div>
      </template>
      <template slot="d6" slot-scope="row">
        <div class="square-box" v-if="row.value === '+'">
        </div>
        <div v-if="row.value === '*'">
          *
        </div>
      </template>
      <template slot="d7" slot-scope="row">
        <div class="square-box" v-if="row.value === '+'">
        </div>
        <div v-if="row.value === '*'">
          *
        </div>
      </template>
      <template slot="d8" slot-scope="row">
        <div class="square-box" v-if="row.value === '+'">
        </div>
        <div v-if="row.value === '*'">
          *
        </div>
      </template>
      <template slot="d9" slot-scope="row">
        <div class="square-box" v-if="row.value === '+'">
        </div>
        <div v-if="row.value === '*'">
          *
        </div>
      </template>
      <template slot="d10" slot-scope="row">
        <div class="square-box" v-if="row.value === '+'">
        </div>
        <div v-if="row.value === '*'">
          *
        </div>
      </template>
    </b-table>
    <h1 class="text-white">{{ name }}</h1>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)

Vue.prototype.$http = axios;

export default {
  data () {
    return {
      loading: false,
      data: null,
      error: null,
      startYear: -1000,
      endYear: 2019,
      items: [],
      striped: false,
      bordered: false,
      borderless: true,
      outlined: false,
      small: false,
      hover: false,
      dark: false,
      fixed: false,
      footClone: false,
      name: "",
      currentNoOfDecades: 0,
      remaningNoOfDecades: 0,
      tbClass: "text-white"

    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.loading = true
      const noOfCentury = (this.endYear - this.startYear)/100 //3.18
      const splitCentury = noOfCentury.toString().split('.')
      let noOfRow = +splitCentury[0]
      let noOfCol = 12
      const remaningYear = +splitCentury[1]
      const splitDecades = (remaningYear/10).toString().split('.')
      let noOfDecades = +splitDecades[0]
      if (+splitDecades[0] > 0) {
        noOfDecades += 1
      }

      if (remaningYear > 0) {
        noOfRow += 1
      }

      this.$http.get(`https://dev-util.edyst.com/challenge/person/${this.startYear}?end_yob=${this.endYear}`)
        .then(({data}) => {
          Array(noOfRow).fill().map(() => {
            this.startYear = this.startYear === 0 ? 1 : this.startYear
            const isPositive = this.startYear > 0
            const endYear = this.startYear + 99
            const isLastRow = endYear > this.endYear
            this.items.push({
              start: `${isPositive ? this.startYear : (this.startYear * -1)} ${isPositive ? 'AD' : 'BC'}` ,
              d1: isLastRow ? noOfDecades >= 1 ? '*' : '' : '*',
              d2: isLastRow ? noOfDecades >= 2 ? '*' : '' : '*',
              d3: isLastRow ? noOfDecades >= 3 ? '*' : '' : '*',
              d4: isLastRow ? noOfDecades >= 4 ? '*' : '' : '*',
              d5: isLastRow ? noOfDecades >= 5 ? '*' : '' : '*',
              d6: isLastRow ? noOfDecades >= 6 ? '*' : '' : '*',
              d7: isLastRow ? noOfDecades >= 7 ? '*' : '' : '*',
              d8: isLastRow ? noOfDecades >= 8 ? '*' : '' : '*',
              d9: isLastRow ? noOfDecades >= 9 ? '*' : '' : '*',
              d10: isLastRow ? noOfDecades > 10 ? '*' : '' : '*',
              end: `${isLastRow ? this.endYear : isPositive ? endYear : (endYear * -1)} ${isPositive ? 'AD' : 'BC'}`
            })
            this.startYear += 100
          })
          this.updateData(data)
          this.loading = false
        })
        .catch(() => this.isLoading = false)
    },
    updateData (data) {
      if (data.length) {
        let that = this
        const timeline = data.shift()
        let splitTimeline = ((timeline.yod -timeline.yob)/10).toString().split(".")
        if (timeline.yob < 0) {
          splitTimeline = (((timeline.yob * -1) - (timeline.yod * -1))/10).toString().split(".")
        }
        let noOfDecades = +splitTimeline[0]
        if (splitTimeline[1]) {
          noOfDecades += 1
        }
        setTimeout(function () {
          const newItems = []
          that.items.map(item => {
            let startIndex = 0
            let decadeStart = +item.start.split(" ")[0]
            let decadeEnd = +item.end.split(" ")[0]
            if (decadeStart > decadeEnd) {
              decadeStart *= -1
              decadeEnd *= -1
            }

            Array(10).fill().map((value, index) => {
              if (item[`d${index + 1}`] && item[`d${index + 1}`].length) {
                item[`d${index + 1}`] = "*"
              }
            })

            if ((decadeStart <= timeline.yob) && (timeline.yob <= decadeEnd)) {
              decadeStart -= 1
              Array(10).fill().map((value, index) => {
                if ((decadeStart) <= timeline.yob) {
                  decadeStart += 10
                  startIndex = index + 1
                }
              })
            }

            if (startIndex) {
              that.currentNoOfDecades = 11 - startIndex
              that.remaningNoOfDecades = noOfDecades - that.currentNoOfDecades
              Array(that.currentNoOfDecades).fill().map(() => {
                if (item[`d${startIndex}`] && item[`d${startIndex}`].length) {
                  item[`d${startIndex}`] = "+"
                }
                startIndex += 1
              })
            } else if (that.remaningNoOfDecades > 0) {
              startIndex = 1
              Array(that.remaningNoOfDecades).fill().map(() => {
                if (item[`d${startIndex}`] && item[`d${startIndex}`].length) {
                  item[`d${startIndex}`] = "+"
                }
                startIndex += 1
              })
              that.remaningNoOfDecades = 0
            }
            that.name = timeline.name
            that.yob = timeline.yob
            that.yod = timeline.yod
            newItems.push(item)
          })
          that.items = newItems
          that.updateData(data)
        }, 2000)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
table > thead {
  display:none !important;
}
.square-box {
  background: #F1C239;
  height:12px;
  max-width: 12px;
  margin:0 auto;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
