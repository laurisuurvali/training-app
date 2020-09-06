package ee.thenewyou.personaltrainer.controller.user;

import ee.thenewyou.personaltrainer.exception.ResourceNotFoundException;
import ee.thenewyou.personaltrainer.model.Meal;
import ee.thenewyou.personaltrainer.model.Subscription;
import ee.thenewyou.personaltrainer.service.MealService;
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

@RestController("UserMealController")
@RequestMapping("/api/v1/user")
@Slf4j
public class MealController {

    private final SubscriptionService subscriptionService;
    private final SubscriptionCurrentStateService subscriptionCurrentStateService;
    private final ModelMapper modelMapper;
    private final MealService mealService;

    @Autowired
    public MealController(SubscriptionService subscriptionService, SubscriptionCurrentStateService subscriptionCurrentStateService, ModelMapper modelMapper, MealService mealService) {
        this.subscriptionService = subscriptionService;
        this.subscriptionCurrentStateService = subscriptionCurrentStateService;
        this.modelMapper = modelMapper;
        this.mealService = mealService;
    }

    @GetMapping("/meal")
    public List<Meal> retrieveMealsByChallengeDayId(Authentication authentication) throws ResourceNotFoundException {
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
        Integer currentWeekNumber = subscriptionCurrentStateService.getSubscriptionCurrentWeekNumber(subscriptionStartDate);
        List<Meal> twoWeekMealsByChallengeNumberIdAndWeekNumberId = mealService.findTwoWeekMealsByChallengeNumberIdAndWeekNumberId(challengeId, currentWeekNumber);
        if (twoWeekMealsByChallengeNumberIdAndWeekNumberId == null) {
            throw new ResourceNotFoundException("Meals not found on :: " + challengeId);
        }
        return twoWeekMealsByChallengeNumberIdAndWeekNumberId.stream().map(this::convertToDto).collect(Collectors.toList());

    }

    private Meal convertToDto(Meal meal) {

        return modelMapper.map(meal, Meal.class);
    }

}
