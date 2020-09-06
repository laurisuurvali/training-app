package ee.thenewyou.personaltrainer.service;

import ee.thenewyou.personaltrainer.model.Challenge;

import java.util.List;
import java.util.Optional;

public interface ChallengeService {

    Challenge addNewChallenge(Challenge challenge);

    void updateChallenge(Challenge challenge);

    List<Challenge> findAll();

    Optional<Challenge> findById(Long id);

    void deleteChallenge(Long id);
}
