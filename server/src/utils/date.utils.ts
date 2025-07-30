import moment from "moment-timezone";

const ARG_TIMEZONE = "America/Argentina/Buenos_Aires";

/**
 * Devuelve el inicio y fin del día actual en hora local de Argentina,
 * convertido a UTC para usar en MySQL.
 */
export function getArgentinaDayRange(): { start: Date; end: Date } {
  const start = moment.tz(ARG_TIMEZONE).startOf("day").toDate();
  const end = moment.tz(ARG_TIMEZONE).endOf("day").toDate();

  return { start, end };
}


