import React, { useContext, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import TopBar from "../../Components/Header/TopBar";
import ComponentLoader from "../../Components/Loader/ComponenLoader";
import { AuthContext } from "../../Providers/AuthProvider";
import { GetVideos } from "../../service/service";
import VideoCard from "./Components/VideoCard";

const HomePage = ({ history }) => {
  const { user, authLoading } = useContext(AuthContext);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    const response = await GetVideos();
    console.log(response);
    if (response && response.isSuccess) {
      setVideos(response.data.videos);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  if (!authLoading && !user) return <Redirect to="/login" />;

  return (
    <div className="">
      <TopBar active="home" />
      <div className="flex justify-center py-5">
        <div className="max-w-7xl text-center">
          {loading ? (
            <ComponentLoader height="90vh" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {videos.map((video) => (
                <Link to={`video/${video.slug}`}>
                  <VideoCard video={video} />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
