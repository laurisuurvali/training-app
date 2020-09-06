package ee.thenewyou.personaltrainer.controller.admin;

import ee.thenewyou.personaltrainer.dto.ExerciseDto;
import ee.thenewyou.personaltrainer.exception.ResourceNotFoundException;
import ee.thenewyou.personaltrainer.model.Exercise;
import ee.thenewyou.personaltrainer.service.ExerciseService;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/admin")
@Slf4j
public class ExerciseController {

    private final ModelMapper modelMapper;
    private final ExerciseService exerciseService;

    @Autowired
    public ExerciseController(ModelMapper modelMapper,
                              ExerciseService exerciseService) {
        this.modelMapper = modelMapper;
        this.exerciseService = exerciseService;
    }

    @PostMapping("/exercise")
    public ResponseEntity<Object> createExercise(@Valid @RequestBody ExerciseDto exerciseDto) {
        Exercise savedExercise = exerciseService.save(convertToEntity(exerciseDto));

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(savedExercise.getExerciseId())
                .toUri();

        return ResponseEntity
                .created(location)
                .build();
    }

    private Exercise convertToEntity(ExerciseDto exerciseDto) {
        return modelMapper.map(exerciseDto, Exercise.class);
    }

    @GetMapping("/exercise/{exercise_id}")
    public Exercise retrieveExercise(@PathVariable("exercise_id") Long exerciseId) throws ResourceNotFoundException {
        Optional<Exercise> exercise = exerciseService.findById(exerciseId);
        if (!exercise.isPresent()) {
            throw new ResourceNotFoundException("Exercise not found on :: " + exerciseId);
        }
        return convertToDto(exercise.get());
    }

    @GetMapping("/exercise")
    public List<Exercise> retrieveExercisesByChallengeDayId(@RequestParam(required = false) String challengeId,
                                                            @RequestParam(required = false) String weekNumberId,
                                                            @RequestParam(required = false) String dayNumberId) throws ResourceNotFoundException {
        List<Exercise> exercisesByChallengeDay = exerciseService.findByChallengeDayId(Long.valueOf(challengeId),
                Integer.valueOf(weekNumberId),
                Integer.valueOf(dayNumberId));
        if (exercisesByChallengeDay == null) {
            throw new ResourceNotFoundException("Exercise not found on :: " + challengeId);
        }
        return exercisesByChallengeDay
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @PutMapping(value = "/exercise/{exercise_id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void updateExercise(
            @PathVariable("exercise_id") Long exerciseId,
            @Valid @RequestBody ExerciseDto exerciseDto)
            throws ResourceNotFoundException {
        Optional<Exercise> foundExerciseOptional = exerciseService.findById(exerciseId);
        if (!foundExerciseOptional.isPresent()) {
            throw new ResourceNotFoundException("Exercise not found on :: " + exerciseId);
        }
        Exercise foundExercise = foundExerciseOptional.get();
        foundExercise.setExerciseName(exerciseDto.getExerciseName());
        foundExercise.setDescription(exerciseDto.getDescription());
        foundExercise.setOrderNumber(exerciseDto.getOrderNumber());
        foundExercise.setReps(exerciseDto.getReps());
        foundExercise.setSets(exerciseDto.getSets());
        foundExercise.setExerciseBreak(exerciseDto.getExerciseBreak());
        foundExercise.setExerciseType(exerciseDto.getExerciseType());
        foundExercise.setVideoLink(exerciseDto.getVideoLink());

        exerciseService.updateExercise(foundExercise);
    }

    @DeleteMapping("/exercise/{exercise_id}")
    public void deleteExercise(@PathVariable(value = "exercise_id") Long exerciseId) {
        exerciseService.delete(exerciseId);
    }

    private Exercise convertToDto(Exercise exercise) {
        return modelMapper.map(exercise, Exercise.class);
    }
}
