import jwt from "jsonwebtoken";
async function logic(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send("Unauthorized request");
  }
  const token = req.headers["authorization"].split(" ")[1];
  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    req.user = decoded?.user;
    next();
  } catch (error) {
    throw 'token is invalid'
  }
}
async function verifyJWTHandler(req,res, next) {
  logic(req, res, next)
    .then((data) => {
    //   res.status(201).send({ status: true, body: { message: data } });
    })
    .catch((error) => {
      res.status(401).send({ status: false, body: { message: `${error}` } });
    });
}

export { verifyJWTHandler };
