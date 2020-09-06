package ee.thenewyou.personaltrainer.security;

import ee.thenewyou.personaltrainer.exception.UserStateException;
import ee.thenewyou.personaltrainer.model.User;
import ee.thenewyou.personaltrainer.security.jwt.JwtUser;
import ee.thenewyou.personaltrainer.security.jwt.JwtUserFactory;
import ee.thenewyou.personaltrainer.service.UserService;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
public class JwtUserDetailsService implements UserDetailsService {

    private final UserService userService;

    @Autowired
    public JwtUserDetailsService(UserService userService) {
        this.userService = userService;
    }

    @SneakyThrows
    @Override
    public UserDetails loadUserByUsername(String username) {

        Optional<User> oUser = userService.findByUsername(username);
        if (!oUser.isPresent()) {
            throw new UserStateException("User " + username + " is not found");
        }
        User user = oUser.get();

        JwtUser jwtUser = JwtUserFactory.create(user);
        log.info("IN loadUserByUsername - user with username: {} successfully loaded", username);
        return jwtUser;
    }
}
