import "@/styles/globals.css";
import "normalize.css";

//import type { Metadata } from 'next';
//import { Inter } from 'next/font/google';

//const inter = Inter({ subsets: ['latin'] });

//export const metadata: Metadata = {
//  title: 'Create Next App',
//  description: 'Generated by create next app'
//};

function RootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
export default RootLayout;
