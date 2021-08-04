import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import TopBar from "../../Components/Header/TopBar";
import ComponentLoader from "../../Components/Loader/ComponenLoader";
import { AuthContext } from "../../Providers/AuthProvider";
import config from "../../service/api/config";
import {
  CommentVideo,
  GetComments,
  GetVideoDetails,
  GetVideoLikesCommentsCount,
  LikeVideo,
} from "../../service/service";
import ConfirmDeleteModal from "./Components/ConfirmDeleteModal";
import ShareModal from "./Components/ShareModal";

const VideoPage = (props) => {
  const { match, history } = props;
  const [loading, setLoading] = useState(true);
  const { user, authLoading } = useContext(AuthContext);
  const [videoData, setVideoData] = useState(null);
  const [countData, setCountData] = useState({});
  const [comments, setComments] = useState([]);
  const [savingComments, setSavingComments] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const getData = async () => {
    const response = await GetVideoDetails(match.params.slug);

    if (response && response.isSuccess) {
      // setUserInfo(response.data.user);
      // setPhoto(response.data.user?.photo);
      setVideoData(response.data.video);
      console.log(response.data.video._id);
    }
    setLoading(false);
  };

  const getCountData = async () => {
    const countResponse = await GetVideoLikesCommentsCount(videoData?._id);
    console.log(countResponse);
    if (countResponse && countResponse.isSuccess) {
      setCountData(countResponse.data);
    }
  };

  const getCommentsData = async () => {
    const commentsResponse = await GetComments(videoData?._id);

    if (commentsResponse && commentsResponse.isSuccess) {
      setComments(commentsResponse.data.comments);
    }

    console.log(commentsResponse);
  };

  const postComment = async (e) => {
    e.preventDefault();

    if (e.target.comment.value) {
      setSavingComments(true);
      const response = await CommentVideo({
        video: videoData._id,
        user: user._id,
        text: e.target.comment.value,
      });

      console.log(response);

      if (response && response.isSuccess) {
        e.target.comment.value = "";
        getCommentsData();
        getCountData();
      }
      setSavingComments(false);
    }
  };

  const Like = async () => {
    const response = await LikeVideo({ user: user._id, video: videoData._id });

    if (response && response.isSuccess) {
      getCountData();
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (videoData) {
      getCommentsData();
      getCountData();
    }
  }, [videoData]);

  if (!authLoading && !user)
    return <Redirect to={`/login?redirect=${window.history.pathname}`} />;

  return (
    <div>
      <TopBar active="" />
      <div className="flex flex-wrap justify-center">
        <div className="max-w-7xl w-full">
          {loading ? (
            <ComponentLoader height="90vh" />
          ) : (
            <div className="flex flex-wrap justify-center py-5 ">
              <div className="w-full lg:w-8/12 px-2">
                <video
                  className="w-full"
                  src={`${config.fileServer}${videoData?.video}`}
                  controls
                ></video>

                <div className="mt-3">
                  <div className="flex">
                    <span className="font-bold text-lg block flex-grow-1">
                      {videoData?.title}
                    </span>
                    {user && videoData.user?._id === user._id && (
                      <a
                        className={`mx-2 flex cursor-pointer`}
                        onClick={() => setShowDelete(true)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="#ff0000"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </a>
                    )}
                  </div>
                  <div className="flex mt-2 border-b pb-2 border-gray-400">
                    <img
                      src={config.fileServer + videoData?.user?.photo}
                      alt="profilepic"
                      className="h-10 w-10 rounded-full"
                    />
                    <div className="ml-2 font-medium flex-grow-1">
                      <span className="text-sm text-gray-600 font-medium w-full block">
                        {videoData.user?.name}
                      </span>
                      <span className="text-sm text-gray-400 font-medium w-full block">
                        {videoData.createdAt.toString().slice(0, 10)}
                      </span>
                    </div>
                    <div className="flex">
                      <a href="#" className={`mx-2 flex`} onClick={Like}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <span className="font-bold">
                          {countData?.likes ? countData?.likes : 0}
                        </span>
                      </a>
                      <a href="#" className={`mx-2 flex`}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <span className="font-bold">
                          {countData?.comments ? countData?.comments : 0}
                        </span>
                      </a>

                      <a
                        href="#"
                        className={`mx-2 flex`}
                        onClick={() => setShowShare(true)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                  <span className="text-sm text-justify text-gray-600 w-full block my-2">
                    {videoData?.description}
                  </span>
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-2">
                <span className="text-base w-full block mb-2 border-b border-gray-400 py-2">
                  All Comments
                </span>
                <div className="w-full p-2 mb-3 h-100 max-h-96 overflow-scroll">
                  {comments.map((comment) => (
                    <div className="flex mb-3">
                      <img
                        src={config.fileServer + comment?.user?.photo}
                        alt="profilepic"
                        className="h-10 w-10 rounded-full"
                      />
                      <div className="ml-2 flex-grow-1">
                        <span className="text-xs text-gray-400 w-full block">
                          {comment.user?.name}
                        </span>
                        <span className="text-sm text-justify text-gray-600 w-full block">
                          {comment?.text}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <form class="w-full" onSubmit={postComment}>
                  <div className="text-sm leading-normal mt-0 text-blueGray-400 font-bold">
                    <label
                      class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      for="comment"
                    >
                      Comment
                    </label>
                    <textarea
                      rows={4}
                      required
                      type="text"
                      name="comment"
                      class="w-full p-2 border border-gray-800 rounded"
                      placeholder="Write a comment"
                    />
                  </div>
                  <button
                    className={`w-100 ${
                      savingComments ? "bg-gray-400" : "bg-gray-800"
                    } uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none mb-1 ease-linear transition-all duration-150`}
                    type="submit"
                    disabled={savingComments}
                  >
                    {savingComments ? "Saving" : "Submit"}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
      {showShare && (
        <ShareModal
          showShare={showShare}
          setShowShare={setShowShare}
          video={videoData}
        />
      )}
      {showDelete && (
        <ConfirmDeleteModal
          showDelete={showDelete}
          history={history}
          setShowDelete={setShowDelete}
          video={videoData}
        />
      )}
    </div>
  );
};

export default VideoPage;
