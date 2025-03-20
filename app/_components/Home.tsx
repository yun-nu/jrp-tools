import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/Card";
import { LuGithub } from "react-icons/lu";
import { RiMailSendLine } from "react-icons/ri";
import StyledLink from "./StyledLink";
import { SiKofi } from "react-icons/si";
import { HowTo } from "./HowTo";

export default function Home() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Latest news: Update #1 (M D)</p>

        <div>Quick how-to:</div>
        <HowTo />
        <div>
          Planned upcoming features: - Functionality to set characters as
          inactive - Functionality to generate selected table in html
        </div>
      </CardContent>
      <CardFooter className="text-sm">
        <div className="flex flex-col gap-2">
          For general suggestions or bug reports:
          <StyledLink type="self" href="/account/contact">
            <RiMailSendLine /> Contact form
          </StyledLink>
          <StyledLink type="self" href="https://github.com/yun-nu/jrp-tools">
            <LuGithub /> Open a PR or issue on github
          </StyledLink>
          <div>
            If you like the app please consider{" "}
            <StyledLink type="self" href="https://ko-fi.com/yunnu">
              <SiKofi />
              buying me a Ko-fi
            </StyledLink>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
