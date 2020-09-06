package ee.thenewyou.personaltrainer.repository;


import ee.thenewyou.personaltrainer.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByName(String name);
}
