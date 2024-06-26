
import Link from "next/link";

import { BsTwitter } from "react-icons/bs"

export default function SidebarLogo(){
    
    return(
        <>
        <Link href={'/'} className="rounded-full h-14 w-14 p-4 flex items-center justify-center hover:bg-blue-300 hover:bg-opacity-10 cursor-pointer transition  ">
        <BsTwitter size={28} color="white"/>
        </Link>
       
        </>
    )
}