"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, UserRound } from "lucide-react";
import { type Session } from "next-auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Confirm } from "~/components/confirm";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { UploadButton, deleteImage } from "~/lib/uploadthing";
import { api } from "~/trpc/react";

const schema = z.object({
  name: z.string(),
});

type Schema = z.infer<typeof schema>;

type Props = {
  user: Session["user"];
};

export function EditProfileForm({ user }: Props) {
  const router = useRouter();
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: user.name ?? "",
    },
  });

  const { mutateAsync: updateUser } = api.user.updateUser.useMutation({
    onSuccess: () => {
      router.refresh();
      toast.success("Профиль обновлен");
    },
    onError: () => {
      toast.error("Произошла ошибка при обновлении профиля");
    },
  });

  const handleSubmit = async (data: Schema) => {
    const { name } = data;
    await updateUser({
      name,
    });
  };

  const handleDeleteImage = async () => {
    if (!user.image) {
      return;
    }

    try {
      await deleteImage(user.image);
    } catch (e) {}

    await updateUser({
      image: "",
    });
    router.refresh();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-8 md:flex-row md:gap-16"
      >
        <div className="flex flex-col items-center justify-center gap-4">
          {user.image && (
            <div className="relative h-64 w-64 overflow-hidden rounded-full">
              <Image
                src={user.image}
                alt="Avatar"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                priority
                className="absolute object-cover"
              />
            </div>
          )}
          {!user.image && (
            <div className="flex h-64 w-64 items-center justify-center rounded-full bg-muted">
              <UserRound className="h-32 w-32 text-muted-foreground" />
            </div>
          )}
          <div className="flex gap-4">
            <UploadButton
              endpoint="avatarUploader"
              appearance={{
                button:
                  "bg-primary ring-ring outline-none focus-within:ring-ring after:bg-background/20 text-background text-sm font-medium",
              }}
              content={{
                button: ({ uploadProgress, isUploading }) => {
                  if (uploadProgress === 100 && isUploading) {
                    return <Loader2 className="h-4 w-4 animate-spin" />;
                  }

                  if (isUploading) {
                    return <span>{uploadProgress}%</span>;
                  }

                  return <span>Загрузить фото</span>;
                },
                allowedContent: "Фото (до 4 мб)",
              }}
              onClientUploadComplete={async (res) => {
                await updateUser({
                  image: res[0]?.url,
                });
                router.refresh();
              }}
              onBeforeUploadBegin={(files) => {
                if (user.image) {
                  try {
                    void deleteImage(user.image);
                  } catch (e) {}
                }
                return files;
              }}
              onUploadError={(err) => toast.error(err.message)}
              className="w-fit items-center justify-center"
            />
            <Confirm onConfirm={handleDeleteImage} variant="destructive">
              <Button
                type="button"
                variant={"destructive"}
                disabled={!user.image}
              >
                Удалить фото
              </Button>
            </Confirm>
          </div>
        </div>
        <div className="grow">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Отображаемое имя</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  Имя, которое будет отображаться под комментариями:{" "}
                  <span className="text-primary">
                    {field.value ? `@${field.value}` : "Аноним"}
                  </span>
                  <br />
                  <span>Оставьте пустым, если хотите быть анонимными.</span>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mt-4 flex justify-end">
            <Button>Сохранить</Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
