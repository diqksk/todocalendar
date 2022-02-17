import axios from "axios";

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

const userDataMixin = {
  methods: {
    async fetchData(method, url, params) {
      const res = await instance[method](url, params);
      return console.log(res);
    },
  },
};

export default userDataMixin;
