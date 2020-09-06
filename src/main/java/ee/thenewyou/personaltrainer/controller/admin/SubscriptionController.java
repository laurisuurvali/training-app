package ee.thenewyou.personaltrainer.controller.admin;

import ee.thenewyou.personaltrainer.dto.SubscriptionDto;
import ee.thenewyou.personaltrainer.exception.ResourceNotFoundException;
import ee.thenewyou.personaltrainer.model.Subscription;
import ee.thenewyou.personaltrainer.service.SubscriptionService;
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
public class SubscriptionController {

    private final SubscriptionService subscriptionService;
    private final ModelMapper modelMapper;

    @Autowired
    public SubscriptionController(SubscriptionService subscriptionService,
                                  ModelMapper modelMapper) {
        this.subscriptionService = subscriptionService;
        this.modelMapper = modelMapper;
    }

    @GetMapping("/subscription")
    public List<SubscriptionDto> getAllSubscriptions() {
        List<Subscription> subscriptions = subscriptionService.findAll();
        return subscriptions
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/subscription/{subscription_id}")
    public SubscriptionDto retrieveSubscription(@PathVariable("subscription_id") Long subscriptionId) throws ResourceNotFoundException {
        Optional<Subscription> subscription = subscriptionService.findById(subscriptionId);
        if (!subscription.isPresent()) {
            throw new ResourceNotFoundException("Subscription not found on :: " + subscriptionId);
        }
        return convertToDto(subscription.get());
    }

    @PostMapping(value = "/subscription")
    public ResponseEntity<Object> createSubscription(@Valid @RequestBody SubscriptionDto subscriptionDto) {
        Subscription savedSubscription = subscriptionService.addNewSubscription(convertToEntity(subscriptionDto));
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(savedSubscription.getSubscriptionId())
                .toUri();
        return ResponseEntity
                .created(location)
                .build();
    }

    @PutMapping(value = "/subscription/{subscription_id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void updateSubscription(
            @PathVariable("subscription_id") Long subscriptionId,
            @Valid @RequestBody SubscriptionDto subscriptionDto)
            throws ResourceNotFoundException {
        Optional<Subscription> foundSubscriptionOptional = subscriptionService.findById(subscriptionId);
        if (!foundSubscriptionOptional.isPresent()) {
            throw new ResourceNotFoundException("Subscription not found on :: " + subscriptionId);
        }
        Subscription foundSubscription = foundSubscriptionOptional.get();
        foundSubscription.setStartDate(subscriptionDto.getStartDate());
        foundSubscription.setChallenge(subscriptionDto.getChallenge());

        subscriptionService.updateSubscription(foundSubscription);
    }

    @DeleteMapping("/subscription/{subscription_id}")
    public void deleteChallenge(@PathVariable("subscription_id") Long subscriptionId) {
        subscriptionService.deleteSubscription(subscriptionId);
    }

    private SubscriptionDto convertToDto(Subscription subscription) {
        return modelMapper.map(subscription, SubscriptionDto.class);
    }

    private Subscription convertToEntity(SubscriptionDto subscriptionDto) {
        return modelMapper.map(subscriptionDto, Subscription.class);
    }
}
