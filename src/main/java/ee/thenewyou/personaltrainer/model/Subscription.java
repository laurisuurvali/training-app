package ee.thenewyou.personaltrainer.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import ee.thenewyou.personaltrainer.utility.Constants;
import lombok.*;
import org.springframework.stereotype.Component;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "subscriptionId")
@EqualsAndHashCode(callSuper = true)
@Data
@ToString(exclude = {"users", "challenge"})
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "subscription")
@Component
public class Subscription extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "subscription_id", unique = true, length = 100)
    private Long subscriptionId;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Setter(AccessLevel.NONE)
    @Column(name = "end_date")
    private LocalDate endDate;

    @JsonIgnore
    @OneToMany(mappedBy = "subscription", fetch = FetchType.LAZY)
    private List<User> users;

    @ManyToOne
    @JoinColumn(name = "challenge_challenge_id")
    private Challenge challenge;

    public LocalDate getEndDate() {
        if (challenge != null) {
            return startDate.plusDays(challenge.getWeekQuantity() * (long) Constants.daysInWeek - 1);
        }
        return null;
    }
}
