package ee.thenewyou.personaltrainer.repository;

import ee.thenewyou.personaltrainer.model.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ExerciseRepository extends JpaRepository<Exercise, Long> {

    @Query("select e from Exercise e where (e.challengeDay.id.challengeNumberId = :challengeId or e.challengeDay.id.challengeNumberId is null) and (e.challengeDay.id.weekNumberId = :weekNumberId or e.challengeDay.id.weekNumberId is null) and (e.challengeDay.id.dayNumberId = :dayNumberId or e.challengeDay.id.dayNumberId is null)")
    List<Exercise> findByChallengeDayId(Long challengeId, Integer weekNumberId, Integer dayNumberId);

    @Query("select e from Exercise e where e.challengeDay.id.challengeNumberId = :challengeId and e.challengeDay.id.weekNumberId = :weekNumberId")
    List<Exercise> findCurrentWeekExercisesBySubscriptionId(Long challengeId, Integer weekNumberId);
}
