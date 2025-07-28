import Image from "next/image";
import Link from "next/link";

export default function Logo(){
    return(
        <Link href="/" className="">
            <Image
              src={'/images/ks-logo.png'}
              alt="Logo"
              width={120}
              height={100}
              className=""
            />
          </Link>
    )
}