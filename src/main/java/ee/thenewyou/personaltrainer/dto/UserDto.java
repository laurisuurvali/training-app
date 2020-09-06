package ee.thenewyou.personaltrainer.dto;

import ee.thenewyou.personaltrainer.model.Role;
import ee.thenewyou.personaltrainer.model.Subscription;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {

    private Long id;
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private List<Role> roles;
    private Long subscriptionSubscriptionId;
    private LocalDate createdOn;
    private LocalDate updatedOn;
    private Subscription subscription;
    private String status;
}
