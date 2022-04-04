const app = require("express")();
const cors = require("cors");
const server = require("http").createServer(app);
const path = require("path");
const { Server } = require("socket.io");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cookieParser = require("cookie-parser");

// Configuration
dotenv.config({ path: path.join(__dirname, "config.env") });

// Database
const connectDB = require("./utils/Database");
connectDB();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: "*",
        credentials: true,
    })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger("dev"));



// Socket io
const socket = require("./socket");
const io = new Server(server, {
    cors: { origin: ["http://localhost:3000"] },
});

app.use((req, res, next) => {
    req.io = io;
    next();
})

socket(io);

// Router
const router = require("./routes/index");
router(app);

// Running server
const PORT = 4000;
server.listen(PORT, console.log(`server running on PORT ${PORT}`));