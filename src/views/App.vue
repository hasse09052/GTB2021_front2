<template>
  <div class="applist">
    <Header v-bind:name="this.$store.state.user_name" v-bind:image="this.$store.state.image_url"/>
    <div class="bg">
      <main class="container">
        <div class="searchWrap">
          <input type="text" placeholder="検索" v-model="search" @input="filter">
        </div>

        <div class="loading">
          <span class="gauge-loader"></span>
        </div>

        <ul class="list">
          <Card v-for="item in check_itemlist" :key="item.id" v-bind:title="item.item_name" v-bind:type="item.notification_type_id" v-bind:check="item.default_check_flag"/>
          <Card v-for="item in nocheck_itemlist" :key="item.id" v-bind:title="item.item_name" v-bind:type="item.notification_type_id" v-bind:check="item.default_check_flag"/>
          <!-- <Card v-for="item in nocheck_itemlist" :key="item" v-bind:title="item.item_name"/> -->
        </ul>

        <!-- 
        <transition-group  class="list" name="list" tag="ul">
          <Card v-for="item in showlist" :key="item" v-bind:title="item"/>
        </transition-group>
        -->

        <transition>
          <figure class="emptyImg" v-if="isEmpty"><img src="../assets/img_empty.png" alt="持ちものが見つかりませんでした"></figure>
        </transition>

      </main>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
import Card from "../components/Card";
import Loading from "../components/Loading";
import axios from 'axios';

