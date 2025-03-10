"use client";

import { ArrowBigRightIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./ui/Breadcrumb";

export default function BreadcrumbHeader() {
  const path = usePathname().slice(9);
  const captalizedPath = path
    ? path?.charAt(0).toUpperCase() + path?.slice(1)
    : null;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/account/">Account</BreadcrumbLink>
        </BreadcrumbItem>
        {captalizedPath && (
          <BreadcrumbSeparator>
            <ArrowBigRightIcon />
          </BreadcrumbSeparator>
        )}
        <BreadcrumbItem>
          <BreadcrumbLink href={path}>{captalizedPath}</BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
