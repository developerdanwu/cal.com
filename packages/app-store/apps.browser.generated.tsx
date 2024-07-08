/**
    This file is autogenerated using the command `yarn app-store:build --watch`.
    Don't modify this file manually.
**/
import dynamic from "next/dynamic";

export const InstallAppButtonMap = {
  exchange2013calendar: dynamic(() => import("./exchange2013calendar/components/InstallAppButton")),
  exchange2016calendar: dynamic(() => import("./exchange2016calendar/components/InstallAppButton")),
  office365video: dynamic(() => import("./office365video/components/InstallAppButton")),
  vital: dynamic(() => import("./vital/components/InstallAppButton")),
};
export const AppSettingsComponentsMap = {
  "cal-ai": dynamic(() => import("./cal-ai/components/AppSettingsInterface")),
  "general-app-settings": dynamic(() =>
    import("./templates/general-app-settings/components/AppSettingsInterface")
  ),
  weather_in_your_calendar: dynamic(() =>
    import("./weather_in_your_calendar/components/AppSettingsInterface")
  ),
  zapier: dynamic(() => import("./zapier/components/AppSettingsInterface")),
};
export const EventTypeAddonMap = {
  alby: dynamic(() => import("./alby/components/EventTypeAppCardInterface")),
  closecom: dynamic(() => import("./closecom/components/EventTypeAppCardInterface")),
  fathom: dynamic(() => import("./fathom/components/EventTypeAppCardInterface")),
  ga4: dynamic(() => import("./ga4/components/EventTypeAppCardInterface")),
  giphy: dynamic(() => import("./giphy/components/EventTypeAppCardInterface")),
  gtm: dynamic(() => import("./gtm/components/EventTypeAppCardInterface")),
  hubspot: dynamic(() => import("./hubspot/components/EventTypeAppCardInterface")),
  matomo: dynamic(() => import("./matomo/components/EventTypeAppCardInterface")),
  metapixel: dynamic(() => import("./metapixel/components/EventTypeAppCardInterface")),
  "mock-payment-app": dynamic(() => import("./mock-payment-app/components/EventTypeAppCardInterface")),
  paypal: dynamic(() => import("./paypal/components/EventTypeAppCardInterface")),
  "pipedrive-crm": dynamic(() => import("./pipedrive-crm/components/EventTypeAppCardInterface")),
  plausible: dynamic(() => import("./plausible/components/EventTypeAppCardInterface")),
  posthog: dynamic(() => import("./posthog/components/EventTypeAppCardInterface")),
  qr_code: dynamic(() => import("./qr_code/components/EventTypeAppCardInterface")),
  salesforce: dynamic(() => import("./salesforce/components/EventTypeAppCardInterface")),
  stripepayment: dynamic(() => import("./stripepayment/components/EventTypeAppCardInterface")),
  "booking-pages-tag": dynamic(() =>
    import("./templates/booking-pages-tag/components/EventTypeAppCardInterface")
  ),
  "event-type-app-card": dynamic(() =>
    import("./templates/event-type-app-card/components/EventTypeAppCardInterface")
  ),
  twipla: dynamic(() => import("./twipla/components/EventTypeAppCardInterface")),
  umami: dynamic(() => import("./umami/components/EventTypeAppCardInterface")),
  "zoho-bigin": dynamic(() => import("./zoho-bigin/components/EventTypeAppCardInterface")),
  zohocrm: dynamic(() => import("./zohocrm/components/EventTypeAppCardInterface")),
};
export const EventTypeSettingsMap = {
  alby: dynamic(() => import("./alby/components/EventTypeAppSettingsInterface")),
  fathom: dynamic(() => import("./fathom/components/EventTypeAppSettingsInterface")),
  ga4: dynamic(() => import("./ga4/components/EventTypeAppSettingsInterface")),
  giphy: dynamic(() => import("./giphy/components/EventTypeAppSettingsInterface")),
  gtm: dynamic(() => import("./gtm/components/EventTypeAppSettingsInterface")),
  metapixel: dynamic(() => import("./metapixel/components/EventTypeAppSettingsInterface")),
  paypal: dynamic(() => import("./paypal/components/EventTypeAppSettingsInterface")),
  plausible: dynamic(() => import("./plausible/components/EventTypeAppSettingsInterface")),
  qr_code: dynamic(() => import("./qr_code/components/EventTypeAppSettingsInterface")),
  stripepayment: dynamic(() => import("./stripepayment/components/EventTypeAppSettingsInterface")),
};
