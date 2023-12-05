import Image from "next/image";
import { FaGithub, FaTelegramPlane, FaVk } from "react-icons/fa";
import { Button } from "~/components/ui/button";

export function Avatar() {
  return (
    <div className="self-center">
      <div className="relative h-80 w-80 overflow-hidden rounded-full border">
        <Image
          src={"/avatar.png"}
          alt="avatar"
          fill
          className="absolute inset-0 object-cover"
        />
      </div>
      <div className="mt-2 flex items-center justify-center gap-2">
        <Button asChild variant={"outline"} size={"icon"}>
          <a href="https://github.com/bsafronov" target="_blank">
            <FaGithub className={"h-6 w-6"} />
          </a>
        </Button>
        <Button asChild variant={"outline"} size={"icon"}>
          <a href="https://vk.com/bogsafronov" target="_blank">
            <FaVk className={"h-6 w-6"} />
          </a>
        </Button>
        <Button asChild variant={"outline"} size={"icon"}>
          <a href="https://t.me/bogdasafronov" target="_blank">
            <FaTelegramPlane className={"h-6 w-6"} />
          </a>
        </Button>
      </div>
    </div>
  );
}
