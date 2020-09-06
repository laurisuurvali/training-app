package ee.thenewyou.personaltrainer.controller.user;

import ee.thenewyou.personaltrainer.dto.MessageDto;
import ee.thenewyou.personaltrainer.model.Message;
import ee.thenewyou.personaltrainer.model.User;
import ee.thenewyou.personaltrainer.repository.MessageRepository;
import ee.thenewyou.personaltrainer.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.stream.Collectors;

@Controller
@Slf4j
public class WebSocketController {

    private final SimpMessagingTemplate template;
    private final MessageRepository messageRepository;
    private final UserService userService;
    private final ModelMapper modelMapper;


    @Autowired
    WebSocketController(SimpMessagingTemplate template,
                        MessageRepository messageRepository,
                        UserService userService,
                        ModelMapper modelMapper) {
        this.template = template;
        this.messageRepository = messageRepository;
        this.userService = userService;
        this.modelMapper = modelMapper;
    }

    @MessageMapping("/send/message")
    public void sendMessage(@Payload MessageDto messageDto
    ) {
        log.warn("In sendMessage: {}", messageDto.getUserUsername());

        User messageUser = userService
                .findByUsername(messageDto.getUserUsername())
                .orElse(null);

        Message message = new Message();
        message.setContent(messageDto.getContent());
        message.setUser(messageUser);
        message.setTimeSent(messageDto.getTimeSent());

        messageRepository.save(message);
        this.template.convertAndSend("/topic/message", convertToDto(message));
    }

    @SubscribeMapping({"/messages"})
    public void getAllMessages() {
        log.warn("In SubscribeMapping");
        List<Message> messages = messageRepository.findAll();
        this.template.convertAndSend("/topic/messages",
                messages
                        .stream()
                        .map(this::convertToDto)
                        .collect(Collectors.toList()));
    }

    private Message convertToEntity(MessageDto messageDto) {
        return modelMapper.map(messageDto, Message.class);
    }

    private MessageDto convertToDto(Message message) {
        return modelMapper.map(message, MessageDto.class);
    }
}
