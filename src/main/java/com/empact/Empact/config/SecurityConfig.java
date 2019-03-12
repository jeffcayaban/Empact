package com.empact.Empact.config;

import com.empact.Empact.service.UserInfoService;
import com.empact.Empact.security.JwtAuthenticationEntryPoint;
import com.empact.Empact.security.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * Defines the configuration for the application's security.
 */

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@EnableGlobalMethodSecurity(securedEnabled = true, jsr250Enabled = true, prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	/** Used for loading a user's information **/
	private final UserInfoService userInfoService;

	/** Handle any authentication problems back to the client-side. **/
	private final JwtAuthenticationEntryPoint unauthorizedHandler;

	/**
	 * Used for setting the logged in user into the current security context.
	 *
	 * @return An instance of the JWT authentication filter.
	 */

	@Bean
	public JwtAuthenticationFilter jwtAuthenticationFilter() {
		return new JwtAuthenticationFilter();
	}

	/**
	 * Configures the application's security with a password encoder.
	 *
	 * @param authenticationManagerBuilder Authentication manager builder
	 * @throws Exception A standard exception
	 */

	@Override
	public void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
		authenticationManagerBuilder
				.userDetailsService(userInfoService)
				.passwordEncoder(getNewBCryptPasswordEncoder());
	}

	/**
	 * Return an instance of the authentication manager.
	 *
	 * @return An instance of the authentication manager.
	 * @throws Exception A standard exception
	 */

	@Bean(BeanIds.AUTHENTICATION_MANAGER)
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}

	/**
	 * Returns a new instance of a BCrypt password encoder. This is used to encode any password.
	 *
	 * @return A new instance of a BCrypt password encoder.
	 */

	@Bean
	public PasswordEncoder getNewBCryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}

	/**
	 * Configures the application's security configuration with the types of requests that can be made.
	 *
	 * @param http HTTP Security
	 * @throws Exception A standard exception
	 */

	@Override
	protected void configure(HttpSecurity http) throws Exception {

		http.requiresChannel()
				.requestMatchers(r -> r.getHeader("X-Forwarded-Proto") != null)
				.requiresSecure();

		http.cors().and().csrf().disable();
		http.exceptionHandling().authenticationEntryPoint(unauthorizedHandler);
		http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

		// The endpoints that does not require the user to login.
		http.authorizeRequests().antMatchers(
				"/",

				"/api/arguments/",
				"/api/arguments/getParentArgumentById",
				"/api/arguments/getArgumentsByRootPetitionId",
				"/api/arguments/getArgumentsByArgumentId",
				"/api/arguments/getMostDiscussedArgsForPetition",
				"/api/arguments/getMostDiscussedArgsForArgument",
				"/api/arguments/getMostDiscussedArgsForUser",
				"/api/arguments/getArgumentsByUsernameAndAnonymity",
				"/api/arguments/countArgsByPetitionIdAndIsSupporting",
				"/api/arguments/countAllByArgumentIdAndIsSupporting",
				"/api/arguments/getMostDiscussedArguments",
				"/api/arguments/getDataNodes",
				"/api/arguments/getPetitionReport",

				"/api/petitions/",
				"/api/petitions/user",
				"/api/petitions/getMostDiscussedPetitionsByUser",
				"/api/petitions/isPetitionClosed/",
				"/api/petitions/getMostDiscussedPetitions",
				"/api/petitions/search",

				"/api/user/checkUsernameAvailability",
				"/api/user/getUserProfile",

				"/api/auth/signInUser",
				"/api/auth/signUpUser",

				"/api/users/**"
		);

		// The endpoints that requires login.
		http.authorizeRequests().antMatchers(
				"/api/petitions/create",
				"/api/petitions/delete",
				"/api/petitions/edit",
				"/api/petitions/close",
				"/api/arguments/createArgumentByExpertOpinion",
				"/api/arguments/createArgumentByPopularOpinion",
				"/api/arguments/editArgumentByPopularOpinion",
				"/api/arguments/editArgumentByExpertOpinion",
				"/api/arguments/delete",
				"/api/arguments/delete",
				"/auth/deleteUser"
		).access("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')");

		// Add our custom JWT security filter
		http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
	}
}
