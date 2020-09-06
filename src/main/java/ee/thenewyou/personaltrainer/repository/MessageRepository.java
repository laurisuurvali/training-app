package ee.thenewyou.personaltrainer.repository;


import ee.thenewyou.personaltrainer.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, Long> {
}
