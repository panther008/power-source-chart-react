import axios from "axios";
const apiUrl=process.env.REACT_APP_BASE_URI;
const getSupplyData=async()=>{
     return await axios.get(apiUrl);
}

const SoftooApiService = {
 getSupplyData
}

export default SoftooApiService