import React, { useContext, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import TopBar from "../../Components/Header/TopBar";
import ComponentLoader from "../../Components/Loader/ComponenLoader";
import { AuthContext } from "../../Providers/AuthProvider";
import { GetVideos } from "../../service/service";
import VideoCard from "./Components/VideoCard";
import queryString from "query-string";

const HomePage = ({ history, location }) => {
  const { user, authLoading } = useContext(AuthContext);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { searchKey } = queryString.parse(location.search);

  const getData = async () => {
    setLoading(true);
    const response = await GetVideos({
      searchKey: searchKey ? searchKey : null,
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
    getData();
  }, [searchKey]);

  if (!authLoading && !user) return <Redirect to="/login" />;

  return (
    <div className="">
      <TopBar active="home" />
      <div className="flex justify-center py-5">
        <div className="max-w-7xl text-center">
          {loading ? (
            <ComponentLoader height="90vh" />
          ) : (
            <div className="">
              <div className="w-full text-center mb-2">
                {searchKey ? (
                  <span className="text-sm text-gray-600 w-full block my-2">
                    Search Result for:{" "}
                    <span className="text-sm font-bold text-gray-800">
                      {searchKey}
                    </span>
                  </span>
                ) : (
                  <span className="text-sm font-bold text-gray-800">
                    All Videos
                  </span>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {videos.map((video) => (
                  <Link to={`video/${video.slug}`}>
                    <VideoCard video={video} />
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

export default HomePage;
