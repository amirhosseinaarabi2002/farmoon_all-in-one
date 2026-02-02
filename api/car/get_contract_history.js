import axios from "axios";
import Cookies from "js-cookie";
import config from "../../config/config";

const getContractsHistoryApi=async()=>{
    const token=Cookies.get("token");
    try{
      const response=await axios.get(config.GET_CONTRACTS_HISTORY,{
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

  export default getContractsHistoryApi;