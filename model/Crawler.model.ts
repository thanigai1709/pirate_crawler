import mongoose, { Schema, model, models } from "mongoose";

const CrawlerSchema: Schema = new Schema(
	{
		apiName: {
			type: String,
			required: true,
		},
		targetUrl: {
			type: String,
			required: true,
		},
		crawlTargets: { type: Object, required: true },
		crawlType: {
			type: String,
		},
		HTMLDOM: {
			type: String,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{ timestamps: true }
);

export default models.Crawler || model("Crawler", CrawlerSchema);
