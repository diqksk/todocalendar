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
            <button id="already-check" @click="checkId">중복확인</button>
          </li>
          <li>
            <input
              type="password"
              id="signup-password"
              placeholder="비밀번호"
              v-model="signupInfo.password"
            />
          </li>
          <li>
            <input
              type="password"
              id="signup-password-confirm"
              placeholder="비밀번호 재입력"
              v-model="signupInfo.passwordConfirm"
            />
          </li>
          <li>
            <input
              type="text"
              id="signup-name"
              autofocus
              placeholder="이름"
              v-model="signupInfo.name"
            />
          </li>
          <li>
            <input
              type="text"
              id="signup-phone"
              placeholder="전화번호    ex) 01012345678"
              v-model="signupInfo.phone"
            />
          </li>
        </ul>
      </form>
      <button class="btn" id="signup-complete-btn" @click="checkSignup">
        완료
      </button>
      <button class="btn" id="signup-cancle-btn" @click="justClose">
        닫기
      </button>
      <!-- 알림 모달창 -->
      <AlertBox
        v-if="displayAlert"
        :alertText="alertText"
        @closeAlert="closeAlert"
      />
    </div>
  </div>
</template>

<script>
import userDataMixin from "@/mixins/userDataMixin";
import AlertBox from "../../AlertBox";
export default {
  name: "Signup Modal",
  mixins: [userDataMixin],
  components: {
    AlertBox,
  },
  data() {
    return {
      signupInfo: {
        userId: "",
        password: "",
        passwordConfirm: "",
        name: "",
        phone: "",
      },
      checkAlreadyId: true,
      displayAlert: false,
      alertText: "",
    };
  },
  methods: {
    checkSignup(e) {
      // 회원가입 완료 버튼 클릭 메서드
      e.preventDefault();
      const { userId, password, passwordConfirm, name, phone } =
        this.signupInfo;

      if (
        // 양식이 다 채워졌을 경우
        userId.length > 0 &&
        password.length > 0 &&
        name.length > 0 &&
        phone.length > 0
      ) {
        if (passwordConfirm !== password) {
          // 유저 비밀번호와 재확인 비밀번호가 다를 경우
          this.displayAlert = !this.displayAlert;
          this.alertText = "비밀번호를 확인해주세요.";
        } else {
          if (this.checkAlreadyId === false) {
            // 회원가입 완료!! (아이디 중복체크 완료)

            this.$emit("closeModal", { userId, password, name, phone });

            this.signupInfo.userId = "";
            this.signupInfo.password = "";
            this.signupInfo.passwordConfirm = "";
            this.signupInfo.name = "";
            this.signupInfo.phone = "";

            this.checkAlreadyId = true;
          } else {
            // 아이디 중복체크 미완료시 알림 메세지
            this.displayAlert = !this.displayAlert;
            this.alertText = "아이디 중복체크를 해주세요.";
          }
        }
      } else {
        console.log(userId, password, passwordConfirm, name, phone);
        // 양식에 빈칸이 존재할 경우 (양식 작성 미완료)
        this.displayAlert = !this.displayAlert;
        this.alertText = "회원정보를 확인해주세요.";
      }
    },
    justClose(e) {
      // 닫기 버튼
      e.preventDefault();
      this.$emit("justClose");
      this.signupInfo.userId = "";
      this.signupInfo.password = "";
      this.signupInfo.passwordConfirm = "";
      this.signupInfo.name = "";
      this.signupInfo.phone = "";
    },
    async checkId(e) {
      // 아이디 중복체크
      e.preventDefault();
      const userId = this.signupInfo.userId;
      const check = await this.fetchData("get", `/user/check/${userId}`);
      if (check.data) {
        this.alertText = check.data.msg;
      } else {
        this.alertText = check.err;
      }
      this.displayAlert = !this.displayAlert;
      this.checkAlreadyId = !this.checkAlreadyId;
    },
    closeAlert(display) {
      // 알림창 닫기버튼 클릭 시 닫기 기능
      if (display !== this.displayAlert) this.displayAlert = !this.displayAlert;
    },
  },
};
</script>

<style scoped>
.modal-wrapper {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
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
  color: #666;
}
#signup-complete-btn {
  padding: 2%;
  width: 20%;
}
#signup-cancle-btn {
  padding: 2%;
  width: 20%;
  margin-bottom: 8%;
}
</style>
