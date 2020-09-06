package ee.thenewyou.personaltrainer.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;

import java.util.Objects;
import java.util.logging.Logger;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@ActiveProfiles("test")
@Sql(scripts = {"classpath:db/data.sql"})
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class UserRepositoryTest {

    Logger log = Logger.getLogger(UserRepositoryTest.class.getName());

    @Autowired
    private UserRepository userRepository;

    @Test
    void testLoadDataForTestClass() {
        log.info("...testLoadDataForTestClass...");
        assertEquals(3, userRepository
                .findAll()
                .size());
    }

    @Test
    void shouldReturnFirstName() {
        log.info("...shouldReturnFirstName...");
        assertEquals("Leonard", Objects
                .requireNonNull(userRepository
                        .findByUsername("leo@hotmail.com")
                        .orElse(null))
                .getFirstName());
    }

    @Test
    void shouldBeAssignedSubscription() {
        log.info("...shouldBeAssignedSubscription...");
        assertNotNull(Objects
                .requireNonNull(userRepository
                        .findByUsername("leo@hotmail.com")
                        .orElse(null))
                .getSubscription());
    }

    @Test
    void shouldBeAssignedRoles() {
        log.info("...shouldBeAssignedRoles...");
        assertEquals(2, Objects
                .requireNonNull(userRepository
                        .findByUsername("s.ra@hotmail.com")
                        .orElse(null))
                .getRoles()
                .size());
        assertEquals("ROLE_USER", Objects
                .requireNonNull(userRepository
                        .findByUsername("ma.l@hotmail.com")
                        .orElse(null))
                .getRoles()
                .get(0)
                .getName());
    }

    @Test
    void shouldBeAssignedSubscriptionWithChallenge() {
        log.info("...shouldBeAssignedSubscriptionWithChallenge...");
        assertEquals("Initial Super Challenge", Objects
                .requireNonNull(userRepository
                        .findByUsername("leo@hotmail.com")
                        .orElse(null))
                .getSubscription()
                .getChallenge()
                .getChallengeName());
        assertEquals(8, Objects
                .requireNonNull(userRepository
                        .findByUsername("leo@hotmail.com")
                        .orElse(null))
                .getSubscription()
                .getChallenge()
                .getWeekQuantity());
        assertEquals("Second Amazing Challenge", Objects
                .requireNonNull(userRepository
                        .findByUsername("ma.l@hotmail.com")
                        .orElse(null))
                .getSubscription()
                .getChallenge()
                .getChallengeName());
        assertEquals(9, Objects
                .requireNonNull(userRepository
                        .findByUsername("ma.l@hotmail.com")
                        .orElse(null))
                .getSubscription()
                .getChallenge()
                .getWeekQuantity());
    }
}
