<template>
  <div class="my">
    <div v-if="!isLoginSuccess">
      <van-nav-bar left-arrow fixed @click-left="returnBtn" v-if="!isLogin">
        <template #left>
          <van-icon name="arrow-left" color="#000" size="24" />
        </template>
      </van-nav-bar>
      <div class="logo">
        <van-image
          width="100%"
          height="100%"
          :src="require('../assets/logo.png')"
          radius="20px"
        />
      </div>
      <div class="login" v-if="isLogin">
        <van-form @submit="onSubmit">
          <van-field
            v-model="tel"
            type="tel"
            name="phone"
            placeholder="请输入手机号码"
            label="手机号"
          />
          <van-field
            v-model="password"
            type="password"
            name="pw"
            label="密码"
            placeholder="请输入密码"
            autoComplete="true"
          />

          <van-button round block type="info" native-type="submit"
            >登 录</van-button
          >
          <div class="register" @click="inRegister">注 册 账 号</div>
        </van-form>
      </div>
      <div class="registerBox" v-else>
        <div class="registerTitle">注册账号</div>
        <van-form @submit="onRegister">
          <van-field
            v-model="retel"
            type="tel"
            name="rephone"
            placeholder="请输入手机号码"
            label="手机号"
          />
          <van-field
            v-model="repassword"
            type="password"
            name="repw"
            label="密码"
            placeholder="请输入密码"
            autoComplete="true"
          />
          <div style="margin-top: 20px">
            <van-button block class="register" native-type="submit"
              >注 册 账 号</van-button
            >
          </div>
        </van-form>
      </div>
    </div>
    <div class="myContent" v-else>
      <van-nav-bar fixed @click-right="checkout">
        <template #left>
          <van-icon name="setting-o" color="rgb(125, 125, 125)" size="24" />
        </template>
        <template #right>
          <div class="checkout">退出登录</div>
        </template>
      </van-nav-bar>

      <div class="myContentFixed">
        <div class="userMsgTop">
          <van-image
            round
            width="80px"
            height="80px"
            :src="require('../assets/my(1).png')"
          />
          <div class="userName">
            <div class="name">
              <div class="nick">{{ nowPhone }}</div>
              <div class="usermedal">
                <img
                  class="auto-img"
                  src="https://i1.douguo.com/upload/banner/3/f/8/3f9e15fab7feeab9c1bb22aacf203478.png"
                  alt=""
                />
                <span class="counttext">0枚</span>
              </div>
              <div class="lvl">LV.1</div>
            </div>
            <div class="bigFeedBtn">关注</div>
          </div>
        </div>
        <div class="userPlace">
          <div>{{ "厨娘" }}</div>
          <div>豆龄0.2岁</div>
          <div>广东广州</div>
        </div>
        <div class="introduction">
          吃货不是在吃就是在去吃的路上,没时间写签名
        </div>
        <div class="feedNav">
          <div>
            <div class="navListItem">0</div>
            <div class="navListItemBtn">关注</div>
          </div>
          <div>
            <div class="navListItem">0</div>
            <div class="navListItemBtn">粉丝</div>
          </div>
          <div>
            <div class="navListItem">0</div>
            <div class="navListItemBtn">被收藏</div>
          </div>
          <div>
            <div class="navListItem">0</div>
            <div class="navListItemBtn">被学做</div>
          </div>
          <div>
            <div class="navListItem">36</div>
            <div class="navListItemBtn">经验值</div>
          </div>
        </div>
        <div class="myList">
          <div class="listItem" v-for="(a, b) in myList" :key="b">
            <van-image width="34px" fit="contain" :src="a.icon" />
            <div class="listItemText">{{ a.title }}</div>
          </div>
        </div>
        <van-tabs
          v-model="active"
          color="#f7cc52"
          line-width="26px"
          duration="0.2"
        >
          <van-tab title="菜谱">
            <div class="myRecipes">
              <div class="myRecipesText">
                要发布点内容才能配得上我吃货的名声
              </div>
              <div class="myRecipesBtn">+ 发布菜谱</div>
            </div>
          </van-tab>
          <van-tab title="笔记">
            <div class="myRecipes">
              <div class="myRecipesText">发布内容解锁美食日历</div>
              <div class="myRecipesBtn">+ 发布笔记</div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { Notify } from "vant";
