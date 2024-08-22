// infinityScroll로 가져오는 각 post 타입
export interface Post {
  content: string;
  createdAt: string;
  deletedAt: null | string;
  id: number;
  images: PostImages[];
  postcategory: PostCategory[];
  thumbnail: string;
  title: string;
  updatedAt: string;
  userId: number;
}

export interface PostImages {
  id: number;
  postId: number;
  image: string;
}
export interface PostCategory {
  id: number;
  category: string;
  postId: number;
}

export enum PostQueryKey {
  posts = 'changeToSample',
}
