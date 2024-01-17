import { differenceInDays, format, formatRelative } from "date-fns";
import ru from "date-fns/locale/ru";

export const formatDate = (date: Date | string) => {
  const value = new Date(date);

  if (differenceInDays(new Date(), value) > 6) {
    return format(value, "dd.MM.yyyy в HH:mm");
  }

  return formatRelative(value, new Date(), { locale: ru });
};
