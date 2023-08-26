import axios from "axios";

// `${window?.location?.origin}/api/v1`,

export default class COMMENT_API {
  constructor() {
    this.instance = axios.create({
      baseURL: `http://localhost:3000/api/v1`,
    });
  }

  createComment(body) {
    return this.instance.post("/comment", body);
  }
  getAllComment() {
    return this.instance.get("/comment");
  }
}
