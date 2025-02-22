import apiClient from "../clients/appApiClient";

class VideoService {
  async getVideos(params: { limit: number; cursor?: string }) {
    const response = await apiClient.get("/videos", { params });
    return response.data;
  }

  async getVideo(id: string) {
    const response = await apiClient.get(`/videos/${id}`);
    return response.data;
  }

  async deleteVideo(id: string) {
    const response = await apiClient.delete(`/videos/delete/${id}`);
    return response.data;
  }

  async uploadVideo(formData: FormData) {
    const response = await apiClient.post("/videos/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  }
}

const videoService = new VideoService();
export default videoService;
