import mongoose from "mongoose";
import { DB_Name } from "../constants.js";

async function ConnectDB() {
  try {
    const DB_Initialization = await mongoose.connect(
      `mongodb://127.0.0.1:27017/${DB_Name}`
    );

    console.log(
      `DB connected successfully !! DB HOST: ${DB_Initialization.connections[0].host}`
    );
  } catch (error) {
    console.error(`MONGODB connection failed from DB`, error);
    // throw error;
    process.exit(1); // Node.js native functnality for exiting any process. Node produce a "process" for every tast and we can mannully end that process
  }
}

export default ConnectDB;
