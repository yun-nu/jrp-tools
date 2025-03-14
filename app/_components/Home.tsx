import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/Card";

export default function Home() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Latest news:</p>
      </CardContent>
      <CardFooter>
        <div>Quick how-to:</div>
        <div>Why "tools" and not thread tracker, you ask?</div>
        <div>
          Planned upcoming features: - Functionality to set characters as
          inactive - Functionality to generate selected table in html
        </div>
      </CardFooter>
    </Card>
  );
}
