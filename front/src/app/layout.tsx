import "./globals.css";
import Navtop from "../components/Navtop";
import Navbottom from "../components/Navbottom";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col min-h-screen">
          <Navtop/>
          <main>{children}</main>
          <Navbottom/>
        </div>
      </body>
    </html>
  );
}