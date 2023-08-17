import axios from "axios";

// `${window?.location?.origin}/api/v1`,

export default class API {
  constructor() {
    this.instance = axios.create({
      baseURL: `http://localhost:3000/api/v1`,
    });
  }

  createPost(body) {
    return this.instance.post("/feedback", body);
  }
  getAllFeedbackPost() {
    return this.instance.get("/feedback");
  }
  uploadPostFile(body) {
    return this.instance.post("/upload", body);
  }
  deleteFileFromS3({ name }) {
    return this.instance.delete(`/upload/${name}`);
  }
}
