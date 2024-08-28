import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
enum DATA_TYPE {
  infinity = 'infinity',
  specific = 'specific',
}
const baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
const instance = axios.create({
  baseURL,
});

const fetchGalleryDataInAPIRouter = async (url: string) => {
  try {
    const { data } = await instance.get(url);
    return data;
  } catch (err) {
    throw err;
  }
};

export default async function serverRequest(req: NextApiRequest, res: NextApiResponse) {
  const { type, find } = req.query;
  const isAllOrOne = type === DATA_TYPE.infinity ? `post/All/${find}` : `post/${find}`;

  try {
    const result = await fetchGalleryDataInAPIRouter(isAllOrOne);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}
