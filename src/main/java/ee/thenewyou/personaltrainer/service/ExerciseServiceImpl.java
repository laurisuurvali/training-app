package ee.thenewyou.personaltrainer.service;

import ee.thenewyou.personaltrainer.model.Exercise;
import ee.thenewyou.personaltrainer.repository.ExerciseRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;


@Service
@Slf4j
@Transactional
public class ExerciseServiceImpl implements ExerciseService {

    private final ExerciseRepository repository;


    public ExerciseServiceImpl(ExerciseRepository repository) {
        this.repository = repository;
    }


    @Override
    public Exercise save(Exercise exercise) {
        Exercise savedExercise = repository.save(exercise);
        log.info("IN saveExercise - exercise : {} successfully saved",savedExercise);
        return savedExercise;

    }

    @Override
    public List<Exercise> findAll() {
        List<Exercise> result = repository.findAll();
        log.info("IN findAll - {} exercises found", result.size());
        return result;
    }

    @Override
    public Optional<Exercise> findById(Long id) {
        Optional<Exercise> exercise = repository.findById(id);
        if (!exercise.isPresent()) {
            log.warn("IN findById - no exercise found by id: {}", id);
        }
        return exercise;
    }

    @Override
    public List<Exercise> findByChallengeDayId(Long challengeId, Integer weekNumberId, Integer dayNumberId) {
        List<Exercise> exercisesByChallengeId = repository.findByChallengeDayId(challengeId, weekNumberId, dayNumberId);
        return exercisesByChallengeId;
    }

    @Override
    public List<Exercise> findCurrentWeekExercisesByChallengeIdAndWeekNumberId(Long challengeId, Integer weekNumberId) {
        List<Exercise> currentWeekExercises = repository.findCurrentWeekExercisesBySubscriptionId(challengeId, weekNumberId);
        return currentWeekExercises;
    }

    @Override
    public void updateExercise(Exercise exercise) {
        Exercise updatedExercise = repository.save(exercise);
        log.info("IN updateExercise - exercise: {} successfully updated", updatedExercise);
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
        log.info("IN deleteExercise - exercise with id: {} successfully deleted", id);
    }


}
