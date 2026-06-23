import "./globals.css";
import Navtop from "../components/Navtop";
import Navbottom from "../components/Navbottom";
import { GoalsProvider} from "../context/GoalsContext";
import { DailyProgressProvider } from "../context/DailyProgress";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function RootLayout({ children }: { children: React.ReactNode;}) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col min-h-screen">
          <GoogleOAuthProvider  clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
          <GoalsProvider>
          <DailyProgressProvider>
          <Navtop/>
          <main>{children}</main>
          <Navbottom/>
          </DailyProgressProvider>
          </GoalsProvider>
          </GoogleOAuthProvider>
        </div>
      </body>
    </html>
  );
}