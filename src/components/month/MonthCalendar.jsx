import React, { useState } from "react";
import style from "./calendar.module.scss"; // Asegúrate de crear este archivo SASS con tus estilos
import { useDispatch } from "react-redux";
import { deleteEvent, newEvent } from "../../store/slices/categories";
import { Button, Space, notification } from "antd";

const MonthCalendar = ({
  monthName,
  month,
  days,
  categories,
  events,
  selectCategorie,
  activeCalendar,
}) => {
  const dispatch = useDispatch();

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (day, event, newE) => {
    const key = `open${Date.now()}`;
    const btn = (
      <Space>
        <Button
          type="primary"
          danger
          size="small"
          onClick={() => api.destroy()}
        >
          Cancelar
        </Button>
        <Button
          type="primary"
          size="small"
          onClick={() => {
            dispatch(deleteEvent(event));
            dispatch(newEvent(newE));
            api.destroy();
          }}
        >
          Confirmar
        </Button>
      </Space>
    );
    api.open({
      message: "ADVETENCIA",
      description: `¿Quieres modificar la categora del dia ${day} de ${monthName}?`,
      btn,
      key,
      onClose: () => api.destroy(),
    });
  };

  const handleDayClick = (day) => {
    if (!activeCalendar) return;

    const existingEventIndex = events.findIndex(
      (event) => event.day === day && event.month === month
    );

    // Si el día ya tiene la categoría seleccionada, la quitamos.
    if (existingEventIndex !== -1) {
      const existingEvent = events[existingEventIndex];
      if (existingEvent.categories.includes(selectCategorie)) {
        // Acción para quitar la categoría del evento
        dispatch(deleteEvent({ month, day, categories: selectCategorie }));
      } else {
        const event = { month, day, categories: selectCategorie };
        openNotification(day, existingEvent, event);
      }
    } else {
      // Si el día no tiene eventos, agregamos el evento con la categoría seleccionada.
      dispatch(newEvent({ month, day, categories: selectCategorie }));
    }
  };

  const findEventForDay = (day) => {
    // Encuentra si existe un evento para este día específico.
    return events.find((event) => event.day === day && event.month === month);
  };

  const getCategoryColor = (categoryId) => {
    // Encuentra el color de la categoría basado en el id de la categoría.
    const category = categories.find((category) => category.id === categoryId);
    return category ? category.color : "#e3e3e3"; // Devuelve transparente si no hay categoría, para evitar errores.
  };

  const renderDay = (day) => {
    const eventForDay = findEventForDay(day);
    const dayColor = eventForDay
      ? getCategoryColor(eventForDay.categories)
      : "#e3e3e3";
    return (
      <div
        key={day}
        className={`${style.day}`}
        onClick={() => handleDayClick(day)}
        style={{ backgroundColor: dayColor }} // Aplica el color de fondo según la categoría del evento
      >
        {day}
      </div>
    );
  };

  return (
    <div>
      {contextHolder}
      <div className={style.month}>
        <h2>{monthName}</h2>
        <div className={style.calendar}>{days.map(renderDay)}</div>
      </div>
    </div>
  );
};

export default MonthCalendar;
