package ee.thenewyou.personaltrainer.service;

import ee.thenewyou.personaltrainer.model.ChallengeDay;
import ee.thenewyou.personaltrainer.model.Meal;
import ee.thenewyou.personaltrainer.model.MealType;
import ee.thenewyou.personaltrainer.repository.MealRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@Transactional
public class MealServiceImpl implements MealService {


    private final MealRepository repository;

    public MealServiceImpl(MealRepository repository) {
        this.repository = repository;
    }


    @Override
    public Meal save(Meal meal) {
        Meal savedMeal = repository.save(meal);
        log.info("IN saveMeal - meal : {} successfully saved",savedMeal);
        return savedMeal;

    }

    @Override
    public List<Meal> findAll() {
        List<Meal> result = repository.findAll();
        log.info("IN findAll - {} meal found", result.size());
        return result;
    }

    @Override
    public Optional<Meal> findById(Long id) {
        Optional<Meal> meal = repository.findById(id);
        if (!meal.isPresent()) {
            log.warn("IN findById - no meal found by id: {}", id);
        }
        return meal;
    }

    @Override
    public List<Meal> findByChallengeDayId(Long challengeId, Integer weekNumberId, Integer dayNumberId) {
        List<Meal> mealsByChallengeDayId = repository.findByChallengeDayId(challengeId, weekNumberId, dayNumberId);
        return mealsByChallengeDayId;
    }

    @Override
    public List<Meal> findTwoWeekMealsByChallengeNumberIdAndWeekNumberId(Long challengeNumberId, Integer weekNumberId) {
        List<Meal> twoWeekMealsByChallengeNumberIdAndWeekNumberId = repository.findTwoWeekMealsByChallengeNumberIdAndWeekNumberId(challengeNumberId, weekNumberId);
        return twoWeekMealsByChallengeNumberIdAndWeekNumberId;
    }

    @Override
    public Optional<Meal> findMealByChallengeDayAndMealType(ChallengeDay challengeDay,  MealType mealType) {
        return repository.findMealByChallengeDayAndMealType(challengeDay,mealType);
    }

    @Override
    public void updateMeal(Meal meal) {
        Meal updatedMeal = repository.save(meal);
        log.info("IN updateMeal - meal: {} successfully updated", updatedMeal);
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
        log.info("IN deleteMeal - meal with id: {} successfully deleted", id);
    }

}
