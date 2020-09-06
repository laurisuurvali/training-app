package ee.thenewyou.personaltrainer.repository;

import ee.thenewyou.personaltrainer.model.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {

    @Query("select case when count(sub)>0 then true else false end from Subscription sub where sub.challenge.challengeId = :challengeId")
    boolean findByChallenge(Long challengeId);

    @Query("select sub from Subscription sub inner join sub.users users where users.username = :username")
    Optional<Subscription> findSubscriptionByUsername(String username);
}
