package ee.thenewyou.personaltrainer.service;

import ee.thenewyou.personaltrainer.model.Subscription;
import ee.thenewyou.personaltrainer.repository.SubscriptionRepository;
import ee.thenewyou.personaltrainer.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;


@Service
@Slf4j
@Transactional
public class SubscriptionServiceImpl implements SubscriptionService {

    private final SubscriptionRepository subscriptionRepository;
    private final UserRepository userRepository;
    private final SubscriptionCurrentStateService subscriptionCurrentStateService;

    public SubscriptionServiceImpl(SubscriptionRepository subscriptionRepository,
                                   UserRepository userRepository,
                                   SubscriptionCurrentStateService subscriptionCurrentStateService) {
        this.subscriptionRepository = subscriptionRepository;
        this.userRepository = userRepository;
        this.subscriptionCurrentStateService = subscriptionCurrentStateService;
    }

    @Override
    public Subscription addNewSubscription(Subscription subscription) {

        Subscription addedSubscription = subscriptionRepository.save(subscription);
        log.info("IN addNewSubscription - subscription: {} successfully added", addedSubscription);
        return addedSubscription;
    }

    @Override
    public void updateSubscription(Subscription subscription) {
        Subscription updatedSubscription = subscriptionRepository.save(subscription);
        log.info("IN updateSubscription - subscription: {} successfully updated", updatedSubscription);
    }

    @Override
    public List<Subscription> findAll() {
        List<Subscription> result = subscriptionRepository.findAll();
        log.info("IN findAll - {} subscriptions found", result.size());
        return result;
    }

    @Override
    public Optional<Subscription> findById(Long id) {
        Optional<Subscription> subscription = subscriptionRepository.findById(id);
        if (!subscription.isPresent()) {
            log.warn("IN findById - no subscription found by id: {}", id);
        }
        return subscription;
    }

    @Override
    public void deleteSubscription(Long id) {
        Optional<Subscription> optionalSubscription = findById(id);
        if (optionalSubscription.isPresent()) {
            optionalSubscription.get().getUsers().forEach(user -> {
                user.setSubscription(null);
                userRepository.save(user);
            });
            subscriptionRepository.deleteById(id);
            log.info("IN deleteChallenge - challenge with id: {} successfully deleted", id);
        }
        log.warn("IN findById - no subscription found by id: {}", id);
    }

    @Override
    public boolean findByChallenge(Long challengeId) {
        return subscriptionRepository.findByChallenge(challengeId);
    }

    @Override
    public Optional<Subscription> findSubscriptionByAuthentication(Authentication authentication) {
        Optional<Subscription> subscription = subscriptionRepository.findSubscriptionByUsername(authentication.getName());
        if (!subscription.isPresent()) {
            log.warn("IN findSubscriptionByAuthentication - no subscription found by username: {}", authentication.getName());
        }
        return subscription;
    }
}
