import axios from "axios";
import { API_FAILED, API_INIT, API_SUCCESS } from "../store/ApiStore";
const ApiMiddleware = (dispatch: any) => (next: any) => async (action: any) => {
  if (action.type !== API_INIT.type) return next(action);
  const {
    url,
    method,
    data,
    onStart,
    onSuccess,
    onError
  } = action.payload;
  if (onStart) dispatch({
    type: onStart
  });
  next(action);
  try {
    const res = await axios.request({
      baseURL: "",
      url,
      method,
      data
    });
    dispatch(API_SUCCESS(res.data));
    if (onSuccess) dispatch({
      type: onSuccess,
      payload: res.data
    });
  } catch (err: any) {
    dispatch(API_FAILED(err.message));
    if (onError) dispatch({
      type: onError,
      payload: err.message
    });
  }
};
export default ApiMiddleware;