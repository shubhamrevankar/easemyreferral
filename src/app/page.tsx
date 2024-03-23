"use client"

import Image from "next/image";
import { Button } from "@/components/ui/button"
import AddIcon from '@mui/icons-material/Add';
import { redirect } from "next/navigation";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-screen-2xl h-screen max-h-[1000px]">
      <div className="flex items-center justify-center h-screen max-h-[1000px]">
        <Link href={"/createsession"}>
          <Button>
            <AddIcon/> {" "} Create Session
          </Button>
        </Link>
      </div>
    </div>
  );
}
