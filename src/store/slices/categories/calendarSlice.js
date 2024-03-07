import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [
    { id: "work", name: "Trabajo", color: "blue" },
    { id: "vacation", name: "Vacaciones", color: "green" },
  ],
  events: [
    { month: 0, day: 1, categories: "work" },
    { month: 4, day: 24, categories: "vacation" },
  ],
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    // Agrega una nueva categoría
    newCategorie: (state, action) => {
      state.categories.push({
        id: action.payload.id,
        name: action.payload.name,
        color: action.payload.color,
      });
    },
    // Elimina una categoría por su id
    deleteCategorie: (state, action) => {
      state.categories = state.categories.filter(
        (categorie) => categorie.id !== action.payload.id
      );
      state.events = state.events.filter(
        (event) => event.categories !== action.payload.id
      );
    },
    // Agrega una nueva fecha con categoría al arreglo de eventos
    newEvent: (state, action) => {
      state.events.push({
        month: action.payload.month,
        day: action.payload.day,
        categories: action.payload.categories,
      });
    },

    // Elimina una fecha con su categoría
    deleteEvent: (state, action) => {
      state.events = state.events.filter(
        (event) =>
          !(
            event.month === action.payload.month &&
            event.day === action.payload.day &&
            event.categories === action.payload.categories
          )
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { newCategorie, deleteCategorie, newEvent, deleteEvent } =
  calendarSlice.actions;
