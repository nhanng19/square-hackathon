"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { formatMoney } from "@/utils/server-helpers";
import useUser from "@/hooks/useUser";
import StreamLoadingScreen from "@/components/stream-loading-screen";

const Page = () => {
  const { data, error } = useSWR("/api/catalogs/list_catalogs");
  const [products, setProducts] = useState([]);
  const { user } = useUser();
  useEffect(() => {
    if (data?.objects) {
      setProducts(data.objects);
    }
  }, [data]);

  return (
    <>
      <h1 className="font-bold mb-4 text-3xl">Sales room</h1>
      <Card>
        <CardHeader>
          <CardTitle>Start a sales room</CardTitle>
          <CardDescription>
            Select one of your products to start a live, virtual sales room.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 h-full w-full gap-4 ">
            {products.length > 0 &&
              products.map((product: any) => {
                const itemData = product.item_data;
                const price =
                  itemData.variations[0].item_variation_data.price_money.amount;
                const currency =
                  itemData.variations[0].item_variation_data.price_money
                    .currency;
                return (
                  <div key={itemData.name} className="relative block overflow-hidden rounded-lg border  p-4 sm:p-6 lg:p-8 bg-background">
                    <span className="absolute inset-x-0 bottom-0 h-2 "></span>

                    <div className="sm:flex sm:justify-between sm:gap-4">
                      <div>
                        <h3 className="text-lg font-bold sm:text-xl line-clamp-1">
                          {itemData.name}
                        </h3>

                        <p className="mt-1 text-xs font-medium ">
                          {formatMoney(price, currency)}
                        </p>
                      </div>

                      <div className="hidden sm:block sm:shrink-0">
                        <img
                          alt=""
                          src={itemData.ecom_image_uris}
                          className="size-16 rounded-lg object-cover shadow-sm"
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="text-pretty text-sm line-clamp-3">
                        {itemData.description}
                      </p>
                    </div>

                    <dl className="mt-6 flex gap-4 sm:gap-6 justify-end">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button>Go Live</Button>
                        </DialogTrigger>
                        <DialogContent className="min-w-full !h-screen">
                          <StreamLoadingScreen
                            userId={user?.userId as string}
                            productName={itemData.name}
                            catalogId={product.id}
                          />
                        </DialogContent>
                      </Dialog>
                    </dl>
                  </div>
                );
              })}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Page;
