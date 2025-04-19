import {
  GameContainerComponent,
  HeaderComponent,
  SidebarComponent
} from "@/components/index";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full bg-[#1a2c38] ">
      <HeaderComponent />
      <div className="
      h-full w-full px-4 py-5 flex flex-col-reverse justify-center items-center
      sm:h-full sm:w-full sm:px-8 sm:py-5 sm:flex sm:flex-col-reverse sm:justify-center sm:items-center
      md:h-full md:w-full md:px-8 md:py-5 md:flex md:flex-col-reverse md:justify-center md:items-center
      lg:h-full lg:w-full lg:px-8 lg:py-5 lg:flex lg:flex-row lg:justify-center lg:items-center">
        <SidebarComponent />
        <GameContainerComponent />
      </div>
    </div>
  );
}
