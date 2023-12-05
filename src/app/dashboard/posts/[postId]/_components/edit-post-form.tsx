"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { type RouterOutputs } from "~/trpc/shared";

const schema = z.object({
  title: z.string(),
  shortDescription: z.string(),
  fullDescription: z.string(),
  isPublished: z.boolean(),
  link: z.string(),
});

type Schema = z.infer<typeof schema>;

type Props = NonNullable<RouterOutputs["post"]["getOne"]>;

export function EditPostForm({
  fullDescription,
  isPublished,
  shortDescription,
  title,
  images,
  link,
}: Props) {
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      title,
      shortDescription: shortDescription ?? "",
      fullDescription: fullDescription ?? "",
      isPublished,
      link: link ?? "",
    },
  });

  const onSubmit = async (input: Schema) => {
    console.log(input);
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
                <Input {...field} />
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
        <div className="mt-4 flex justify-end">
          <Button>Сохранить</Button>
        </div>
      </form>
    </Form>
  );
}
