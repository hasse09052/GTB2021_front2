<template>
  <div class="applist">
    <Header v-bind:name="this.$store.state.user_name" v-bind:image="this.$store.state.image_url"/>
    <div class="bg">
      <main class="container">
        <div class="searchWrap">
          <input type="text" placeholder="検索" v-model="search" @input="filter">
        </div>

        <ul class="list">
          <Card v-for="item in showlist" :key="item" v-bind:title="item"/>
        </ul>

        <figure class="emptyImg" v-if="isEmpty"><img src="../assets/img_empty.png" alt="持ちものが見つかりませんでした"></figure>

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
      search: "",
      loading: false,
      itemlist: ["test", "test2", "日焼け止め", "スマホ"],
      showlist: [],
      isEmpty: false,
    }
  },
  methods: {
    filter: function() {
      this.isEmpty = false
      this.showlist = this.itemlist.filter( value => {
        if(value.indexOf(this.search) === 0){
          return value
        }
      });
      
      if(this.showlist.length === 0) {
        this.isEmpty = true
      }
    }
  },
  mounted: function() {
    this.showlist = this.itemlist
  },
  /*
  watch: {
    search: function() {
      console.log(this.search)
      // let tmp = this.itemlist.filter( function(value) {
      //   if(value === this.search) {
      //     return value
      //   }
      // });
      // this.itemlist = tmp;
    }
  },
  */
  components: {
    Header,
    Card,
    Loading,
  }
}
</script>

<style scoped lang="scss">
.searchWrap {
  margin: 0 0 48px;
  position: relative;

  @media only screen and (max-width: 767px) {
    margin: 0 0 24px;
  }

  &::before {
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
  margin:  0;
  list-style: none;
}

.emptyImg {
  padding: 0;
  margin: 0 auto;
}
</style>