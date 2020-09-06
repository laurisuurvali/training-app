package ee.thenewyou.personaltrainer.controller.authentication;

import ee.thenewyou.personaltrainer.dto.AuthenticationRequestDto;
import ee.thenewyou.personaltrainer.exception.UserStateException;
import ee.thenewyou.personaltrainer.model.User;
import ee.thenewyou.personaltrainer.security.jwt.JwtTokenProvider;
import ee.thenewyou.personaltrainer.service.SubscriptionCurrentStateService;
import ee.thenewyou.personaltrainer.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api/v1/auth")
@Slf4j
public class AuthenticationController {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserService userService;
    private final SubscriptionCurrentStateService subscriptionCurrentStateService;

    @Autowired
    public AuthenticationController(AuthenticationManager authenticationManager,
                                    JwtTokenProvider jwtTokenProvider,
                                    UserService userService,
                                    SubscriptionCurrentStateService subscriptionCurrentStateService) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
        this.userService = userService;
        this.subscriptionCurrentStateService = subscriptionCurrentStateService;
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody AuthenticationRequestDto requestDto) {
        HttpStatus httpStatus = HttpStatus.UNAUTHORIZED;
        String responseMessage = "Juurdepääs puudub!";

        try {
            String username = requestDto.getUsername().toLowerCase();
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username,
                    requestDto.getPassword()));

            Optional<User> oUser = userService.findByUsername(username);
            if (!oUser.isPresent()) {
                throw new UserStateException("User not found " + username);
            }
            User user = oUser.get();

            if (user
                    .getRoles()
                    .stream()
                    .noneMatch(r -> r
                            .getName()
                            .equals("ROLE_ADMIN"))) {

                if (user.getSubscription() == null) {
                    httpStatus = HttpStatus.NOT_FOUND;
                    responseMessage = "Ei ole ostetud tellimust";
                    throw new UserStateException("User " + username + " subscription is not found");
                }

                LocalDate userSubscriptionStartDate = user
                        .getSubscription()
                        .getStartDate();

                LocalDate userSubscriptionEndDate = user
                        .getSubscription()
                        .getEndDate();

                boolean subscriptionIsNotStarted = subscriptionCurrentStateService.isSubscriptionNotStarted(
                        userSubscriptionStartDate);
                boolean isSubscriptionOver =
                        subscriptionCurrentStateService.isSubscriptionOver(userSubscriptionEndDate);

                if (subscriptionIsNotStarted) {
                    httpStatus = HttpStatus.SERVICE_UNAVAILABLE;
                    responseMessage = "Juurdepääs puudub! Programm algab: " + userSubscriptionStartDate;
                    throw new UserStateException("Current subscription has not started for " + username);
                }

                if (isSubscriptionOver) {
                    httpStatus = HttpStatus.SERVICE_UNAVAILABLE;
                    responseMessage = "Juurdepääs puudub! Programm lõppes: " + userSubscriptionEndDate;
                    throw new UserStateException("Current subscription has ended for " + username);
                }
            }
            String token = jwtTokenProvider.createToken(username,
                    user.getFirstName(),
                    user.getRoles());

            Map<Object, Object> response = new HashMap<>();
            response.put("username", username);
            response.put("token", token);

            return ResponseEntity.ok(response);
        } catch (AuthenticationException | UserStateException e) {
            throw new ResponseStatusException(
                    httpStatus, responseMessage, e);
        }
    }
}
