import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";
import Logo from "../svg/logo";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const TopBar = () => {
  return (
    <Sheet>
      <nav className="bg-background border-b fixed top-0 z-10 w-full">
        <div className="container max-w-7xl xl:px-0 flex flex-wrap items-center justify-between mx-auto p-4 top-0">
          <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <Logo />
          </Link>
          <SheetTrigger
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <Menu />
          </SheetTrigger>

          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="justify-center items-center font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
              <li>
                <Button variant="default" asChild>
                  <Link href="/login">Log In</Link>
                </Button>
              </li>
              <li>
                <ModeToggle />
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default TopBar;
