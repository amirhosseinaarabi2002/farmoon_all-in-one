import axios from "axios";
import Cookies from 'js-cookie';
import config from "../../config/config";
const FINE_PAYMENT_API_URL="https://www.penalty.vsrv.ir/api/ghabzino/reportNewBillPayment";

export const finePaymentApi=async(requestData)=>{
    const token=Cookies.get("token");
    try{
        const response=axios.post(FINE_PAYMENT_API_URL,requestData,{
            headers:{
                "Authorization":`Bearer ${token}`,
                "x-api-key":config.X_API_KEY
            }
        });
        return response;
    }catch(error){
        const { status } = error.response;
        if (status === 429) {
          return { status: 429, message: "تلاش بیش از حد ، لطفا پس از یک دقیقه تلاش کنید" };
        } else if (status === 403) {
          return { status: 403, message: "دسترسی غیرمجاز" };
        } else if (status === 500) {
          return { status: 500, message: "مشکلی رخ داده است، لطفا مجددا تلاش کنید." };
        }
      }
      return { status: error.response?.status || 500, message: "مشکلی رخ داده است، لطفا مجددا تلاش کنید." };
    }
