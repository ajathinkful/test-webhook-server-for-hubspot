const { createHmac } = require('node:crypto');

exports.handler = async (request) => {
    const payload = await request.text();
    const { action, data, type, createdAt } = JSON.parse(payload);

    // Verify signature
    const signature = createHmac("sha256", process.env.WEBHOOK_SECRET).update(payload).digest("hex");
    if (signature !== request.headers['linear-signature']) {
        console.error('Signature verification failed');
        return {
            statusCode: 400,
            body: 'Invalid signature'
        };
    }

    // Log the received data (you can customize this further)
    console.log('Received webhook data:', { action, data, type, createdAt });

    // Respond with a 200 status code
    return {
        statusCode: 200,
        body: 'Webhook received successfully'
    };
};
