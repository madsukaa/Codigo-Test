import { createAction } from "@reduxjs/toolkit";
export const API_INIT = createAction("API/SEND_REQUEST");
export const API_SUCCESS = createAction("API/REQUEST_SUCCESS");
export const API_FAILED = createAction("API/REQUEST_FAILED");