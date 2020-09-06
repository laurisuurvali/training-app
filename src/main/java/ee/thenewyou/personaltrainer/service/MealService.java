package ee.thenewyou.personaltrainer.service;

import ee.thenewyou.personaltrainer.model.ChallengeDay;
import ee.thenewyou.personaltrainer.model.Meal;
import ee.thenewyou.personaltrainer.model.MealType;

import java.util.List;
import java.util.Optional;

public interface MealService {

    Meal save(Meal meal);

    List<Meal> findAll();

    Optional<Meal> findById(Long id);

    List<Meal> findByChallengeDayId(Long challengeId, Integer weekNumberId, Integer dayNumberId);

    List<Meal> findTwoWeekMealsByChallengeNumberIdAndWeekNumberId(Long challengeNumberId, Integer weekNumberId);

    Optional<Meal> findMealByChallengeDayAndMealType(ChallengeDay challengeDay, MealType mealType);

    void updateMeal(Meal meal);

    void delete(Long id);


}








