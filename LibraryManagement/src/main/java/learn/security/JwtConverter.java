package learn.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import learn.models.AppUser;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.List;

@Component
public class JwtConverter {

    // 1. Signing key
    private final SecretKey key = Jwts.SIG.HS256.key().build();
    // 2. "Configurable" constants
    private final String ISSUER = "library";
    private final int EXPIRATION_MINUTES = 234553559;
    private final int EXPIRATION_MILLIS = EXPIRATION_MINUTES * 60 * 1000;

    public String getTokenFromUser(AppUser user) {

        List<String> authorities = user.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .toList();

        return Jwts.builder()
                .issuer(ISSUER)
                .subject(user.getUsername())
                .claim("app_user_id", user.getAppUserId())
                .claim("authorities", authorities)
                .expiration(new Date(System.currentTimeMillis() + EXPIRATION_MILLIS))
                .signWith(key)
                .compact();
    }

    public AppUser getUserFromToken(String token) {

        if (token == null || !token.startsWith("Bearer ")) {
            return null;
        }

        try {
            Jws<Claims> jws = Jwts.parser()
                    .requireIssuer(ISSUER)
                    .verifyWith(key)
                    .build()
                    .parseSignedClaims(token.substring(7));

            String username = jws.getPayload().getSubject();
            int appUserId = jws.getPayload().get("app_user_id", Integer.class);
            List<String> authorities = (List<String>) jws.getPayload().get("authorities", List.class);

            AppUser user = new AppUser();
            user.setAppUserId(appUserId);
            user.setUsername(username);
            user.setAuthorities(authorities);

            return user;
        } catch (JwtException e) {
            e.printStackTrace();
        }

        return null;
    }
}

