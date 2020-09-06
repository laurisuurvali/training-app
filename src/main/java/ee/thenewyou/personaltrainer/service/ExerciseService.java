package ee.thenewyou.personaltrainer.service;

import ee.thenewyou.personaltrainer.model.Exercise;

import java.util.List;
import java.util.Optional;

public interface ExerciseService {

    Exercise save(Exercise exercise);

    List<Exercise> findAll();

    Optional<Exercise> findById(Long id);

    List<Exercise> findByChallengeDayId(Long challengeId, Integer weekNumberId, Integer dayNumberId);

    List<Exercise> findCurrentWeekExercisesByChallengeIdAndWeekNumberId(Long challengeId, Integer weekNumberId);

    void updateExercise(Exercise exercise);

    void delete(Long id);
}



