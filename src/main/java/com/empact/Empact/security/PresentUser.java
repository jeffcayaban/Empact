package com.empact.Empact.security;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import java.lang.annotation.*;

@Target({ ElementType.PARAMETER, ElementType.TYPE })
@Retention(RetentionPolicy.RUNTIME)
@Documented
@AuthenticationPrincipal

/**
 * Provides an annotation to indicate the currently logged in user.
 */

public @interface PresentUser {

}
