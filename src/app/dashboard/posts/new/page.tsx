"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Breadcrumbs } from "~/components/breadcrumbs";
import { Container } from "~/components/container";
import { Heading } from "~/components/heading";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { api } from "~/trpc/react";

const schema = z.object({
  title: z.string(),
});

type Schema = z.infer<typeof schema>;

export default function Page() {
  const router = useRouter();
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
    },
  });

  const { mutateAsync: createPost } = api.post.create.useMutation({
    onSuccess: (post) => {
      router.push(`/dashboard/posts/${post.id}`);
    },
  });

  const onSubmit = async (input: Schema) => {
    const { title } = input;
    try {
      await createPost({
        title,
      });
      toast.success("Пост создан");
    } catch {
      toast.error("Возникла ошибка создания поста");
    }
  };

  return (
    <Container>
      <Breadcrumbs
        items={[
          { label: "Главная", href: "/" },
          { label: "Панель управления", href: "/dashboard" },
          { label: "Посты", href: "/dashboard/posts" },
          { label: "Создание поста", href: `/dashboard/posts/new` },
        ]}
      />
      <Heading title="Создание поста" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
          <div className="mt-4 flex justify-end">
            <Button>Создать</Button>
          </div>
        </form>
      </Form>
    </Container>
  );
}
