import "./globals.css";
import { Varela_Round } from "next/font/google";

const varela_round = Varela_Round({
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata = {
  title: "TodoList",
  description: "A simple project to demonstrate my CRUD opration skills.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={varela_round.className}>{children}</body>
    </html>
  );
}
