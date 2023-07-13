import axios from "axios";

const baseUrl = "https://dog.ceo";
const pathUrl = "api/breeds/image/random";

const interceptor = axios.create({
  baseURL: baseUrl,
  withCredentials: false,
  headers: {
    "Content-Type": "text/plain;charset=utf-8",
    "Accept-Encoding": "gzip, deflate, br",
    Connection: "keep-alive",
    Accept: "application/json, text/plain, */*",
    //'Authorization': 'token <your-token-here> -- https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token'
  },
});

//GET
export const getData = async (pathKey: string) => {
  //let url = (apiList(pathKey));

  const response = await interceptor.get(`/${pathUrl}`);

  return response.data;
};

//GET => get data by param
export const getDataByParam = async (param: any) => {
  const response = await interceptor.get(`${baseUrl}/${pathUrl}/${param}`);
  return response.data;
};

//POST => get data by object
export const getDataByObject = async (data: any) => {
  const response = await interceptor.post(`${baseUrl}/${pathUrl}`, data);
  return response.data;
};

//POST => create data
export const postData = async (data: any) => {
  const response = await interceptor.post(`${baseUrl}/${pathUrl}`, data);
  return response.data;
};

//PUT => update data
export const putData = async (data: any) => {
  const response = await interceptor.put(`${baseUrl}/${pathUrl}`, data);
  return response.data;
};

//DELETE = >delete data
export const deleteData = async (param: any) => {
  const response = await interceptor.delete(`${baseUrl}/${pathUrl}/${param}`);
  return response.data;
};

// `cancelToken` specifies a cancel token that can be used to cancel the request
// (see Cancellation section below for details)
//
function cancelToken() {
  let a;
  return a;
}
