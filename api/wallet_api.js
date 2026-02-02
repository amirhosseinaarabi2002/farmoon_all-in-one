import axios from "axios";
import Cookies from "js-cookie";
import config from "../config/config";
const CHARGE_WALLET_API_URL = "https://www.penalty.vsrv.ir/api/gateway";
const GET_WALLET_API_URL = "https://www.penalty.vsrv.ir/api/wallet";
const GET_APPDATA_API_URL = "https://www.penalty.vsrv.ir/api/app-data";

export const getChargeWalletGateWayApi = async (chargeWalletBodyRequest) => {
  const token = Cookies.get("token");
  try {
    const response = await axios.post(
      CHARGE_WALLET_API_URL,
      chargeWalletBodyRequest,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": config.X_API_KEY,
        },
      }
    );
    console.log(response);
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
      } else if (status === 499) {
        return { status: 499, message: "موجودی شما کافی نیست" };
      }
    }
    return {
      status: error.response?.status || 500,
      message: "مشکلی رخ داده است، لطفا مجددا تلاش کنید.",
    };
  }
};

export const getWalletCreditApi = async () => {
  const token = Cookies.get("token");
  try {
    const response = await axios.get(GET_WALLET_API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
        "x-api-key": config.X_API_KEY,
      },
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
      } else if (status === 499) {
        return { status: 499, message: "موجودی شما کافی نیست" };
      }
    }
    return {
      status: error.response?.status || 500,
      message: "مشکلی رخ داده است، لطفا مجددا تلاش کنید.",
    };
  }
};

export const getAppDataApi = async () => {
  const token = Cookies.get("token");

  try {
    const response = await axios.get(GET_APPDATA_API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
        "x-api-key": config.X_API_KEY,
      },
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
      } else if (status === 499) {
        return { status: 499, message: "موجودی شما کافی نیست" };
      }
    }
    return {
      status: error.response?.status || 500,
      message: "مشکلی رخ داده است، لطفا مجددا تلاش کنید.",
    };
  }
};
