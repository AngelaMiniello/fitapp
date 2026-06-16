import "./globals.css";
import Navtop from "../components/Navtop";
import Navbottom from "../components/Navbottom";
import { GoalsProvider} from "../context/GoalsContext";
import { DailyProgressProvider } from "../context/DailyProgress";

export default function RootLayout({ children }: { children: React.ReactNode;}) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col min-h-screen">
          <GoalsProvider>
          <DailyProgressProvider>
          <Navtop/>
          <main>{children}</main>
          <Navbottom/>
          </DailyProgressProvider>
          </GoalsProvider>
        </div>
      </body>
    </html>
  );
}