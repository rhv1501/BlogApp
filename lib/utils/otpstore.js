import bcrypt from "bcrypt";
const otpStore = new Map();

export const generateOtp = async (email) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const salt = await bcrypt.genSalt(10);
  const hasedOtp = await bcrypt.hash(otp, salt);
  otpStore.set(email, { otp: hasedOtp, expiresAt: Date.now() + 5 * 60 * 1000 });
  console.log("gen step", otp);
  return otp;
};

export const verifyOtp = async (email, otp) => {
  const record = otpStore.get(email);
  if (!record) return false;
  const isMatch = await bcrypt.compare(otp, record.otp);
  const isValid = isMatch && record.expiresAt > Date.now();
  if (isValid) otpStore.delete(email);
  return isValid;
};
