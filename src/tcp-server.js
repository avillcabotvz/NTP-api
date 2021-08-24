const net = require('net');
const { getTasks } = require('./tasks');

const tcpSrv = net.createServer();

const onCommand = async (cmd, args) => {
    console.log('Got command: ', cmd, args);

    if (cmd === 'listTasks') {
        const search = args[0] ?? null;
        const tasks = await getTasks(search);
        return { type: 'listTasks', data: tasks };
    }

    return { error: `Unknown command ${cmd}` };
};

const processMessage = async (msg, sock) => {
    console.log('RAW TCP message: ', msg);
    const { cmd, args } = JSON.parse(msg);

    const resp = await onCommand(cmd, args);
    if (resp) {
        sock.write(JSON.stringify(resp)+'\n');
    }
}

tcpSrv.on('connection', (socket) => {
    socket.setEncoding('utf8');
    let buff = ''; // Sadrzaj poruke spremamo dok ne dobijemo kompletnu

    console.log(`New TCP connection from: ${socket.remoteAddress}:${socket.remotePort}`);
    socket.on('data', (data) => {
        buff += data;
        // Razdvajamo poruke po terminatoru (novi red)
        // Ako smo dobili dio poruke, cekamo jos podataka dok ne dodemo do terminatora
        if (buff.indexOf('\n') !== -1) {
            // Razdvojimo poruke po terminatoru, u slucaju da smo dobili vise od jedne u jednom paketu
            const messages = buff.split('\n');
            // .length - 1 jer zadnji segment stavljamo natrag u buffer
            // Ako je bila cijela poruka, zadnji segment ce biti prazan string, inace prvi dio sljedece poruke
            for (let i = 0; i < messages.length - 1; i++) {
                const msg = messages[i];
                processMessage(msg, socket);
            }

            // Vrati zadnji segment u buffer
            buff = messages[messages.length - 1];
        }
    });
});

module.exports = { tcpSrv };
