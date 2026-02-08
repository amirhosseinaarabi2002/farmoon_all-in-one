import config from "@/config/config";
import licenseErrorMessages from "@/utils/licenseErrorMessages";
import axios from "axios";
import Cookies from "js-cookie";

const LICENSE_STATUS_API_URL = "https://www.penalty.vsrv.ir/api/top/licenseStatusInquiry"

export const getLicenseStatusApi = async (mobile, nationalCode) => {
  try {
    const token = Cookies.get("token");

    const response = await axios.post(
      LICENSE_STATUS_API_URL,
      {
        mobile_number: mobile,
        national_code: nationalCode,
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