export default {
  data() {
    return {
      search: "",
      loading: false,
      //itemlist: ["test", "test2", "日焼け止め", "スマホ"],
      check_itemlist: [],
      nocheck_itemlist: [],
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
    },
    getUserInfo: function() {
      axios
        .get(
          'http://118.27.2.127/api/user', {
          headers: {
            Authorization: `Bearer ${this.$route.query.token}`,
          },
        })
        .then(response => {
          //const token = response.data.api_token;
          const name = response.data.user_name;
          const url = response.data.avatar_url;
          //this.$store.commit('setToken', token);
          this.$store.commit('setName', name);
          this.$store.commit('setImageUrl', url);
        });
    },
    getItemInfo: function() {
      axios
        .get(
          'http://118.27.2.127/api/item', {
          headers: {
            Authorization: `Bearer ${this.$route.query.token}`,
          },
        })
        .then(response => {
          console.log("アイテム取得完了");
          console.log(response.data);
          this.check_itemlist = response.data.user_items;
          this.nocheck_itemlist = response.data.other;
        });
    },
  },
  created: function() {
    if(this.$route.query.status === "0") {
      console.log("トークンセット");
      this.$store.commit('setToken', this.$route.query.token);
    }
    this.getUserInfo();
    this.getItemInfo();
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

.v-enter-active, .v-leave-active {
  transition: opacity 1s;
}

.v-enter, .v-leave-to {
  opacity: 0;
}

// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100%;
  
  background: rgba($color: #ffffff, $alpha: 0.2);
  position: fixed;
  top: 0;
  left: 0;
  transform: scale(2);
}

@-moz-keyframes gauge-loader {
  0% {
    -moz-transform: rotate(-50deg);
    transform: rotate(-50deg);
  }
  10% {
    -moz-transform: rotate(20deg);
    transform: rotate(20deg);
  }
  20% {
    -moz-transform: rotate(60deg);
    transform: rotate(60deg);
  }
  24% {
    -moz-transform: rotate(60deg);
    transform: rotate(60deg);
  }
  40% {
    -moz-transform: rotate(-20deg);
    transform: rotate(-20deg);
  }
  54% {
    -moz-transform: rotate(70deg);
    transform: rotate(70deg);
  }
  56% {
    -moz-transform: rotate(78deg);
    transform: rotate(78deg);
  }
  58% {
    -moz-transform: rotate(73deg);
    transform: rotate(73deg);
  }
  60% {
    -moz-transform: rotate(75deg);
    transform: rotate(75deg);
  }
  62% {
    -moz-transform: rotate(70deg);
    transform: rotate(70deg);
  }
  70% {
    -moz-transform: rotate(-20deg);
    transform: rotate(-20deg);
  }
  80% {
    -moz-transform: rotate(20deg);
    transform: rotate(20deg);
  }
  83% {
    -moz-transform: rotate(25deg);
    transform: rotate(25deg);
  }
  86% {
    -moz-transform: rotate(20deg);
    transform: rotate(20deg);
  }
  89% {
    -moz-transform: rotate(25deg);
    transform: rotate(25deg);
  }
  100% {
    -moz-transform: rotate(-50deg);
    transform: rotate(-50deg);
  }
}
@-webkit-keyframes gauge-loader {
  0% {
    -webkit-transform: rotate(-50deg);
    transform: rotate(-50deg);
  }
  10% {
    -webkit-transform: rotate(20deg);
    transform: rotate(20deg);
  }
  20% {
    -webkit-transform: rotate(60deg);
    transform: rotate(60deg);
  }
  24% {
    -webkit-transform: rotate(60deg);
    transform: rotate(60deg);
  }
  40% {
    -webkit-transform: rotate(-20deg);
    transform: rotate(-20deg);
  }
  54% {
    -webkit-transform: rotate(70deg);
    transform: rotate(70deg);
  }
  56% {
    -webkit-transform: rotate(78deg);
    transform: rotate(78deg);
  }
  58% {
    -webkit-transform: rotate(73deg);
    transform: rotate(73deg);
  }
  60% {
    -webkit-transform: rotate(75deg);
    transform: rotate(75deg);
  }
  62% {
    -webkit-transform: rotate(70deg);
    transform: rotate(70deg);
  }
  70% {
    -webkit-transform: rotate(-20deg);
    transform: rotate(-20deg);
  }
  80% {
    -webkit-transform: rotate(20deg);
    transform: rotate(20deg);
  }
  83% {
    -webkit-transform: rotate(25deg);
    transform: rotate(25deg);
  }
  86% {
    -webkit-transform: rotate(20deg);
    transform: rotate(20deg);
  }
  89% {
    -webkit-transform: rotate(25deg);
    transform: rotate(25deg);
  }
  100% {
    -webkit-transform: rotate(-50deg);
    transform: rotate(-50deg);
  }
}
@keyframes gauge-loader {
  0% {
    -moz-transform: rotate(-50deg);
    -ms-transform: rotate(-50deg);
    -webkit-transform: rotate(-50deg);
    transform: rotate(-50deg);
  }
  10% {
    -moz-transform: rotate(20deg);
    -ms-transform: rotate(20deg);
    -webkit-transform: rotate(20deg);
    transform: rotate(20deg);
  }
  20% {
    -moz-transform: rotate(60deg);
    -ms-transform: rotate(60deg);
    -webkit-transform: rotate(60deg);
    transform: rotate(60deg);
  }
  24% {
    -moz-transform: rotate(60deg);
    -ms-transform: rotate(60deg);
    -webkit-transform: rotate(60deg);
    transform: rotate(60deg);
  }
  40% {
    -moz-transform: rotate(-20deg);
    -ms-transform: rotate(-20deg);
    -webkit-transform: rotate(-20deg);
    transform: rotate(-20deg);
  }
  54% {
    -moz-transform: rotate(70deg);
    -ms-transform: rotate(70deg);
    -webkit-transform: rotate(70deg);
    transform: rotate(70deg);
  }
  56% {
    -moz-transform: rotate(78deg);
    -ms-transform: rotate(78deg);
    -webkit-transform: rotate(78deg);
    transform: rotate(78deg);
  }
  58% {
    -moz-transform: rotate(73deg);
    -ms-transform: rotate(73deg);
    -webkit-transform: rotate(73deg);
    transform: rotate(73deg);
  }
  60% {
    -moz-transform: rotate(75deg);
    -ms-transform: rotate(75deg);
    -webkit-transform: rotate(75deg);
    transform: rotate(75deg);
  }
  62% {
    -moz-transform: rotate(70deg);
    -ms-transform: rotate(70deg);
    -webkit-transform: rotate(70deg);
    transform: rotate(70deg);
  }
  70% {
    -moz-transform: rotate(-20deg);
    -ms-transform: rotate(-20deg);
    -webkit-transform: rotate(-20deg);
    transform: rotate(-20deg);
  }
  80% {
    -moz-transform: rotate(20deg);
    -ms-transform: rotate(20deg);
    -webkit-transform: rotate(20deg);
    transform: rotate(20deg);
  }
  83% {
    -moz-transform: rotate(25deg);
    -ms-transform: rotate(25deg);
    -webkit-transform: rotate(25deg);
    transform: rotate(25deg);
  }
  86% {
    -moz-transform: rotate(20deg);
    -ms-transform: rotate(20deg);
    -webkit-transform: rotate(20deg);
    transform: rotate(20deg);
  }
  89% {
    -moz-transform: rotate(25deg);
    -ms-transform: rotate(25deg);
    -webkit-transform: rotate(25deg);
    transform: rotate(25deg);
  }
  100% {
    -moz-transform: rotate(-50deg);
    -ms-transform: rotate(-50deg);
    -webkit-transform: rotate(-50deg);
    transform: rotate(-50deg);
  }
}
/* :not(:required) hides this rule from IE9 and below */
.gauge-loader:not(:required) {
  background: #598051;
  -moz-border-radius-topleft: 32px;
  -webkit-border-top-left-radius: 32px;
  border-top-left-radius: 32px;
  -moz-border-radius-topright: 32px;
  -webkit-border-top-right-radius: 32px;
  border-top-right-radius: 32px;
  display: inline-block;
  width: 64px;
  height: 32px;
  overflow: hidden;
  position: relative;
  text-indent: -9999px;
}
.gauge-loader:not(:required)::before {
  -moz-animation: gauge-loader 4000ms infinite ease;
  -webkit-animation: gauge-loader 4000ms infinite ease;
  animation: gauge-loader 4000ms infinite ease;
  background: white;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  content: '';
  position: absolute;
  left: 30px;
  top: 5.33333px;
  width: 4px;
  height: 26.66667px;
  -moz-transform-origin: 50% 100%;
  -ms-transform-origin: 50% 100%;
  -webkit-transform-origin: 50% 100%;
  transform-origin: 50% 100%;
}
.gauge-loader:not(:required)::after {
  content: '';
  background: white;
  -moz-border-radius: 8px;
  -webkit-border-radius: 8px;
  border-radius: 8px;
  position: absolute;
  left: 25.6px;
  top: 25.6px;
  width: 12.8px;
  height: 12.8px;
}
</style>