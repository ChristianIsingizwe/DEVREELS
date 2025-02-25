import axiosInstance from "../clients/apiClient";

export interface Video {
  id: string;
  title: string;
  description: string;
  cloudinary720pUrl: string;
  cloudinary1080pUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const fetchVideos = async ({
  pageParam = 1,
}): Promise<{ videos: Video[]; nextPage?: number }> => {
  const response = await axiosInstance.get(`/videos?.page=${pageParam}`);
  return response.data;
};

const uploadVideo = async (videoData: FormData): Promise<Video> => {
  const response = await axiosInstance.post(`/videos`, videoData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export { fetchVideos, uploadVideo };
