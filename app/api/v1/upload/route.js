export const POST = async (req) => {
  const formData = await req.formData();
  console.log("formData", formData);
  return Response.json("ok");
};
