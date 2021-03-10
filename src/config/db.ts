import mongoose from "mongoose";
import CONFIG from "./config";

export default (async () => {
    try {
        await mongoose.connect('mongodb+srv://example:example123@cluster0.hld0t.mongodb.net/react_node_trainee?retryWrites=true&w=majority')
        console.log("DB connection OK");
    } catch (e) {
        console.log(e);
        console.log("DB connection bad");
        process.exit()
    }
})();