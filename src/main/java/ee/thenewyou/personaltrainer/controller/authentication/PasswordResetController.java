package ee.thenewyou.personaltrainer.controller.authentication;

import ee.thenewyou.personaltrainer.dto.PasswordDto;
import ee.thenewyou.personaltrainer.exception.UserStateException;
import ee.thenewyou.personaltrainer.model.User;
import ee.thenewyou.personaltrainer.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import static ee.thenewyou.personaltrainer.controller.PasswordResetUtility.constructResetTokenEmail;

@RestController("PasswordResetController")
@RequestMapping("/api/v1/auth")
@Slf4j
public class PasswordResetController {

    @Value("${client-hosting}")
    private String clientHosting;

    private final UserService userService;
    private final JavaMailSender mailSender;
    private static final String MESSAGE_RESPONSE = "message";

    @Autowired
    public PasswordResetController(UserService userService,
                                   JavaMailSender mailSender) {
        this.userService = userService;
        this.mailSender = mailSender;
    }

    @GetMapping("/reset_password")
    public ResponseEntity<Object> resetPassword(@RequestParam("email") String userEmail) {
        try {
            Optional<User> oUser = userService.findByUsername(userEmail.toLowerCase());
            if (!oUser.isPresent()) {
                throw new UserStateException("Not found user with email " + userEmail.toLowerCase());
            }

            User user = oUser.get();
            String token = UUID
                    .randomUUID()
                    .toString();
            userService.createPasswordResetTokenForUser(user, token);
            mailSender.send(constructResetTokenEmail(clientHosting, token, user));
            Map<String, String> genericResponse = new HashMap<>();
            genericResponse.put(MESSAGE_RESPONSE, "Salasõna muutmise link on saadetud  " + userEmail.toLowerCase());
            return ResponseEntity.ok(genericResponse);

        } catch (UserStateException e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Ei leidnud sellist emaili", e);
        }
    }

    @PostMapping("/save_password")
    public ResponseEntity<Object> savePassword(@RequestBody PasswordDto passwordDto) {

        String result = userService.validatePasswordResetToken(passwordDto.getToken());

        try {
            if (result != null) {
                throw new UserStateException("Some problem with your token: " + result);
            }
            Optional<User> user = userService.getUserByPasswordResetToken(passwordDto.getToken());
            if (!user.isPresent()) {
                throw new UserStateException("Some problem with your token");
            } else {
                userService.changeUserPassword(user.get(), passwordDto.getNewPassword());
                Map<String, String> genericResponse = new HashMap<>();
                genericResponse.put(MESSAGE_RESPONSE, "Uus parool on määratud!");
                return ResponseEntity.ok(genericResponse);
            }
        } catch (UserStateException e) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Midagi läks valesti, proovige uuesti salasõna muuta.", e);
        }
    }

}
