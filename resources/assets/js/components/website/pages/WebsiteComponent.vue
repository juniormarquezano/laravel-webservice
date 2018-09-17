<template>
  <div>
    <header-component></header-component>
    
    <div class="container">
      <router-view></router-view>
    </div>

    <footer-component></footer-component>
    
  </div>
</template>

<script>
import FooterComponent from '../layouts/Footer'
import HeaderComponent from '../layouts/Header'
export default {
  components: { FooterComponent, HeaderComponent }
}
</script>
