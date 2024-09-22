import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { topics } from "@/utils/constants";

const Discover = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("topic");

  const topicStyle =
    "xl:border-b-2 hover:bg-primary xl:border-gray-300 px-3 py-2 rounded xl:rounded-full flex items-center gap-2  justify-center cursor-pointer text-black";

  const activeTopicStyle =
    "xl:border-b-2 hover:bg-primary xl:border-[#F51997] px-3 py-2 rounded xl:rounded-full flex items-center gap-2  justify-center cursor-pointer text-[#FF1997]";
  return (
    <div className="xl:border-b-2 xl:border-gray-200 pb-6">
      <p className="text-gray-500 font-semibold m-3 mt-4 hidden xl:block">
        Popular Topics
      </p>
      <div className="flex gap-3 flex-wrap">
        {topics.map((topic) => (
          <Link href={`/?topic=${topic.name}`} key={topic.name}>
            <div
              className={topic.name == search ? activeTopicStyle : topicStyle}
            >
              <span className="font-bold text-2xl xl:text-md">
                {topic.icon}
              </span>
              <span className="font-medium text-md hidden xl:block capitalize">
                {topic.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Discover;
