import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { EllipsisVerticalIcon, ShoppingCart, UserIcon } from "lucide-react";
import ModeToggle from "./mode-toggle";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "@/components/ui/separator";

export default function Header() {
  return (
    <header className="w-full border-b pb-3 md:pb-5">
      <div className="flex-between">
        <div className="flex-start">
          <Link href={"/"} className="flex-start">
            <Image
              src={"/images/logo.svg"}
              alt="E-Commerce"
              height={48}
              width={48}
            ></Image>
            <span className="hidden lg:block font-bold text-2xl ml-3">
              E-Commerce
            </span>
          </Link>
        </div>
        <div className="hidden sm:block space-x-2">
          <ModeToggle />
          <Button asChild variant={"ghost"}>
            <Link href={"/cart"}>
              <ShoppingCart /> Cart
            </Link>
          </Button>
          <Button asChild>
            <Link href={"/sign-in"}>
              <UserIcon /> Sign In
            </Link>
          </Button>
        </div>
        <Sheet>
          <SheetTrigger className="block sm:hidden">
            <EllipsisVerticalIcon />
          </SheetTrigger>
          <SheetContent className="block sm:hidden">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <Separator className="my-2" />
            <div className="flex flex-col gap-2 items-start">
              <ModeToggle />
              <Button asChild variant={"ghost"}>
                <Link href={"/cart"}>
                  <ShoppingCart /> Cart
                </Link>
              </Button>
              <Button asChild>
                <Link href={"/sign-in"}>
                  <UserIcon /> Sign In
                </Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
