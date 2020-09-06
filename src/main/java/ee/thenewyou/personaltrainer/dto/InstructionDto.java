package ee.thenewyou.personaltrainer.dto;

import ee.thenewyou.personaltrainer.model.ChallengeDay;
import ee.thenewyou.personaltrainer.model.InstructionType;
import ee.thenewyou.personaltrainer.model.MediaType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class InstructionDto {

    private Long instructionId;
    private InstructionType instructionType;
    private String stepCount;
    private String instructionBody;
    private ChallengeDay challengeDay;
    private String mediaLink;
    private MediaType mediaType;
}
