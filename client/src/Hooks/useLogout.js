import axios from "../axios";
import useAuth from './useAuth';

const useLogout = () => {
    const { setAuth } = useAuth();

    const logout = async () => {
        setAuth({});
        try{
            await axios.get('/user/sign_out',{
                withCredentials: true, 
            });
            console.log('logged out');
        } catch(err){
            console.error(err);
        }
    }
    return logout;
}

export default useLogout;