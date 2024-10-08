"use client";
import { Video } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import { HiVolumeOff, HiVolumeUp } from "react-icons/hi";

interface IProps {
  post: Video;
}

const VideoCard = ({ post }: IProps) => {
  const [isHover, setIsHover] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const onVideoPres = () => {
    if (playing) {
      videoRef.current?.pause();
      setPlaying(false);
    } else {
      videoRef.current?.play();
      setPlaying(true);
    }
  };

    const onMuteToggle = () => {
      if (videoRef.current) {
        videoRef.current.muted = !videoRef.current.muted;
        setIsVideoMuted(videoRef.current.muted);
      }
    };

  return (
    <div className="flex flex-col border-b-2 border-gray-200 pb-6">
      <div className="flex items-center">
        <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
          <div className="md-w-16 md:h-16 w-10 h-10">
            <Link href="/">
              <Image
                src={post.postedBy.image}
                width={62}
                height={62}
                alt="profile photo"
                className="rounded-full"
              />
            </Link>
          </div>
        </div>
        <Link href="/">
          <div className="flex items-center gap-2">
            <p className="flex items-center md:text-md font-bold text-primary">
              {post.postedBy.userName} {` `}
              <GoVerified className="text-blue-400 text-md" />
            </p>
            <p className="capitalize font-medium text-xs text-gray-500 hidden md:block">
              {post.postedBy.userName}
            </p>
          </div>
        </Link>
      </div>
      <div
        onMouseEnter={() => {
          setIsHover(true);
        }}
        onMouseLeave={() => {
          setIsHover(false);
        }}
        className="lg:ml-20 flex gap-4 relative"
      >
        <div className="rounded-3xl">
          <Link href="/">
            <video
              ref={videoRef}
              src={post.video.asset.url}
              className="lg:w-[600px] h-[300px] md:h-[400px lg:h-[530px] w-[200px] rounded-2xl cursor-pointer bg-gray-100"
            ></video>
          </Link>

          {isHover && (
            <div className="absolute bottom-6 cursor-pointer left-8 md:left-14 lg:left-0 flex gap-10 lg:justify-between w-[100px] md:w-[50px] p-3">
              {playing ? (
                <button onClick={onVideoPres}>
                  <BsFillPauseFill className="text-black text-2xl lg:text-4xl" />
                </button>
              ) : (
                <button onClick={onVideoPres}>
                  <BsFillPlayFill className="text-black text-2xl lg:text-4xl" />
                </button>
              )}

              {isVideoMuted ? (
                <button onClick={onMuteToggle}>
                  <HiVolumeOff className="text-black text-2xl lg:text-4xl" />
                </button>
              ) : (
                <button onClick={onMuteToggle}>
                  <HiVolumeUp className="text-black text-2xl lg:text-4xl" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
