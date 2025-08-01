import moment from "moment-timezone";

const ARG_TIMEZONE = "America/Argentina/Buenos_Aires";

/**
 * Devuelve el inicio y fin del día actual en hora local de Argentina, convertido a UTC para usar en MySQL.
 */
export function getArgentinaDayRange(): { start: Date; end: Date } {
  const now = moment.tz(ARG_TIMEZONE);
  const start = now.clone().startOf("day").toDate();
  const end = now.clone().add(1, "day").startOf("day").toDate(); // FIX

  return { start, end };
}

/**
 * Devuelve un rango personalizado en base a fechas específicas, usando hora local de Argentina.
 */
export function getArgentinaCustomRange(from: moment.Moment, to: moment.Moment): { start: Date; end: Date } {
  const start = from.tz(ARG_TIMEZONE).startOf("day").toDate();
  const end = to.clone().add(1, "day").tz(ARG_TIMEZONE).startOf("day").toDate(); // FIX
  return { start, end };
}



