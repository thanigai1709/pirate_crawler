import mongoose from "mongoose";
const dbURI: string = process.env.MONGO_URI || "";
const connectMongo = async (): Promise<boolean | undefined> => {
	try {
		const { connection } = await mongoose.connect(dbURI);
		if (connection.readyState === 1) {
			return Promise.resolve(true);
		}
	} catch (error) {
		return Promise.reject(error);
	}
};

export default connectMongo;
