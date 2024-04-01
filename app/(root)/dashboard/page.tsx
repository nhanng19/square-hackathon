import { Button } from "@/components/ui/button";
import Link from "next/link";

const Dashboard = () => {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <Button variant="default" asChild>
        <Link href={`https://connect.squareupsandbox.com/oauth2/authorize?client_id=${process.env.SQUARE_CLIENT_ID!}&scope=CUSTOMERS_WRITE+CUSTOMERS_READ&session=false&state=82201dd8d83d23cc8a48caf52b`}>
          Connect Square
        </Link>
      </Button>
    </div>
  );
};

export default Dashboard;
