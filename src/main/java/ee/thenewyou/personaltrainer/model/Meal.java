package ee.thenewyou.personaltrainer.model;

import lombok.*;

import javax.persistence.*;

@EqualsAndHashCode(callSuper = true)
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "meal")
public class Meal extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "meal_id", unique = true, length = 100)
    private Long mealId;

    @Column(name = "meal_type")
    private MealType mealType;

    @Column(name = "meal_name")
    private String mealName;

    @Column(name = "calories")
    private String calories;

    @Column(name = "carbohydrates")
    private String carbohydrates;

    @Column(name = "fat")
    private String fat;

    @Column(name = "protein")
    private String protein;

    @Column(name = "recipe", length = 9999)
    private String recipe;

    @Column(name = "image_link")
    private String imageLink;

    @ManyToOne
    @JoinTable(name = "challenge_day_meal",
            joinColumns = {
                    @JoinColumn(name = "meal_id", referencedColumnName = "meal_id"),
            },
            inverseJoinColumns = {
                    @JoinColumn(name = "challenge_id", referencedColumnName = "challenge_id"),
                    @JoinColumn(name = "week_number_id", referencedColumnName = "week_number_id"),
                    @JoinColumn(name = "day_number_id", referencedColumnName = "day_number_id"),
            }
    )
    private ChallengeDay challengeDay;
}

