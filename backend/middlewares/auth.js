function auth(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (token === "123") {
    next();
  } else {
    res.status(401).send("Frobidden: invalid token");
  }
}

export { auth };
