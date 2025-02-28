import React, { useCallback, useRef } from "react";
import { useInfiniteVideos } from "../hooks/videosHooks/useInfiniteVideos";
import VideoCard from "./VideoCard";

const VideoList: React.FC = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteVideos({ limit: 10 });

  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastVideoRef = useCallback(
    (node: HTMLDivElement) => {
      if (isFetchingNextPage) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observerRef.current.observe(node);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  if (status === "pending") return <div>Loading</div>;
  if (status === "error") return <div>Error: {(error as Error).message}</div>;

  const hasVideos = data?.pages.some((page) => page.items.length > 0);

  if (!hasVideos) {
    return <div>No videos available</div>;
  }

  return (
    <div>
      {data?.pages.map((page, pageIndex) => (
        <React.Fragment key={pageIndex}>
          {page.items.map((video, videoIndex) => {
            const isLast =
              pageIndex === data.pages.length - 1 &&
              videoIndex === page.items.length - 1;
            return (
              <div
                key={video.id}
                ref={isLast ? lastVideoRef : null}
                style={{ marginBottom: "2rem" }}
              >
                <VideoCard video={video} />
              </div>
            );
          })}
        </React.Fragment>
      ))}
      {isFetchingNextPage && <div>Loading more videos...</div>}
    </div>
  );
};

export default VideoList;
