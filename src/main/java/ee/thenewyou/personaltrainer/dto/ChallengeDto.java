package ee.thenewyou.personaltrainer.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChallengeDto {

    private Long challengeId;
    private String challengeName;
    private Integer weekQuantity;
    private LocalDate createdOn;
    private LocalDate updatedOn;
}
