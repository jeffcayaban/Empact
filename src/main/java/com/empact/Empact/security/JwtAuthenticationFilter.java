package com.empact.Empact.security;

import com.empact.Empact.service.UserInfoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static com.empact.Empact.util.AppConstants.AUTHORIZATION;

/**
 * Used for setting the logged in user into the current security context.
 */

public class JwtAuthenticationFilter extends OncePerRequestFilter {

	/** Produces and validates JwT tokens **/
	private @Autowired JwtTokenProvider tokenProvider;

	/** Used for loading a user's information **/
	private @Autowired UserInfoService userInfoService;

	private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

	/**
	 * Gets the user from the JwT token and sets the current security context with that user.
	 *
	 * @param request The request containing the token.
	 * @param response The http response.
	 * @param filterChain Handles the incoming and outgoing requests.
	 * @throws ServletException Servlet exception
	 * @throws IOException IO Exception
	 */

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		try {
			String jwtToken = getJwtTokenFromRequest(request);

			if (jwtToken != null && !jwtToken.isEmpty() && tokenProvider.validateJwtToken(jwtToken)) {

				// Gets the user details.
				UserDetails userDetails = userInfoService.loadUserById(tokenProvider.getUserIdFromJWT(jwtToken));

				// Creates an authentication token from the user details.
				UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
						userDetails,
						null,
						userDetails.getAuthorities()
				);

				// Sets the current security context with the authentication token.
				authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

				SecurityContext securityContext = SecurityContextHolder.getContext();
				securityContext.setAuthentication(authentication);
			}

		} catch (Exception exception) {
			// Throws an exception when the user can not be set to the security context.
			logger.error("Unable to set the user's authentication in the security context", exception);
		}

		filterChain.doFilter(request, response);
	}

	/**
	 * Parses the JwT token from the http request.
	 *
	 * @param request The http request containing the token.
	 * @return The JwT token.
	 */

	private String getJwtTokenFromRequest(HttpServletRequest request) {

		String authorizationBearerToken = request.getHeader(AUTHORIZATION);

		if (authorizationBearerToken != null && !authorizationBearerToken.isEmpty()
				&& authorizationBearerToken.matches("^Bearer.*")) {

			// The request contains the token.
			return authorizationBearerToken.substring(7);

		} else {
			// Unable to parse the token from the request.
			return null;
		}
	}
}