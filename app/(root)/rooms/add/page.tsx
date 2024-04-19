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
import { toast } from "sonner";
import { createRoom } from "@/lib/actions/room.action";
import { encodeRoomId } from "@/utils/helpers";
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


  let previousWindow = null;
  return (
    <div className="flex flex-col w-full gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Start a sales room</CardTitle>
          <CardDescription>
            Select one of your products to start a live, virtual sales room.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Image</span>
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Price</TableHead>
                <TableHead className="hidden md:table-cell">
                  Visibility
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  Updated at
                </TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.length > 0 &&
                products.map((product: any) => {
                  const itemData = product.item_data;
                  const price =
                    itemData.variations[0].item_variation_data.price_money
                      .amount;
                  const currency =
                    itemData.variations[0].item_variation_data.price_money
                      .currency;
                  const date = new Date(product.updated_at).toLocaleString();
                  return (
                    <TableRow>
                      <TableCell className="hidden sm:table-cell">
                        <img
                          alt="Product image"
                          className="aspect-square rounded-md object-cover"
                          height="64"
                          src={itemData.ecom_image_uris}
                          width="64"
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {itemData.name}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Draft</Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {formatMoney(price, currency)}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {itemData.ecom_visibility}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {date}
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button>
                              Start
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="min-w-full !h-screen">
                            <StreamLoadingScreen
                              userId={user?.userId as string}
                              productName={itemData.name}
                              productDescription={itemData.description}
                              price={formatMoney(price, currency)}
                              productUrl={itemData.ecom_uri}
                            />
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing <strong>1-10</strong> of <strong>{products.length}</strong>{" "}
            products
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
