import mongoose from "mongoose";

// Define the Search History Schema as a sub-document
const SearchHistorySchema = new mongoose.Schema({
	query: { type: String, required: true },
	url: { type: String, required: true },
	timestamp: { type: Date, default: Date.now },
});


// Define the User Schema
const UserSchema = new mongoose.Schema({
	email: { type: String, required: true, unique: true },
	name: { type: String, required: true },
	password: { type: String, required: true },
	searchHistory: [SearchHistorySchema], // Embed the search history array
});

// Export the User model
export default mongoose.models.User || mongoose.model("User", UserSchema);
