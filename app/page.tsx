import { NoResults } from "@/components/NoResults";
import VideoCard from "@/components/VideoCard";
import { Video } from "@/types";
import axios from "axios";

export default async function Home() {


  const { data } = await axios.get("http://localhost:3000/api/post");

  const videos = data;
  
  return (
    <div className="flex flex-col gap-10 videos h-full">
      {videos.length ? (
        videos.map((video: Video) => (
          <VideoCard post={video} key={video._id} />
        ))
      ): <NoResults text={'No Videos'} />}
    </div>
  );
}
