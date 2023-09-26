import AdminDataContextProvider from '../../contexts/AdminDataContext';
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <AdminDataContextProvider>
        <body className={inter.className}>{children}</body>
      </AdminDataContextProvider>
    </html>
  );
}
