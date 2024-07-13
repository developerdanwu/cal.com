import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

import { useOrgBranding } from "@calcom/ee/organizations/context/provider";
import { getTeamsFiltersFromQuery } from "@calcom/features/filters/lib/getTeamsFiltersFromQuery";
import { useLocale } from "@calcom/lib/hooks/useLocale";
import { useRouterQuery } from "@calcom/lib/hooks/useRouterQuery";
import type { RouterOutputs } from "@calcom/trpc";
import { trpc } from "@calcom/trpc";
import {
  Button,
  CreateButtonWithTeamsList,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  Form,
  SelectField,
} from "@calcom/ui";

type EventTypeGroup = RouterOutputs["viewer"]["eventTypes"]["getByViewer"]["eventTypeGroups"][number];

function NewBookingDialog({ eventTypeGroup }: { eventTypeGroup: EventTypeGroup }) {
  const { data } = useSession();
  const { t } = useLocale();
  const user = data?.user;
  const orgBranding = useOrgBranding();
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      eventType: {
        label: "",
        value: "",
      },
    },
  });

  return (
    <Dialog name="new">
      <DialogContent title={t("add_new_booking")}>
        <div className="pb-1">
          <Form
            form={form}
            id="create-booking"
            handleSubmit={(data) => {
              router.push(`/${user?.username}/${data.eventType.label}`);
            }}>
            <Controller
              control={form.control}
              render={({ field: { value, onChange } }) => {
                return (
                  <SelectField
                    required
                    label={t("event_type")}
                    variant="default"
                    options={eventTypeGroup.eventTypes.map((type) => {
                      return {
                        label: type.title,
                        value: String(type.id),
                      };
                    })}
                    value={value}
                    defaultValue={{
                      label: eventTypeGroup.eventTypes[0].title,
                      value: String(eventTypeGroup.eventTypes[0].id),
                    }}
                    onChange={(e) => {
                      if (e) {
                        onChange(e);
                      }
                    }}
                  />
                );
              }}
              name="eventType"
            />
          </Form>
        </div>

        <DialogFooter>
          <DialogClose />
          <Button form="create-booking" type="submit">
            {t("continue")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function NewBookingButton() {
  const routerQuery = useRouterQuery();
  const filters = getTeamsFiltersFromQuery(routerQuery);
  const { t } = useLocale();

  const { data, status, error } = trpc.viewer.eventTypes.getByViewer.useQuery(filters && { filters }, {
    refetchOnWindowFocus: false,
    gcTime: 1 * 60 * 60 * 1000,
    staleTime: 1 * 60 * 60 * 1000,
  });
  if (!data) {
    return null;
  }

  return (
    <CreateButtonWithTeamsList
      subtitle={t("create_booking_on").toUpperCase()}
      createDialog={() => <NewBookingDialog eventTypeGroup={data.eventTypeGroups[0]} />}
    />
  );
}
