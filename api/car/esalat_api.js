import axios from "axios";
import config from "../../config/config";
import Cookies from "js-cookie";

const getEsalatOtpCode = async (requestData) => {
  const token = Cookies.get("token");
  try {
    const response = await axios.post(config.GET_ESALAT_OTP_URL, requestData, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "x-api-key": config.X_API_KEY,
      },
    });
    return response;
  } catch (error) {
    const { status } = error.response;
    const errorMessage = error.response?.data?.message || "مشکلی رخ داده است، لطفا مجددا تلاش کنید.";
    
    if (status === 429) {
      return { status: 429, message: "تلاش بیش از حد ، لطفا پس از یک دقیقه تلاش کنید" };
    } else if (status === 403) {
      return { status: 403, message: "دسترسی غیرمجاز" };
    } else if (status === 500) {
      return { status: 500, message: "مشکلی رخ داده است، لطفا مجددا تلاش کنید." };
    } else if (status === 499) {
      return { status: 499, message: "موجودی شما کافی نیست هزینه استعلام 53,000 تومان می باشد" };
    } else if (status === 480) {
      return { status: 480, message: errorMessage };
    }
    return { status: status || 500, message: errorMessage };
  }
};




//   const getEsalatOtpCode = async (requestData) => {
//   const token = Cookies.get('token');
//   try {
//     const response = await axios.post(config.GET_ESALAT_OTP_URL, requestData, {
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'x-api-key': config.X_API_KEY
//       }
//     });
//     // Mock response for testing purposes
//     return {
//       status: 200,
//       data: {
//         inquiryCode: '5bdc4382-b9f8-46b5-8ec0-9c31e4a37937',
//         inquiryTimeOutInSecond: 120
//       }
//     };
//   } catch (error) {
//     // Return a default response with status 200 in case of errors
//     return {
//       status: 200,
//       data: {
//         inquiryCode: '5bdc4382-b9f8-46b5-8ec0-9c31e4a37937',
//         inquiryTimeOutInSecond: 120
//       }
//     };
//   }
// };




const sendEsalatOtpCode=async(requestData)=>{
  const token=Cookies.get('token');
  try{
    const response=await axios.post(config.SEND_ESALAT_OTP_URL,requestData,{
      headers: {
        'Authorization': `Bearer ${token}`,
        'x-api-key': config.X_API_KEY
      }
    })
    return response;
  }
  catch (error) {
    const { status } = error.response;
    const errorMessage = error.response?.data?.message || "مشکلی رخ داده است، لطفا مجددا تلاش کنید.";
    
    if (status === 429) {
      return { status: 429, message: "تلاش بیش از حد ، لطفا پس از یک دقیقه تلاش کنید" };
    } else if (status === 403) {
      return { status: 403, message: "دسترسی غیرمجاز" };
    } else if (status === 500) {
      return { status: 500, message: "مشکلی رخ داده است، لطفا مجددا تلاش کنید." };
    } else if (status === 499) {
      return { status: 499, message: "موجودی شما کافی نیست هزینه استعلام 53,000 تومان می باشد" };
    } else if (status === 480) {
      return { status: 480, message: errorMessage };
    }
    return { status: status || 500, message: errorMessage };
  }


}

const sendContract=async(requestData)=>{
  const token=Cookies.get("token");
  try{
    const response=await axios.post(config.SEND_CONTRACT_URL,requestData,{
      headers:{
        'Authorization': `Bearer ${token}`,
        'x-api-key': config.X_API_KEY
      }
    });
    return response;
  }catch(error){
    const { status } = error.response;
    const errorMessage = error.response?.data?.message || "مشکلی رخ داده است، لطفا مجددا تلاش کنید.";
    
    if (status === 429) {
      return { status: 429, message: "تلاش بیش از حد ، لطفا پس از یک دقیقه تلاش کنید" };
    } else if (status === 403) {
      return { status: 403, message: "دسترسی غیرمجاز" };
    } else if (status === 500) {
      return { status: 500, message: "مشکلی رخ داده است، لطفا مجددا تلاش کنید." };
    } else if (status === 499) {
      return { status: 499, message: "موجودی شما کافی نیست هزینه استعلام 53,000 تومان می باشد" };
    } else if (status === 480) {
      return { status: 480, message: errorMessage };
    }
    return { status: status || 500, message: errorMessage };
  }

}
const getContractPdf=async(contract_id)=>{
  const token=Cookies.get("token");
  try{
    const response=await axios.get(`https://www.penalty.vsrv.ir/api/contracts/${contract_id}/pdf`,{
      headers:{
        'Authorization': `Bearer ${token}`,
        'x-api-key': config.X_API_KEY
      }
    });
    return response;
  }catch(error){
    const { status } = error.response;
    const errorMessage = error.response?.data?.message || "مشکلی رخ داده است، لطفا مجددا تلاش کنید.";
    
    if (status === 429) {
      return { status: 429, message: "تلاش بیش از حد ، لطفا پس از یک دقیقه تلاش کنید" };
    } else if (status === 403) {
      return { status: 403, message: "دسترسی غیرمجاز" };
    } else if (status === 500) {
      return { status: 500, message: "مشکلی رخ داده است، لطفا مجددا تلاش کنید." };
    } else if (status === 499) {
      return { status: 499, message: "موجودی شما کافی نیست هزینه استعلام 53,000 تومان می باشد" };
    } else if (status === 480) {
      return { status: 480, message: errorMessage };
    }
    return { status: status || 500, message: errorMessage };
  }
}


export  {getEsalatOtpCode,sendEsalatOtpCode,sendContract,getContractPdf};