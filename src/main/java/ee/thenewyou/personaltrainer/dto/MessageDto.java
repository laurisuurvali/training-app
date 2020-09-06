package ee.thenewyou.personaltrainer.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MessageDto {

    String content;
    String userUsername;
    String userFirstName;
    String userLastName;
    LocalDateTime timeSent;

    public String getUserLastName() {
        return String.valueOf(userLastName.charAt(0));
    }
}
