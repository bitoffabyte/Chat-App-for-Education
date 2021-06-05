import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { auth, provider } from '../config';
const AddContext = createContext();
export const useUserContext = () => {
	return useContext(AddContext);
};

export const UserContext = ({ children }) => {
	const [loggedInUser, setLoggedInUser] = useState(null);
	const [loggedInMail, setLoggedInMail] = useState(null);
	const login = () => auth.signInWithPopup(provider);
	const logout = () => auth.signOut();
	const socketRef = useRef();
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				setLoggedInMail(authUser.email);
				setLoggedInUser(authUser);
			} else {
				setLoggedInMail(null);
				setLoggedInUser(null);
			}
		});
		return () => unsubscribe();
	}, []);
	const value = {
		login,
		logout,
		loggedInMail,
		loggedInUser,
		socketRef,
	};
	return <AddContext.Provider value={value}>{children}</AddContext.Provider>;
};
