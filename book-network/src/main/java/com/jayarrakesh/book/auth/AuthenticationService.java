package com.jayarrakesh.book.auth;

import com.jayarrakesh.book.email.EmailService;
import com.jayarrakesh.book.email.EmailTemplateName;
import com.jayarrakesh.book.role.RoleRepository;
import com.jayarrakesh.book.security.JwtService;
import com.jayarrakesh.book.user.Token;
import com.jayarrakesh.book.user.TokenRepository;
import com.jayarrakesh.book.user.User;
import com.jayarrakesh.book.user.UserRepository;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;

//@Service
@RequiredArgsConstructor
public class AuthenticationService {

//    private final TokenRepository tokenRepository;
//    private final RoleRepository roleRepository;
//    private final PasswordEncoder passwordEncoder;
//    private final UserRepository userRepository;
//    private final EmailService emailService;
//    private final AuthenticationManager authenticationManager;
//    private final JwtService jwtService;
//    @Value("activation-url")
//    private String activationUrl;
//
//    public void register(@Valid RegistrationRequest request) throws MessagingException {
//
//        var userRole= roleRepository.findByName("USER")
//                .orElseThrow(()-> new IllegalStateException("ROLE USER was not initialized"));
//        var user= User.builder()
//                .firstname(request.getFirstname())
//                .lastname(request.getLastname())
//                .email(request.getEmail())
//                .password(passwordEncoder.encode(request.getPassword()))
//                .accountLocked(false)
//                .enabled(false)
//                .roles(List.of(userRole))
//                .build();
//
//        userRepository.save(user);
//        sendValidationEmail(user);
//    }
//
//    private void sendValidationEmail(User user) throws MessagingException {
//        var newToken=generateAndSaveActivationToken(user);
//        //send email;
//        emailService.sendEmail(
//                user.getEmail(),
//                user.fullName(),
//                EmailTemplateName.ACTIVATE_ACCOUNT,
//                activationUrl,
//                newToken,
//                "Account activation"
//        );
//    }
//
//    private String generateAndSaveActivationToken(User user) {
//        //generate a token
//        String generatedToken= generateActivationCode(6);
//        var token= Token.builder()
//                .token(generatedToken)
//                .createdAt(LocalDateTime.now())
//                .expiresAt(LocalDateTime.now().plusMinutes(15))
//                .user(user)
//                .build();
//        tokenRepository.save(token);
//        return generatedToken;
//    }
//
//    private String generateActivationCode(int length) {
//        String characters="0123456789";
//        StringBuilder codeBuilder=new StringBuilder();
//        SecureRandom secureRandom=new SecureRandom();
//        for(int i=0;i<length;i++){
//            int randonIndex= secureRandom.nextInt(characters.length());
//            codeBuilder.append(characters.charAt(randonIndex));
//        }
//        return codeBuilder.toString();
//    }
//
//    public AuthenticationResponse authenticate(AuthenticationResquest request) {
//        var auth = authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(
//                        request.getEmail(),
//                        request.getPassword()
//                )
//        );
//        var claims = new HashMap<String, Object>();
//        var user =((User)auth.getPrincipal());
//        claims.put("fullName", user.fullName());
//        var jwtToken = jwtService.generateToken(claims,user);
//        return AuthenticationResponse.builder().token(jwtToken).build();
//    }
//
////    @Transactional
//    public void activateAccount(String token) throws MessagingException {
//        Token savedToken = tokenRepository.findByToken(token)
//                .orElseThrow(()-> new RuntimeException("Invalid token"));
//        if(LocalDateTime.now().isAfter(savedToken.getExpiresAt())){
//            sendValidationEmail(savedToken.getUser());
//            throw  new RuntimeException("Activation token has expired. A new token has been sent to the same email address.");
//        }
//        var user = userRepository.findById(savedToken.getUser().getId())
//                .orElseThrow(()-> new UsernameNotFoundException("user not found"));
//        user.setEnabled(true);
//        userRepository.save(user);
//        savedToken.setValidatedAt(LocalDateTime.now());
//        tokenRepository.save(savedToken);
//
//    }

}
