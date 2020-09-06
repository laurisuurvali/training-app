package ee.thenewyou.personaltrainer.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ArticleDto {

    private Long articleId;
    private String subject;
    private String body;
    private String image;
    private LocalDate createdOn;
    private LocalDate updatedOn;
}
