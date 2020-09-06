package ee.thenewyou.personaltrainer.repository;

import ee.thenewyou.personaltrainer.model.Instruction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface InstructionRepository extends JpaRepository<Instruction, Long> {

    @Query("select ins from Instruction ins where (ins.challengeDay.id.challengeNumberId = :challengeId or ins.challengeDay.id.challengeNumberId is null) and (ins.challengeDay.id.weekNumberId = :weekNumberId or ins.challengeDay.id.weekNumberId is null) and (ins.challengeDay.id.dayNumberId = :dayNumberId or ins.challengeDay.id.dayNumberId is null)")
    List<Instruction> findByChallengeDayId(Long challengeId, Integer weekNumberId, Integer dayNumberId);

    @Query("select ins from Instruction ins where ins.challengeDay.id.challengeNumberId = :challengeId and ins.challengeDay.id.weekNumberId = :weekNumberId")
    List<Instruction> findCurrentWeekInstructionsBySubscriptionId(Long challengeId, Integer weekNumberId);

    @Query("select ins from Instruction ins where ins.challengeDay.id.challengeNumberId = :challengeId and ins.challengeDay.id.weekNumberId = :weekNumberId and ins.instructionType = ee.thenewyou.personaltrainer.model.InstructionType.EXERCISE")
    List<Instruction> findCurrentWeekExerciseInstructions(Long challengeId, Integer weekNumberId);

    @Query("select ins from Instruction ins where ins.challengeDay.id.challengeNumberId = :challengeId and ins.challengeDay.id.weekNumberId between :weekNumberId and :weekNumberId+1 and ins.instructionType = ee.thenewyou.personaltrainer.model.InstructionType.MEAL")
    List<Instruction> findTwoWeekMealInstruction(Long challengeId, Integer weekNumberId);
}
