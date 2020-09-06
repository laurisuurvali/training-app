
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
@Table(name = "challenge")
public class Challenge extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "challenge_id", unique = true, length = 100)
    private Long challengeId;

    @Column(name = "challenge_name", nullable = false, length = 100)
    private String challengeName;

    @JsonIgnore
    @OneToMany(mappedBy = "challenge", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<ChallengeDay> challengeDays;

    @Column(name = "week_quantity")
    private Integer weekQuantity;

    @JsonIgnore
    @OneToMany(mappedBy = "challenge")
    private List<Subscription> subscriptionList;
}
