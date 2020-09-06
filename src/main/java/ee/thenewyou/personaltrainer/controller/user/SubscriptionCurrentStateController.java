package ee.thenewyou.personaltrainer.controller.user;

import ee.thenewyou.personaltrainer.exception.ResourceNotFoundException;
import ee.thenewyou.personaltrainer.model.Subscription;
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

@RestController
@RequestMapping("/api/v1/user")
@Slf4j
public class SubscriptionCurrentStateController {

    private final ModelMapper modelMapper;
    private final SubscriptionService subscriptionService;
    private final SubscriptionCurrentStateService subscriptionCurrentStateService;

    @Autowired
    public SubscriptionCurrentStateController(ModelMapper modelMapper,
                                              SubscriptionService subscriptionService,
                                              SubscriptionCurrentStateService subscriptionCurrentStateService) {
        this.modelMapper = modelMapper;
        this.subscriptionService = subscriptionService;
        this.subscriptionCurrentStateService = subscriptionCurrentStateService;
    }

    @GetMapping("/subscription_current_state")
    public boolean isSubscriptionOver(Authentication authentication) throws ResourceNotFoundException {
        Optional<Subscription> foundSubscriptionOptional = subscriptionService.findSubscriptionByAuthentication(
                authentication);
        if (!foundSubscriptionOptional.isPresent()) {
            throw new ResourceNotFoundException("Subscription not found on :: " + authentication.getName());
        }
        return subscriptionCurrentStateService.isSubscriptionOver(foundSubscriptionOptional.get().getEndDate());
    }

    @GetMapping("/subscription_current_state/week")
    public Integer getSubscriptionCurrentWeekNumber(Authentication authentication) throws ResourceNotFoundException {
        Optional<Subscription> foundSubscriptionOptional = subscriptionService.findSubscriptionByAuthentication(
                authentication);
        if (!foundSubscriptionOptional.isPresent()) {
            throw new ResourceNotFoundException("Subscription not found on :: " + authentication.getName());
        }
        LocalDate subscriptionStartDate = foundSubscriptionOptional
                .get()
                .getStartDate();
        return convertToDto(subscriptionCurrentStateService.getSubscriptionCurrentWeekNumber(subscriptionStartDate));
    }

    @GetMapping("/subscription_current_state/week_day")
    public Integer getSubscriptionCurrentWeekDayNumber(Authentication authentication) throws ResourceNotFoundException {
        Optional<Subscription> foundSubscriptionOptional = subscriptionService.findSubscriptionByAuthentication(
                authentication);
        if (!foundSubscriptionOptional.isPresent()) {
            throw new ResourceNotFoundException("Subscription not found on :: " + authentication.getName());
        }
        LocalDate subscriptionStartDate = foundSubscriptionOptional
                .get()
                .getStartDate();
        return convertToDto(subscriptionCurrentStateService.getSubscriptionCurrentWeekDayNumber(subscriptionStartDate));
    }

    @GetMapping("/subscription_current_state/day")
    public Integer getSubscriptionCurrentDayNumber(Authentication authentication) throws ResourceNotFoundException {
        Optional<Subscription> foundSubscriptionOptional = subscriptionService.findSubscriptionByAuthentication(
                authentication);
        if (!foundSubscriptionOptional.isPresent()) {
            throw new ResourceNotFoundException("Subscription not found on :: " + authentication.getName());
        }
        LocalDate subscriptionStartDate = foundSubscriptionOptional
                .get()
                .getStartDate();
        return convertToDto(subscriptionCurrentStateService.getSubscriptionCurrentDayNumber(subscriptionStartDate));
    }

    private Integer convertToDto(Integer integer) {
        return modelMapper.map(integer, Integer.class);
    }
}
