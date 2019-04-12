<template>
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
  />
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
      startYear: 1900,
      endYear: 2025,
      items: [],
      striped: false,
      bordered: false,
      borderless: true,
      outlined: false,
      small: false,
      hover: false,
      dark: false,
      fixed: false,
      footClone: false
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
            const endYear = this.startYear + 100
            const isLastRow = endYear > this.endYear
            console.log(isLastRow, noOfDecades)
            this.items.push({
              strat: `${(this.startYear + 1)} AD` ,
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
              end: `${(isLastRow ? this.endYear : endYear)} AD`
            })
            this.startYear += 100
          })
          this.updateData(1, data)
          this.loading = false
        })
        .catch(() => this.isLoading = false)
    },
    updateData (i, data) {
      let that = this
      const item = data.shift()
      setTimeout(function () {
        i++
        if (i < 10) {
          that.updateData(i, data);
        }
      }, 3000)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
