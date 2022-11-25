import sc from "socket.io";
import { animate } from "./game/gameloop";
import { scene, User, users } from "./game/interfaces";
import {createServer} from 'http'
const httpServer = createServer(function (req, res) {
    res.write(scene.type); 
    res.end();
  });
export const io = new sc.Server(httpServer, {
  cors: {
    origin: "*",
  },
});
setInterval(()=>{
    animate()
},1000/50)

io.on("connect", (socket) => {
    socket.on('place-bet',(e:User)=>{
        users.set(e.userId, e)
        io.emit('bets', Array.from(users.values()))
    })
    io.emit('scoreBoard',scene.scoreBoard)
    io.emit('type', scene.type)
    io.emit('board', scene.board)
    io.emit('timer', scene.timer)
    io.emit('winner', scene.winner)
    socket.on("disconnect", () => {
        console.log(`disconnect ${socket.id}`);
    });
});

httpServer.listen(process.env.PORT || 8080)
