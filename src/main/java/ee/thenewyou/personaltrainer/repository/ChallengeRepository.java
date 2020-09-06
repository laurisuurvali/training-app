package ee.thenewyou.personaltrainer.repository;


import ee.thenewyou.personaltrainer.model.Challenge;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChallengeRepository extends JpaRepository<Challenge, Long> {
}
