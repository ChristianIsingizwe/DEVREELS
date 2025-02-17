import { Video } from "./Video";


export interface NewVideo extends Omit<Video, "id" | "createdAt" | "updateAt">{}