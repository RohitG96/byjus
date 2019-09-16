import axios from 'axios';

const api = axios.create ({
  baseURL: `https://nut-case.s3.amazonaws.com/jobs.json`,
  timeout: 40000,
});

const on200 = ({status, data}) => ({status, code: 'OK', data});

const onOther = err => {
  const {status, data} = err.response || {status: 0, data: null};
  const d = data || {};
  if (status < 100) {
    const code = err.code || 'E_DISCONNECTED';
    const error = err.message || 'Failed to connect, check your connection';
    return {status, code, data: {error, code}};
  }
  const code = d.code || `E_${status}`;
  const error = d.error || `Something went wrong (${status})`;
  return {status, code, data: {error, code}};
};

const get = (path, config) => {
  return api.get(path, config).then(on200).catch(onOther);
};
const del = (path, config) => {
  return api.delete(path, config).then(on200).catch(onOther);
};
const post = (path, data, config) => {
  return api.post(path, data, config).then(on200).catch(onOther);
};
const put = (path, data, config) => {
  return api.put(path, data, config).then(on200).catch(onOther);
};

const v1 = {
  get,
  post,
  put,
  del
};

export default v1;
