package ee.thenewyou.personaltrainer.service;

import java.time.LocalDate;

public interface SubscriptionCurrentStateService {
    Integer getSubscriptionCurrentWeekNumber(LocalDate eventStartDate);

    Integer getSubscriptionCurrentWeekDayNumber(LocalDate eventStartDate);

    Integer getSubscriptionCurrentDayNumber(LocalDate eventStartDate);

    Boolean getSubscriptionCurrentState(LocalDate eventStartDate, LocalDate eventEndDate);

    Boolean isSubscriptionNotStarted(LocalDate eventStartDate);

    Boolean isSubscriptionOver(LocalDate eventEndDate);
}
