<template>
  <div id="login-main">
    <!-- 로그인화면 -->
    <form id="login-form">
      <legend>로그인</legend>
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
            v-model="loginInfo.userPassword"
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
      :userList="userList"
    />
  </div>
</template>

<script>
import SignupModal from "./SignupModal";
import userDataMixin from "@/mixins/userDataMixin";

export default {
  name: "LoginLayout",
  components: {
    SignupModal,
  },
  mixins: [userDataMixin],
  data() {
    return {
      userList: [],
      loginInfo: {
        userId: "",
        userPassword: "",
      },
      userData: [],
      displayModal: false,
    };
  },
  methods: {
    checkInfo(e) {
      e.preventDefault();
      const { userId, userPassword } = this.loginInfo;
      if (userId.length > 0 && userPassword.length > 0) {
        console.log(this.loginInfo);
      } else {
        alert("아이디 또는 비밀번호를 확인해주세요!!");
      }
    },
    signupForm(e) {
      e.preventDefault();
      this.displayModal = !this.displayModal;
    },
    closeModal(signupInfo) {
      this.fetchData("post", "/signup", signupInfo); // 회원가입된 유저 데이터 서버로 전송

      this.displayModal = !this.displayModal;
      this.userList.push(signupInfo);
      console.log(this.userList);
    },
    justClose() {
      this.displayModal = !this.displayModal;
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
  height: 2em;
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
  color: #131313;
}
</style>
