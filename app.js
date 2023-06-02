const express = require("express");
const app = new express();
const http = require("http");
const socket = require("socket.io");
const auth = require("./auth");
const prisma = require("./prisma/index");

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const server = http.createServer(app);

const io = socket(server);

app.get("/",(req,res)=>{
    res.sendFile(`${__dirname}/index.html`);
});

app.post("/create",(req,res)=>{

    const {name, email, password} = req.body;

    const result = prims.user.create({
        data:{
            name,
            email,
            password
        }
    })

    res.json({
        message:"Record created !",
        data: result
    })
});
app.patch("/update/:id",(req,res)=>{
    const {id} = req.params;
    const {name, email} = req.body;

    const udpatedResult = prisma.user.update({
        where:{
            id
        },
        data:{
            name,
            email
        }
    })
    res.send("Result updated : "+udpatedResult);

});
app.get("/read", async (req,res)=>{
    let result = await prisma.user.findMany();
    res.send(result);

});
app.delete("/delete/:id",async (req,res)=>{
    const {id} = req.params;
    await prisma.user.delete({
        where:{
            id
        }
    })
    res.send("this is delete api !");
});

let roomname = "RoomId";

io.on("connection",(socket)=>{
    socket.join(roomname);
    socket.on("chatMessage",(data)=>{
        console.log(`Received at backend : ${data}`);
        socket.to(roomname).emit("receiveMessage",data);
    })
    socket.on("disconnect",(socket)=>{
        console.log(`socket connection disconnected : ${socket}`);
    })
});

server.listen(3032,()=>{
    console.log(`Server running on port : 3032`);
})

