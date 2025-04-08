"use client";

import Image, { StaticImageData } from "next/image";
import { useState } from "react";

type Props = {
  src: string | StaticImageData;
  alt: string;
  className?: string;
};

export default function ExpandableImage({ src, alt, className }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Image
        src={src}
        alt={alt}
        onClick={() => setIsOpen(true)}
        className={`cursor-pointer max-w-sm rounded shadow ${className}`}
      />
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
        >
          <Image
            src={src}
            alt={alt}
            className="max-h-[90vh] max-w-[90vw] rounded"
          />
        </div>
      )}
    </>
  );
}
