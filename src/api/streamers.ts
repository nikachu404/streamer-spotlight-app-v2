import { client } from '../utils/httpClient';

export const getStreamers = async () => {
  try {
    const response = await client.get('/streamers');

    return response.data;
  } catch (error) {
    console.error('Failed to fetch streamers:', error);
    throw error;
  }
};

export const getStreamer = async (streamerId: string) => {
  try {
    const response = await client.get(`/streamers/${streamerId}`);

    return response.data;
  } catch (error) {
    console.error('Failed to fetch streamer:', error);
    throw error;
  }
};

export const createStreamer = async (
  name: string,
  platform: string,
  description: string
) => {
  try {
    const response = await client.post('/streamers', {
      name,
      platform,
      description,
    });

    return response.data;
  } catch (error) {
    console.error('Failed to save streamer submission:', error);
    throw error;
  }
};

export const voteStreamer = async (streamerId: string, voteType: string) => {
  try {
    const response = await client.put(`/streamers/${streamerId}/vote`, {
      voteType,
    });
    
    return response.data;
  } catch (error) {
    console.error('Failed to update vote:', error);
    throw error;
  }
};
