package ee.thenewyou.personaltrainer.service;

import ee.thenewyou.personaltrainer.model.Challenge;
import ee.thenewyou.personaltrainer.model.ChallengeDay;
import ee.thenewyou.personaltrainer.model.ChallengeDayId;
import ee.thenewyou.personaltrainer.repository.ChallengeDayRepository;
import ee.thenewyou.personaltrainer.repository.ChallengeRepository;
import ee.thenewyou.personaltrainer.utility.Constants;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@Transactional
public class ChallengeServiceImpl implements ChallengeService {

    private final ChallengeRepository challengeRepository;
    private final ChallengeDayRepository challengeDayRepository;


    @Autowired
    public ChallengeServiceImpl(ChallengeRepository challengeRepository,
                                ChallengeDayRepository challengeDayRepository
    ) {
        this.challengeRepository = challengeRepository;
        this.challengeDayRepository = challengeDayRepository;
    }

    @Override
    public Challenge addNewChallenge(Challenge challenge) {

        Challenge addedChallenge = challengeRepository.save(challenge);

        Long challengeNumber = addedChallenge.getChallengeId();
        int weekQuantity = challenge.getWeekQuantity();
        if (weekQuantity >= 52) {
            log.error("IN addNewChallenge - challenge: {} was not registered, too big number of weeks", addedChallenge);
            return null;
        }
        int daysInOneWeek = Constants.daysInWeek;

        for (int i = 1; i <= weekQuantity; i++) {
            for (int j = 1; j <= daysInOneWeek; j++) {
                challengeDayRepository.save(
                        ChallengeDay
                                .builder()
                                .id(
                                        ChallengeDayId
                                                .builder()
                                                .challengeNumberId(challengeNumber)
                                                .weekNumberId(i)
                                                .dayNumberId(j)
                                                .build())
                                .build());
            }
        }

        log.info("IN addNewChallenge - challenge: {} successfully registered", addedChallenge);
        return addedChallenge;
    }

    @Override
    public void updateChallenge(Challenge challenge) {

        Challenge updatedChallenge = challengeRepository.save(challenge);
        log.info("IN updateChallenge - challenge: {} successfully updated", updatedChallenge);
    }


    @Override
    public List<Challenge> findAll() {

        List<Challenge> result = challengeRepository.findAll();
        log.info("IN findAll - {} challenges found", result.size());
        return result;
    }

    @Override
    public Optional<Challenge> findById(Long id) {
        Optional<Challenge> challenge = challengeRepository.findById(id);
        if (!challenge.isPresent()) {
            log.warn("IN findById - no challenge found by id: {}", id);
        }

        return challenge;
    }



    @Override
    public void deleteChallenge(Long id) {
        challengeRepository.deleteById(id);
        log.info("IN deleteChallenge - challenge with id: {} successfully deleted", id);
    }


}
