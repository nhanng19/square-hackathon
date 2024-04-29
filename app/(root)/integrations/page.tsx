"use client";

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import useSWR from "swr";
import { useState, useEffect } from "react";
import { Site } from "square";
import { Badge } from "@/components/ui/badge";
import { ConnectToSquare } from "@/components/tasks-component";
import Task from "@/components/task";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const Integrations = () => {
  const { data, error } = useSWR("api/sites/list_sites");
  const [sites, setSites] = useState([]);
  useEffect(() => {
    if (data?.sites) {
      setSites(data.sites);
    }
    if (error) {
      console.log(error);
    }
  }, [data, error]);
  return (
    <>
      <h1 className="font-bold mb-4 text-3xl">Integrations</h1>
      {sites.length > 0 ? (
        <Card x-chunk="dashboard-04-chunk-1">
          <CardHeader>
            <CardTitle>Square Online Integration</CardTitle>
            <CardDescription>
              Already using Square online for your e-commerce? Seamlessly
              integrate SquareEdge with just a few clicks.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {sites?.map((site: Site) => (
              <Card x-chunk="dashboard-04-chunk-1">
                <CardHeader className="flex flex-row justify-between">
                  <div className="flex flex-col justify-start items-start space-y-4">
                    <CardTitle className="flex flex-row gap-2 justify-center items-center">
                      {site.siteTitle}
                      <Badge className="bg-green-500 uppercase hover:bg-green-500">
                        {site.isPublished ? "Published" : "Not Published"}
                      </Badge>
                    </CardTitle>
                    <CardDescription className="underline">
                      <a target="_blank" href={`https://${site.domain}`}>
                        {site.domain}
                      </a>
                    </CardDescription>
                  </div>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="default">Integrate this site</Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>
                          Integrate Square Edge
                        </SheetTitle>
                        <SheetDescription>
                          Integrate Square Edge with <span className="underline">{site.domain}</span>. Click save
                          when you're done.
                        </SheetDescription>
                      </SheetHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Name
                          </Label>
                          <Input
                            id="name"
                            value="Pedro Duarte"
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="username" className="text-right">
                            Username
                          </Label>
                          <Input
                            id="username"
                            value="@peduarte"
                            className="col-span-3"
                          />
                        </div>
                      </div>
                      <SheetFooter>
                        <SheetClose asChild>
                          <Button type="submit">Save changes</Button>
                        </SheetClose>
                      </SheetFooter>
                    </SheetContent>
                  </Sheet>
                </CardHeader>
              </Card>
            ))}
          </CardContent>
        </Card>
      ) : (
        <Task task={ConnectToSquare()} />
      )}
    </>
  );
};

export default Integrations;
