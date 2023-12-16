import React, { PropsWithChildren } from 'react';
import { createContext, useState } from 'react';

export type AuthInformation = {
	isAuthenticated: boolean;
	id?: string;
	firstName?: string;
	lastName?: string;
	email?: string;
	username?: string;
};

export type AuthContextProviderProps = {
	defaultAuthInformationValue: AuthInformation;
} & PropsWithChildren;

export const AuthContext = createContext({
	authInformation: {
		isAuthenticated: false,
		id: undefined,
		firstName: undefined,
		lastName: undefined,
		email: undefined,
		username: undefined,
	} as AuthInformation,
	setAuthInformation: (value: AuthInformation) => {},
});

export default function AuthContextProvider({
	defaultAuthInformationValue = {
		isAuthenticated: false,
		id: undefined,
		firstName: undefined,
		lastName: undefined,
		email: undefined,
		username: undefined,
	},
	children,
}: AuthContextProviderProps) {
	const [authInformation, setAuthInformation] = useState<AuthInformation>(
		defaultAuthInformationValue
	);

	return (
		<AuthContext.Provider value={{ authInformation, setAuthInformation }}>
			{children}
		</AuthContext.Provider>
	);
}
