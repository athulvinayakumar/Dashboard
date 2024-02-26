import { Base_Url } from "./baseURL"
import { commonAPI } from "./commonAPI"

//register api
export const registerAPI = async(user)=>{
    return await commonAPI('POST',`${Base_Url}/user/register`,user,"")
}

//login api
export const loginAPI = async (user) => {
    return await commonAPI("POST", `${Base_Url}/user/login`, user, "")
 }