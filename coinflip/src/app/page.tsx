import GameContainerComponent from "@/components/GameContainer";
import HeaderComponent from "@/components/Header";
import SidebarComponent from "@/components/Sidebar";


export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full bg-[#1a2c38] ">
      <HeaderComponent />
      <div className="h-full w-full p-8 flex flex-row justify-center items-center">
        <SidebarComponent />
        <GameContainerComponent />
      </div>
    </div>
  );
}
