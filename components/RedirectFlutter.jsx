
import Cookies from "js-cookie";
export const redirectToFarmoon=(farmoonUrl)=>{
    const token=Cookies.get("token");
    const mobileNumber=Cookies.get("mobileNumber");
    const walletCredit=Cookies.get("wallet");
    localStorage.setItem("flutter.token",`"${token}"`);
    localStorage.setItem("flutter.userMobileNumber",`"${mobileNumber}"`);
    localStorage.setItem("flutter.wallet",`${walletCredit}`);
    window.location.href=farmoonUrl;
}