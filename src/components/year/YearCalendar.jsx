import React, { useEffect, useState } from "react";
import style from "./year.module.scss";
import MonthCalendar from "../month/MonthCalendar";

import { useSelector } from "react-redux";
import ChangeBar from "../changeBar";

const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const YearCalendar = () => {
  const { categories, events } = useSelector((state) => state.calendar);
  const [selectCategorie, setSelectCategorie] = useState();

  useEffect(() => {
    setSelectCategorie(categories?categories[0]?.id:'')
  }, [categories]);

  const [activeCalendar, setActiveCalendar] = useState(false);

  const daysInMonth = (month, year) => new Date(year, month, 0).getDate();
  const today = new Date();
  const currentYear = today.getFullYear();
  const getDays = (month) =>
    Array.from(
      { length: daysInMonth(month + 1, currentYear) },
      (_, i) => i + 1
    );
  const filterEventsForMonth = (month) => {
    return events.filter((event) => {
      const matchMonth = event.month === month;
      const matchCategory = false ? event.categories === selectCategorie : true;
      return matchMonth && matchCategory;
    });
  };

  return (
    <div>
      <ChangeBar
        activeCalendar={activeCalendar}
        setActiveCalendar={setActiveCalendar}
        categories={categories}
        selectCategorie={selectCategorie}
        setSelectCategorie={setSelectCategorie}
      />
      <div className={style.year}>
        {months.map((mes, index) => {
          // Obtener los eventos filtrados para el mes actual
          const filteredEvents = filterEventsForMonth(index);
          return (
            <MonthCalendar
              activeCalendar={activeCalendar}
              categories={categories}
              key={mes}
              monthName={mes}
              month={index}
              days={getDays(index)}
              events={filteredEvents} // Pasar los eventos filtrados al componente MonthCalendar
              selectCategorie={selectCategorie}
            />
          );
        })}
      </div>
    </div>
  );
};

export default YearCalendar;
