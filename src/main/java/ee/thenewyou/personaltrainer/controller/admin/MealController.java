package ee.thenewyou.personaltrainer.controller.admin;

import ee.thenewyou.personaltrainer.dto.MealDto;
import ee.thenewyou.personaltrainer.exception.MealTypeException;
import ee.thenewyou.personaltrainer.exception.ResourceNotFoundException;
import ee.thenewyou.personaltrainer.model.Meal;
import ee.thenewyou.personaltrainer.service.MealService;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/admin")
@Slf4j
public class MealController {
    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private MealService mealService;

    private String mealTypeExceptionMessage;

    private Meal convertToDto(Meal meal) {

        return modelMapper.map(meal, Meal.class);
    }

    @PostMapping("/meal")
    public ResponseEntity<Object> createMeal(@Valid @RequestBody MealDto mealDto) {
        try {

        if (mealService.findMealByChallengeDayAndMealType(mealDto.getChallengeDay(), mealDto.getMealType()).isPresent())
        {
            mealTypeExceptionMessage = "Söögikord " + mealDto.getMealType() + " eksiteerib juba antud päeval";
            throw new MealTypeException("Mealtype: " + mealDto.getMealType() + " already exists for current day");
        }

        Meal savedMeal = mealService.save(convertToEntity(mealDto));

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(savedMeal.getMealId())
                .toUri();

        return ResponseEntity
                .created(location)
                .build();
        } catch (MealTypeException e) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT, mealTypeExceptionMessage, e
            );
        }

    }

    private Meal convertToEntity(MealDto mealDto) {
        return modelMapper.map(mealDto, Meal.class);
    }


    @GetMapping("/meal/{meal_id}")
    public Meal retrieveMeal(@PathVariable("meal_id") Long mealId) throws ResourceNotFoundException {
        Optional<Meal> meal = mealService.findById(mealId);
        if (!meal.isPresent()) {
            throw new ResourceNotFoundException("Meal not found on :: " + mealId);
        }
        return convertToDto(meal.get());

    }

    @GetMapping("/meal")
    public List<Meal> retrieveMealsByChallengeDayId(@RequestParam(required = false) String challengeId,
                                                    @RequestParam(required = false) String weekNumberId,
                                                    @RequestParam(required = false) String dayNumberId) throws ResourceNotFoundException {
        List<Meal> mealsByChallengeDay = mealService.findByChallengeDayId(Long.valueOf(challengeId),
                Integer.valueOf(weekNumberId),
                Integer.valueOf(dayNumberId));
        if (mealsByChallengeDay == null) {
            throw new ResourceNotFoundException("Meal not found on :: " + challengeId);
        }
        return mealsByChallengeDay
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());

    }

    @PutMapping(value = "/meal/{meal_id}", consumes = MediaType.APPLICATION_JSON_VALUE)

    public void updateMeal(
            @PathVariable("meal_id") Long mealId,
            @Valid @RequestBody MealDto mealDto)
            throws ResourceNotFoundException {

            Optional<Meal> foundMealOptional = mealService.findById(mealId);
            if (!foundMealOptional.isPresent()) {
                throw new ResourceNotFoundException("Meal not found on :: " + mealId);
            }

            try {
            if (mealService.findMealByChallengeDayAndMealType(mealDto.getChallengeDay(), mealDto.getMealType()).get().getMealId() != mealId) {
                mealTypeExceptionMessage = "Söögikord " + mealDto.getMealType() + " eksiteerib juba antud päeval";
                throw new MealTypeException("Mealtype: " + mealDto.getMealType() + " already exists for current day");
            }
            Meal foundMeal = foundMealOptional.get();
            foundMeal.setMealType(mealDto.getMealType());
            foundMeal.setMealName(mealDto.getMealName());
            foundMeal.setCalories(mealDto.getCalories());
            foundMeal.setCarbohydrates(mealDto.getCarbohydrates());
            foundMeal.setFat(mealDto.getProtein());
            foundMeal.setProtein(mealDto.getProtein());
            foundMeal.setRecipe(mealDto.getRecipe());
            foundMeal.setImageLink(mealDto.getImageLink());

            mealService.updateMeal(foundMeal);
        } catch (MealTypeException e) {
                throw new ResponseStatusException(
                        HttpStatus.CONFLICT, mealTypeExceptionMessage, e
                );
        }
    }


    @DeleteMapping("/meal/{meal_id}")
    public void deleteMeal(@PathVariable(value = "meal_id") Long mealId) {
        mealService.delete(mealId);
    }

}
