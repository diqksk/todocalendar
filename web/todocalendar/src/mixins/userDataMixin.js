import axios from "axios";

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

const userDataMixin = {
  methods: {
    async fetchData(method, url, params) {
      const { data } = await instance[method](url, params);
      if (data.err) {
        alert(data.err);
        return;
      }
      return data.data;
    },
  },
};

export default userDataMixin;