import { Toast } from "vant";
import { Dialog } from "vant";
export default {
  name: "My",
  data() {
    return {
      tel: "",
      password: "",
      retel: "",
      repassword: "",
      isLogin: true,
      isLoginSuccess: false,
      active: 0,

      nowPhone: "",

      myList: [
        {
          icon: "https://i1.douguo.com/upload/banner/d/8/c/d89d2156bbe1e2ec1b462724d1f279cc.png",
          title: "创作者中心",
        },
        {
          icon: "https://i1.douguo.com/upload/banner/2/0/4/206b7f0906d0a2287040bc5f375fd5d4.png",
          title: "草稿箱",
        },
        {
          icon: "https://i1.douguo.com/upload/banner/2/0/4/206b7f0906d0a2287040bc5f375fd5d4.png",
          title: "膳食管理",
        },
        {
          icon: "https://i1.douguo.com/upload/banner/0/d/2/0d8064011b93598e5a09fd785ff11e82.png",
          title: "厨具管理",
        },
        {
          icon: "https://i1.douguo.com/upload/banner/4/3/0/43b4f623f7760be012f62cc04c722660.png",
          title: "最近浏览",
        },
        {
          icon: "https://i1.douguo.com/upload/banner/c/7/3/c78fd47a3990c7be99bebf352df27943.png",
          title: "采购清单",
        },
        {
          icon: "https://i1.douguo.com/upload/banner/d/8/a/d82c272b192488d2d4d26b936faad58a.png",
          title: "课程·电子书",
        },
        {
          icon: "https://i1.douguo.com/upload/banner/7/c/3/7ccc0227826b8a044d2df71668d8a913.png",
          title: "钱包",
        },
        {
          icon: "https://i1.douguo.com/upload/banner/0/5/d/05addcd94537f1b8b8ea7b637a0b112d.png",
          title: "优惠券",
        },
        {
          icon: "https://i1.douguo.com/upload/banner/2/f/6/2fcdc42e1c594c549a20956082cf4246.png",
          title: "订单",
        },
      ],
    };
  },
  created() {
    this.nowPhone = localStorage.getItem("loginUser");
    if (this.nowPhone) {
      this.isLoginSuccess = true;
    }
  },
  methods: {
    onSubmit(values) {
      if (!this.tel || !this.password) {
        Notify({
          message: "手机号或密码不能为空",
          duration: 1000,
        });
        return;
      }
      let userMsg = localStorage.getItem("userMsg");
      userMsg = JSON.parse(userMsg);

      if (!userMsg) {
        Toast("此手机未注册");
        return;
      }

      userMsg.forEach((ele) => {
        if (values.phone == ele.rephone && values.pw == ele.repw) {
          Toast("登录成功");
          this.nowPhone = values.phone;
          this.isLoginSuccess = true;
          this.tel = "";
          this.password = "";
          localStorage.setItem("loginUser", JSON.stringify(this.nowPhone));
        }
      });
      if (!this.nowPhone) {
        Toast("登录失败,手机号或密码不正确");
      }
    },

    onRegister(values) {
      if (!this.retel || !this.repassword) {
        Notify({
          message: "手机号或密码不能为空",
          duration: 1000,
        });
        return;
      }
      let userMsg = localStorage.getItem("userMsg");
      userMsg = JSON.parse(userMsg);
      let userMsgArray = null;
      if (!userMsg) {
        userMsgArray = [];
      } else {
        userMsgArray = userMsg;
      }

      for (let i = 0; i < userMsgArray.length; i++) {
        if (userMsgArray[i].rephone == values.rephone) {
          Toast("该手机已注册");
          return;
        }
      }

      userMsgArray.push(values);
      localStorage.setItem("userMsg", JSON.stringify(userMsgArray));
      this.retel = "";
      this.repassword = "";
      this.isLogin = true;
      Toast("注册成功");
    },
    inRegister() {
      this.isLogin = false;
      this.tel = "";
      this.password = "";
    },

    returnBtn() {
      this.retel = "";
      this.repassword = "";
      this.isLogin = true;
    },
    checkout() {
      Dialog.confirm({
        message: "是否退出登录",
      })
        .then(() => {
          this.isLoginSuccess = false;
          this.nowPhone = "";
          localStorage.removeItem("loginUser");
          Toast("退出成功");
        })
        .catch(() => {
          // on cancel
        });
    },
  },
};
</script>

