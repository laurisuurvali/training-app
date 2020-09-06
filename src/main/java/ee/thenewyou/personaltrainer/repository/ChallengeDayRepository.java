package ee.thenewyou.personaltrainer.repository;


import ee.thenewyou.personaltrainer.model.ChallengeDay;
import ee.thenewyou.personaltrainer.model.ChallengeDayId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ChallengeDayRepository extends JpaRepository<ChallengeDay, ChallengeDayId> {

    @Query("select cd from ChallengeDay cd where cd.id.challengeNumberId = :challengeNumberId and cd.id.weekNumberId = :weekNumberId and cd.id.dayNumberId = :dayNumberId")
     ChallengeDay findChallengeDayByChallengeIdWeekNumberIdDayNumberId(Long challengeNumberId, Integer weekNumberId, Integer dayNumberId);

    @Query("select cd from ChallengeDay cd where cd.challenge.challengeId = :challengeId")
    List<ChallengeDay> findByChallengeId(Long challengeId);

}
