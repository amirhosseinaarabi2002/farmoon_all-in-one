import config from "@/config/config";
import licenseErrorMessages from "@/utils/licenseErrorMessages";
import axios from "axios";
import Cookies from "js-cookie";

const NEGATIVE_STATUS_API_URL = "https://www.penalty.vsrv.ir/api/top/licenseNegativePointInquiry"

export const getNegativeStatusApi = async (mobile, nationalCode, licenseNo) => {
  try {
    const token = Cookies.get("token");

    const response = await axios.post(
      NEGATIVE_STATUS_API_URL,
      {
        mobile_number: mobile,
        national_code: nationalCode,
        license_no: licenseNo,
        packageName: config.PACKAGE_NAME,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": config.X_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    const status = error?.response?.status;

    throw new Error(
      licenseErrorMessages[status] || "خطا در دریافت اطلاعات"
    );
  }
};