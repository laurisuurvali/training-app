package ee.thenewyou.personaltrainer.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class AuthenticationRequestDto {

    private String username;
    private String password;
    private LocalDate createdOn;
    private LocalDate updatedOn;
}
