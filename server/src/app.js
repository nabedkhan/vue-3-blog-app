const path = require("path");
const jsonServer = require("json-server");
const auth = require("json-server-auth");
const jwt = require("jsonwebtoken");

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

server.db = router.db;

server.use(middlewares);

const rules = auth.rewriter({
  users: 600,
  posts: 644,
});

server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === "POST" && req.path === "/posts") {
    if (!req.headers.authorization) {
      res.status(401);
      throw new Error("Invalid authorization");
    }

    const token = req.headers.authorization.split(" ")[1];
    const decode = jwt.decode(token);
    req.body.createdAt = Date.now();
    req.body.userId = +decode.sub;
    req.body.published = true;

    const user = router.db
      .getState()
      .users.find((user) => user.id === +decode.sub);

    req.body.createdBy = user.name;
  }

  if (req.method === "GET" && req.path === "/posts/user") {
    if (!req.headers.authorization) {
      res.status(401);
      throw new Error("Invalid authorization");
    }

    const token = req.headers.authorization.split(" ")[1];
    const decode = jwt.decode(token);

    const userResponse = router.db
      .get("posts")
      .filter((item) => item.userId === +decode.sub);

    return res.jsonp(userResponse);
  }

  if (req.method === "GET" && req.path === "/current-user") {
    if (!req.headers.authorization) {
      return res.status(400).send(false);
    }

    const token = req.headers.authorization.split(" ")[1];
    const decode = jwt.decode(token);
    if (decode.sub) return res.status(200).send(true);
    else return res.status(400).send(false);
  }

  next();
});

server.use(rules);
server.use(auth);
server.use(router);

server.listen(5000, () => {
  console.log("JSON Server is running on port 5000");
});
