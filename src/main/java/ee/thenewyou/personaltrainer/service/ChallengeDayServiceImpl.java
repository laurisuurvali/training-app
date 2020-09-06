package ee.thenewyou.personaltrainer.service;

import ee.thenewyou.personaltrainer.model.ChallengeDay;
import ee.thenewyou.personaltrainer.model.ChallengeDayId;
import ee.thenewyou.personaltrainer.repository.ChallengeDayRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@Slf4j
public class ChallengeDayServiceImpl implements ee.thenewyou.personaltrainer.service.ChallengeDayService {

    private final ChallengeDayRepository repository;

    public ChallengeDayServiceImpl(ChallengeDayRepository repository) {
        this.repository = repository;
    }

    @Override
    public void save(ChallengeDay challengeDay) {
        repository.save(challengeDay);
    }

    @Override
    public List<ChallengeDay> findAll() {
        return repository.findAll();
    }

    @Override
    public ChallengeDay findById(ChallengeDayId id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public ChallengeDay findBySeparateId(Long challengeNumberId, Integer weekNumberId, Integer dayNumberId) {
        ChallengeDay challengeDay = repository.findChallengeDayByChallengeIdWeekNumberIdDayNumberId(challengeNumberId, weekNumberId, dayNumberId);
        if (challengeDay != null) {
            log.warn("IN findById - no challenge found by challengeNumberId: {}, weekNumberId: {}, dayNumberId: {}", challengeNumberId, weekNumberId, dayNumberId);
        }

        return challengeDay;
    }

    @Override
    public List<ChallengeDay> findByChallengeId(Long challengeId) {
        List<ChallengeDay> challengeDaysByChallengeId = repository.findByChallengeId(challengeId);
        return challengeDaysByChallengeId;
    }

}
