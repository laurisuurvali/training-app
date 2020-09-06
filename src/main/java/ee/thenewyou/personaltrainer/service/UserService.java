package ee.thenewyou.personaltrainer.service;

import ee.thenewyou.personaltrainer.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

    User register(User user);

    List<User> getAll();

    Optional<User> findById(Long id);

    Optional<User> findByUsername(String username);

    void updateUser(User user);

    void delete(Long id);

    List<User> getAllBySubscription(Long subscriptionId);

    void createPasswordResetTokenForUser(final User user, final String token);

    String validatePasswordResetToken(String token);

    Optional<User> getUserByPasswordResetToken(String token);

    void changeUserPassword(User user,
                            String password);
}
