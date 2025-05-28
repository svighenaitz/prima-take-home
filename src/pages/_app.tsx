import { type AppType } from "next/app";
import { Geist } from "next/font/google";

import { api } from "@/utils/api";

import "@/styles/globals.css";
import { BottomNav } from "components/navigation/BottomNav";

const geist = Geist({
  subsets: ["latin"],
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className={geist.className}>
      <Component {...pageProps} />
      <BottomNav />
    </div>
  );
};

export default api.withTRPC(MyApp);
