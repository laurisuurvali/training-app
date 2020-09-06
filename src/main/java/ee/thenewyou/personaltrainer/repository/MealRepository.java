package ee.thenewyou.personaltrainer.repository;

import ee.thenewyou.personaltrainer.model.ChallengeDay;
import ee.thenewyou.personaltrainer.model.Meal;
import ee.thenewyou.personaltrainer.model.MealType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface MealRepository extends JpaRepository<Meal, Long> {

    @Query("select m from Meal m where (m.challengeDay.id.challengeNumberId is null or m.challengeDay.id.challengeNumberId = :challengeId) and (m.challengeDay.id.weekNumberId is null or m.challengeDay.id.weekNumberId = :weekNumberId) and (m.challengeDay.id.dayNumberId is null or m.challengeDay.id.dayNumberId = :dayNumberId)")
    List<Meal> findByChallengeDayId(Long challengeId, Integer weekNumberId, Integer dayNumberId);

    @Query("select m from Meal m where m.challengeDay.id.challengeNumberId = :challengeNumberId and m.challengeDay.id.weekNumberId between :weekNumberId and :weekNumberId+1")
    List<Meal> findTwoWeekMealsByChallengeNumberIdAndWeekNumberId(Long challengeNumberId, Integer weekNumberId);

    @Query("select m from Meal m where m.challengeDay = :challengeDay and m.mealType = :mealType")
    Optional<Meal> findMealByChallengeDayAndMealType(ChallengeDay challengeDay, MealType mealType);
}
