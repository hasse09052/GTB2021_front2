<template>
  <div class="list">
    <Header v-bind:name="this.$store.state.user_name" v-bind:image="this.$store.state.image_url"/>
    <div class="bg">
      <main class="container">
        <div class="searchWrap">
          <input type="text" placeholder="検索">
          <button class="searchWrap__button"></button>
        </div>

        <ul class="list">
          <Card title="日焼け止め"/>
          <Card title="スマホ"/>
        </ul>

        <p>{{this.$store.state.token}}</p>

      </main>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
import Card from "../components/Card";
import Loading from "../components/Loading";
//import axios from 'axios';

export default {
  data() {
    return {
      loading: false,
    }
  },
  components: {
    Header,
    Card,
    Loading,
  }
}
</script>

<style scoped lang="scss">
.searchWrap {
  position: relative;

  &__button {
    content: "";
    width: 32px;
    height: 32px;
    border: none;
    background: url("../assets/icon_search.png");
    background-size: cover;
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    transition: 0.3s ease-out;
    &:hover {
      opacity: 0.7;
      cursor: pointer;
    }
    @media only screen and (max-width: 767px) {
      width: 20px;
      height: 20px;
    }
  }

  input {
    width: 100%;
    height: 60px;
    padding: 16px 66px 16px 20px;
    border: 2px solid #E6E6E6;
    border-radius: 12px;
    font-size: 24px;
    font-family: 'Noto Sans JP', 'Roboto', sans-serif;
    &:focus {
      border: 2px solid #818189;
      outline: 0;
    }
    @media only screen and (max-width: 767px) {
      height: 48px;
      font-size: 14px;
    }
  }
}

.list {
  padding: 0;
  margin: 48px 0 0;
  list-style: none;
}
</style>