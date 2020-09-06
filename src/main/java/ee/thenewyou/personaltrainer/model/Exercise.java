package ee.thenewyou.personaltrainer.model;

import lombok.*;

import javax.persistence.*;

@EqualsAndHashCode(callSuper = true)
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "exercise")
public class Exercise extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "exercise_id", unique = true, length = 100)
    private Long exerciseId;

    @Column(name = "exercise_name")
    private String exerciseName;

    @Column(name = "order_number")
    private Integer orderNumber;

    @Column(name = "description", length = 9999)
    private String description;

    @Column(name = "reps")
    private Integer reps;

    @Column(name = "sets")
    private Integer sets;

    @Column(name = "exercise_break")
    private Integer exerciseBreak;

    @Column(name = "exercise_type")
    private ExerciseType exerciseType;

    @Column(name = "video_link")
    private String videoLink;

    @ManyToOne
    @JoinTable(name = "challenge_day_exercise",
            joinColumns = {
                    @JoinColumn(name = "exercise_id", referencedColumnName = "exercise_id"),
            },
            inverseJoinColumns = {
                    @JoinColumn(name = "challenge_id", referencedColumnName = "challenge_id"),
                    @JoinColumn(name = "week_number_id", referencedColumnName = "week_number_id"),
                    @JoinColumn(name = "day_number_id", referencedColumnName = "day_number_id"),
            }
    )
    private ChallengeDay challengeDay;
}
