package ee.thenewyou.personaltrainer.model;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;

class SubscriptionTest {

    private Subscription subscription;

    @BeforeEach
    public void setUp() {
        subscription = Subscription
                .builder()
                .challenge(
                        Challenge
                                .builder()
                                .challengeName("Challenge for test")
                                .weekQuantity(8)
                                .build())
                .startDate(LocalDate.of(2020, 7, 1))
                .build();
    }

    @Test
    void shouldReturnEndDate() {
        LocalDate expectedEndLocalDate = LocalDate.of(2020, 8, 25);
        LocalDate endLocalDate = subscription.getEndDate();
        Assertions.assertEquals(expectedEndLocalDate, endLocalDate);
    }
}
