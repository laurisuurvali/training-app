package ee.thenewyou.personaltrainer.controller.user;

import ee.thenewyou.personaltrainer.dto.ChallengeDto;
import ee.thenewyou.personaltrainer.exception.ResourceNotFoundException;
import ee.thenewyou.personaltrainer.model.Challenge;
import ee.thenewyou.personaltrainer.model.Subscription;
import ee.thenewyou.personaltrainer.service.SubscriptionService;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController("UserChallengeController")
@RequestMapping("/api/v1/user")
@Slf4j
public class ChallengeController {

    private final ModelMapper modelMapper;
    private final SubscriptionService subscriptionService;

    @Autowired
    public ChallengeController(ModelMapper modelMapper,
                               SubscriptionService subscriptionService) {
        this.modelMapper = modelMapper;
        this.subscriptionService = subscriptionService;
    }

    @GetMapping("/challenge")
    public ChallengeDto getChallengeBySubscriptionId(Authentication authentication) throws ResourceNotFoundException {
        Optional<Subscription> foundSubscriptionOptional = subscriptionService.findSubscriptionByAuthentication(
                authentication);
        if (!foundSubscriptionOptional.isPresent()) {
            throw new ResourceNotFoundException("Subscription not found on :: " + authentication.getName());
        }
        Challenge challenge = foundSubscriptionOptional
                .get()
                .getChallenge();
        return convertToDto(challenge);
    }

    private ChallengeDto convertToDto(Challenge challenge) {
        return modelMapper.map(challenge, ChallengeDto.class);
    }
}
