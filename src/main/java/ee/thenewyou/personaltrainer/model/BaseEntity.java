package ee.thenewyou.personaltrainer.model;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDate;


@MappedSuperclass
@Data
@EntityListeners(AuditingEntityListener.class)
public class BaseEntity {

    @CreatedDate
    @Column(name = "created")
    private LocalDate createdOn;

    @LastModifiedDate
    @Column(name = "updated")
    private LocalDate updatedOn;


    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private Status status;
}
