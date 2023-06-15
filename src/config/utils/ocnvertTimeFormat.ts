import { store } from "../../redux/store";
import { parseISO, differenceInHours, differenceInDays, differenceInWeeks, differenceInMinutes, differenceInSeconds } from 'date-fns';
import translations from '../translations/Time/index'

export const convertTimeFormat = (creationDate: string) => {
    const lang = store.getState().context.language
    const cleanedDate = creationDate?.replace("[UTC]", ""); // Supprime la partie [UTC] de la chaîne de date
    const parsedDate = parseISO(cleanedDate); // Convertit la chaîne de date nettoyée en objet Date
    const currentDate = new Date();
  
    const timeUnits = [
      { unit: translations[lang].weeks, differenceFunc: differenceInWeeks, minDifference: 1 },
      { unit: translations[lang].days, differenceFunc: differenceInDays, minDifference: 1 },
      { unit: translations[lang].hours, differenceFunc: differenceInHours, minDifference: 1 },
      { unit: translations[lang].minutes, differenceFunc: differenceInMinutes, minDifference: 1 },
      { unit: translations[lang].seconds, differenceFunc: differenceInSeconds, minDifference: 1 },
    ];
  
    for (const timeUnit of timeUnits) {
      const difference = timeUnit.differenceFunc(currentDate, parsedDate);
      if (difference >= timeUnit.minDifference) {
        return `${difference}${timeUnit.unit}`;
      }
    }
  };