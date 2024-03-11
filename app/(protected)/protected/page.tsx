import DeployButton from "@/components/DeployButton";
import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import FetchDataSteps from "@/components/tutorial/FetchDataSteps";
import Header from "@/components/Header";
import { redirect } from "next/navigation";
import Banner from "@/components/Banner";
import Logo from "@/components/Logo";
import AvatarNav from "../_components/AvatarNav";
import DesktopNavbar from "@/components/DesktopNavbar";
import TrendData from "../_components/TrendData";
import PageHeadings from "@/components/PageHeadings";
import EmptyStates from "../_components/EmptyStates";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import RecepientsCard from "../_components/RecepientsCard";
import DashDesign from "../_components/DashDesign";
import CardLoading from "@/components/CardLoading";
import DesignLoading from "@/components/DesignLoading";
import { Rocket } from "lucide-react";
import DashboardChecks from "../_components/DashboardChecks";

const people = [
  {
    id: 1,
    avatar: "OM",
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    amount: "+$1,999.00"
  },
  {
    id: 2,
    avatar: "JL",
    name: "Jackson Leen",
    email: "jackson.lee@email.com",
    amount: "+$39.00"
  },
  {
    id: 1,
    avatar: "OM",
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    amount: "+$1,999.00"
  },
  {
    id: 1,
    avatar: "OM",
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    amount: "+$1,999.00"
  },
  {
    id: 1,
    avatar: "OM",
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    amount: "+$1,999.00"
  },
  {
    id: 1,
    avatar: "OM",
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    amount: "+$1,999.00"
  },
]


export default async function ProtectedPage() {

  return (
    <div className="flex-1 w-full p-4 space-y-3 max-w-5xl mx-auto border-2 border-green-600 flex flex-col space-x-2 items-center">
      <TrendData />
      <div className="flex">
        <Card className="col-span-4 border-2 border-black bg-yellow-200/80 shadow-lg text-primary">
          <CardHeader>
          
            <CardTitle className="flex space-x-5"> <span>Almost Ready to go </span><Rocket /> </CardTitle>
          </CardHeader>
          <CardContent className="pl-2 w-full">
            {/* <Overview /> */}
            <DashboardChecks />
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4  w-full border-2 border-black grid-cols-1 md:grid-cols-2">
        <DashDesign title="Invoice design" description="This is your current invoice design" imageSrc="/orders.png" designLink="" />
        <DashDesign title="Invoice design" description="This is your current invoice design" imageSrc="/orders.png" designLink="" />
      </div>
      <CardLoading />
      <DesignLoading />

      <div className="grid gap-4  w-full border-2 border-black grid-cols-1 md:grid-cols-2">
        <Card className="">
          <CardHeader>
            <CardTitle>Top Recepients</CardTitle>
            <CardDescription>
              You made 265 sales this month.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecepientsCard />
          </CardContent>
        </Card>
        <Card className="">
          <CardHeader>
            <CardTitle>Top Recepients</CardTitle>
            <CardDescription>
              You made 265 sales this month.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecepientsCard />
          </CardContent>
        </Card>
      </div>
      <EmptyStates title="Empty Data set" description="Seems like you haven't created any invoice or receipt yet" buttonLink="/protected/invoices/create" imageSrc="/dashempty.png"  buttonTitle="Get Started" />
    </div>
  );
}
