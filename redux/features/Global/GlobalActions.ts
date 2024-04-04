import { createAsyncThunk } from "@reduxjs/toolkit";
import { store } from "../../app/store";

export const testAction = createAsyncThunk(
  "test/1",
  async (_: void, thunkAPI) => {
    const state = store.getState();
    return state;
  }
);
