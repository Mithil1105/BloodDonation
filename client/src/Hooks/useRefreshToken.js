import axios from "../axios";
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('/refresh',{
            withCredentials: true,
        });
        setAuth((prev) => {
            //console.log("In refresh token");
            //console.log("prev = "+JSON.stringify(prev));
            return { 
                ...prev,
                donor_id: response.data.donor_id,
                role: response.data.role, 
                accessToken: response.data.accessToken
            }
        });
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;