package ee.thenewyou.personaltrainer.dto;

import ee.thenewyou.personaltrainer.model.Challenge;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SubscriptionDto {

    private Long subscriptionId;
    private LocalDate startDate;
    private LocalDate endDate;
    private Challenge challenge;
    private LocalDate createdOn;
    private LocalDate updatedOn;
}
