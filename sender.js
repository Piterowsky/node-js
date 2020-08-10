const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (err0, connection) => {
    if (err0) {
        throw err0;
    }
    connection.createChannel((err1, channel) => {
        if (err1) {
            throw err1;
        }
        const queue = 'hello_queue';
        const queue1 = 'returned_hello_queue';
        const msg = {
            greet: 'Hello',
        };
        channel.assertQueue(queue, { durable: false });
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)));
        console.log(`Sent: %s`, msg);

        channel.assertQueue(queue1, { durable: false });
        channel.consume(queue1, (msg) => console.log('Received: ' + JSON.stringify(msg.content.toString())), { noAck: true });
    });
});
