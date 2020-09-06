package ee.thenewyou.personaltrainer.controller.user;

import ee.thenewyou.personaltrainer.exception.ResourceNotFoundException;
import ee.thenewyou.personaltrainer.model.Exercise;
import ee.thenewyou.personaltrainer.model.Subscription;
import ee.thenewyou.personaltrainer.service.ExerciseService;
import ee.thenewyou.personaltrainer.service.SubscriptionCurrentStateService;
import ee.thenewyou.personaltrainer.service.SubscriptionService;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@RestController("UserExerciseController")
@RequestMapping("/api/v1/user")
@Slf4j
public class ExerciseController {

    private final ModelMapper modelMapper;
    private final ExerciseService exerciseService;
    private final SubscriptionService subscriptionService;
    private final SubscriptionCurrentStateService subscriptionCurrentStateService;

    @Autowired
    public ExerciseController(ModelMapper modelMapper,
                              ExerciseService exerciseService,
                              SubscriptionService subscriptionService,
                              SubscriptionCurrentStateService subscriptionCurrentStateService) {
        this.modelMapper = modelMapper;
        this.exerciseService = exerciseService;
        this.subscriptionService = subscriptionService;
        this.subscriptionCurrentStateService = subscriptionCurrentStateService;
    }

    @GetMapping("/exercise")
    public List<Exercise> retrieveCurrentWeekExercises(Authentication authentication) throws ResourceNotFoundException {
        Optional<Subscription> foundSubscriptionOptional = subscriptionService.findSubscriptionByAuthentication(
                authentication);
        if (!foundSubscriptionOptional.isPresent()) {
            throw new ResourceNotFoundException("Subscription not found on :: " + authentication.getName());
        }

        if (foundSubscriptionOptional.get().getChallenge() == null) {
            throw new ResourceNotFoundException("Challenge not found on :: " + foundSubscriptionOptional.get().toString());
        }

        LocalDate subscriptionStartDate = foundSubscriptionOptional
                .get()
                .getStartDate();
        Long challengeId = foundSubscriptionOptional
                .get()
                .getChallenge()
                .getChallengeId();
        Integer currentWeekNumber = subscriptionCurrentStateService.getSubscriptionCurrentWeekNumber(
                subscriptionStartDate);

        List<Exercise> exercisesByChallengeIdAndWeekNumberId =
                exerciseService.findCurrentWeekExercisesByChallengeIdAndWeekNumberId(
                        challengeId,
                        currentWeekNumber);
        if (exercisesByChallengeIdAndWeekNumberId == null) {
            throw new ResourceNotFoundException("Exercise not found on :: " + challengeId);
        }
        return exercisesByChallengeIdAndWeekNumberId
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());

    }

    private Exercise convertToDto(Exercise exercise) {
        return modelMapper.map(exercise, Exercise.class);
    }
}

