import axios from "axios";
import config from "../../config/config";
const GET_OTP_API_URL = "https://payment.vada.ir/api/auth/login-otp";
const SEND_OTP_API_URL = "https://payment.vada.ir/api/auth/check-otp";
const LOGIN_KHALAFI_API_URL =
  "https://www.penalty.vsrv.ir/api/loginWithApprooTokenV2";
export const getOtp = async (mobileNumber) => {
  try {
    const response = await axios.post(GET_OTP_API_URL, {
      mobile: mobileNumber,
      package_name: config.PACKAGE_NAME,
    });
    return response;
  } catch (error) {
    if (error.response) {
      const { status } = error.response;
      if (status === 429) {
        return {
          status: 429,
          message: "تلاش بیش از حد ، لطفا پس از یک دقیقه تلاش کنید",
        };
      } else if (status === 403) {
        return { status: 403, message: "دسترسی غیرمجاز" };
      } else if (status === 500) {
        return {
          status: 500,
          message: "مشکلی رخ داده است، لطفا مجددا تلاش کنید.",
        };
      }
    }
    return {
      status: error.response?.status || 500,
      message: "مشکلی رخ داده است، لطفا مجددا تلاش کنید.",
    };
  }
};

export const sendOtp = async (mobileNumber, otpCode) => {
  try {
    const response = await axios.post(SEND_OTP_API_URL, {
      mobile: mobileNumber,
      token: otpCode,
    });
    return response;
  } catch (error) {
    if (error.response) {
      const { status } = error.response;
      if (status === 429) {
        return {
          status: 429,
          message: "تلاش بیش از حد ، لطفا پس از یک دقیقه تلاش کنید",
        };
      } else if (status === 403) {
        return { status: 403, message: "دسترسی غیرمجاز" };
      } else if (status === 500) {
        return {
          status: 500,
          message: "مشکلی رخ داده است، لطفا مجددا تلاش کنید.",
        };
      } else if (status === 400) {
        return { status: 400, message: "کد وارد شده اشتباه است" };
      }
    }
    return {
      status: error.response?.status || 500,
      message: "مشکلی رخ داده است، لطفا مجددا تلاش کنید.",
    };
  }
};

export const loginKhalafi = async (token) => {
  try {
    const response = axios.post(
      LOGIN_KHALAFI_API_URL,
      {
        token: token,
        package_name: config.PACKAGE_NAME,
      },
      {
        headers: {
          "x-api-key": config.X_API_KEY,
        },
      }
    );
    return response;
  } catch (error) {
    if (error.response) {
      const { status } = error.response;
      if (status === 429) {
        return {
          status: 429,
          message: "تلاش بیش از حد ، لطفا پس از یک دقیقه تلاش کنید",
        };
      } else if (status === 403) {
        return { status: 403, message: "دسترسی شما توسط سیستم محدود شده است" };
      } else if (status === 500) {
        return {
          status: 500,
          message: "مشکلی رخ داده است، لطفا مجددا تلاش کنید.",
        };
      } else if (status === 400) {
        return { status: 400, message: "کد وارد شده اشتباه است" };
      }
    }
    return {
      status: error.response?.status || 500,
      message: "مشکلی رخ داده است، لطفا مجددا تلاش کنید.",
    };
  }
};
