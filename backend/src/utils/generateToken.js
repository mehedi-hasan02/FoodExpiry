import jwt from "jsonwebtoken";

const generateToken = (email) => {
  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return token;
};

export default generateToken;
