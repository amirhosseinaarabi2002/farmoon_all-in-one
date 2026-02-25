import config from "@/config/config";
import licenseErrorMessages from "@/utils/licenseErrorMessages";
import axios from "axios";
import Cookies from "js-cookie";

const SANAD_STATUS_API_URL =
  "https://www.penalty.vsrv.ir/api/top/cardSanadInquiry";

export const getSanadApi = async (
  plate,
  mobile,
  nationalCode
) => {
  try {
    const token = Cookies.get("token");

    const response = await axios.post(
      SANAD_STATUS_API_URL,
      {
        plate: plate,
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
