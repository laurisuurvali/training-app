package ee.thenewyou.personaltrainer.service;

import ee.thenewyou.personaltrainer.model.Challenge;
import ee.thenewyou.personaltrainer.model.Subscription;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.context.ActiveProfiles;

import java.time.Clock;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.logging.Logger;

@ActiveProfiles("test")
class SubscriptionCurrentStateServiceTest {

    private SubscriptionCurrentStateService subscriptionCurrentStateService;
    Logger log = Logger.getLogger(SubscriptionCurrentStateServiceTest.class.getName());
    private final static LocalDate LOCAL_DATE = LocalDate.of(2020, 8, 7);
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
                .startDate(LocalDate.of(2020, 7, 27))
                .build();

        Clock fixedClock = Clock.fixed(LOCAL_DATE
                .atStartOfDay(ZoneId.systemDefault())
                .toInstant(), ZoneId.systemDefault());

        subscriptionCurrentStateService = new SubscriptionCurrentStateServiceImpl(fixedClock);
    }

    @Test
    void shouldReturnWeekNumber() {
        log.info("...shouldReturnWeekNumber...");
        Assertions.assertEquals(2,
                subscriptionCurrentStateService.getSubscriptionCurrentWeekNumber(subscription.getStartDate()));
    }

    @Test
    void shouldReturnWeekDayNumber() {
        log.info("...shouldReturnWeekDayNumber...");
        Assertions.assertEquals(5,
                subscriptionCurrentStateService.getSubscriptionCurrentWeekDayNumber(subscription.getStartDate()));
    }

    @Test
    void shouldCheckSubscriptionCurrentState() {
        log.info("...shouldCheckSubscriptionCurrentState...");
        Assertions.assertTrue(
                subscriptionCurrentStateService.getSubscriptionCurrentState(
                        subscription.getStartDate(), subscription.getEndDate()));
    }
}
