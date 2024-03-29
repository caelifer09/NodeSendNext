import mongoose, { connect, connection } from "mongoose";

const conn = {
  isConnected: false,
};

export async function dbConnect() {
  mongoose.set("strictQuery", false);
  const db = await connect(process.env.MONGO_URI);
  console.log(db.connection.db.databaseName);
  conn.isConnected = db.connections[0].readyState;
}

connection.on("connected", () => console.log("Mongodb connected to db"));

connection.on("error", (err) => console.error("Mongodb Errro:", err.message));
