<template>
  <div class="cart-content">
    <h1 class="cart-title">장바구니</h1>
    <div>
      <p v-if="gameList.length === 0">EMPTY</p>
      <ul class="cart-list">
        <li
          v-for="({ checked, img, title, ageLimit, price }, index) in gameList"
          :key="index"
        >
          <div
            class="cart-checkbox"
            @click.prevent="gameList[index].checked = !gameList[index].checked"
          >
            <img
              class="cart-checkbox-img"
              src="@/images/checkbox-checked-img@2x.png"
              v-if="checked"
            />
            <div class="cart-checkbox-no-img" v-else></div>
          </div>
          <img
            class="liimg"
            :src="img"
            @click.prevent="CHANGE_MARKET_COMPONENT('game')"
          />

          <div class="cart-des-box">
            <h3 class="cart-box-title">{{ title }}</h3>
            <p class="cart-box-descript">{{ descript[0] }}</p>
          </div>
          <div class="cart-end-box">
            <div class="cart-delete-button" @click="gameList.splice(index, 1)">
              &times;
            </div>
            <p class="cart-item-age-limit">{{ ageLimit }}</p>
            <p class="cart-item-price">{{ price }}</p>
          </div>
        </li>
      </ul>
      <div class="cart-total" v-if="gameList.length !== 0">
        <p class="cart-total-count">
          총
          <span class="cartblue"
            >{{ gameList.filter(({ checked }) => checked).length }}개</span
          >의 상품 선택
        </p>
        <p class="total-price">
          <span class="total-price-tag">총 금액</span>
          <span class="total-price-cost">{{ totalAmount }}원</span>
        </p>
        <div class="total-price-num"></div>
      </div>
      <div class="cart-last" v-if="gameList.length !== 0">
        <h2 class="cart-last-tag">결제하기</h2>
        <div class="cart-last-img" @click="showImpossible">
          <img src="@/images/kakaopay-btn@2x.png" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      descript: [`제목 : Witcher 3 분류 : 액션, 사시 가격 : 43,000 원`],
      gameList: [
        {
          checked: false,
          img: require("@/images/50.jpg"),
          title: "Monster Hunt World 3",
          ageLimit: "15세 이상 가능",
          price: "43000",
        },
        {
          checked: false,
          img: require("@/images/51.jpg"),
          title: "Monster Hunt World 3",
          ageLimit: "15세 이상 가능",
          price: "21000",
        },
        {
          checked: false,
          img: require("@/images/52.jpg"),
          title: "Monster Hunt World 3",
          ageLimit: "15세 이상 가능",
          price: "36000",
        },
        {
          checked: false,
          img: require("@/images/53.jpg"),
          title: "Monster Hunt World 3",
          ageLimit: "15세 이상 가능",
          price: "13000",
        },
      ],
    };
  },
  computed: {
    totalAmount() {
      return this.gameList
        .filter(({ checked }) => checked)
        .reduce((acc, { price }) => acc + parseInt(price), 0);
    },
  },
  methods: {
    ...mapMutations(["CHANGE_MARKET_COMPONENT"]),
    showImpossible() {
      alert("테스트 환경에서 사용할 수 없습니다.");
    },
  },
};
</script>
<style>
.cart-content {
  min-height: calc(100vh - 221px);
}
.cart-content h1,
.cart-content h2,
.cart-content h3 {
  font-weight: normal;
}
.car-content-top {
  height: 153px;
}
.cart-title {
  width: 115px;
  height: 37px;
  font-family: NanumBarunGothicOTF;
  font-size: 32px;
  text-align: left;
}
.cart-list {
  list-style: none;
}
.cart-content li {
  height: 197px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}
.cart-content li .cart-checkbox {
  top: 100px;
  width: 28px;
  height: 28px;
  cursor: pointer;
  margin-right: 10px;
}
.cart-checkbox-img {
  width: 28px;
  height: 28px;
  object-fit: contain;
}
.cart-checkbox-no-img {
  width: 28px;
  height: 28px;
  border: rgb(195, 195, 195) 0.5px solid;
}
.cart-content .liimg {
  width: 305px;
  height: 197px;
  cursor: pointer;
  margin-right: 10px;
}
.cart-des-box {
  width: 400px;
  height: 197px;
}
.cart-box-title {
  height: 32px;
  font-family: NanumBarunGothicLightOTF;
  font-size: 28px;
}
.cart-box-descript {
  width: 386px;
  font-family: NanumBarunGothicLightOTF;
  font-size: 14px;
  font-weight: 300;
  color: #6f6f6f;
}
.cart-end-box {
  width: 121px;
  height: 197px;
}
.cart-delete-button {
  margin-left: 106.7px;
  color: #c2c2c2;
  font-size: 30px;
  cursor: pointer;
}
.cart-item-age-limit {
  height: 19px;
  font-family: NanumBarunGothicOTF;
  font-size: 16px;
  font-weight: bold;
  color: #4b74ff;
}
.cart-item-price {
  margin-top: 46px;
  width: 122px;
  height: 32px;
  font-family: NanumBarunGothicOTF;
  font-size: 28px;
}
.cart-total {
  border-top: solid 0.5px #e2e2e2;
  border-bottom: solid 0.5px #e2e2e2;
  text-align: center;
  padding: 20px;
}
.cart-total-count {
  height: 23px;
  font-family: NanumBarunGothicLightOTF;
  font-size: 20px;
  margin-bottom: 10px;
}
.cartblue {
  color: #4b74ff;
}
.total-price-tag {
  font-family: NanumBarunGothicOTF;
  font-size: 20px;
}
.total-price-cost {
  margin-left: 20px;
  height: 37px;
  font-family: NanumBarunGothicOTF;
  font-size: 32px;
  font-weight: bold;
  text-align: center;
}
.cart-last {
  text-align: center;
}
.cart-last-tag {
  font-family: NanumBarunGothicOTF;
  font-size: 32px;
  margin: 20px;
}
.cart-last-img img {
  width: 315px;
  height: 70px;
  object-fit: contain;
  cursor: pointer;
  margin-right: 20px;
  margin-bottom: 20px;
}
</style>
