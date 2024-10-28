package learn.controllers;

import learn.models.AppUser;
import learn.security.JwtConverter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;


@RestController
public class AuthController {

    public final AuthenticationManager authenticationManager;
    private final JwtConverter jwtConverter;

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    public AuthController(AuthenticationManager authenticationManager, JwtConverter jwtConverter) {
        this.authenticationManager = authenticationManager;
        this.jwtConverter = jwtConverter;
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody AppUser user) {
        // Authenticate the user (you need to implement this logic)
        // If successful, return a token or some form of authentication
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
                user.getUsername(),
                user.getPassword());

        try {
            Authentication authentication = authenticationManager.authenticate(token);
            if (authentication.isAuthenticated()) {
                AppUser appUser = (AppUser) authentication.getPrincipal();
                String role = appUser.getAuthorities().stream()
                        .map(authority -> authority.getAuthority())
                        .findFirst()
                        .orElse("none");
                return new ResponseEntity<>(
                        Map.of("jwt", jwtConverter.getTokenFromUser(appUser), "userId", String.valueOf(appUser.getAppUserId()),
                                "role", role),
                        HttpStatus.OK);
            }
        } catch (AuthenticationException ex) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
}
