export function dateTime(locale: string, timeStampDate: number) {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "numeric",
    hour12: true,
  }).format(new Date(timeStampDate * 1000)).replace("г.,", "");
}
