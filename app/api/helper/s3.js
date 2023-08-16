import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

const myS3Client = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.s3_SECRET_ACCESS_KEY,
  },
});

export const uploadFilesToS3 = async (formData) => {
  const links = [];
  for (const fileInfo of formData) {
    const file = fileInfo[1];
    const name = Date.now().toString() + file.name;
    const chunks = [];
    for await (const chunk of file.stream()) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);
    await myS3Client.send(
      new PutObjectCommand({
        Bucket: "feedback-boards-upload",
        Key: name,
        ACL: "public-read",
        Body: buffer,
        ContentType: file.type,
      })
    );
    links.push("https://feedback-boards-upload.s3.amazonaws.com/" + name);
  }

  return links;
};

export const deleteFileFromS3 = async (name) => {
  const response = await myS3Client.send(
    new DeleteObjectCommand({
      Bucket: "feedback-boards-upload",
      Key: name,
    })
  );

  return response;
};
