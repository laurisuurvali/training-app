package ee.thenewyou.personaltrainer.service;

import ee.thenewyou.personaltrainer.utility.Constants;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Clock;
import java.time.Duration;
import java.time.LocalDate;

@Slf4j
@Service
public class SubscriptionCurrentStateServiceImpl implements SubscriptionCurrentStateService {

    private final Clock clock;

    @Autowired
    public SubscriptionCurrentStateServiceImpl(Clock clock) {
        this.clock = clock;
    }

    @Override
    public Integer getSubscriptionCurrentWeekNumber(LocalDate eventStartDate) {
        long durationInLong = Duration.between(
                eventStartDate.atStartOfDay(),
                LocalDate.now(clock).atStartOfDay())
                .toDays();
        return (int) durationInLong / Constants.daysInWeek + 1;
    }

    @Override
    public Integer getSubscriptionCurrentWeekDayNumber(LocalDate eventStartDate) {
        long durationInLong = Duration.between(
                eventStartDate.atStartOfDay(),
                LocalDate.now(clock).atStartOfDay())
                .toDays();
        return (int) durationInLong % Constants.daysInWeek + 1;
    }

    @Override
    public Integer getSubscriptionCurrentDayNumber(LocalDate eventStartDate) {
        long durationInLong = Duration.between(
                eventStartDate.atStartOfDay(),
                LocalDate.now(clock).atStartOfDay())
                .toDays();
        return (int) durationInLong + 1;
    }

    @Override
    public Boolean getSubscriptionCurrentState(LocalDate eventStartDate, LocalDate eventEndDate) {
        return LocalDate.now(clock).isAfter(eventStartDate) && LocalDate.now(clock).isBefore(eventEndDate);
    }

    @Override
    public Boolean isSubscriptionNotStarted(LocalDate eventStartDate) {
        return LocalDate.now(clock).isBefore(eventStartDate);
    }

    @Override
    public Boolean isSubscriptionOver(LocalDate eventEndDate) {
        return LocalDate.now(clock).isAfter(eventEndDate);
    }
}
