"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, MessageCircle } from "lucide-react";
import type { Dictionary } from "@/content";
import { track } from "@/lib/analytics";
import { enquirySchema, eventTypeValues, normalisePhone, serviceValues, todayIST, type EnquiryInput } from "@/lib/validation";

type Status = { kind: "idle" } | { kind: "sent"; url: string; opened: boolean };

/**
 * Event enquiry form. WhatsApp is the enquiry channel: after validation the
 * enquiry is composed into a prefilled WhatsApp message to the business and
 * WhatsApp opens for the visitor to review and send. Nothing is sent
 * anywhere else, so no backend, API keys or spam protection are needed.
 */
export function EnquiryForm({
  t,
  whatsappNumber,
  defaultService = "",
  idPrefix = "enq",
}: {
  t: Dictionary["form"];
  whatsappNumber: string;
  defaultService?: string;
  idPrefix?: string;
}) {
  const schema = useMemo(() => enquirySchema(t.errors), [t.errors]);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [minDate, setMinDate] = useState<string>();

  useEffect(() => {
    setMinDate(todayIST());
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EnquiryInput>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      eventType: "",
      eventDate: "",
      city: "",
      guests: "",
      service: defaultService,
      message: "",
    },
  });

  const composeWhatsApp = (d: EnquiryInput) => {
    const np = t.notProvided;
    const lines = [
      `*${t.whatsappHeader}*`,
      `${t.labels.name}: ${d.name}`,
      `${t.labels.phone}: +91 ${normalisePhone(d.phone)}`,
      d.email ? `${t.labels.email}: ${d.email}` : null,
      `${t.labels.eventType}: ${t.eventTypes[d.eventType as keyof typeof t.eventTypes]}`,
      `${t.labels.eventDate}: ${d.eventDate || np}`,
      `${t.labels.city}: ${d.city}`,
      `${t.labels.guests}: ${d.guests || np}`,
      `${t.labels.service}: ${t.services[d.service as keyof typeof t.services]}`,
      d.message ? `${t.labels.message}: ${d.message}` : null,
    ].filter(Boolean);
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
  };

  const onSubmit = (d: EnquiryInput) => {
    const url = composeWhatsApp(d);
    const win = window.open(url, "_blank");
    if (win) win.opener = null;
    const rental = d.service === "rental" || d.service === "both";
    track(rental ? "rental_enquiry" : "service_enquiry", { channel: "whatsapp_form", event_type: d.eventType, service: d.service });
    setStatus({ kind: "sent", url, opened: !!win });
  };

  const id = (f: string) => `${idPrefix}-${f}`;
  const err = (f: keyof EnquiryInput) => errors[f]?.message;
  const fieldProps = (f: keyof EnquiryInput) => ({
    id: id(f),
    "aria-invalid": err(f) ? (true as const) : undefined,
    "aria-describedby": err(f) ? id(`${f}-error`) : undefined,
    className: "field-input",
  });
  const ErrorText = ({ f }: { f: keyof EnquiryInput }) =>
    err(f) ? (
      <p id={id(`${f}-error`)} className="field-error" role="alert">
        {err(f)}
      </p>
    ) : null;
  const Opt = () => <span className="font-normal text-muted"> ({t.optional})</span>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="relative" aria-describedby={id("mode")}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={id("name")} className="field-label">
            {t.labels.name}
          </label>
          <input {...register("name")} {...fieldProps("name")} autoComplete="name" placeholder={t.placeholders.name} />
          <ErrorText f="name" />
        </div>
        <div>
          <label htmlFor={id("phone")} className="field-label">
            {t.labels.phone}
          </label>
          <input
            {...register("phone")}
            {...fieldProps("phone")}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder={t.placeholders.phone}
          />
          <ErrorText f="phone" />
        </div>
        <div>
          <label htmlFor={id("email")} className="field-label">
            {t.labels.email}
            <Opt />
          </label>
          <input {...register("email")} {...fieldProps("email")} type="email" autoComplete="email" placeholder={t.placeholders.email} />
          <ErrorText f="email" />
        </div>
        <div>
          <label htmlFor={id("eventType")} className="field-label">
            {t.labels.eventType}
          </label>
          <select {...register("eventType")} {...fieldProps("eventType")}>
            <option value="">{t.placeholders.select}</option>
            {eventTypeValues.map((v) => (
              <option key={v} value={v}>
                {t.eventTypes[v]}
              </option>
            ))}
          </select>
          <ErrorText f="eventType" />
        </div>
        <div>
          <label htmlFor={id("eventDate")} className="field-label">
            {t.labels.eventDate}
            <Opt />
          </label>
          <input {...register("eventDate")} {...fieldProps("eventDate")} type="date" min={minDate} />
          <ErrorText f="eventDate" />
        </div>
        <div>
          <label htmlFor={id("city")} className="field-label">
            {t.labels.city}
          </label>
          <input {...register("city")} {...fieldProps("city")} autoComplete="address-level2" placeholder={t.placeholders.city} />
          <ErrorText f="city" />
        </div>
        <div>
          <label htmlFor={id("guests")} className="field-label">
            {t.labels.guests}
            <Opt />
          </label>
          <input {...register("guests")} {...fieldProps("guests")} inputMode="numeric" placeholder={t.placeholders.guests} />
          <ErrorText f="guests" />
        </div>
        <div>
          <label htmlFor={id("service")} className="field-label">
            {t.labels.service}
          </label>
          <select {...register("service")} {...fieldProps("service")}>
            <option value="">{t.placeholders.select}</option>
            {serviceValues.map((v) => (
              <option key={v} value={v}>
                {t.services[v]}
              </option>
            ))}
          </select>
          <ErrorText f="service" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={id("message")} className="field-label">
            {t.labels.message}
            <Opt />
          </label>
          <textarea {...register("message")} {...fieldProps("message")} rows={4} placeholder={t.placeholders.message} />
          <ErrorText f="message" />
        </div>
      </div>

      <p id={id("mode")} className="mt-6 flex gap-3 rounded-lg bg-paper-2 p-4 text-sm text-ink-soft">
        <MessageCircle className="mt-0.5 size-4 shrink-0 text-whatsapp" aria-hidden="true" />
        {t.whatsappMode}
      </p>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">{t.privacy}</p>
        <button type="submit" className="btn btn-whatsapp">
          <MessageCircle className="size-4" aria-hidden="true" />
          {t.submitWhatsapp}
        </button>
      </div>

      <div aria-live="polite" className="mt-5">
        {status.kind === "sent" && (
          <div className="fade-up flex gap-3 rounded-lg bg-[#e6f3ec] p-4 text-sm text-[#0f4d2c]">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            <div>
              {status.opened && <p>{t.whatsappOpened}</p>}
              <a
                href={status.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2 font-semibold underline underline-offset-4"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                {status.opened ? t.whatsappRetry : t.submitWhatsapp}
              </a>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
