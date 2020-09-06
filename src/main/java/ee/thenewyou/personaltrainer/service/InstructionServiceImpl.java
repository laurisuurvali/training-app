package ee.thenewyou.personaltrainer.service;

import ee.thenewyou.personaltrainer.model.Instruction;
import ee.thenewyou.personaltrainer.repository.InstructionRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@Transactional
public class InstructionServiceImpl implements InstructionService {

    private final InstructionRepository repository;

    public InstructionServiceImpl(InstructionRepository instructionRepository) {
        this.repository = instructionRepository;
    }


    @Override
    public Instruction save(Instruction instruction) {
        Instruction savedInstrcution = repository.save(instruction);
        log.info("IN saveInstruction - instruction : {} successfully saved",savedInstrcution);
        return savedInstrcution;
    }

    @Override
    public List<Instruction> findAll() {
        List<Instruction> result = repository.findAll();
        log.info("IN findAll - {} instruction found", result.size());
        return result;
    }

    @Override
    public Optional<Instruction> findById(Long id) {
        Optional<Instruction> instruction = repository.findById(id);
        if (!instruction.isPresent()) {
            log.warn("IN findById - no instruction found by id: {}", id);
        }
        return instruction;
    }

    @Override
    public List<Instruction> findByChallengeDayId(Long challengeId, Integer weekNumberId, Integer dayNumberId) {
        List<Instruction> instructionsByChallengeDayId = repository.findByChallengeDayId(challengeId, weekNumberId, dayNumberId);
        return instructionsByChallengeDayId;
    }

    @Override
    public List<Instruction> findCurrentWeekInstructionsByChallengeIdAndWeekNumberId(Long challengeId, Integer weekNumberId) {
        List<Instruction> currentWeekInstructions = repository.findCurrentWeekInstructionsBySubscriptionId(challengeId,weekNumberId);
        return currentWeekInstructions;
    }

    @Override
    public List<Instruction> findCurrentWeekExerciseInstructions(Long challengeId, Integer weekNumberId) {
        return repository.findCurrentWeekExerciseInstructions(challengeId, weekNumberId);
    }

    @Override
    public List<Instruction> findTwoWeekMealInstructions(Long challengeId, Integer weekNumberId) {
        return repository.findTwoWeekMealInstruction(challengeId,weekNumberId);
    }

    @Override
    public void updateInstruction(Instruction instruction) {
        Instruction updatedInstruction = repository.save(instruction);
        log.info("IN updateInstruction - instruction: {} successfully updated", updatedInstruction);
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
        log.info("IN deleteInstruction - instruction with id: {} successfully deleted", id);
    }
}
