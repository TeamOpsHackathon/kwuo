/**
 * Created by Obonnaya Chiazam
 * Date of creation: 15/5/2025
 * Date of update: 15/5/2025
 */

import { sendOtp } from "../services/termii.service.js";

//validate if the number is nigerian before sending to the server
const NIGERIAN_PHONE_REGEX = /^(\+234|0)[789]\d{9}$/;

//@desc gets a phone number from the client and forwards to the termii API
export const handleSendOtp = async (req, res,next) => {
    const phone = req.body.phone?.trim();

    console.log(`This is your phone number ${phone}`);

    if(!phone){
        return res.status(400).json({error: "Phone number is required"});
    }

    //Check if the number fits the nigeia pattern
    if(!NIGERIAN_PHONE_REGEX.test(phone)){
        return res.status(400).json({error:"Invalid Nigerian phone number format"});
    }

    try{
        //response from the otp service
        const response = await sendOtp(phone);
        res.status(200).json({message:"OTP sent successfully", data: response});
    }catch(err){
        
        //troubleshooting
        console.error("Error sending OTP:", err.response?.data || err.message);
        
        //Server side error
        res.status(500).json({error:"Failed to send OTP."});
    }
}
