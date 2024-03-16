const express = require("express");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

const server = require("http").createServer(app);
const io = require("socket.io")(server);

io.on("connection", (client) => {
  console.log("connection received");

  client.on("new_message", (score) => {
    console.log(`new message received: ${score}`);
    io.emit("broadcast", score);
  });

  client.on("new_message2", (score) => {
    console.log(`new message received2: ${score}`);
    io.emit("broadcast2", score);
  });

  client.on("led_status", (data) => {
    console.log(data);
    io.emit("led_status", data);
  });
});

app.get("/", (req, res) => {
  res.send("server is running");
});

const port = process.env.PORT;
server.listen(port || 3000, () => {
  console.log(`server running at ${port}...`);
});
