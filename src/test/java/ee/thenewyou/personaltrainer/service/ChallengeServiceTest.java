/*
package ee.thenewyou.personaltrainer.service;

import ee.thenewyou.personaltrainer.model.Challenge;
import ee.thenewyou.personaltrainer.model.ChallengeDay;
import ee.thenewyou.personaltrainer.repository.ChallengeDayRepository;
import ee.thenewyou.personaltrainer.utility.Constants;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;
import java.util.logging.Logger;

import static org.junit.jupiter.api.Assertions.assertEquals;
@ActiveProfiles("test")
@SpringBootTest
class ChallengeServiceTest {

    Logger log = Logger.getLogger(ChallengeServiceTest.class.getName());

    @Autowired
    private ChallengeService challengeService;

    @Autowired
    private ChallengeDayRepository challengeDayRepository;

    @Test
    void shouldSaveDaysAfterAddingChallenge() {

        log.info("...shouldSaveDaysAfterAddingChallenge...");
        int weeks = 8;

        Challenge challenge = Challenge.builder().challengeName("Ultimate Challenge").weekQuantity(weeks).build();
        challengeService.addNewChallenge(challenge);

        List<ChallengeDay> foundAllDays = challengeDayRepository.findAll();
        String id = foundAllDays.get(50).getId().toString();
        log.info(id);

        assertEquals(weeks * Constants.daysInWeek, foundAllDays.size());
    }
}
*/
