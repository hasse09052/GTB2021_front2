<template>
  <div class="top">
    <header class="header">
      <button @click="login" class="header__button">Googleでログイン</button>
    </header>
    <div class="bg">
      <div class="eyecatch">
        <img src="../assets/img_bg.png" alt="">
        <figure class="logoWrap">
          <img src="../assets/img_logo.png" alt="">
          <h1 class="catchphrase">朝の準備を<br>かんたんに、正確に</h1>
        </figure>
      </div>

      <img class="separator" src="../assets/img_separator.png" alt="">
      <div class="features">
        <div class="feature-description">
          <img src="../assets/img_clock.png" alt="">
          <h2>毎日あなた専用の持ちものリスト</h2>
          <p>持ちものを毎朝カスタマイズして通知。<br>あなたが絶対に持っていくものはなんですか？</p>
        </div>
        <div class="feature-description">
          <img src="../assets/img_rain.png" alt="">
          <h2>雨の日に忘れがちな折りたたみ傘</h2>
          <p>天気に応じて必要になる傘や日焼け止め。<br>その日の天気予報から、<br>Prepasyが自動で持ちものリストに追加します。</p>
        </div>
      </div>
      <img class="separator" src="../assets/img_separator.png" alt="">
      <div class="container">
        <ol class="imageList">
          <li class="imageList__imgWrap"><img src="../assets/img_step1.png" alt="忘れがちな持ち物を登録"></li>
          <li class="imageList__imgWrap"><img src="../assets/img_step2.png" alt="寝ているあいだに、明日必要なものをリストアップ"></li>
          <li class="imageList__imgWrap"><img src="../assets/img_step3.png" alt="朝7時にLINEでお知らせ！"></li>
        </ol>
      </div>
      <button @click="login" class="header__button -SP">Googleでログイン</button>
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
        .get('https://gtb2021teamg.mydns.jp/api/login')
        .then(response => {
          location.href = response.data;
        })
        .finally(() => {
          this.loading = false;
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
    &.-SP {
      display: none;
      @media only screen and (max-width: 767px) {
        display: flex;
        margin: 0 auto;
      }
    }
  }
}

.bg {
  @media only screen and (max-width: 767px) {
    padding-bottom: 60px;
  }
}

.eyecatch {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1200px;
  margin: 0 auto;
  padding-top: 40px;
  @media only screen and (max-width: 767px) {
    width: 320px;
    flex-direction: column-reverse;
  }

  img {
    width: 650px;
    @media only screen and (max-width: 767px) {
      width: 240px;
    }
  }
  .logoWrap {
    margin: 0;
    width: 560px;
    img {
      display: block;
      margin: 0 auto;
      width: 280px;
      @media only screen and (max-width: 767px) {
        width: 120px;
      }
    }
    @media only screen and (max-width: 767px) {
      width: 240px;
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

.container {
  width: 1200px;
  padding: 0;
  @media only screen and (max-width: 767px) {
    width: auto;
  }
  .title {
    margin: 0 0 40px;
    font-size: 36px;
    text-align: center;
    @media only screen and (max-width: 767px) {
      margin: 0 0 16px;
      font-size: 24px;
    }
  }
}

.separator {
  display: block;
  margin: 80px auto;
  padding: 0;
  height: 60px;
  @media only screen and (max-width: 767px) {
    height: 32px;
    margin: 60px auto;
  }
}

.features {
  display: flex;
  justify-content: space-between;
  width: 1200px;
  margin: 0 auto; 
  @media only screen and (max-width: 767px) {
    width: 320px;
    display: block;
  }
  
  .feature-description {
    width: 520px;
    @media only screen and (max-width: 767px) {
      width: 320px;
      margin: 0 auto;
    }
    img {
      width: 100%;
    }
    h2 {
      margin-top: 24px;
      margin-bottom: 12px;
      font-size: 20px; 
    }
    p {
      margin: 0;
      font-size: 14px;
    }

    &:nth-child(1) {
      margin-bottom: 60px;
    }
  }
}

.imageList {
  display: flex;
  justify-content: space-between;
  padding: 0 0 80px 0;
  margin: 0 auto;
  list-style: none;
  @media only screen and (max-width: 767px) {
    display: block;
    padding: 0 0 60px 0;
    margin: 0 auto;
  }

  &__imgWrap {
    flex: 0 1 378px;
    border-radius: 20px;
    box-shadow: 0 0 4px rgba($color: #333338, $alpha: 0.1);
    @media only screen and (max-width: 767px) {
      border-radius: 18px;
      margin: 0 40px;
    }

    &:nth-child(2) {
      margin: 0 33px;
      @media only screen and (max-width: 767px) {
        margin: 40px;
      }
    }
  }
}
</style>
