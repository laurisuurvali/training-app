package ee.thenewyou.personaltrainer.dto;

import ee.thenewyou.personaltrainer.model.ChallengeDay;
import ee.thenewyou.personaltrainer.model.MealType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MealDto {

    private Long mealId;
    private MealType mealType;
    private String mealName;
    private String calories;
    private String carbohydrates;
    private String fat;
    private String protein;
    private String recipe;
    private LocalDate createdOn;
    private LocalDate updatedOn;
    private String imageLink;
    private ChallengeDay challengeDay;
}
