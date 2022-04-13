<template>
  <div id="login-main">
    <!-- 로그인화면 -->
    <form id="login-form">
      <legend>Todo Calendar</legend>
      <ul class="login-input">
        <li>
          <input
            type="text"
            id="user-id"
            autofocus
            placeholder="아이디"
            v-model="loginInfo.userId"
          />
        </li>
        <li>
          <input
            type="password"
            id="user-password"
            placeholder="비밀번호"
            v-model="loginInfo.password"
          />
        </li>
        <li id="user-find">
          <p id="user-id-find">아이디 찾기</p>
          <p id="user-password-find">비밀번호 찾기</p>
        </li>
      </ul>
      <button class="btn" @click="checkInfo">로그인</button>
      <button class="btn" @click="signupForm">회원가입</button>
    </form>

    <!-- 회원가입 모달박스 -->
    <SignupModal
      v-show="displayModal"
      @closeModal="closeModal"
      @justClose="justClose"
    />
    <!-- 알림 모달창 -->
    <AlertBox
      v-if="displayAlert"
      :alertText="alertText"
      @closeAlert="closeAlert"
    />
  </div>
</template>

<script>
import SignupModal from "./SignupModal";
import AlertBox from "../../AlertBox";
import userDataMixin from "@/mixins/userDataMixin";

export default {
  name: "LoginLayout",
  components: {
    SignupModal,
    AlertBox,
  },
  mixins: [userDataMixin],
  data() {
    return {
      loginInfo: {
        userId: "",
        password: "",
      },
      displayModal: false,
      displayAlert: false,
      alertText: "",
      userData: null,
      calendarCondition: { id: null, date: null },
    };
  },
  created() {
    const date = new Date();
    const year = date.getFullYear();
    const month =
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1;
    const formatYearMonth = year + month;
    this.calendarCondition.date = formatYearMonth;
    // const dateFormat = new Date(+new Date() + 3240 * 10000)
    //   .toISOString()
    //   .split("T")[0];
    // this.calendarCondition.date = dateFormat;
  },
  methods: {
    async checkInfo(e) {
      // 로그인 시도
      e.preventDefault();
      const { userId, password } = this.loginInfo;
      if (userId.length > 0 && password.length > 0) {
        const userCheck = await this.fetchData(
          "post",
          "/user/login",
          this.loginInfo
        );
        if (userCheck) {
          if (userCheck.data) {
            // 회원일 경우
            this.userData = userCheck.data;
            localStorage.setItem("accessToken", this.userData.accessToken); // 토큰을 브라우저 로컬스토리지에 저장
            this.calendarCondition.id = this.userData.id;
            this.$router.replace({
              name: "calendar",
              query: {
                id: this.calendarCondition.id,
                date: this.calendarCondition.date,
              },
            });
          } else {
            // 회원이 아닐 경우
            this.displayAlert = !this.displayAlert;
            this.alertText = userCheck.err;
          }
        }
      } else {
        this.displayAlert = !this.displayAlert;
        this.alertText = "아이디 또는 비밀번호를 확인해주세요!!";
      }
    },
    signupForm(e) {
      e.preventDefault();
      this.displayModal = !this.displayModal;
    },
    async closeModal(signupInfo) {
      const userData = await this.fetchData("post", "/user/signup", signupInfo); // 회원가입된 유저 데이터 서버로 전송
      if (userData) {
        this.displayModal = !this.displayModal;
        this.displayAlert = !this.displayAlert;
        console.log(userData);
        this.alertText = "회원가입이 완료되었습니다.";
      }
    },
    justClose() {
      this.displayModal = !this.displayModal;
    },
    closeAlert(display) {
      // 알림창 닫기버튼 클릭 시 닫기 기능
      if (display !== this.displayAlert) this.displayAlert = !this.displayAlert;
    },
  },
};
</script>

<style scoped>
#login-main {
  width: 100%;
  height: 100vh;
  background: linear-gradient(30deg, #11998e, #38ef7d);
  display: flex;
  justify-content: center;
  align-items: center;
}

#login-form {
  width: 30%;
  height: 60%;
  padding: 2% 5%;
  letter-spacing: 0.1rem;
  text-indent: 0.1rem;
}
#login-form legend {
  width: 100%;
  line-height: 2em;
  font-size: 1.2em;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10%;
  color: #fff;
}

.login-input {
  width: 100%;
}

.login-input li {
  width: 100%;
  font-size: 0.8em;
  margin: 3% auto;
  display: flex;
  align-items: center;
}
.login-input li input {
  display: inline-block;
  width: 100%;
  outline: none;
  border: none;
  border-radius: 0.2rem;
  padding: 0.3rem 0.6rem;
  height: 2.5em;
  line-height: 2.5em;
}

#user-find {
  margin: 5% 0 10% 0;
  font-size: 0.5em;
  justify-content: flex-end;
  text-indent: 0;
  letter-spacing: 0;
}
#user-id-find {
  margin-right: 5%;
  cursor: pointer;
}
#user-password-find {
  cursor: pointer;
}

.btn {
  display: block;
  padding: 3%;
  width: 100%;
  margin: 3% auto;
  border: none;
  border-radius: 0.2rem;
  cursor: pointer;
  font-size: 0.5em;
  background: #1d976c;
  color: #fff;
  transition: all 0.4s ease;
  -webkit-transition: all 0.4s ease;
  -moz-transition: all 0.4s ease;
}
.btn:hover {
  background: #93f9b9;
  color: #666;
}
</style>
