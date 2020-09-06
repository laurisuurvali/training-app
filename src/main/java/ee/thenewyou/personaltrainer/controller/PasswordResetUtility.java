package ee.thenewyou.personaltrainer.controller;

import ee.thenewyou.personaltrainer.model.User;
import org.springframework.mail.SimpleMailMessage;

public class PasswordResetUtility {

    private PasswordResetUtility() {
    }

    public static SimpleMailMessage constructResetTokenEmail(final String contextPath,
                                                             final String token,
                                                             final User user) {
        final String url = contextPath + "/auth/new-password?token=" + token;
        return constructEmail("THE NEW YOU - säti enda salasõna",
                "Kliki lingile või kopeeri link, et sättida enda salasõna" + " \r\n" + url,
                user);
    }

    public static SimpleMailMessage constructEmail(String subject,
                                                   String body,
                                                   User user) {
        final SimpleMailMessage email = new SimpleMailMessage();
        email.setSubject(subject);
        email.setText(body);
        email.setTo(user.getUsername());
        return email;
    }
}
