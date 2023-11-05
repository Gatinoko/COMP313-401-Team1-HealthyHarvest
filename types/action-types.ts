/**
 * Custom error type for use in server actions.
 *
 * @param message - Error message.
 * @param cause - Cause of error.
 */
export type Error = {
	message: string;
	cause: string;
};

/**
 * Custom success response type for use in server actions.
 *
 * @param message - Success message to be displayed in client-side.
 */
export type SuccessResponse = {
	message: string;
};
