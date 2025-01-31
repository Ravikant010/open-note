import localFont from "next/font/local";
import { Della_Respira, Pacifico } from 'next/font/google';

// Import local BrandingSF font
export const BrandingSF_Font = localFont({
  src: [
    {
      path: '../public/fonts/BrandingSF-SemiBold.ttf',  // Correct path relative to public folder
      weight: '400',
      style: 'normal',
    },
  ],
});

// Import Pacifico and Della Respira Google fonts
export const Pacifico_Regular = Pacifico({
  subsets: ['latin'],  // Add the required subset
  weight: '400',  // You can adjust the weight accordingly
});

export const DellaRespira_Font = Della_Respira({
  subsets: ['latin'],
  weight: '400',
});
