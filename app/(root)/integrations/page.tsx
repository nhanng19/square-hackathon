"use client";

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useSWR from "swr";
import { useState, useEffect } from "react";
import { Site } from "square";
import { Badge } from "@/components/ui/badge";

const Integrations = () => {
  const { data, error } = useSWR("api/sites/list_sites");
  const [sites, setSites] = useState([]);
  console.log(data);
  useEffect(() => {
    if (data?.sites) {
      setSites(data.sites);
    }
    if (error) {
      console.log(error);
    }
  }, [data, error]);
  return (
  
      <Card x-chunk="dashboard-04-chunk-1">
        <CardHeader>
          <CardTitle>
            Square Online Integration 
          </CardTitle>
          <CardDescription>
            Already using Square online for your e-commerce? Seamlessly
            integrate SquareEdge with just a few cliks.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {sites.length > 0 &&
            sites?.map((site: Site) => (
              <Card x-chunk="dashboard-04-chunk-1">
                <CardHeader>
                  <CardTitle>
                    {site.siteTitle} <Badge className="bg-green-500 uppercase hover:bg-green-500">{site.isPublished ? "Published" : "Not Published"}</Badge>
                  </CardTitle>
                  <CardDescription className="underline">
                            <a target="_blank" href={`https://${site.domain}`}>{site.domain}</a>
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
        </CardContent>
        {/* <CardFooter className="border-t px-6 py-4">
          <Button>Save</Button>
        </CardFooter> */}
      </Card>
  );
};

export default Integrations;
