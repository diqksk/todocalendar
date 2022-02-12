<template>
  <div id="login-main">
    <form id="login-form">
      <legend>로그인</legend>
      <ul class="login-input">
        <li>
          <input
            type="text"
            id="user-id"
            autofocus
            placeholder="아이디"
            v-model="userinfo.userid"
          />
        </li>
        <li>
          <input
            type="password"
            id="user-password"
            placeholder="비밀번호"
            v-model="userinfo.userpassword"
          />
        </li>
        <li id="user-find">
          <p id="user-id-find">아이디 찾기</p>
          <p id="user-password-find">비밀번호 찾기</p>
        </li>
      </ul>
      <button @click="checkInfo">로그인</button>
      <button>회원가입</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "LoginLayout",
  data() {
    return {
      userlist: [],
      userinfo: {
        userid: "",
        userpassword: "",
      },
    };
  },
  methods: {
    checkInfo(e) {
      e.preventDefault();
      const id = document.querySelector("#user-id");
      const password = document.querySelector("#user-password");
      id.value = this.userinfo.userid;
      password.value = this.userinfo.userpassword;
      console.log(this.userinfo);
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

form {
  width: 30%;
  height: 60%;
  padding: 2% 5%;
  letter-spacing: 0.05rem;
  text-indent: 0.05rem;
}
legend {
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
}
#user-id-find {
  margin-right: 5%;
  cursor: pointer;
}
#user-password-find {
  cursor: pointer;
}

button {
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
button:hover {
  background: #93f9b9;
  color: #131313;
}
</style>
