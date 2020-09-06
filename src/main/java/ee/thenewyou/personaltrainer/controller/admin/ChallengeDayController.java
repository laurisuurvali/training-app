package ee.thenewyou.personaltrainer.controller.admin;

import ee.thenewyou.personaltrainer.dto.ChallengeDayDto;
import ee.thenewyou.personaltrainer.model.ChallengeDay;
import ee.thenewyou.personaltrainer.service.ChallengeDayService;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/admin")
@Slf4j
public class ChallengeDayController {

    private final ChallengeDayService challengeDayService;
    private final ModelMapper modelMapper;

    @Autowired
    public ChallengeDayController(ChallengeDayService challengeDayService,
                                  ModelMapper modelMapper) {
        this.challengeDayService = challengeDayService;
        this.modelMapper = modelMapper;
    }

    @GetMapping("/challenge_day/challenge/{challenge_id}")
    public List<ChallengeDayDto> getAllChallengeDaysByChallengeId(@PathVariable("challenge_id") Long challengeDayId) {
        List<ChallengeDay> challengeDaysByChallengeNumberId = challengeDayService.findByChallengeId(challengeDayId);
        return challengeDaysByChallengeNumberId
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private ChallengeDayDto convertToDto(ChallengeDay challengeDay) {
        return modelMapper.map(challengeDay, ChallengeDayDto.class);
    }

    @GetMapping("challenge_day/challenge/{challenge_id}/challenge_day")
    public ChallengeDayDto retrieveChallengeDay(@PathVariable("challenge_id") Long challengeNumberId,
                                                @RequestParam String weekNumberId,
                                                @RequestParam String dayNumberId) {
        ChallengeDay challengeDay = challengeDayService.findBySeparateId(challengeNumberId,
                Integer.valueOf(weekNumberId),
                Integer.valueOf(dayNumberId));
        log.info("retrieveChallengeDay");
        return convertToDto(challengeDay);
    }
}
