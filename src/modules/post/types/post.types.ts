import { InputPaginationDto } from "../../../types";

export interface CreatePostDto {
  title: string;
  content: string;
  published: boolean;
  author_id: number;
}

export interface PostQueryDto extends InputPaginationDto {
  keyword?: string;
}
