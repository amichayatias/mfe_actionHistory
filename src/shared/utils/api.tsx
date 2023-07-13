import { useState } from "react";


//export const [baseUrl, setBaseUrl] = useState("https://dog.ceo");
//export const [pathUrl, setPathUrl] = useState("api/breeds/image/random");

const baseUrl = "https://dog.ceo";
const pathUrl = "api/breeds/image/random";


const apiListObj = {
  GET: {
    HISTORY_ACTION: "",
    DOGS: "api/breeds/image/random",
  },
  POST:{

  },
  PUT:{
    
  }
};

const apiList = (apiKey: any) => {
  let keys = apiKey.split("_");
  let apiName = `${baseUrl}/`;


  apiName += apiListObj.GET.HISTORY_ACTION;

  return apiName;
};

export default apiList;
