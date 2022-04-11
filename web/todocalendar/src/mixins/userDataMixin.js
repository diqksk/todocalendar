import axios from "axios";

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("accessToken");
  config.headers.Authorization = `Bearer ${token}`; // 요청 직전 axios 설정 값. 일치하면 응답이 옴.
  return config;
});

const userDataMixin = {
  methods: {
    async fetchData(method, url, params) {
      const { data } = await instance[method](url, params);
      return data;
    },
  },
};

export default userDataMixin;
