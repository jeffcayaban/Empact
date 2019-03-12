package com.empact.Empact.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.impl.DefaultJwtParser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;

/**
 * Produces and validates JwT tokens for the client-side to use when making requests to the server-side APIs.
 */

@Component
public class JwtTokenProvider {

	private static final Logger logger = LoggerFactory.getLogger(JwtTokenProvider.class);

	/** Stores the JwT Secret **/
	private @Value("${app.jwtSecret}") String jwtSecret;

	/** Stores the period of time before the JwT token expires. **/
	private @Value("${app.jwtTokenExpirationTimeInMs}") int jwtTokenExpirationTimeInMs;

	/**
	 * Generates a new JwT token given a set of authentication details.
	 *
	 * @param authentication Authentication details
	 * @return The JwT token.
	 */

	public String generateToken(Authentication authentication) {
		String userId = String.valueOf(((CustomUserDetails) authentication.getPrincipal()).getId());

		return Jwts.builder()
				.setExpiration(new Date(new Date().getTime() + jwtTokenExpirationTimeInMs))
				.setIssuedAt(new Date())
				.signWith(SignatureAlgorithm.HS512, jwtSecret)
				.setSubject(userId)
				.compact();
	}

	/**
	 * Gets the user's ID from the JwT Token.
	 *
	 * @param token The JwT token.
	 * @return The ID of the user.
	 */

	protected Long getUserIdFromJWT(String token) {
		DefaultJwtParser parser = new DefaultJwtParser();
		JwtParser jwtParser = parser.setSigningKey(jwtSecret);

		Jws<Claims> jws = jwtParser.parseClaimsJws(token);
		String jwsClaimsSubject = jws.getBody().getSubject();

		return Long.valueOf(jwsClaimsSubject);
	}

	/**
	 * Validates a given JwT token.
	 *
	 * @param authToken The JwT token to be validated.
	 * @return Whether the JwT token is valid.
	 */

	protected boolean validateJwtToken(String authToken) {
		boolean isTokenValid;

		try {
			Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
			isTokenValid = true;

		} catch (MalformedJwtException ex) {
			logger.error("The JWT token is invalid");
			isTokenValid = false;
		} catch (SignatureException ex) {
			logger.error("The JWT token contains an invalid signature");
			isTokenValid = false;
		} catch (ExpiredJwtException ex) {
			logger.error("The JWT token is expired.");
			isTokenValid = false;
		} catch (IllegalArgumentException ex) {
			logger.error("The JWT token contains an empty claims string");
			isTokenValid = false;
		} catch (UnsupportedJwtException ex) {
			logger.error("The JWT token is unsupported.");
			isTokenValid = false;
		}

		return isTokenValid;
	}
}
