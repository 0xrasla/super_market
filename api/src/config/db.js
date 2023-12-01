import { connect } from "mongoose";

async function connectDb() {
  let db_url = process.env.DB_URL + process.env.DB_NAME;

  try {
    await connect(db_url);
  } catch (error) {
    console.error(error);
  }
}

export { connectDb };
