import * as dotenv from 'dotenv';

dotenv.config();
export const {
	PORT, NODE_ENV, JWT_SECRET,
} = process.env;

export const MONGODB_URI = NODE_ENV === 'test' ? process.env.TEST_MONGODB_URI : process.env.MONGODB_URI;
export const JWT_EXPIRES_IN = NODE_ENV === 'test' ? process.env.TEST_JWT_EXPIRES_IN : process.env.JWT_EXPIRES_IN;
