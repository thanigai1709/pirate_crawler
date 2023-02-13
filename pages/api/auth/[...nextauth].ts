//@ts-nocheck
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongo from "@/database/connection";
import User from "../../../model/User.model";
import { compareSync, hash } from "bcryptjs";

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
					name: user.username,
					email: user.email,
					image: user.avatar ? user.avatar.url : null,
				};
				return sessionUser;
			},
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	session: {
		strategy: "jwt",
	},
	callbacks: {
		async signIn({ user, account, profile, email, credentials }) {
			if (account.provider === "google") {
				connectMongo().catch((e) => {
					throw new Error("Error while signing up...");
				});
				const user = await User.findOne({ email: profile.email });
				if (!user) {
					User.create(
						{
							username: profile.name,
							email: profile.email,
							password: await hash(profile.name + "googleuser", 12),
							auth_provider: account.provider,
							avatar: {
								url: profile.picture,
								file_name: "",
							},
						},
						function (err, data) {
							if (err) throw new Error("Error while signing up...");
							return true;
						}
					);
				} else {
					if (user.auth_provider != "google") {
						return false;
					} else {
						return true;
					}
				}
			}
			return true;
		},
	},
	pages: {
		signIn: "/auth/login",
		signOut: "/",
	},
});
