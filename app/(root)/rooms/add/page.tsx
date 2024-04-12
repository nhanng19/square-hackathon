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
import { MoreHorizontal } from "lucide-react";
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
import { formatMoney } from "@/utils/server-helpers";

const Page = () => {
  const { data, error } = useSWR("/api/catalogs/list_catalogs");
  const [products, setProducts] = useState([]);
  useEffect(() => {
    if (data?.objects) {
      setProducts(data.objects);
    }
  }, [data]);

  const handleOpenStream = (productId : string) => { 
    const newWindowFeatures = "width=500,height=1000,left=100,top=100";
    const roomUrl = `${
      process.env.NEXT_PUBLIC_ENVIRONMENT === "production"
        ? process.env.NEXT_PUBLIC_PRODUCTION_BASE_URL
        : process.env.NEXT_PUBLIC_DEVELOPMENT_BASE_URL
      }video/${productId.replace(/[^\w-]/g, "")}`;
    console.log(roomUrl)
    previousWindow = window.open(
      roomUrl,
      "_blank",
      newWindowFeatures
    );
  }

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
                        <Button onClick={() => handleOpenStream(itemData.name)}>Start</Button>
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