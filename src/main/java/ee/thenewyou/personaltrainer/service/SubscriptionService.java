package ee.thenewyou.personaltrainer.service;

import ee.thenewyou.personaltrainer.model.Subscription;
import org.springframework.security.core.Authentication;

import java.util.List;
import java.util.Optional;

public interface SubscriptionService {

    Subscription addNewSubscription(Subscription subscription);

    void updateSubscription(Subscription subscription);

    List<Subscription> findAll();

    Optional<Subscription> findById(Long id);

    void deleteSubscription(Long id);

    boolean findByChallenge(Long challengeId);

    Optional<Subscription> findSubscriptionByAuthentication(Authentication authentication);
}
