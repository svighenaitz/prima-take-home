import { type AppType } from "next/app";

import { api } from "@/utils/api";

import { Noto_Sans, Public_Sans } from 'next/font/google';
import '@/styles/globals.css';
import { BottomNav } from 'components/navigation/BottomNav';

const notoSans = Noto_Sans({
  weight: ['400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-sans',
});

const publicSans = Public_Sans({
  weight: ['400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-public-sans',
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className={`${notoSans.variable} ${publicSans.variable} ${notoSans.className}`}>
      <Component {...pageProps} />
      <BottomNav />
    </div>
  );
};

export default api.withTRPC(MyApp);
