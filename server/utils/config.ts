import * as dotenv from 'dotenv';

dotenv.config();
export const {
	PORT, NODE_ENV, JWT_SECRET, JWT_EXPIRES_IN,
} = process.env;

export const MONGODB_URI = NODE_ENV === 'test' ? process.env.TEST_MONGODB_URI : process.env.MONGODB_URI;
