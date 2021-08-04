import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ComponentLoader from "../../../Components/Loader/ComponenLoader";
import { AuthContext } from "../../../Providers/AuthProvider";
import config from "../../../service/api/config";
import { GetVideos } from "../../../service/service";

const Videos = () => {
  const { user, authLoading } = useContext(AuthContext);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    setLoading(true);
    const response = await GetVideos({
      user: user._id,
    });
    console.log(response);
    if (response && response.isSuccess) {
      setVideos(response.data.videos);
    } else {
      setVideos([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      getData();
    }
  }, [user]);

  return (
    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg">
      <div className="flex justify-center py-5">
        <div className="max-w-7xl text-center">
          {loading ? (
            <ComponentLoader height="150px" />
          ) : (
            <div className="">
              <div className="w-full text-center mb-2">
                <span className="text-sm font-bold text-gray-800">
                  All Videos
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {videos.map((video) => (
                  <Link to={`video/${video.slug}`}>
                    <div className=" rounded overflow-hidden border w-full bg-white ">
                      <div
                        className="w-full h-thumb bg-cover overflow-hidden"
                        style={{
                          backgroundImage: `url(${
                            config.fileServer + video?.thumbnail
                          })`,
                        }}
                      ></div>
                      <div className="px-2 my-2 text-left">
                        <div className="w-full flex justify-between ">
                          <div className="flex">
                            <img
                              src={config.fileServer + video?.user?.photo}
                              alt="profilepic"
                              className="card-avatar rounded-full"
                            />
                            <div>
                              <span className="ml-2 font-bold text-sm block">
                                {video?.title}
                              </span>
                              <span className="ml-2 text-sm text-gray-400 font-medium">
                                {video.user?.name}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Videos;
