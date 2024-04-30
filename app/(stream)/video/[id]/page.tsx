import useCookies from "@/components/cookies";
import VirtualRoom from "@/components/virtual-room";
import { createJWT } from "@/lib/utils";
import { generateFakeName, generateUUID } from "@/utils/server-helpers";
import { User } from "@stream-io/video-react-sdk";

export default async function Page({ params }: { params: { id: string } }) {
  const { id: roomId } = params;
  const cookies = await useCookies();
  const uuid = generateUUID();
  const token = await createJWT({
    sub: uuid.toString(),
    user_id: uuid.toString(),
  });
  const name = generateFakeName()
  const anon: User = {
    id: uuid,
    name: name,
    image: `https://getstream.io/random_svg/?id=${name}&name=${name}`
  };
  
  return (
    <div className="flex h-full">
      {cookies && <VirtualRoom anon={anon} anonToken={token} token={cookies?.value} roomId={roomId} />}
    </div>
  );
}
