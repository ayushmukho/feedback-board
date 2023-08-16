import { deleteFileFromS3 } from "@/app/api/helper/s3";

export const DELETE = async (request, { params }) => {
  const resposne = await deleteFileFromS3(params.name);
  return Response.json(resposne);
};
