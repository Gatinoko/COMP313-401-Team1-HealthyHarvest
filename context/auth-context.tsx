import React, { PropsWithChildren } from 'react';
import { createContext, useState } from 'react';

export type AuthInformation = {
	isAuthenticated: boolean;
	firstName: undefined;
	lastName: undefined;
	email: undefined;
	username: undefined;
};

export const AuthContext = createContext({
	authInformation: {
		isAuthenticated: false,
		firstName: undefined,
		lastName: undefined,
		email: undefined,
		username: undefined,
	},
	setAuthInformation: (value: AuthInformation) => {},
});

export default function AuthContextProvider({ children }: PropsWithChildren) {
	const [authInformation, setAuthInformation] = useState<AuthInformation>({
		isAuthenticated: false,
		firstName: undefined,
		lastName: undefined,
		email: undefined,
		username: undefined,
	});

	return (
		<AuthContext.Provider value={{ authInformation, setAuthInformation }}>
			{children}
		</AuthContext.Provider>
	);
}
