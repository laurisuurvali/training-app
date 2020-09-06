package ee.thenewyou.personaltrainer.config;

import ee.thenewyou.personaltrainer.security.JwtUserDetailsService;
import ee.thenewyou.personaltrainer.security.jwt.JwtTokenProvider;
import ee.thenewyou.personaltrainer.security.jwt.JwtUser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

import java.util.List;
import java.util.Objects;

@Configuration
@EnableWebSocketMessageBroker
@Order(Ordered.HIGHEST_PRECEDENCE + 99)
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    private static final Logger logger = LoggerFactory.getLogger(WebSocketConfig.class);

    private final JwtTokenProvider jwtTokenUtil;
    private final JwtUserDetailsService userDetailsService;

    @Autowired
    public WebSocketConfig(JwtTokenProvider jwtTokenUtil,
                           JwtUserDetailsService userDetailsService) {
        this.jwtTokenUtil = jwtTokenUtil;
        this.userDetailsService = userDetailsService;
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry
                .addEndpoint("/socket")
                .setAllowedOrigins("*")
                .withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry
                .setApplicationDestinationPrefixes("/app", "/topic")
                .enableSimpleBroker("/topic");
    }

    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {

        registration.interceptors(new ChannelInterceptor() {
            @Override
            public Message<?> preSend(Message<?> message,
                                      MessageChannel channel) {
                StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
                assert accessor != null;
                logger.info("************ STOMP COMMAND ***** {} ", accessor.getCommand());
                logger.info("STOMP access destination {}", accessor.getDestination());
                if (StompCommand.CONNECT.equals(accessor.getCommand())) {
                    if (accessor.getNativeHeader("Authorization") != null) {

                        List<String> authorization = accessor.getNativeHeader("Authorization");
                        logger.info("Authorization: {}", authorization);
                        assert authorization != null;
                        String accessToken = authorization
                                .get(0)
                                .split(" ")[1];
                        logger.info("Access Token ----: {} ", accessToken);
                        String username = jwtTokenUtil.getUsername(accessToken);
                        JwtUser userDetails = (JwtUser) userDetailsService.loadUserByUsername(username);

                        if (username != null) {
                            logger.debug("security context was null, so authorizing user");

                            if (jwtTokenUtil.validateToken(accessToken)) {
                                UsernamePasswordAuthenticationToken authentication =
                                        new UsernamePasswordAuthenticationToken(
                                        userDetails, null, userDetails.getAuthorities());
                                logger.info("authorized user '{}', setting security context", username);
                                logger.info("authorities '{}', setting security context", userDetails.getAuthorities());

                                if (SecurityContextHolder
                                        .getContext()
                                        .getAuthentication() == null)
                                    SecurityContextHolder
                                            .getContext()
                                            .setAuthentication(authentication);
                                accessor.setUser(authentication);
                            }
                            if (StompCommand.SEND.equals(accessor.getCommand())) {
                                boolean isSent = channel.send(message);
                                logger.info("Message sent : {}  ", isSent);
                                if (isSent)
                                    return message;
                            }
                        }
                    }
                } else if (StompCommand.DISCONNECT.equals(accessor.getCommand())) {
                    Authentication authentication = SecurityContextHolder
                            .getContext()
                            .getAuthentication();
                    if (Objects.nonNull(authentication))
                        logger.info("Disconnected Auth : {} ", authentication.getName());
                    else
                        logger.info("Disconnected Sess : {}  ", accessor.getSessionId());
                }
                return message;
            }
        });
    }
}
