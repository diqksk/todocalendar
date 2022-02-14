<template>
  <div class="modal-wrapper">
    <div class="modal">
      <form id="signup-form">
        <legend>회원가입</legend>
        <ul class="signup-input">
          <li>
            <input
              type="text"
              id="signup-id"
              autofocus
              placeholder="아이디"
              v-model="signupInfo.userId"
            />
            <button id="already-check">중복확인</button>
          </li>
          <li>
            <input
              type="password"
              id="signup-password"
              placeholder="비밀번호"
              v-model="signupInfo.userPassword"
            />
          </li>
          <li>
            <input
              type="password"
              id="signup-password-confirm"
              placeholder="비밀번호 재입력"
              v-model="signupInfo.userPasswordConfirm"
            />
          </li>
          <li>
            <input
              type="text"
              id="signup-name"
              autofocus
              placeholder="이름"
              v-model="signupInfo.userName"
            />
          </li>
          <li>
            <input
              type="text"
              id="signup-phone"
              placeholder="전화번호"
              v-model="signupInfo.userPhone"
            />
          </li>
        </ul>
      </form>
      <button class="btn signup-btn" @click="signupForm">완료</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Signup Modal",
  props: {
    signupForm: Function,
  },
  data() {
    return {
      signupInfo: {
        userId: "",
        userPassword: "",
        userPasswordConfirm: "",
        userName: "",
        userPhone: "",
      },
    };
  },
  methods: {},
};
</script>

<style scoped>
.modal-wrapper {
  width: 100%;
  height: 100vh;
  position: fixed;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal {
  width: 30%;
  background: #fff;
  border-radius: 0.5rem;
}
#signup-form {
  width: 100%;
  height: 80%;
  padding: 2% 5%;
  margin: 0 auto;
  letter-spacing: 0.1rem;
  text-indent: 0.1rem;
}
#signup-form legend {
  width: 100%;
  height: 2em;
  line-height: 2em;
  font-weight: bold;
  text-align: center;
  margin: 5% 0;
  color: #131313;
}
.signup-input {
  width: 50%;
  margin: 0 auto;
}
.signup-input li {
  width: 100%;
  font-size: 0.8em;
  margin: 3% auto;
  display: flex;
  align-items: center;
  position: relative;
}
.signup-input li input {
  display: inline-block;
  width: 100%;
  outline: none;
  border: 1px solid #ccc;
  border-radius: 0.2rem;
  padding: 0.3rem 0.6rem;
  height: 2.5em;
  line-height: 2.5em;
}
#already-check {
  position: absolute;
  top: calc(50% - 1em);
  left: 105%;
  width: 30%;
  border-radius: 0.2rem;
  height: 2em;
  line-height: 2em;
  font-size: 0.6em;
  border: 1px solid #ccc;
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
.signup-btn {
  padding: 2%;
  width: 20%;
  margin: 8% auto;
}
</style>
