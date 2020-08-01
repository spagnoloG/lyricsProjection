import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://" + window.location.hostname + ":9000",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
  timeout: 10000
});

export default {
  getPsalms() {
    return apiClient.get("/psalms");
  },
  getPsalmsIndexes() {
    return apiClient.get("/pslamsit");
  },
  getPsalm(index) {
    return apiClient.get("/psalms/" + index);
  },
  deletePsalm(index) {
    return apiClient.delete("/psalms/" + index);
  },
  updatePsalm(psalm) {
    return apiClient.patch("/psalms/" + psalm.index, {
      title: psalm.title,
      content: psalm.content,
      category: psalm.category
    });
  },
  postPsalm(psalm) {
    return apiClient.post("/psalms/", psalm);
  }
};
