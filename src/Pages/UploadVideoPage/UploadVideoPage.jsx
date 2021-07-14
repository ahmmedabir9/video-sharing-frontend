import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import TopBar from "../../Components/Header/TopBar";
import { AuthContext } from "../../Providers/AuthProvider";
import config from "../../service/api/config";
import { CreateVideo, UploadFile } from "../../service/service";

const UploadVideoPage = ({ history }) => {
  const { user, authLoading } = useContext(AuthContext);
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumnail] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [uploadingThumb, setUploadingThumb] = useState(false);

  if (!authLoading && !user) return <Redirect to="/login" />;

  const handleUploadVideo = async (e) => {
    setUploadingVideo(true);
    const files = e.target.files;
    try {
      const response = await UploadFile(files[0]);
      console.log(response);
      if (response && response.isSuccess) {
        setVideo(response.data.fileName);
      }
    } catch (err) {
      if (err.response.status === 500) {
        console.log("There was a problem with the server");
      } else {
        console.log(err.response.data.msg);
      }
    }
    setUploadingVideo(false);
  };

  const handleUpload = async (e) => {
    setUploadingThumb(true);
    const files = e.target.files;
    try {
      const response = await UploadFile(files[0]);
      console.log(response);
      if (response && response.isSuccess) {
        setThumnail(response.data.fileName);
      }
    } catch (err) {
      if (err.response.status === 500) {
        console.log("There was a problem with the server");
      } else {
        console.log(err.response.data.msg);
      }
    }
    setUploadingThumb(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (video && thumbnail) {
      setSaving(true);

      const data = {
        title: e.target.title.value,
        description: e.target.description.value,
        video: video,
        thumbnail: thumbnail,
        user: user?._id,
      };

      console.log(data);
      const response = await CreateVideo(data);
      if (response && response.isSuccess) {
        toast.success(`Video Uploaded!`, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 3000,
        });
        history.push("/");
      } else {
        toast.error(`${response.data.toString()}!`, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 3000,
        });
      }
      console.log(response);
      setSaving(false);
    } else {
      toast.error(`Please Upload Video and Thumbnail!`, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000,
      });
    }
  };

  return (
    <div>
      <TopBar active="upload-video" />
      <div className="container mx-auto px-4 pt-6">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg">
          <div className="p-2">
            <div className="flex flex-wrap justify-center">
              <div className="w-full sm:w-full lg:w-6/12 p-4 justify-center">
                <div className="text-sm leading-normal mt-0 mb-4 text-blueGray-400 font-bold">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    for="grid-password"
                  >
                    {" "}
                    Video
                  </label>
                  {video && (
                    <video
                      style={{ width: "100%" }}
                      src={`${config.serverURL}${video}`}
                      controls
                    ></video>
                  )}
                  <div className="py-2">
                    {uploadingVideo ? (
                      "Uploading, Please Wait..."
                    ) : (
                      <div className="custom-file mb-4">
                        <input
                          type="file"
                          className="custom-file-input br-0"
                          id="customFile"
                          onChange={handleUploadVideo}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-full sm:w-full lg:w-6/12 p-4 justify-center">
                <form onSubmit={handleSave}>
                  <div className="text-sm leading-normal mt-0 mb-4 text-blueGray-400 font-bold">
                    <label
                      class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      for="grid-password"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      class="w-full h-10 border border-gray-800 rounded px-3"
                      placeholder="Video Title"
                      required
                    />
                  </div>

                  <div className="text-sm leading-normal mt-0 mb-4 text-blueGray-400 font-bold">
                    <label
                      class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      for="grid-password"
                    >
                      Description
                    </label>
                    <textarea
                      rows={10}
                      required
                      type="text"
                      name="description"
                      class="w-full p-2 border border-gray-800 rounded"
                      placeholder="Video Description"
                    />
                  </div>
                  <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold">
                    <label
                      class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      for="grid-password"
                    >
                      Thumbnail
                    </label>
                    {thumbnail && (
                      <img
                        alt="User"
                        src={config.serverURL + thumbnail}
                        className="w-full shadow-xl h-auto align-middle border-none mb-2"
                      />
                    )}
                    <div className="">
                      {uploadingThumb ? (
                        "Uploading, Please Wait..."
                      ) : (
                        <div className="custom-file mb-4">
                          <input
                            type="file"
                            className="custom-file-input br-0"
                            id="customFile"
                            onChange={handleUpload}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    className={`w-100 ${
                      saving ? "bg-gray-400" : "bg-gray-800"
                    } uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none mb-1 ease-linear transition-all duration-150`}
                    type="submit"
                    disabled={saving}
                  >
                    {saving ? "Saving" : "Save"}
                  </button>
                </form>
              </div>
            </div>
            <div className="text-center mt-12"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadVideoPage;
