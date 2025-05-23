import { useContext, useDebugValue } from "react";
import { AuthContext } from "../Context/AuthProvider";

export const useAuth = () => {
    const auth = useContext(AuthContext);
    useDebugValue(auth, auth => auth?.user ? "Logged In" : "Logged Out");
    return auth;
};

export default useAuth