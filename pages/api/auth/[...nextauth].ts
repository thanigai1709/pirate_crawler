//@ts-nocheck
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongo from "@/database/connection";
import User from "../../../model/User.model";
import { compareSync } from "bcryptjs";

export default NextAuth({
	providers: [
		GoogleProvider({
			clientId: `${process.env.GOOGLE_CLIENT_ID}`,
			clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
		}),

		CredentialsProvider({
			name: "login",
			//@ts-ignore
			authorize: async (credentials) => {
				connectMongo().catch((e) => ({ error: "Connection Failed...!" }));
				//@ts-ignore
				const user = await User.findOne({ email: credentials.email });
				if (!user) {
					throw new Error("No user Found with Email Please Sign Up...!");
				}
				const checkPassword = compareSync(credentials.password, user.password);
				if (!checkPassword || user.email !== credentials.email) {
					throw new Error("Incorrect email or password");
				}
				const sessionUser = {
					id: user.id,
					name: user.username,
					email: user.email,
				};
				return sessionUser;
			},
		}),
	],
	secret: "34feb914c099df25794bf9ccb85bea72",
	session: {
		strategy: "jwt",
	},
});
