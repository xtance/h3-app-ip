import { createServer } from "node:http";
import { createApp, eventHandler, toNodeListener, getRequestIP } from "h3";

const app = createApp({});
app.use(
    "/",
    eventHandler((event) => {
        console.log('Event', event);
        return [
            'IP',
            event.context.clientAddress,
            event.node.req.connection.remoteAddress,
            event.node.req.socket.remoteAddress,
            getRequestIP(event),
            getRequestIP(event, { xForwardedFor: true }),
        ];
    }),
);

createServer(toNodeListener(app)).listen(3001);