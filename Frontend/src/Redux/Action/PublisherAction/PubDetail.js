import {
  PUB_DETAIL_FAILURE,
  PUB_DETAIL_REQUEST,
  PUB_DETAIL_SUCCESS,
} from "../../ActionType";

export const getPubDetailRequest = () => ({
  type: PUB_DETAIL_REQUEST,
});

export const getPubDetailSuccess = (resData) => ({
  type: PUB_DETAIL_SUCCESS,
  payload: resData,
});

export const getPubDetailFailure = (resErr) => ({
  type: PUB_DETAIL_FAILURE,
  payload: resErr,
});
