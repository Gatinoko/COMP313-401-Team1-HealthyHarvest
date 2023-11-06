import { Strategy as JWTStrategy } from 'passport-jwt';
import passport from 'passport';
import { TOKEN_SECRET } from './auth-config';

export const jwtStrategy = new JWTStrategy(
	{
		secretOrKey: TOKEN_SECRET,
		jwtFromRequest: (req) =>
			req.cookies.token ? req.cookies.token : undefined,
	},
	async (jwtPayload, done) => {
		try {
			done(null, jwtPayload.username);
		} catch (error) {
			done(error);
		}
	}
);
passport.use('jwt', jwtStrategy);
