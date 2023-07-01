import axios from 'axios';
import queryString from 'query-string';
import { ProducerInterface, ProducerGetQueryInterface } from 'interfaces/producer';
import { GetQueryInterface } from '../../interfaces';

export const getProducers = async (query?: ProducerGetQueryInterface) => {
  const response = await axios.get(`/api/producers${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createProducer = async (producer: ProducerInterface) => {
  const response = await axios.post('/api/producers', producer);
  return response.data;
};

export const updateProducerById = async (id: string, producer: ProducerInterface) => {
  const response = await axios.put(`/api/producers/${id}`, producer);
  return response.data;
};

export const getProducerById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/producers/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteProducerById = async (id: string) => {
  const response = await axios.delete(`/api/producers/${id}`);
  return response.data;
};
