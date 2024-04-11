import useUser from "@/hooks/useUser";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const UserButton = () => {
    const { user } = useUser();
    console.log(user)
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="border cursor-pointer">
            <AvatarImage
              src={`https://www.gravatar.com/avatar/${
                user?.avatar || ""
              }?d=https%3A%2F%2Fimages.ctfassets.net%2F1wryd5vd9xez%2F5JA4qHKaSk47mqhd0M8s9p%2F99b9a16e0012ada4e2ecf31a4b4fb1fe%2Fsquare_logo.jpeg`}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-4">
          <div className="grid gap-4">
            <div className="space-y-2">
                        <h4 className="font-medium leading-none">Nhan Nguyen</h4>
              <p className="text-sm text-muted-foreground"> 
               nhanng19@gmail.com
              </p>
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    );
};

export default UserButton;
