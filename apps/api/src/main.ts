import { createApplication } from './application';

async function bootstrap() {
  const port = Number(process.env.API_PORT ?? 8080);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('API_PORT must be an integer between 1 and 65535');
  }
  const app = await createApplication();
  app.enableShutdownHooks();
  try {
    await app.listen(port, '127.0.0.1');
    console.log(`API listening at http://localhost:${port}`);
  } catch (error) {
    await app.close();
    throw error;
  }
}

bootstrap().catch(error => {
  console.error('API startup failed:', error);
  process.exitCode = 1;
});
