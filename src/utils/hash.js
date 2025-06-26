import bcrypt from "bcrypt";
import dotenv from 'dotenv';

// Load environment variables from the specified .env file
dotenv.config();

export const hashPassword = async ({plainText,saltRounds=process.env.SALT_ROUNDS}) => {
  const parsedSaltRounds =
    typeof saltRounds === "string" ? parseInt(saltRounds, 10) : saltRounds;

  if (!parsedSaltRounds || isNaN(parsedSaltRounds)) {
    throw new Error("Invalid saltRounds value. It must be a valid number.");
  }
  console.log(saltRounds,plainText);

  const hash = await bcrypt.hash(plainText,parsedSaltRounds);
  return hash;
}
export const comparePassword = async ({plainText,hash}) => {
  const match = await bcrypt.compare(plainText,hash);
  return match;
}