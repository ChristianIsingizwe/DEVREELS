import { PaginatedResponse, Video } from "../../interfaces/VideoInterfaces";
import videoService, { GetVideoParams } from "../../services/VideoService";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useInfiniteVideos = (params?: GetVideoParams) => {
  return useInfiniteQuery<PaginatedResponse<Video>, Error>({
    queryKey: ["videos", params],
    queryFn: async ({ pageParam = undefined }) => {
      const queryParams: GetVideoParams = {
        limit: params?.limit || 10,
        cursor: pageParam as GetVideoParams["cursor"],
      };
      return await videoService.getVideos(queryParams);
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    initialPageParam: undefined,
  });
};
