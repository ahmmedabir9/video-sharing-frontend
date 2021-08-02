import { getApi, postApi, postFormData, postVideo, putApi } from "./api/index";

//User
export const Registration = (data) => postApi("auth/register", data);
export const Login = (data) => postApi("auth/login", data);
export const GetUserProfile = (userID) => getApi(`user/${userID}`);
export const UpdateuserProfile = (userID, data) =>
  putApi(`user/update/${userID}`, data);

//file Upload
export const UploadFile = (file) => postFormData(`upload-file`, file);
export const UploadVideo = (file, setUploadPercentage) =>
  postVideo(`upload-file`, file, setUploadPercentage);

//Video
export const CreateVideo = (data) => postApi("video/create", data);
export const GetVideos = (data) => postApi("video", data);
export const GetVideoDetails = (slug) => getApi(`video/${slug}`);
export const GetVideoLikesCommentsCount = (id) =>
  getApi(`video/like-comment-share-count/${id}`);
export const GetComments = (id) => getApi(`video/get-comments/${id}`);
export const LikeVideo = (data) => postApi(`video/like`, data);
export const UnlikeVideo = (data) => postApi(`video/unlike`, data);
export const CommentVideo = (data) => postApi(`video/comment`, data);
export const ReplyComment = (data) => postApi(`video/reply`, data);
export const DeleteComment = (data) => postApi(`video/delete-comment`, data);
export const ShareVideo = (data) => postApi(`video/share`, data);
