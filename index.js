const app = require('express')();

const axios = require('axios').default;

const server = require('http').createServer(app);

const { Server } = require('socket.io');

const io = new Server(server);


app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

io.on('connection', async (socket) => {
    try {
        setInterval(async () => {
            const res = await axios.get("https://api.coindesk.com/v1/bpi/currentprice.json");
            io.emit('price-update', { price: res.data.bpi.USD.rate });
        }, 3000)
    } catch (err) {
        console.error(err.message);
    }
})

server.listen(3000, () => {
    console.log("Server is up and running.....");
})

