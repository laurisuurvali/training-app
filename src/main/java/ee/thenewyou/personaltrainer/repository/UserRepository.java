package ee.thenewyou.personaltrainer.repository;


import ee.thenewyou.personaltrainer.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {


    List<User> findAllByOrderByIdAsc();

    Optional<User> findById(Long id);

    Optional<User> findByUsername(String name);

    Boolean existsByUsername(String username);

    @Query("select u from User u inner join u.subscription sub where sub.subscriptionId = :subscriptionId")
    List<User> findAllBySubscriptionId(Long subscriptionId);

}