<style lang="less" scoped>
.logo {
  padding: calc(117px + 1px / 2);
  width: 140px;
  height: 140px;
  background-image: url(../assets/mybg.jpg);
  border-radius: 0 0 20px 20px;
}
.login {
  position: relative;
  width: 86%;
  top: -70px;
  left: 50%;
  padding-top: 20px;
  transform: translateX(-50%);
  background-color: #fff;
  border-radius: 20px 20px 0 0;
}
.register {
  width: 236px;
  height: 40px;
  line-height: 42px;
  margin: 0 auto;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  color: #f7cc52;
  border: 2px solid #f7cc52;
  border-radius: 22px;
}
.registerBox {
  height: 256px;
  position: relative;
  width: 86%;
  top: -70px;
  left: 50%;
  padding-top: 20px;
  transform: translateX(-50%);
  background-color: #fff;
  border-radius: 20px 20px 0 0;
  .registerTitle {
    font-size: 30px;
    text-align: center;
    margin-bottom: 20px;
  }
}
.checkout {
  padding: 2px 6px;
  border-radius: 20px;
  font-size: 12px;
  color: #f6c753;
  text-align: center;
  border: 2px solid #f6c753;
}
.myContentFixed {
  padding: 0 20px;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 46px;
}
.userMsgTop {
  padding: 4px 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .userName {
    .name {
      display: flex;
      align-items: center;
      margin-bottom: 6px;
      .nick {
        font-size: 17px;
        margin-right: 6px;
      }
      .usermedal {
        width: 54px;
        position: relative;
        margin-right: 6px;
        .counttext {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: 4px;
          font-weight: bold;
          color: #937c3a;
        }
      }
      .lvl {
        font-weight: bold;
        font-style: italic;
        color: #c6a64f;
      }
    }
    .bigFeedBtn {
      padding: 4px 104px;
      border-radius: 20px;
      font-size: 15px;
      background-color: #f6c753;
      text-align: center;
    }
  }
}
.userPlace {
  display: flex;
  align-items: center;
  font-size: 13px;
  font-weight: bold;
  margin-bottom: 8px;
  div {
    margin-right: 13px;
  }
}
.introduction {
  font-size: 12px;
  color: #adadad;
  white-space: pre-line;
  margin-bottom: 18px;
}
.feedNav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  padding-bottom: 20px;
  .navListItem {
    font-size: 15px;
  }
  .navListItemBtn {
    color: #adadad;
  }
}
.myList {
  display: flex;
  flex-flow: row wrap;
  .listItem {
    width: 67px;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    margin-bottom: 10px;
  }
  .listItemText {
    margin-top: 4px;
    color: rgb(176, 176, 176);
  }
}
.myRecipes {
  height: 200px;
  .myRecipesText {
    color: rgb(176, 176, 176);
    font-size: 13px;
    text-align: center;
    margin-top: 44px;
  }
  .myRecipesBtn {
    position: fixed;
    bottom: 80px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    padding: 5px 6px;
    border-radius: 20px;
    font-size: 14px;
    background-color: #f6c753;
    text-align: center;
  }
}
/deep/ .van-nav-bar {
  background-color: transparent;
}
/deep/.van-hairline--bottom::after {
  border-bottom: none;
}
/deep/ .van-button--info {
  background-image: url(../assets/mybg.jpg);
  background-position: 54px 124px;
  border: 1px solid #f7cc52;
  font-weight: bold;
  width: 240px;
  margin: 30px auto 30px;
}
/deep/ .van-cell::after {
  border-bottom: 2px solid rgb(214, 214, 214);
}
/deep/ .van-icon-share-o {
  margin-left: 12px;
}
</style>