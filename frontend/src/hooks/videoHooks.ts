import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import videoService from "../services/videoService";

export const useVideo = (id: string) => {
  return useQuery({
    queryKey: ["video", id],
    queryFn: () => videoService.getVideo(id),
  });
};


export const useUploadVideo = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (formData: FormData) => videoService.uploadVideo(formData),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["videos"]})
        }
    })
}