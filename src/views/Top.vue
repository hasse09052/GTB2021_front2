<template>
  <div class="top">
    <header class="header">
      <button @click="login" class="header__button">Googleでログイン</button>
    </header>
    <div class="bg">
      <figure class="logoWrap"><img src="../assets/img_logo.png" alt=""></figure>
      <h1 class="catchphrase">朝の準備を<br>かんたんに、正確に</h1>
    </div>
    <Loading v-if="loading"/>
  </div>
</template>

<script>
import Header from "../components/Header";
import Loading from "../components/Loading";
import axios from 'axios';

export default {
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    login: function() {
      this.loading = true;
      axios
        .get('http://118.27.2.127/api/login')
        .then(response => {
          location.href = response.data;
        });
    },
  },
  components: {
    Header,
    Loading,
  }
}
</script>

<style scoped lang="scss">
.header {
  justify-content: flex-end;
  &__button {
    width: 217px;
    border: none;
    font-size: 18px;
    &:hover {
      cursor: pointer;
    }
    @media only screen and (max-width: 767px) {
      font-size: 16px;
    }
  }
}

.logoWrap {
  margin: 0;
  img {
    display: block;
    margin: 0 auto;
    padding-top: 40px;
    width: 280px;
    @media only screen and (max-width: 767px) {
      width: 120px;
    }
    
  }
}

.catchphrase {
  font-size: 48px;
  color: #333338;
  text-align: center;
  @media only screen and (max-width: 767px) {
    font-size: 24px;
  }
}
</style>
