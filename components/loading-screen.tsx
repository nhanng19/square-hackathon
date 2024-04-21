import { Loader2 } from "lucide-react";
import Logo from "./svg/logo";

const LoadingScreen = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-4">
      <div className="flex flex-col items-center">
        <Logo />
      </div>
      <div className="flex flex-col justify-center items-center ">
        <h1 className="font-light">{title}</h1>
        <span className="font-normal mb-4">{subtitle}</span>
        <Loader2 className="animate-spin" />
      </div>
    </div>
  );
};

export default LoadingScreen;
