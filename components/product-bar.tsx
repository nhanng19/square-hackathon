import useSWR from "swr";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";
import { formatMoney } from "@/utils/server-helpers";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface Props {
  roomId: string;
}

const ProductBar = ({ roomId }: Props) => {
  const { data: roomData } = useSWR(`/api/rooms/get_room/${roomId}`);
  const { data: catalogData } = useSWR(
    `/api/catalogs/retrieve_catalog/${roomData?.catalogId}`
  );
  const priceData =
    catalogData?.object?.item_data?.variations[0]?.item_variation_data
      ?.price_money;
  return (
    catalogData && 
    <Sheet>
      <SheetTrigger className="absolute">
        <div className=" block overflow-hidden top-3 mx-auto bg-background p-1 rounded-lg !justify-start">
          <div className="flex justify-between items-center">
            <div className="block shrink-0">
              <img
                alt={catalogData?.object?.item_data?.name}
                src={catalogData?.object?.item_data?.ecom_image_uris}
                className="size-20 rounded-lg object-cover shadow-sm"
              />
            </div>
            <div className="flex flex-col px-8 text-wrap items-startz1">
              <h3 className="font-medium text-sm">
                {catalogData?.object?.item_data?.name}
              </h3>
              <h4 className="font-bold">
                {priceData &&
                  formatMoney(priceData?.amount, priceData?.currency)}
              </h4>
              <a
                target="_blank"
                href={catalogData?.object?.item_data?.ecom_uri}
                className="font-light flex items-center text-xs text-gray-200 hover:opacity-0.5 underline"
              >
                Buy now <ChevronRight size={20} />
              </a>
            </div>
          </div>
        </div>
      </SheetTrigger>
      <SheetContent side="top">
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default ProductBar;
