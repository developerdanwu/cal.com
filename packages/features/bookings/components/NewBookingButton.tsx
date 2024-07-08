import { useForm } from "react-hook-form";

import { useLocale } from "@calcom/lib/hooks/useLocale";
import { Button, Dialog, DialogContent, DialogTrigger } from "@calcom/ui";

export function NewBookingButton() {
  const { t } = useLocale();
  const form = useForm();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="fab" StartIcon="plus">
          {t("new")}
        </Button>
      </DialogTrigger>
      <DialogContent title={t("add_new_booking")}>
        {/*<Form*/}
        {/*  form={form}*/}
        {/*  handleSubmit={(values) => {*/}
        {/*    createMutation.mutate(values);*/}
        {/*  }}>*/}
        {/*  <InputField*/}
        {/*    label={t("name")}*/}
        {/*    type="text"*/}
        {/*    id="name"*/}
        {/*    required*/}
        {/*    placeholder={t("default_schedule_name")}*/}
        {/*    {...register("name")}*/}
        {/*  />*/}
        {/*  <DialogFooter>*/}
        {/*    <DialogClose />*/}
        {/*    <Button type="submit" loading={createMutation.isPending}>*/}
        {/*      {t("continue")}*/}
        {/*    </Button>*/}
        {/*  </DialogFooter>*/}
        {/*</Form>*/}
      </DialogContent>
    </Dialog>
  );
}
