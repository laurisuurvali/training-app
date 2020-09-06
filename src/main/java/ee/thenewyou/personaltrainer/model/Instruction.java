package ee.thenewyou.personaltrainer.model;

import lombok.*;

import javax.persistence.*;

@EqualsAndHashCode(callSuper = true)
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "instruction")
public class Instruction extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "instruction_id", unique = true, length = 100)
    private Long instructionId;

    @Column(name = "instruction_type")
    private InstructionType instructionType;

    @Column(name = "step_count")
    private String stepCount;

    @Column(name = "instruction_body", length = 9999)
    private String instructionBody;

    @Column(name = "media_link")
    private String mediaLink;

    @Column(name = "media_type")
    private MediaType mediaType;

    @ManyToOne
    @JoinTable(name = "challenge_day_instruction",
            joinColumns = {
                    @JoinColumn(name = "instruction_id", referencedColumnName = "instruction_id"),
            },
            inverseJoinColumns = {
                    @JoinColumn(name = "challenge_id", referencedColumnName = "challenge_id"),
                    @JoinColumn(name = "week_number_id", referencedColumnName = "week_number_id"),
                    @JoinColumn(name = "day_number_id", referencedColumnName = "day_number_id"),
            }
    )
    private ChallengeDay challengeDay;
}
