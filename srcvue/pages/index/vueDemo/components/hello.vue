<template>
<div class="hello">
  {{msg}}
</div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'Hello',
  data () {
    return {
      msg: 'hellp'
    }
  },
  components: {
  },
  mounted () {
    console.log(123123)
  },
  methods: {
  }
}
</script>

<style lang='scss' scoped>
  body{
    .hello{
      color: blue;
    }
  }
  
</style>
