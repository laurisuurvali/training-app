package ee.thenewyou.personaltrainer.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChallengeDayId implements Serializable {

    @Column(name = "challenge_id")
    private Long challengeNumberId;
    @Column(name = "week_number_id")
    private Integer weekNumberId;
    @Column(name = "day_number_id")
    private Integer dayNumberId;
}
