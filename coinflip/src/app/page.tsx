import {
  GameContainerComponent,
  HeaderComponent,
  SidebarComponent
} from "@/components/index";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full bg-[#1a2c38] ">
      <HeaderComponent />
      <div className="h-full w-full px-8 py-5 flex flex-row justify-center items-center">
        <SidebarComponent />
        <GameContainerComponent />
      </div>
    </div>
  );
}
