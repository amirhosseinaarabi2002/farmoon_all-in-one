import config from "@/config/config";
import axios from "axios";
import Cookies from "js-cookie";

const LICENSE_STATUS_API_URL = "https://www.penalty.vsrv.ir/api/top/licenseStatusInquiry"

const getLicenseStatusApi = async (mobile, nationalCode) => {
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
};

export default getLicenseStatusApi;
