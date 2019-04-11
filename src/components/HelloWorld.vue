<template>
  <h1>Vue.js</h1>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$http = axios;

export default {
  data () {
    return {
      loading: false,
      data: null,
      error: null
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.loading = true
      this.$http.get('https://dev-util.edyst.com/challenge/person/-1100?end_yob=-1000')
        .then(({data}) => {
          this.data = data
          this.loading = false
        })
        .catch(() => this.isLoading = false)
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
