import { format as dateFnsFormat } from "date-fns";
import dateFnsLocalizer from "react-widgets-date-fns";
import { dateFormatString } from "../constants/formats.js";
import enGB from "date-fns/locale/en-GB";

dateFnsLocalizer({ locales: { "en-GB": enGB } });

export const fnsDateToISOText = theDate => dateFnsFormat(theDate, "YYYY-MM-DD");

export const fnsDateTimeToISOText = theFnsDate =>
  dateFnsFormat(theFnsDate, "YYYY-MM-DD HH:mm");

export const textDatesToFnsDates = textDateList =>
  textDateList.map(textDate => {
    const newDate = new Date(textDate);
    return newDate;
  });

export const fnsDatesToISOText = dateList => {
  // console.log("fnsDatesToISOText, dateFnsFormat=" + dateFnsFormat);
  return dateList.map(dateMember => dateFnsFormat(dateMember, "YYYY-MM-DD"));
};
