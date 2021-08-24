const udp = require('dgram');

const udp4Srv = udp.createSocket({ type: 'udp4', reuseAddr: true }); // IPv4
const udp6Srv = udp.createSocket({ type: 'udp6', reuseAddr: true }); // IPv6

const clients = [];

const onMessage = (rawMessage, info) => {
    const message = rawMessage.toString('utf8');

    const clientIdx = clients.findIndex(
        (client) => client.family === info.family
            && client.address === info.address
            && client.port === info.port
    );

    if (message === 'SUBSCRIBE') {
        if (clientIdx === -1) {
            clients.push({
                family: info.family,
                address: info.address,
                port: info.port
            });
        }
    } else if (message === 'UNSUBSCRIBE') {
        if (clientIdx !== -1) {
            clients.splice(clientIdx, 1);
        }
    }
    console.log('UDP event subscribers: ', clients);
};
udp4Srv.on('message', onMessage);
udp6Srv.on('message', onMessage);

function broadcast(msg) {
    clients.forEach((client) => {
        const sock = client.family === 'IPv4' ? udp4Srv : udp6Srv;
        sock.send(msg, client.port, client.address);
    });
}

module.exports = { udp4Srv, udp6Srv, broadcast };
