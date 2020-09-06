package ee.thenewyou.personaltrainer.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "challenge_day")
public class ChallengeDay extends BaseEntity {

    @EmbeddedId
    @Column(name = "challenge_day_id", unique = true, nullable = false, length = 100)
    private ChallengeDayId id;

    @ToString.Exclude
    @JsonIgnore
    @OneToMany(mappedBy = "challengeDay",fetch = FetchType.LAZY)
    private List<Exercise> exercises;

    @ToString.Exclude
    @JsonIgnore
    @OneToMany(mappedBy = "challengeDay",fetch = FetchType.LAZY)
    private List<Meal> meals;

    @ToString.Exclude
    @JsonIgnore
    @OneToMany(mappedBy = "challengeDay",fetch = FetchType.LAZY)
    private List<Instruction> instructions;

    @ManyToOne
    @MapsId("challenge_id")
    @JoinColumn(name = "challenge_id")
    private Challenge challenge;
}
