//server.js

const express = require('express');
const app = express();
const connectDB = require("./config");
const UsersRouter = require('./routes/user.routes');
const AuthRouter = require('./routes/authentication.routes');
const PostRouter = require('./routes/post.routes');

app.use(express.json());
connectDB();

UsersRouter.routesConfig(app);
AuthRouter.routesConfig(app);
PostRouter.routesConfig(app);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
