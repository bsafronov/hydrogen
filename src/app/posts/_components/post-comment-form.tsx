"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Form, FormField } from "~/components/ui/form";
import { TextareaAutoSize } from "~/components/ui/textarea";

import { api } from "~/trpc/react";
const schema = z.object({
  description: z
    .string()
    .min(1, { message: "Комментарий не может быть пустым" }),
});

type Schema = z.infer<typeof schema>;

type Props = {
  postId: string;
};

export default function PostCommentForm({ postId }: Props) {
  const session = useSession();
  const isLoggedIn = session.status === "authenticated";

  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      description: "",
    },
  });

  const ctx = api.useUtils();
  const { mutateAsync: createComment, isLoading } =
    api.postComment.create.useMutation({
      onSuccess: async ({ postId }) => {
        form.reset();
        await ctx.postComment.getManyByPost.invalidate({ postId });
        ctx.post.getManyPublished.setData(undefined, (prev) => {
          return [...(prev ?? [])].map((post) => {
            if (post.id !== postId) return post;

            return {
              ...post,
              _count: {
                ...post._count,
                comments:
                  ctx.postComment.getManyByPost.getData({ postId })?.length ??
                  0,
              },
            };
          });
        });
      },
    });

  const onSubmit = async (input: Schema) => {
    await createComment({
      description: input.description,
      postId,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <TextareaAutoSize
              {...field}
              placeholder={
                isLoggedIn
                  ? "Я слушаю, говорите..."
                  : "Войдите, чтобы комментировать"
              }
              disabled={!isLoggedIn}
            />
          )}
        />
        <div className="mt-2 flex justify-end">
          <Button disabled={isLoading || !isLoggedIn}>
            {isLoading ? "Загрузка..." : "Отправить"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
