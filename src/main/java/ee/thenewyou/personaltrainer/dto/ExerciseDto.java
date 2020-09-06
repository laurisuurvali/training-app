package ee.thenewyou.personaltrainer.dto;
import ee.thenewyou.personaltrainer.model.ChallengeDay;
import ee.thenewyou.personaltrainer.model.ExerciseType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ExerciseDto {

    private Long exerciseId;
    private String exerciseName;
    private Integer orderNumber;
    private String description;
    private Integer reps;
    private Integer sets;
    private Integer exerciseBreak;
    private ExerciseType exerciseType;
    private String videoLink;
    private LocalDate createdOn;
    private LocalDate updatedOn;
    private ChallengeDay challengeDay;
}
