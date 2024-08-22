import axios from 'axios';
// 서버주소
const baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
const instance = axios.create({
  baseURL,
});

export const fetchInfinityGalleries = async ({ pageParam = 1 }) => {
  try {
    const { data } = await instance.get(`post/All/${pageParam}`);
    return data;
  } catch (err) {
    throw err;
  }
};

export const fetchGalleryDetail = async (id: string) => {
  try {
    const { data } = await instance.get(`post/${id}`);
    return data;
  } catch (err) {
    throw err;
  }
};
