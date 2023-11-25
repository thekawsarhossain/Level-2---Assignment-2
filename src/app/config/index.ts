import dotevn from 'dotenv';
import path from 'path';

dotevn.config({
    path: path.join(process.cwd(), '.env'),
});

export default {
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS
};
