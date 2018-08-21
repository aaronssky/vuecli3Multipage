<template>
  <div id="app">
    <div id="nav" @click='change'>
    {{msg}}
    </div>
  </div>
</template>

<script>
export default {
  name: "vueDemo",
  data () {
    return {
      msg: 'promoter welcome',
    }
  },
  mounted () {
    console.log('组件初始化')
  //   var a = new Promise(function(resoleve,reject){
  //  setTimeout(function(){resoleve()},2000)
  // })
  // a.then(function(){alert(44)})
    
  },
  methods: {
    change () {
      this.msg = 44344
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  color: red;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
