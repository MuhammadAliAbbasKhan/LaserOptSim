import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const getSoftwareProducts = async () => {
  const res = await api.get('/products/');
  return res.data;
};

export const submitTrialRequest = async (data) => {
  const res = await api.post('/trial-request/', data);
  return res.data;
};

export const submitContactInquiry = async (data) => {
  const res = await api.post('/contact/', data);
  return res.data;
};

export const submitServiceRequest = async (data) => {
  const res = await api.post('/service-request/', data);
  return res.data;
};

export const signupUser = async (data) => {
  const res = await api.post('/auth/signup/', data);
  return res.data;
};

export const loginUser = async (data) => {
  const res = await api.post('/auth/login/', data);
  return res.data;
};

const getAdminHeaders = () => {
  const passcode = localStorage.getItem('adminPasscode') || 'aliabbas1234578!';
  return {
    headers: {
      'X-Admin-Passcode': passcode
    }
  };
};

export const createStripePaymentIntent = async (data) => {
  const res = await api.post('/stripe/create-payment-intent/', data);
  return res.data;
};

export const processSubscription = async (data) => {
  const res = await api.post('/subscribe/', data);
  return res.data;
};

export const getMongoDBStatus = async () => {
  const res = await api.get('/mongodb-status/');
  return res.data;
};

export const getAdminAnalytics = async () => {
  const res = await api.get('/admin/analytics/', getAdminHeaders());
  return res.data;
};

export const listAdminUsers = async () => {
  const res = await api.get('/admin/users/', getAdminHeaders());
  return res.data;
};

export const updateAdminUserPlan = async (data) => {
  const res = await api.post('/admin/users/update-plan/', data, getAdminHeaders());
  return res.data;
};

export const listAdminTrials = async () => {
  const res = await api.get('/admin/trials/', getAdminHeaders());
  return res.data;
};

export const listAdminInquiries = async () => {
  const res = await api.get('/admin/inquiries/', getAdminHeaders());
  return res.data;
};

export const listAdminServiceRequests = async () => {
  const res = await api.get('/admin/service-requests/', getAdminHeaders());
  return res.data;
};

export default api;
