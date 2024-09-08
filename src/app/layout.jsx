import Footer from "@/components/Footer";
import "./globals.css";
import Nav from "@/components/Nav";

export const metadata = {
  title: "Exigent | Blog",
  description: "Exigent's Blog",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className="antialiased"
      >
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
