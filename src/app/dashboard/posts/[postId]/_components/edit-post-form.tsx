"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { sanitize } from "dompurify";
import { Reorder } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Editor } from "~/components/editor";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { UploadButton } from "~/lib/uploadthing";
import { api } from "~/trpc/react";
import { type RouterOutputs } from "~/trpc/shared";

const schema = z.object({
  title: z.string(),
  shortDescription: z.string(),
  fullDescription: z.string(),
  isPublished: z.boolean(),
  link: z.string(),
  images: z.array(z.string()),
});

type Schema = z.infer<typeof schema>;

type Props = NonNullable<RouterOutputs["post"]["getOne"]>;

export function EditPostForm({
  fullDescription,
  isPublished,
  shortDescription,
  title,
  link,
  images,
  id,
}: Props) {
  const router = useRouter();

  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      title,
      shortDescription: shortDescription ?? "",
      fullDescription: fullDescription ?? "",
      isPublished,
      link: link ?? "",
      images: images,
    },
  });

  const formImages = form.watch("images");

  // const ctx = api.useUtils();
  const { mutateAsync: updatePost } = api.post.update.useMutation({
    onSuccess: () => {
      // await ctx.post.getOne.invalidate({ id: post.id });
      router.refresh();
    },
  });

  const onSubmit = async (input: Schema) => {
    const {
      fullDescription,
      images,
      isPublished,
      link,
      shortDescription,
      title,
    } = input;

    try {
      await updatePost({
        id,
        fullDescription: sanitize(fullDescription),
        images,
        link,
        shortDescription,
        title,
        isPublished,
      });
      toast.success("Пост успешно обновлён");
    } catch (e) {
      toast.error("Ошибка обновления поста");
    }
  };

  const handleDeleteImage = async (url: string) => {
    try {
      const res = await fetch("/api/uploadthing", {
        method: "DELETE",
        body: JSON.stringify({ url }),
      });

      if (!res.ok) {
        throw new Error("Failed to delete image");
      }
      form.setValue(
        "images",
        form.getValues("images").filter((formUrl) => formUrl !== url),
      );

      toast("Изображение удалено");
    } catch (e) {
      toast.error("Ошибка удаления изображения");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="shortDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Короткое описание</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fullDescription"
          render={({ field }) => (
            <FormItem>
              <Label>Полное описание</Label>
              <Editor value={field.value} onChange={field.onChange} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ссылка</FormLabel>
              <FormControl>
                <Input {...field} type="url" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isPublished"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Виден всем</FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Reorder.Group
          values={formImages}
          axis="y"
          onReorder={(newOrder) => form.setValue("images", newOrder)}
          className="mx-auto flex flex-col items-center gap-4"
          style={{
            overflowY: "auto",
          }}
        >
          {formImages.map((url, index) => (
            <Reorder.Item
              key={url}
              value={url}
              className="relative aspect-video w-full overflow-hidden rounded-md border"
            >
              <Image
                src={url}
                alt={`image ${index + 1}`}
                fill
                className="absolute object-cover"
                onClick={() => window.open(url)}
              />

              <Button
                className="absolute right-2 top-2"
                variant={"destructive"}
                size={"icon"}
                onClick={() => handleDeleteImage(url)}
              >
                <X />
              </Button>
              <div
                className="absolute bottom-2 right-2 flex h-8 w-8 cursor-pointer select-none items-center justify-center rounded-md border border bg-background"
                // onPointerDown={(e) => controls.start(e)}
              >
                {index + 1}
              </div>
            </Reorder.Item>
          ))}
        </Reorder.Group>
        <UploadButton
          endpoint="imageUploader"
          appearance={{
            button: "bg-primary text-primary-foreground",
          }}
          onClientUploadComplete={(res) => {
            res.map((item) => {
              form.setValue("images", [...form.getValues("images"), item.url]);
            });
          }}
          onUploadError={(err) => toast.error(err.message)}
        />
        <div className="mt-4 flex justify-end">
          <Button>Сохранить</Button>
        </div>
      </form>
    </Form>
  );
}
