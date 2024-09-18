import dotenv from "dotenv"

dotenv.config()

export const Config = {
  // default speed is 1
  CAR_SPEED: parseInt(process.env.CAR_SPEED || "1", 10),

  // default table size is 5x5
  TABLE_WIDTH: parseInt(process.env.TABLE_WIDTH || "5", 10),
  TABLE_HEIGHT: parseInt(process.env.TABLE_HEIGHT || "5", 10),
}
