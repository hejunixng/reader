<template>
  <div id="app">
   <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: 'App',
  components: {
    
  },
  mounted(){
    
    
  }
}

// rem
  document.addEventListener('DOMContentLoaded',()=>{
    const html = document.querySelector('html');
    let fontSize  = window.innerWidth / 10;
    //屏幕宽度分成10分 
  // 设置字体最大值
  fontSize = fontSize > 50 ? 50 : fontSize;
    html.style.fontSize = fontSize + 'px';
    
  })
</script>

<style lang="scss" scoped>

#app{

  width: 100%;
  height: 100%;
  background: #7d8188;
  overflow: hidden;
}

</style>>


