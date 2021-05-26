<template>
  <div class="top">
    <header class="header">
      <button @click="login" class="header__button">Googleでログイン</button>
    </header>
    <div class="bg">
      <figure class="logoWrap"><img src="../assets/img_logo.png" alt=""></figure>
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
        .get('http://160.251.43.28/api/login')
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
    
  }
}
</style>
