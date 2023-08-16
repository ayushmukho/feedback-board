import axios from "axios";

export default class API {
  constructor() {
    this.instance = axios.create({
      baseURL: `${window.location.origin}/api/v1`,
    });
  }

  createPost(body) {
    return this.instance.post("/feedback", body);
  }
  uploadPostFile(body) {
    return this.instance.post("/upload", body);
  }
  deleteFileFromS3({ name }) {
    return this.instance.delete(`/upload/${name}`);
  }
}
