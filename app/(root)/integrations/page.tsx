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
              integrate SquareEdge with just a few cliks.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {sites?.map((site: Site) => (
              <Card x-chunk="dashboard-04-chunk-1">
                <CardHeader>
                  <CardTitle>
                    {site.siteTitle}{" "}
                    <Badge className="bg-green-500 uppercase hover:bg-green-500">
                      {site.isPublished ? "Published" : "Not Published"}
                    </Badge>
                  </CardTitle>
                  <CardDescription className="underline">
                    <a target="_blank" href={`https://${site.domain}`}>
                      {site.domain}
                    </a>
                  </CardDescription>
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
