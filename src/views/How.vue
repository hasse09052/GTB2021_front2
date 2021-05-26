<template>
  <div class="how">
    <header class="header">
    </header>

    <div class="bg">
      <main class="container">
        <div class="titleWrap">
          <h1 class="title">使いかた</h1>
          <router-link to="/setting" class="linkButton">持ち物を登録する</router-link>
        </div>
        <ol class="imageList">
          <li class="imageList__imgWrap"><img src="../assets/img_step1.png" alt=""></li>
          <li class="imageList__imgWrap"><img src="../assets/img_step2.png" alt=""></li>
          <li class="imageList__imgWrap"><img src="../assets/img_step3.png" alt=""></li>
        </ol>
        <router-link to="/setting" class="linkButton -SP">持ち物を登録する</router-link>
      </main>
    </div>
  </div>
</template>

<script>

</script>

<style scoped lang="scss">
.bg {
  padding: 48px 120px;
  @media only screen and (max-width: 767px) {
    padding: 18px 24px 40px;
  }
}

.container {
  width: 1200px;
  padding: 0;
  @media only screen and (max-width: 767px) {
    width: auto;
  }
}

.titleWrap {
  position: relative;
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

.linkButton {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 226px;
  height: 58px;
  margin: 0 auto 60px;
  border-radius: 100px;
  background: #598051;
  color: #fff;
  font-size: 18px;
  font-weight: bolder;
  text-decoration: none;
  transition: 0.3s ease-out;
  position: absolute;
  top: 0;
  right: 0;
  &:hover {
    opacity: 0.8;
  }
  @media only screen and (max-width: 767px) {
    width: 184px;
    height: 39px;
    margin: 0 auto 40px;
    font-size: 16px;
    position: relative;
  }
  &.-SP {
    display: none;
    @media only screen and (max-width: 767px) {
      display: flex;
      margin-bottom: 0;
    }
  }
}

.imageList {
  display: flex;
  justify-content: space-between;
  padding: 0;
  margin: 0 auto;
  list-style: none;

  @media only screen and (max-width: 767px) {
    display: block;
  }

  &__imgWrap {
    flex: 0 1 378px;
    border-radius: 20px;
    box-shadow: 0 0 4px rgba($color: #333338, $alpha: 0.1);
    &:nth-child(2) {
      margin: 0 33px;
      @media only screen and (max-width: 767px) {
        margin: 0 0 40px;
      }
    }
    @media only screen and (max-width: 767px) {
      border-radius: 18px;
      margin: 0 0 40px;
    }
  }
}
</style>
