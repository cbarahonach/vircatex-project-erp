import server from './config/app';
import '@babel/polyfill';

async function main() {
    await server.listen(process.env.PORT);
    console.log(`Server running on PORT ${process.env.PORT}`);
}

main();