import { getApi, postApi, postFormData, putApi } from "./api/index";

//User
export const Registration = (data) => postApi("auth/register", data);
export const Login = (data) => postApi("auth/login", data);
export const GetUserProfile = (userID) => getApi(`user/${userID}`);
export const UpdateuserProfile = (userID, data) =>
  putApi(`user/update/${userID}`, data);

//file Upload
export const UploadFile = (file) => postFormData(`upload-file`, file);

//Video
export const CreateVideo = (data) => postApi("video/create", data);
export const GetVideos = (data) => postApi("video", data);
