package ee.thenewyou.personaltrainer.controller.admin;

import ee.thenewyou.personaltrainer.dto.ChallengeDto;
import ee.thenewyou.personaltrainer.exception.ResourceNotFoundException;
import ee.thenewyou.personaltrainer.model.Challenge;
import ee.thenewyou.personaltrainer.service.ChallengeService;
import ee.thenewyou.personaltrainer.service.SubscriptionService;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/admin")
@Slf4j
public class ChallengeController {

    private final ChallengeService challengeService;
    private final ModelMapper modelMapper;
    private final SubscriptionService subscriptionService;

    @Autowired
    public ChallengeController(ChallengeService challengeService,
                               ModelMapper modelMapper,
                               SubscriptionService subscriptionService) {
        this.challengeService = challengeService;
        this.modelMapper = modelMapper;
        this.subscriptionService = subscriptionService;
    }

    @GetMapping("/challenge")
    public List<ChallengeDto> getAllChallenges() {
        List<Challenge> challenges = challengeService.findAll();
        return challenges
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/challenge/{challenge_id}")
    public ChallengeDto retrieveChallenge(@PathVariable("challenge_id") Long challengeId) throws ResourceNotFoundException {
        Optional<Challenge> challenge = challengeService.findById(challengeId);
        if (!challenge.isPresent()) {
            throw new ResourceNotFoundException("Challenge not found on :: " + challengeId);
        }
        return convertToDto(challenge.get());
    }

    @PostMapping("/challenge")
    public ResponseEntity<Object> createChallenge(@Valid @RequestBody ChallengeDto challengeDto) {
        Challenge savedChallenge = challengeService.addNewChallenge(convertToEntity(challengeDto));
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(savedChallenge.getChallengeId())
                .toUri();
        return ResponseEntity
                .created(location)
                .build();
    }

    @PutMapping(value = "/challenge/{challenge_id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void updateChallenge(
            @PathVariable("challenge_id") Long challengeId,
            @Valid @RequestBody ChallengeDto challengeDto)
            throws ResourceNotFoundException {
        Optional<Challenge> foundChallengeOptional = challengeService.findById(challengeId);
        if (!foundChallengeOptional.isPresent()) {
            throw new ResourceNotFoundException("Challenge not found on :: " + challengeId);
        }
        Challenge foundChallenge = foundChallengeOptional.get();
        foundChallenge.setChallengeName(challengeDto.getChallengeName());
        foundChallenge.setWeekQuantity(challengeDto.getWeekQuantity());

        challengeService.updateChallenge(foundChallenge);
    }

    @DeleteMapping("/challenge/{challenge_id}")
    public void deleteChallenge(@PathVariable("challenge_id") Long challengeId) {
        if (!subscriptionService.findByChallenge(challengeId)) {
            challengeService.deleteChallenge(challengeId);
        } else {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN,
                    "Challenge is tied to a subscription. Can't be deleted!");
        }

    }

    private ChallengeDto convertToDto(Challenge challenge) {
        return modelMapper.map(challenge, ChallengeDto.class);
    }

    private Challenge convertToEntity(ChallengeDto challengeDto) {
        return modelMapper.map(challengeDto, Challenge.class);
    }
}
