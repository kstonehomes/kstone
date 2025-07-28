"use client";

import Link from "next/link";
import { FaFilePdf } from "react-icons/fa";

interface DownloadButtonProps {
  href?: string | null;
  fileName?: string | null;
}

export default function DownloadPDFButton({
  href,
  fileName,
}: DownloadButtonProps) {
  if (!href) return null;

  return (
    <Link
      href={href}
      target="_blank"
      download={fileName || undefined}
      className="btn btn-download "
    >
      Download Brochure <FaFilePdf className="text-lg_" />
    </Link>
  );
}
