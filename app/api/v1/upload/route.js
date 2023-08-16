import { uploadFilesToS3 } from "../../helper/s3";

export const POST = async (req) => {
  const formData = await req.formData();
  const links = await uploadFilesToS3(formData);
  return Response.json(links);
};
