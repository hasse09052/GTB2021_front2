<template>
  <header class="header">
    <div class="header__userWrap">
      <figure class="header__imgWrap"><img v-bind:src="image" alt=""></figure>
      <p class="header__name">{{name}}</p>
    </div>
    <router-link to="/setting" class="header__button">設定</router-link>
  </header>
</template>

<script>
import axios from 'axios';

export default {
  data () {
    return {
      loginURL: "",
    }
  },
  props: {
    name: String,
    image: String,
  },
  mounted () {
    axios
      .get('http://118.27.2.127/api/login')
      .then(response => {
        this.loginURL = response;
      });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 112px;
  padding: 24px 120px;
  box-shadow: 0 4px 4px 0 rgba($color: #333338, $alpha: 0.1);

  @media only screen and (max-width: 767px) {
    height: 60px;
    padding: 11px 24px;
  }

  &__userWrap {
    display: flex;
    align-items: center;
  }

  &__name {
    font-size: 24px;
    @media only screen and (max-width: 767px) {
      font-size: 14px;
    }
  }

  &__imgWrap {
    margin: 0 32px 0 0;
    @media only screen and (max-width: 767px) {
      margin: 0 12px 0 0;
    }
    img {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      object-fit: cover;
      @media only screen and (max-width: 767px) {
        width: 36px;
        height: 36px;
      }
    }
  }

  &__button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 58px;
    border-radius: 100px;
    background: #598051;
    color: #fff;
    font-weight: bolder;
    text-decoration: none;
    transition: 0.3s ease-out;
    &:hover {
      opacity: 0.8;
    }
    @media only screen and (max-width: 767px) {
      width: 72px;
      height: 39px;
      font-size: 16px;
    }
  }
}
</style>
