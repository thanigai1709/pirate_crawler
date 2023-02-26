import mongoose, { Schema, model, models } from "mongoose";

const UserSchema: Schema = new Schema(
	{
		username: { type: String, required: true, minlength: 4, maxlength: 20 },
		email: { type: String, required: true },
		password: { type: String, required: true, select: false },
		apiKey: { type: String, required: true },
		auth_provider: { type: String, required: true },
		auth_token: String,
		avatar: { url: String, file_name: String },
		crawlers: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Crawler",
			},
		],
	},
	{ timestamps: true }
);

export default models.User || model("User", UserSchema);
