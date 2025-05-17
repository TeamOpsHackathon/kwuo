import axios  from "axios";


//Set the base URL ,connection to the temii
const BASE_URL = "https://v3.api.termii.com"

/**
 * 
 * @param {string} phone - The client phone number to send the OTP to
 * @returns  {object} - Response from Termii API
 */

//@desc accepts a number number as argumnet, , and send it an OTP
export const sendOtp = async (phone) =>{
    const payload = {
        to:phone,
        from:"Termii",
        sms:"Your OTP IS 123456",
        type:"plain",
        channel:"generic",
        api_key:process.env.TERMII_API_KEY
       


    };

    try {
            //Sends the info the API endpoint
    const response = await axios.post(`${BASE_URL}/api/sms/send`,payload);
    //return the response from the termii api
    return response.data;

    }catch(error){
        console.error("Error sending OTP:", error.response?.data || error.message);
        throw error;
    }
}

//  api_key : process.env.TERMII_API_KEY,
//         message_type: "NUMERIC",
//         to: phone,
//         from: "Termii",
//         channel: "generic",
//         pin_attempts: 3,
//         pin_time_to_live:5,
//         pin_length:6,
//         pin_placeholder: "<1234>",
//         message_text:"Your OTP is <1234>",
//         pin_type: "NUMERIC"