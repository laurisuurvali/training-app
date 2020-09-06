package ee.thenewyou.personaltrainer.dto;

import ee.thenewyou.personaltrainer.model.Challenge;
import ee.thenewyou.personaltrainer.model.ChallengeDayId;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChallengeDayDto {

    private ChallengeDayId id;
    private Challenge challenge;
    private LocalDate createdOn;
    private LocalDate updatedOn;

}
