import useSWR from "swr";
import { Button } from "./ui/button";

interface Props {
  roomId: string;
}

const ProductBar = ({ roomId }: Props) => {
  const { data: roomData } = useSWR(`/api/rooms/get_room/${roomId}`);
  const { data: catalogData } = useSWR(`/api/catalogs/retrieve_catalog/${roomData?.catalogId}`)
  console.log(catalogData);
  return (
    <a href="#" className="relative block overflow-hidden">
      <div className="sm:flex sm:justify-between sm:gap-8 items-center">
        <div className="hidden sm:block sm:shrink-0">
          <img
            alt={catalogData?.object?.item_data?.name}
            src={catalogData?.object?.item_data?.ecom_image_uris}
            className="size-12 rounded-lg object-cover shadow-sm"
          />
        </div>
        <div>
          <h4 className="font-bold">
            {catalogData?.object?.item_data?.name}
          </h4>
        </div>
        <Button variant={"default"} asChild><a target="_blank" href={catalogData?.object?.item_data?.ecom_uri}>Buy now</a></Button>
      </div>
    </a>
  );
};

export default ProductBar;
