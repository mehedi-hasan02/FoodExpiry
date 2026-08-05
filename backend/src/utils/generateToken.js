import jwt from "jsonwebtoken";

const generateToken = (id, email) => {
  // console.log(id);
  const token = jwt.sign({ id, email }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return token;
};

export default generateToken;
