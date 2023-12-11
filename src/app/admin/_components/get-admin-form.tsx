"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
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
  password: z.string(),
});

type Schema = z.infer<typeof schema>;

export function GetAdminForm() {
  const router = useRouter();
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      password: "",
    },
  });

  const { mutateAsync: getAdminRights } = api.user.getAdminRights.useMutation();

  const onSubmit = async (input: Schema) => {
    const { password } = input;
    try {
      await getAdminRights({ password });
      router.refresh();
      toast.success("Теперь вы администратор!");
    } catch (e) {
      toast.error("Неверный пароль");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <Input {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-4 flex justify-end">
          <Button>Отправить</Button>
        </div>
      </form>
    </Form>
  );
}
