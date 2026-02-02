import store from "@/store";
import "@/styles/globals.css";
import { ToastProvider } from "@heroui/react";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }) {
  return (
    <>
    <ToastProvider placement="top-center"
          toastProps={{
            radius: "md",
            color: "danger",
            variant: "flat",
            timeout: 2000,
          }} />
      <Component {...pageProps} />
    </>
  );
}
