package ee.thenewyou.personaltrainer.controller.user;

import ee.thenewyou.personaltrainer.dto.ChallengeDayDto;
import ee.thenewyou.personaltrainer.exception.ResourceNotFoundException;
import ee.thenewyou.personaltrainer.model.ChallengeDay;
import ee.thenewyou.personaltrainer.model.Subscription;
import ee.thenewyou.personaltrainer.service.ChallengeDayService;
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
import java.util.Optional;

@RestController("UserChallengeDayController")
@RequestMapping("/api/v1/user")
@Slf4j
public class ChallengeDayController {

    private final ChallengeDayService challengeDayService;
    private final SubscriptionCurrentStateService subscriptionCurrentStateService;
    private final ModelMapper modelMapper;
    private final SubscriptionService subscriptionService;

    @Autowired
    public ChallengeDayController(ChallengeDayService challengeDayService,
                                  SubscriptionCurrentStateService subscriptionCurrentStateService,
                                  ModelMapper modelMapper,
                                  SubscriptionService subscriptionService) {
        this.challengeDayService = challengeDayService;
        this.subscriptionCurrentStateService = subscriptionCurrentStateService;
        this.modelMapper = modelMapper;
        this.subscriptionService = subscriptionService;
    }

    @GetMapping("/challenge_day")
    public ChallengeDayDto retrieveCurrentChallengeDay(Authentication authentication) throws ResourceNotFoundException {
        Optional<Subscription> foundSubscriptionOptional = subscriptionService.findSubscriptionByAuthentication(
                authentication);
        if (!foundSubscriptionOptional.isPresent()) {
            throw new ResourceNotFoundException("Subscription not found on :: " + authentication.getName());
        }
        Subscription foundSubscription = foundSubscriptionOptional.get();
        LocalDate subscriptionStartDate = foundSubscription.getStartDate();
        Integer subscriptionCurrentWeekNumber = subscriptionCurrentStateService.getSubscriptionCurrentWeekNumber(
                subscriptionStartDate);
        Integer subscriptionCurrentWeekDayNumber = subscriptionCurrentStateService.getSubscriptionCurrentWeekDayNumber(
                subscriptionStartDate);
        ChallengeDay challengeDay = challengeDayService.findBySeparateId(foundSubscription
                .getChallenge()
                .getChallengeId(), subscriptionCurrentWeekNumber, subscriptionCurrentWeekDayNumber);
        return convertToDto(challengeDay);
    }

    private ChallengeDayDto convertToDto(ChallengeDay challengeDay) {
        return modelMapper.map(challengeDay, ChallengeDayDto.class);
    }

}
