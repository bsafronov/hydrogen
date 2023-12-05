"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "~/components/modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import { toast } from "sonner";

const schema = z.object({
  password: z.string(),
});

type Schema = z.infer<typeof schema>;

export function AdminForm() {
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
      toast.success("Теперь вы администратор!");
    } catch {
      toast.error("Неверный пароль");
    }
  };

  return (
    <Modal
      selector="admin"
      action="toggleAdmin"
      title="Авторизация"
      description="Введите пароль для получения прав администратора"
    >
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
    </Modal>
  );
}
