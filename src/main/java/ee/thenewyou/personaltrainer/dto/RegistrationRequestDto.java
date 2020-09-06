package ee.thenewyou.personaltrainer.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class RegistrationRequestDto {

    private String username;
    private String firstName;
    private String lastName;
    private String password;
    private Long subscriptionSubscriptionId;
    private LocalDate createdOn;
    private LocalDate updatedOn;
}
