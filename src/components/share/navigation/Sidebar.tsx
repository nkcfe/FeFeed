import { Button } from '@/components/ui/button';
import { RxHamburgerMenu } from 'react-icons/rx';
import { AiFillGithub, AiFillInstagram } from 'react-icons/ai';
import { FiExternalLink } from 'react-icons/fi';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import Calendar from '@/components/main/calendar/Calendar';
import Category from '@/components/main/Category';
import { Separator } from '@/components/ui/separator';
import IconButton from '../IconButton';
import Link from 'next/link';

interface SidebarProps {
  selectedCategory: string;
  handleSelectCategory: (category: string) => void;
  initialCategories: string[] | null;
  isSideOpen: boolean;
  setIsSideOpen: (isOpen: boolean) => void;
}

export function Sidebar(props: SidebarProps) {
  const {
    selectedCategory,
    handleSelectCategory,
    initialCategories,
    isSideOpen,
    setIsSideOpen,
  } = props;

  return (
    <Sheet open={isSideOpen} onOpenChange={setIsSideOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost">
          <RxHamburgerMenu size={22} />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex min-h-screen flex-col">
        <SheetHeader>
          <SheetTitle>Calendar</SheetTitle>
          <Separator />
          <Calendar />
        </SheetHeader>
        <SheetHeader className="mt-10">
          <SheetTitle>Category</SheetTitle>
          <Separator />
          <Category
            selectedCategory={selectedCategory}
            handleSelectCategory={handleSelectCategory}
            initialCategories={initialCategories}
            setIsSideOpen={setIsSideOpen}
          />
        </SheetHeader>

        <SheetFooter className="mt-auto">
          <Link
            href="https://github.com/nkcfe"
            target="_blank"
            className="w-full"
          >
            <Button className="h-12 w-full gap-2">
              <AiFillGithub size={26} />
              <div>Github</div>
              <FiExternalLink className="ml-auto" size={22} />
            </Button>
          </Link>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
