"use client";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { Button } from "@heroui/button";
import {
  Navbar as HerouiNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
} from "@heroui/navbar";
import Link from "next/link";
import Image from "next/image";
import { SearchIcon, UserIcon } from "@/components/icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArcherIcon, ArrowDownIcon, Contact01Icon, InformationCircleFreeIcons, Message01Icon, User02Icon, User03Icon, VisionFreeIcons } from "@hugeicons/core-free-icons";
import { Dialog, DialogTitle } from "./dialog/dialogProvider";
import { Input } from "@heroui/input";
import { dialog } from "./dialog/dialog";
import AnimatedButton from "./buttons/animatedButton";
import { useRouter } from "next/navigation";

export const AcmeLogo = () => (
  <Image src="/logo_tr.png" alt="AAKC MS" width={32} height={32} className="h-8 w-8" />
);

export const Navbar = () => {
  const icons = {
    search: <SearchIcon className="text-base pointer-events-none flex-shrink-0" />,
    user: <UserIcon className="h-5 w-5" />,
  };
  const router = useRouter();

  return (
    <HerouiNavbar maxWidth="xl" position="sticky" className="bg-background/50">
      {/* Left: Brand */}
      <NavbarContent justify="start" className="basis-1/5 sm:basis-full">
        <NavbarBrand>
          <Link href="/" className="flex items-center gap-2">
            <AcmeLogo />
            <p className="font-bold text-inherit font-heading">AAKC MS</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* Center: Navigation */}
      <NavbarContent justify="center" className="hidden sm:flex gap-4 text-sm">
        <NavbarItem isActive className="text-sm">
          <Link aria-current="page" href="/">
            <AnimatedButton label="Home" />
          </Link>
        </NavbarItem>
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                radius="sm"
                variant="light"
                endContent={<HugeiconsIcon icon={ArrowDownIcon} className="h-4 w-4" />}
              >
                <AnimatedButton label="The School" />
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu aria-label="The School" itemClasses={{ base: "gap-4" }} onAction={(key) => { router.push(`/${key}`); console.log(key) }}>
            <DropdownItem key="about" startContent={<HugeiconsIcon icon={InformationCircleFreeIcons} className="h-4 w-4" />}><AnimatedButton label="About Us" /></DropdownItem>
            <DropdownItem key="usage_metrics" startContent={<HugeiconsIcon icon={ArcherIcon} className="h-4 w-4" />}><AnimatedButton label="Achievement" /></DropdownItem>
            <DropdownItem key="production_ready" startContent={<HugeiconsIcon icon={Message01Icon} className="h-4 w-4" />}><AnimatedButton label="Principal Message" /></DropdownItem>
            <DropdownItem key="99_uptime" startContent={<HugeiconsIcon icon={VisionFreeIcons} className="h-4 w-4" />}><AnimatedButton label="Mission & Vision" /></DropdownItem>
            <DropdownItem key="supreme_support" startContent={<HugeiconsIcon icon={Contact01Icon} className="h-4 w-4" />}><AnimatedButton label="Contact Us" /></DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <NavbarItem className="text-sm">
          <Link aria-current="page" href="#">
            <AnimatedButton label="Notice" />
          </Link>
        </NavbarItem>
        <NavbarItem className="text-sm">
          <Link color="foreground" href="/docs">
            <AnimatedButton label="Academics" />
          </Link>
        </NavbarItem>
      </NavbarContent>

      {/* Right: Actions */}
      <NavbarContent justify="end" className="basis-1/5 sm:basis-full">
        {/* Desktop search */}
        <div className="hidden lg:flex">
          <Button
            variant="faded"
            radius="full"
            className="bg-background/50 border-white/50"
            isIconOnly
            onPress={() => { dialog.show(<SearchDialog />) }}
          >
            {icons.search}
          </Button>
        </div>
        {/* Admission button */}
        <NavbarItem className="hidden md:flex">
          <Button
            as={Link}
            href="/about"
            className="font-normal text-white bg-black"
            startContent={<HugeiconsIcon icon={User03Icon} />}
            variant="solid"
            radius="full"
          >
            <AnimatedButton label="Admission" />
          </Button>
        </NavbarItem>
      </NavbarContent>

      {/* Mobile menu */}
      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <NavbarMenuToggle />
      </NavbarContent>
      <NavbarMenu>
        <NavbarItem isActive className="text-sm">
          <Link aria-current="page" href="#">
            <AnimatedButton label="Home" />
          </Link>
        </NavbarItem>
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                radius="sm"
                variant="light"
                endContent={<HugeiconsIcon icon={ArrowDownIcon} className="h-4 w-4" />}
              >
                <AnimatedButton label="The School" />
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu aria-label="The School" itemClasses={{ base: "gap-4 z-10" }}>
            <DropdownItem key="about" href="/about" startContent={<HugeiconsIcon icon={InformationCircleFreeIcons} className="h-4 w-4" />}><AnimatedButton label="About Us" /></DropdownItem>
            <DropdownItem key="usage_metrics" startContent={<HugeiconsIcon icon={ArcherIcon} className="h-4 w-4" />}><AnimatedButton label="Achievement" /></DropdownItem>
            <DropdownItem key="production_ready" startContent={<HugeiconsIcon icon={Message01Icon} className="h-4 w-4" />}><AnimatedButton label="Principal Message" /></DropdownItem>
            <DropdownItem key="99_uptime" startContent={<HugeiconsIcon icon={VisionFreeIcons} className="h-4 w-4" />}><AnimatedButton label="Mission & Vision" /></DropdownItem>
            <DropdownItem key="supreme_support" startContent={<HugeiconsIcon icon={Contact01Icon} className="h-4 w-4" />}><AnimatedButton label="Contact Us" /></DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <NavbarItem className="text-sm">
          <Link aria-current="page" href="#">
            <AnimatedButton label="Notice" />
          </Link>
        </NavbarItem>
        <NavbarItem className="text-sm">
          <Link color="foreground" href="#">
            <AnimatedButton label="Academics" />
          </Link>
        </NavbarItem>
      </NavbarMenu>
    </HerouiNavbar>
  );
};


function SearchDialog() {
  return (
    <Dialog>
      <DialogTitle>Search</DialogTitle>
      <Input variant="bordered" placeholder="Search..." type="search" startContent={<SearchIcon />} />
      <div className="flex h-36 flex-col items-center justify-center gap-2">
        <p className="text-sm text-muted-foreground opacity-50">Search for Something</p>
      </div>
    </Dialog>
  )
}