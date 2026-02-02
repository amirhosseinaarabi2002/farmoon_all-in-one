import axios  from "axios";
import Cookies from "js-cookie";
import config from "../config/config";
const GET_VIOLATION_API_URL="https://www.penalty.vsrv.ir/api/top/violationInquiryNoAuth";
const GET_CAR_VIOLATION_IMAGE_API_URL="https://www.penalty.vsrv.ir/api/ghabzino/violationImage";
export const getCarViolationSum= async(requestData)=>{
  const token=Cookies.get("token");

    try{
        const response=await axios.post(GET_VIOLATION_API_URL,requestData,{
            headers:{
                'Authorization': `Bearer ${token}`,
                'x-api-key': config.X_API_KEY,
            }
        });

        console.log(response.data)
        return response;
    }catch (error){
        if(error.response){
          const {status}=error.response;
            if (status === 429) {
                return { status: 429, message: "تلاش بیش از حد ، لطفا پس از یک دقیقه تلاش کنید" };
              } else if (status === 403) {
                return { status: 403, message: "دسترسی غیرمجاز" };
              } else if (status === 500) {
                return { status: 500, message: "مشکلی رخ داده است، لطفا مجددا تلاش کنید." };
              } else if(status===499){
                return {status:499,message:"موجودی شما کافی نیست"}
              }else if(status===469){
                return {status:469,message:"سابقه ی پلاک خالیست"}
              }
            }
            return { status: error.response?.status || 500, message: "مشکلی رخ داده است، لطفا مجددا تلاش کنید." };
        }
    }

export const getCarViolationImageApi=async(requestData)=>{
    const token=Cookies.get("token");
    try{
      const response=await axios.post(GET_CAR_VIOLATION_IMAGE_API_URL,requestData,{
        headers:{

            'Authorization': `Bearer ${token}`,
            'x-api-key': config.X_API_KEY,
        
        }
      });
      return response;
    }catch(error){
      if(error.response){
        const {status}=error.response;
        if (status === 429) {
            return { status: 429, message: "تلاش بیش از حد ، لطفا پس از یک دقیقه تلاش کنید" };
          } else if (status === 403) {
            return { status: 403, message: "دسترسی غیرمجاز" };
          } else if (status === 500) {
            return { status: 500, message: "مشکلی رخ داده است، لطفا مجددا تلاش کنید." };
          } else if(status===499){
            return {status:499,message:"موجودی شما کافی نیست"}
          }
        }
        return { status: error.response?.status || 500, message: "مشکلی رخ داده است، لطفا مجددا تلاش کنید." };
      }
    }

