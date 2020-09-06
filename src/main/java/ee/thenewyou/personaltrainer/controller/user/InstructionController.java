package ee.thenewyou.personaltrainer.controller.user;

import ee.thenewyou.personaltrainer.exception.ResourceNotFoundException;
import ee.thenewyou.personaltrainer.model.Instruction;
import ee.thenewyou.personaltrainer.model.Subscription;
import ee.thenewyou.personaltrainer.service.InstructionService;
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

@RestController("UserInstructionController")
@RequestMapping("/api/v1/user")
@Slf4j
public class InstructionController {

    private final ModelMapper modelMapper;
    private final InstructionService instructionService;
    private final SubscriptionService subscriptionService;
    private final SubscriptionCurrentStateService subscriptionCurrentStateService;

    @Autowired
    public InstructionController(ModelMapper modelMapper,
                                 InstructionService instructionService,
                                 SubscriptionService subscriptionService,
                                 SubscriptionCurrentStateService subscriptionCurrentStateService) {
        this.modelMapper = modelMapper;
        this.instructionService = instructionService;
        this.subscriptionService = subscriptionService;
        this.subscriptionCurrentStateService = subscriptionCurrentStateService;
    }

    @GetMapping("/instruction")
    public List<Instruction> retrieveCurrentWeekInstructions(Authentication authentication) throws ResourceNotFoundException {
        Optional<Subscription> foundSubscriptionOptional = subscriptionService.findSubscriptionByAuthentication(
                authentication);
        if (!foundSubscriptionOptional.isPresent()) {
            throw new ResourceNotFoundException("Subscription not found on :: " + authentication.getName());
        }
        LocalDate subscriptionStartDate = foundSubscriptionOptional
                .get()
                .getStartDate();

        if (foundSubscriptionOptional.get().getChallenge() == null) {
            throw new ResourceNotFoundException("Challenge not found on :: " + foundSubscriptionOptional.get().toString());
        }

        Long challengeId = foundSubscriptionOptional
                .get()
                .getChallenge()
                .getChallengeId();
        Integer currentWeekNumber = subscriptionCurrentStateService.getSubscriptionCurrentWeekNumber(
                subscriptionStartDate);

        List<Instruction> instructionsByChallengeIdAndWeekNumberId =
                instructionService.findCurrentWeekInstructionsByChallengeIdAndWeekNumberId(
                challengeId,
                currentWeekNumber);
        if (instructionsByChallengeIdAndWeekNumberId == null) {
            throw new ResourceNotFoundException("Instruction not found on :: " + challengeId);
        }
        return instructionsByChallengeIdAndWeekNumberId
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/instruction/exercise")
    public List<Instruction> retrieveCurrentWeekExerciseInstructions(Authentication authentication) throws ResourceNotFoundException {
        Optional<Subscription> foundSubscriptionOptional = subscriptionService.findSubscriptionByAuthentication(
                authentication);
        if (!foundSubscriptionOptional.isPresent()) {
            throw new ResourceNotFoundException("Subscription not found on :: " + authentication.getName());
        }
        LocalDate subscriptionStartDate = foundSubscriptionOptional
                .get()
                .getStartDate();

        if (foundSubscriptionOptional.get().getChallenge() == null) {
            throw new ResourceNotFoundException("Challenge not found on :: " + foundSubscriptionOptional.get().toString());
        }

        Long challengeId = foundSubscriptionOptional
                .get()
                .getChallenge()
                .getChallengeId();
        Integer currentWeekNumber = subscriptionCurrentStateService.getSubscriptionCurrentWeekNumber(
                subscriptionStartDate);

        List<Instruction> currentWeekExerciseInstructions =
                instructionService.findCurrentWeekExerciseInstructions(
                        challengeId,
                        currentWeekNumber);
        if (currentWeekExerciseInstructions == null) {
            throw new ResourceNotFoundException("Instruction not found on :: " + challengeId);
        }
        return currentWeekExerciseInstructions
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/instruction/meal")
    public List<Instruction> retrieveTwoWeekMealInstructions(Authentication authentication) throws ResourceNotFoundException {
        Optional<Subscription> foundSubscriptionOptional = subscriptionService.findSubscriptionByAuthentication(
                authentication);
        if (!foundSubscriptionOptional.isPresent()) {
            throw new ResourceNotFoundException("Subscription not found on :: " + authentication.getName());
        }
        LocalDate subscriptionStartDate = foundSubscriptionOptional
                .get()
                .getStartDate();

        if (foundSubscriptionOptional.get().getChallenge() == null) {
            throw new ResourceNotFoundException("Challenge not found on :: " + foundSubscriptionOptional.get().toString());
        }

        Long challengeId = foundSubscriptionOptional
                .get()
                .getChallenge()
                .getChallengeId();
        Integer currentWeekNumber = subscriptionCurrentStateService.getSubscriptionCurrentWeekNumber(
                subscriptionStartDate);

        List<Instruction> twoWeekMealInstructions =
                instructionService.findTwoWeekMealInstructions(
                        challengeId,
                        currentWeekNumber);
        if (twoWeekMealInstructions == null) {
            throw new ResourceNotFoundException("Instruction not found on :: " + challengeId);
        }
        return twoWeekMealInstructions
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private Instruction convertToDto(Instruction instruction) {
        return modelMapper.map(instruction, Instruction.class);
    }
}
