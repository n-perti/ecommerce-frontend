// src/components/navBar.jsx
"use client";

import Link from "next/link";
import { Menu, User, Settings, LogOut, SquareChartGantt } from "lucide-react";
import { Button } from "./button";
import { Sheet, SheetContent, SheetTrigger } from "./sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "./dropdown-menu";
import { useAuth } from "@/context/authContext";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/webcommerces", label: "Websites" },
  { href: "/commerces", label: "Commerces" }
];

export function NavBar() {
  const { isAuthenticated, logOut, userDetails } = useAuth();
  console.log(userDetails)
  return (
    <nav className="bg-background border-b backdrop-blur-md bg-opacity-75">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">Merchant API</span>
          </Link>
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}
            <div className="border-l border-gray-300 h-6 mx-2"></div>
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="User account">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                <DropdownMenuLabel> Hi, {userDetails.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {userDetails.role === "admin" && (
                  <DropdownMenuItem className="text-gray-800">
                    <SquareChartGantt className="h-5 w-5 mr-2" />
                    <Link href="/admin/dashboard">
                      Admin Dashboard
                    </Link>
                  </DropdownMenuItem>
                )}
                    <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-gray-800">
                    <Settings className="h-5 w-5 mr-2" />
                    <Link href="/users/settings">
                      Account Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logOut} className="text-red-500">
                    <LogOut className="h-5 w-5 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/users/login">
                <Button variant="ghost" size="icon" aria-label="User account">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            )}
          </div>
          <div className="md:hidden">
            <Sheet>
                  {isAuthenticated ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" aria-label="User account">
                          <User className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-gray-800">
                          <Settings className="h-5 w-5 mr-2" />
                          <Link href="/users/settings">
                            Account Settings
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={logOut} className="text-red-500">
                          <LogOut className="h-5 w-5 mr-2" />
                          Logout
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <Link href="/users/login">
                      <Button variant="ghost" size="icon" aria-label="User account">
                        <User className="h-5 w-5" />
                      </Button>
                    </Link>
                  )}
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-sm font-medium"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;