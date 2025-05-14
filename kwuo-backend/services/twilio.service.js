import twilio from "twilio";

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
const serviceSid = process.env.TWILIO_SERVICE_SID;

export const sendVerificationCode = async (phone) => {
  return await client.verify.v2
    .services(serviceSid)
    .verifications.create({ to: phone, channel: "sms" });
};

export const verifyCode = async (phone, code) => {
  return await client.verify.v2
    .services(serviceSid)
    .verificationChecks.create({ to: phone, code });
};
