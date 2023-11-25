import app from './app';
import mongoose from 'mongoose';
import config from './app/config';

const PORT = 8080;

async function main() {
  try {
    // Database connection
    await mongoose.connect(config.database_url as string);

    app.listen(config.port, () => {
      // eslint-disable-next-line no-console
      console.log('Listening on port: ', PORT);
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
}

main();
