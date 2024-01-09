import axios from "axios";
import { apiResponse } from "./requests";

const AUTH_TOKEN = "c2f551454acfd19d81444f4558db869fdb6ba682";
const answer = {
    "response_code": 0,
    "response_status": "OK",
    "response_result": {
        "380932511624": {
            "response_code": 801,
            "response_status": "SUCCESS_MESSAGE_SENT",
            "response_result": [
                {
                    "phone": "380932511624",
                    "message_id": "1cb60453-659a-430d-5384-303fb4bbddad",
                    "response_code": 0,
                    "response_status": "OK"
                }
            ]
        },
        "380932080760": {
            "response_code": 800,
            "response_status": "SUCCESS_MESSAGE_ACCEPTED",
            "response_result": [
                {
                    "phone": "380932080760",
                    "message_id": "1cd0c4b9-659a-430d-5384-345c995dca76",
                    "response_code": 0,
                    "response_status": "OK"
                }
            ]
        }
    }
}
export async function sendMulti(obj){

    const sms = {
        "380932511624":{
            "recipients": [
                "380932511624",
             ],
             "sms": {
                "sender": "IT Club",
                "text": "Мої вітання. Тестове."
             }
        },
        "380932080760":{
            "start_time": "2024-01-07 17:00",
            "recipients": [
                "380932080760",
             ],
             "sms": {
                "sender": "IT Club",
                "text": "Мої вітання. Тестове відкладене."
             }
        }
      }
// return "";
   return await axios({
         url: 'https://api.turbosms.ua/message/sendmulti.json?token=' + AUTH_TOKEN,
         method: "POST",
         header: {'application/x-www-form-urlencoded': 'application/json;charset=utf-8'},
         data: obj,
         onUploadProgress: (event) => {
             console.log(event)
         } 
     })
     .then((data)=>{
         console.log("Received data: ", data);
        //  apiResponse({}, 'create-message.php').then((data) => { return {data}})
         return (data.data)
     })
     .catch((error)=>{
         throw error;
     })

 }
 export async function getStatus(obj){

    const message_ids = {
        messages: [
            "1cb60453-659a-430d-5384-303fb4bbddad",
            "1cd0c4b9-659a-430d-5384-345c995dca76"
        ]
      }

   return await axios({
         url: 'https://api.turbosms.ua/message/status.json?token=' + AUTH_TOKEN,
         method: "POST",
         header: {'application/x-www-form-urlencoded': 'application/json;charset=utf-8'},
         data: message_ids,
         onUploadProgress: (event) => {
             console.log(event)
         } 
     })
     .then((data)=>{
         console.log("Received data: ", data);
          (data.data["380932511624"]["response_result"][0]["phone"])
          return apiResponse({ phone }, 'send-message.php')
     })
     .catch((error)=>{
         throw error;
     })
 }