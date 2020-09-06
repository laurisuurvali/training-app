package ee.thenewyou.personaltrainer.service;

import ee.thenewyou.personaltrainer.model.ChallengeDay;
import ee.thenewyou.personaltrainer.model.ChallengeDayId;

import java.util.List;

public interface ChallengeDayService {

    void save(ChallengeDay challengeDay);

    List<ChallengeDay> findAll();

    ChallengeDay findById(ChallengeDayId id);

    List<ChallengeDay> findByChallengeId(Long challengeId);

    ChallengeDay findBySeparateId(Long challengeId, Integer weekNumberId, Integer dayNumberId);
}
