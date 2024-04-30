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
import { Textarea } from "@/components/ui/textarea";
import { TwitterPicker } from "react-color";
import { createSnippet } from "@/utils/snippet";
import fetchJson from "@/lib/fetchson";
import { toast } from "sonner";
import useUser from "@/hooks/useUser";

const Integrations = () => {
  const { data, error } = useSWR("api/sites/list_sites");
  const [sites, setSites] = useState<Site[]>([]);
  const { user } = useUser();
  const [modalTitle, setModalTitle] = useState<string>("Now with Edge!");
  const [modalMessage, setModalMessage] = useState<string>(
    "This Square Online store uses Edge for live product demos and sales."
  );
  const [modalColor, setModalColor] = useState<string>("rgb(235, 20, 76)");
  const [modalCta, setModalCta] = useState<string>("Take a look");
  const [modalUrl, setModalUrl] = useState<string>(sites[0]?.domain || "/");
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
  const handleChangeComplete = (color: { hex : string }) => {
    setModalColor(color.hex);
  };

  useEffect(() => {
    if (data?.sites) {
      setSites(data.sites);
      setModalUrl(data.sites[0].domain);
    }
    if (error) {
      console.log(error);
    }
  }, [data, error]);

  const handleUpsertSnippet = async (siteId: string | undefined) => {
    try {
      const snippet = {
        content: createSnippet({
          baseUrl:
            process.env.NEXT_PUBLIC_ENVIRONMENT === "production"
              ? process.env.NEXT_PUBLIC_PRODUCTION_BASE_URL!
              : process.env.NEXT_PUBLIC_DEVELOPMENT_BASE_URL!,
          userId: user?.userId as string,
          modalColor,
          modalTitle,
          modalCta,
          modalMessage,
          modalUrl: `https://${modalUrl}`,
        }),
      };
      const response = await fetchJson(`/api/snippet/upsert/${siteId}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(snippet),
      });
      toast.success("Square Edge succesfully installed!");
    } catch (error) {
      toast.error(`${error}`);
    }
  };
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
              <Card key={site.id} x-chunk="dashboard-04-chunk-1">
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
                    <SheetContent className="!max-w-[30vw] p-8 overflow-y-auto">
                      <SheetHeader>
                        <SheetTitle>Integrate Square Edge</SheetTitle>
                        <SheetDescription>
                          Integrate Square Edge with{" "}
                          <span className="underline">{site.domain}</span>.
                          Customize your site's popup modal and save changes
                          when you're done
                        </SheetDescription>
                      </SheetHeader>
                      <div className="flex flex-col gap-6 py-8">
                        <div className="flex flex-col gap-4 relative">
                          <Label htmlFor="modalColor">Color</Label>
                          <div
                            onClick={() => setShowColorPicker(!showColorPicker)}
                            style={{ backgroundColor: modalColor }}
                            className="rounded-full w-8 h-8 cursor-pointer"
                          ></div>
                          {showColorPicker && (
                            <TwitterPicker
                              className="!absolute !top-[75px]"
                              onChangeComplete={handleChangeComplete}
                            />
                          )}
                        </div>
                        <div className="flex flex-col gap-4">
                          <Label htmlFor="modalTitle">Title</Label>
                          <Input
                            id="modalTitle"
                            value={modalTitle}
                            onChange={(e) => setModalTitle(e.target.value)}
                            className="col-span-3"
                          />
                        </div>
                        <div className="flex flex-col gap-4">
                          <Label htmlFor="modalMessage">Message</Label>
                          <Textarea
                            id="modalMessage"
                            value={modalMessage}
                            placeholder="Type your message here."
                            onChange={(e) => setModalMessage(e.target.value)}
                          />
                        </div>
                        <div className="flex gap-4 w-full">

                          <div className="flex flex-1 flex-col gap-4">
                            <Label htmlFor="modalCta">Call to action</Label>
                            <Input
                              id="modalCta"
                              value={modalCta}
                              onChange={(e) => setModalCta(e.target.value)}
                              className="col-span-3"
                            />
                          </div>
                          <div className="flex flex-1 flex-col gap-4">
                            <Label htmlFor="modalUrl">CTA URL</Label>
                            <Input
                              id="modalUrl"
                              value={modalUrl}
                              onChange={(e) => setModalUrl(e.target.value)}
                              className="col-span-3"
                            />
                          </div>
                        </div>

                        <div className="flex flex-col gap-4 items-start">
                          <Label htmlFor="name">Pop up modal</Label>
                          <div
                            className="rounded-2xl border border-blue-100 bg-white p-4 shadow-lg sm:p-6 lg:p-8"
                            role="alert"
                          >
                            <div className="flex items-center gap-4">
                              <span
                                style={{ backgroundColor: modalColor }}
                                className="shrink-0 rounded-full p-2 text-white"
                              >
                                <svg
                                  className="h-4 w-4"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    clip-rule="evenodd"
                                    d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z"
                                    fill-rule="evenodd"
                                  />
                                </svg>
                              </span>

                              <p className="font-medium sm:text-lg text-black">
                                {modalTitle}
                              </p>
                            </div>

                            <p className="mt-4 text-gray-500">{modalMessage}</p>

                            <div className="mt-6 sm:flex sm:gap-4">
                              <a
                                style={{ backgroundColor: modalColor }}
                                className="inline-block w-full rounded-lg px-5 py-3 text-center text-sm font-semibold text-white sm:w-auto"
                                href="#"
                              >
                                Take a Look
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <SheetFooter>
                        <SheetClose asChild>
                          <Button
                            onClick={() => handleUpsertSnippet(site.id)}
                            type="submit"
                          >
                            Save changes
                          </Button>
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
