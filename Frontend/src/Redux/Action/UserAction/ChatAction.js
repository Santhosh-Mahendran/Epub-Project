import * as Type from "../../ActionType";

export const PostUserQues_Request = (payload) => {
  return {
    type: Type.POST_USERQUES_REQUEST,
    payload: payload,
  };
};

export const PostUserQues_Success = (payload) => ({
  type: Type.POST_USERQUES_SUCCESS,
  payload: payload,
});

export const PostUserQues_Failure = (payload) => ({
  type: Type.POST_USERQUES_FAILURE,
  payload: payload,
});
