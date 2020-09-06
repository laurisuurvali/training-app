package ee.thenewyou.personaltrainer.controller.admin;


import ee.thenewyou.personaltrainer.dto.RegistrationRequestDto;
import ee.thenewyou.personaltrainer.dto.UserDto;
import ee.thenewyou.personaltrainer.exception.ResourceNotFoundException;
import ee.thenewyou.personaltrainer.model.Status;
import ee.thenewyou.personaltrainer.model.Subscription;
import ee.thenewyou.personaltrainer.model.User;
import ee.thenewyou.personaltrainer.service.SubscriptionService;
import ee.thenewyou.personaltrainer.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import static ee.thenewyou.personaltrainer.controller.PasswordResetUtility.constructResetTokenEmail;

@RestController
@RequestMapping("/api/v1/admin")
@Slf4j
public class UserController {

    private final ModelMapper modelMapper;
    private final UserService userService;
    private final SubscriptionService subscriptionService;
    private final JavaMailSender mailSender;

    @Value("${client-hosting}")
    private String clientHosting;

    @Autowired
    public UserController(UserService userService,
                          ModelMapper modelMapper,
                          SubscriptionService subscriptionService,
                          JavaMailSender mailSender) {
        this.userService = userService;
        this.modelMapper = modelMapper;
        this.subscriptionService = subscriptionService;
        this.mailSender = mailSender;
    }

    @GetMapping("/user")
    public List<UserDto> getAllUsers() {
        List<User> users = userService.getAll();

        return users
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/user/subscription/{subscription_id}")
    public List<UserDto> getAllUsersBySubscription(@PathVariable("subscription_id") Long id,
                                                   @RequestParam(required = false, defaultValue = "false") boolean shouldResetAllPasswords) {
        List<User> users = userService.getAllBySubscription(id);

        if (shouldResetAllPasswords) {
            users.forEach(user -> {
                String token = UUID
                        .randomUUID()
                        .toString();
                userService.createPasswordResetTokenForUser(user, token);
                mailSender.send(constructResetTokenEmail(clientHosting, token, user));
            });
        }
        return users
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/user/{user_id}")
    public UserDto retrieveUserById(@PathVariable("user_id") Long id) throws ResourceNotFoundException {
        Optional<User> user = userService.findById(id);
        if (!user.isPresent()) {
            throw new ResourceNotFoundException("User not found on :: " + id);
        }
        return convertToDto(user.get());
    }

    @PostMapping("/user")
    public ResponseEntity<Object> register(@RequestBody RegistrationRequestDto requestDto) {

        if (userService
                .findByUsername(requestDto.getUsername())
                .isPresent()) {
            return ResponseEntity
                    .badRequest()
                    .body("Error: Username and/or email is already taken!");
        }
        User newUser = User
                .builder()
                .username(requestDto.getUsername())
                .password(requestDto.getPassword())
                .firstName(requestDto.getFirstName())
                .lastName(requestDto.getLastName())
                .build();

        if (requestDto.getSubscriptionSubscriptionId() != null) {
            Optional<Subscription> foundSubscription =
                    subscriptionService.findById(requestDto.getSubscriptionSubscriptionId());
            newUser.setSubscription(foundSubscription.orElse(null));
        }
        User savedUser = userService.register(newUser);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(savedUser.getId())
                .toUri();
        return ResponseEntity
                .created(location)
                .build();

    }

    @PutMapping(value = "/user/{user_id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void updateUser(
            @PathVariable("user_id") Long id,
            @Valid @RequestBody UserDto userDto) throws ResourceNotFoundException {

        Optional<User> foundUserOptional = userService.findById(id);
        if (!foundUserOptional.isPresent()) {
            throw new ResourceNotFoundException("User not found on :: " + id);
        }

        User foundUser = foundUserOptional.get();

        foundUser.setUsername(userDto
                .getUsername()
                .toLowerCase());
        foundUser.setFirstName(userDto.getFirstName());
        foundUser.setLastName(userDto.getLastName());
        foundUser.setStatus(Status.valueOf(userDto.getStatus()));

        if (userDto.getSubscriptionSubscriptionId() != null) {
            Optional<Subscription> foundSubscription =
                    subscriptionService.findById(userDto.getSubscriptionSubscriptionId());
            foundUser.setSubscription(foundSubscription.orElse(null));
        }

        userService.updateUser(foundUser);
    }

    @DeleteMapping("/user/{user_id}")
    public void deleteUser(@PathVariable(value = "user_id") Long id,
                           Authentication authentication) throws ResourceNotFoundException {
        Optional<User> foundUserByIdOptional = userService.findById(id);
        if (!foundUserByIdOptional.isPresent()) {
            throw new ResourceNotFoundException("User not found on :: " + id);
        }

        Optional<User> foundUserByAuthenticationOptional = userService.findByUsername(authentication.getName());
        if (!foundUserByAuthenticationOptional.isPresent()) {
            throw new ResourceNotFoundException("Authenticated user not found on :: " + authentication.getName());
        }


        String foundUserByIdName = foundUserByIdOptional
                .get()
                .getUsername();
        String foundUserByAuthenticationName = foundUserByAuthenticationOptional
                .get()
                .getUsername();

        if (foundUserByAuthenticationName.equalsIgnoreCase(foundUserByIdName)) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Enda kasutajat ei ole võimalik kustutada!");
        }


        User foundUserById = foundUserByIdOptional.get();
        foundUserById.setStatus(Status.DELETED);
        userService.updateUser(foundUserById);
    }

    @PatchMapping("/user/{user_id}")
    public void deleteUserSubscription(@PathVariable(value = "user_id") Long id) throws ResourceNotFoundException {
        Optional<User> foundUserByIdOptional = userService.findById(id);
        if (!foundUserByIdOptional.isPresent()) {
            throw new ResourceNotFoundException("User not found on :: " + id);
        }

        User foundUser = foundUserByIdOptional.get();
        foundUser.setSubscription(null);

        userService.updateUser(foundUser);
    }

    private User convertToEntity(UserDto userDto) {
        return modelMapper.map(userDto, User.class);
    }

    private UserDto convertToDto(User user) {
        return modelMapper.map(user, UserDto.class);
    }
}
