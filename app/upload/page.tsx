"use client";

import useAuthStore from "@/store/authStore";
import { client } from "@/utils/client";
import { topics } from "@/utils/constants";
import { SanityAssetDocument } from "@sanity/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

const Upload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [videoAsset, setVideoAsset] = useState<
    SanityAssetDocument | undefined
  >();
  const [invalidFileType, setInvalidFileType] = useState(false);
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState(topics[0].name);
  const [savingPost, setSavingPost] = useState(false);

  const { userProfile }: { userProfile: any } = useAuthStore();
  const router = useRouter();


  const uploadVideo = (e: any) => {
    const selectedFile = e.target.files[0];
    const fileTypes = ["video/mp4", "video/webm", "video/ogg"];

    if (fileTypes.includes(selectedFile.type)) {
      client.assets
        .upload("file", selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((data) => {
          setVideoAsset(data);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
      setInvalidFileType(true);
    }
  };

  const handlePost = async () => {
    setSavingPost(true);

    if (caption && category && videoAsset) {
      const document = {
        _type: "post",
        caption,
        video: {
          _type: "file",
          asset: {
            _type: "reference",
            _ref: videoAsset?._id,
          },
        },
        userId: userProfile?._id,
        postedBy: {
          _type: "reference",
          _ref: userProfile?._id,
        },
        topic: category
      };

      await axios.post("http://localhost:3000/api/post", document);
      router.push('/');
    }
  };
  return (
    <div className="flex w-full h-full absolute left-0 top-[60px] mb-10 pt-10 lg:pt-20 bg-[#F8F8F8] justify-center">
      <div className="bg-white rounded-lg xl:h-[80vh] w-[60%] flex gap-6 items-center flex-wrap p-14 pt-6 justify-between">
        <div>
          <div>
            <p className="text-2xl font-bold">Upload Video</p>
            <p className="text-md text-gray-400 mt-1">
              Post a video to your account
            </p>
          </div>
          <div className="border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 w-[260px] h-[460px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100">
            {isLoading ? (
              <p>Uploading...</p>
            ) : (
              <div className="relative bottom-8">
                {videoAsset ? (
                  <div>
                    <video
                      src={videoAsset?.url}
                      loop
                      controls
                      className="rounded-xl h-[450px] mt-16 bg-black"
                    ></video>
                  </div>
                ) : (
                  <label className="cursor-pointer">
                    <div className="flex flex-col items-center justify-center">
                      <p className="font-bold text-xl">
                        <FaCloudUploadAlt className="text-gray-300 text-6xl" />
                      </p>
                      <p className="text-xl font-semibold text-center">
                        Upload Video
                      </p>
                      <p className="text-gray-400 text-center mt-10 text-sm leading-10">
                        MP4 or WebM or ogg
                        <br />
                        720x1280 or higher <br />
                        Up to 10 minutes <br />
                        Less than 2GB
                      </p>
                      <p className="bg-[#F51997] text-center mt-10 rounded text-white text-md font-medium p-2 w-52 outline-none">
                        Select File
                      </p>
                    </div>
                    <input
                      type="file"
                      name="upload-video"
                      onChange={uploadVideo}
                      className="w-0 h-0"
                    />
                  </label>
                )}
              </div>
            )}
            {invalidFileType && (
              <p className="text-center text-sm  text-red-400 font-semibold mt-4 w-[250px]">
                Please select supported video file
              </p>
            )}
          </div>
        </div>
        <div>
          <div className="flex flex-col gap-3  pb-10">
            <label className="text-md font-medium">Caption</label>
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="rounded outline-none text-md border-2 border-gray-200 p-2"
            />

            <label className="text-md font-medium">Choose a Category</label>
            <select
              name="topics"
              id="topics"
              className="outline-none border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer"
              onChange={(e) => setCategory(e.target.value)}
            >
              {topics.map((topic) => (
                <option key={topic.name}>{topic.name}</option>
              ))}
            </select>

            <div className="flex gap-6 mt-10 ">
              <button
                onClick={() => {}}
                type="button"
                className="border-gray-300 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none"
              >
                Discard
              </button>
              <button
                onClick={handlePost}
                type="button"
                className="bg-[#F51997] text-m text-white font-medium p-2 rounded w-28 lg:w-44 outline-none"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
