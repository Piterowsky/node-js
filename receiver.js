const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (err0, connection) => {
    if(err0) {
        throw err0;
    }
    connection.createChannel((err1, channel) => {
        if(err1) {
            throw err1;
        }
        const queue = 'hello_queue';
        const queue1 = 'returned_hello_queue';
        channel.assertQueue(queue, {durable: false});
        channel.consume(queue, (msg) => {
            const receivedMsg = JSON.parse(msg.content.toString()).greet;
            console.log(`Received: %s`, receivedMsg);
            channel.sendToQueue(queue1, Buffer.from(receivedMsg + '__processed'));
        }, {
            noAck: true
        });
    })
});
