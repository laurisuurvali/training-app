package ee.thenewyou.personaltrainer.service;

import ee.thenewyou.personaltrainer.model.PasswordResetToken;
import ee.thenewyou.personaltrainer.model.Role;
import ee.thenewyou.personaltrainer.model.Status;
import ee.thenewyou.personaltrainer.model.User;
import ee.thenewyou.personaltrainer.repository.PasswordResetTokenRepository;
import ee.thenewyou.personaltrainer.repository.RoleRepository;
import ee.thenewyou.personaltrainer.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final PasswordResetTokenRepository passwordResetTokenRepository;


    @Autowired
    public UserServiceImpl(UserRepository userRepository,
                           RoleRepository roleRepository,
                           BCryptPasswordEncoder passwordEncoder,
                           PasswordResetTokenRepository passwordResetTokenRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.passwordResetTokenRepository = passwordResetTokenRepository;
    }

    @Override
    public User register(User user) {
        Role roleUser = roleRepository.findByName("ROLE_USER");
        List<Role> userRoles = new ArrayList<>();
        userRoles.add(roleUser);
        String randomPassword = UUID
                .randomUUID()
                .toString();
        user.setPassword(passwordEncoder.encode(randomPassword));
        user.setRoles(userRoles);
        user.setStatus(Status.ACTIVE);

        User registeredUser = userRepository.save(user);

        log.info("IN register - user: {} successfully registered", registeredUser);

        return registeredUser;
    }

    @Override
    public List<User> getAll() {
        List<User> result = userRepository.findAllByOrderByIdAsc();
        log.info("IN getAll - {} users found", result.size());
        return result;
    }

    @Override
    public Optional<User> findById(Long id) {
        Optional<User> result = userRepository.findById(id);
        if (!result.isPresent()) {
            log.warn("IN findById - no user found by id: {}", id);
        }
        return result;
    }

    @Override
    public Optional<User> findByUsername(String username) {
        Optional<User> result = userRepository.findByUsername(username);
        if (!result.isPresent()) {
            log.warn("IN findByUsername - no user found by username: {}", username);
        }
        return result;
    }

    @Override
    public void updateUser(User user) {
        User updatedUser = userRepository.save(user);
        log.info("IN updateUser - user: {} successfully updated", updatedUser);
    }

    @Override
    public void delete(Long id) {
        userRepository.deleteById(id);
        log.info("IN delete - user with id: {} successfully deleted");
    }

    @Override
    public List<User> getAllBySubscription(Long subscriptionId) {
        List<User> result = userRepository.findAllBySubscriptionId(subscriptionId);
        log.info("IN getAllBySubscription {} - {} users found", subscriptionId, result.size());
        return result;
    }

    @Override
    public void createPasswordResetTokenForUser(final User user,
                                                final String token) {
        final PasswordResetToken myToken = new PasswordResetToken(token, user);
        passwordResetTokenRepository.save(myToken);
    }

    @Override
    public String validatePasswordResetToken(String token) {
        final PasswordResetToken passToken = passwordResetTokenRepository.findByToken(token);

        return !isTokenFound(passToken) ? "Vale link."
                : isTokenExpired(passToken) ? "Link on aegunud."
                : null;
    }

    @Override
    public Optional<User> getUserByPasswordResetToken(final String token) {
        return Optional.ofNullable(passwordResetTokenRepository
                .findByToken(token)
                .getUser());
    }

    @Override
    public void changeUserPassword(final User user, final String password) {
        user.setPassword(passwordEncoder.encode(password));
        userRepository.save(user);
    }

    private boolean isTokenFound(PasswordResetToken passToken) {
        return passToken != null;
    }

    private boolean isTokenExpired(PasswordResetToken passToken) {
        final Calendar cal = Calendar.getInstance();
        return passToken
                .getExpiryDate()
                .before(cal.getTime());
    }
}

