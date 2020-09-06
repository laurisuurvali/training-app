package ee.thenewyou.personaltrainer.service;

import ee.thenewyou.personaltrainer.model.Instruction;

import java.util.List;
import java.util.Optional;

public interface InstructionService {

    Instruction save(Instruction instruction);

    List<Instruction> findAll();

    Optional<Instruction> findById(Long id);

    List<Instruction> findByChallengeDayId(Long challengeId, Integer weekNumberId, Integer dayNumberId);

    List<Instruction> findCurrentWeekInstructionsByChallengeIdAndWeekNumberId(Long challengeId, Integer weekNumberId);

    List<Instruction> findCurrentWeekExerciseInstructions(Long challengeId, Integer weekNumberId);

    List<Instruction> findTwoWeekMealInstructions(Long challengeId, Integer weekNumberId);

    void updateInstruction(Instruction instruction);

    void delete(Long id);
}
