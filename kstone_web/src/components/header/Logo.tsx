import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center">
      {/* Mobile / Small Screen Logo */}
      <Image
        src="/images/ks-logo.png"
        alt="KS Logo"
        width={120}
        height={100}
        className="block"
        priority
      />
    </Link>
  );
}
