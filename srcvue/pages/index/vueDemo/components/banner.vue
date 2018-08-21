<template>
<div class="banner">
  <div class="swiper-container section-banner">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item) in albums" :key='item.url'>
          <img class="image" :src="item.url"/>
        </div>
      </div>
      <div class="swiper-pagination"></div>
  </div>
</div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'banner',
  data () {
    return {
      msg: 'hellp',
      albums: []
    }
  },
  components: {
  },
  mounted () {
    console.log('init banner')
    this.albums = [{
      url:'https://ykz-cdn1-https.jinxidao.com/6hotelId_a63427f0805303b869a88319d9f00f73.jpeg?imageMogr2/thumbnail/750x/gravity/Center/crop/750x400|imageView2/2/interlace/1/q/85/'
    },{
      url: 'https://ykz-cdn1-https.jinxidao.com/6hotelId_98c7120f5cb4d9c104f784042b8ba38c.jpeg?imageMogr2/thumbnail/750x/gravity/Center/crop/750x400|imageView2/2/interlace/1/q/85/'
    },{
      url: 'https://ykz-cdn1-https.jinxidao.com/6hotelId_845d4b3f96989a160501f2732f030670.jpeg?imageMogr2/thumbnail/750x/gravity/Center/crop/750x400|imageView2/2/interlace/1/q/85/'
    }];

    this.$nextTick(() => {
      this.initSwiper()
    });
  },
  methods: {
    initSwiper () {
      window.mySwiper = new Swiper('.swiper-container.section-banner', {
        pagination: '.swiper-pagination',
        loop: true,
        autoplay: 3000
      });
    }
  }
}
</script>

<style lang='scss' scoped>
  .banner{
    .top-banner{
      .item{
        background-color: red;
      }
    }
  }
</style>
