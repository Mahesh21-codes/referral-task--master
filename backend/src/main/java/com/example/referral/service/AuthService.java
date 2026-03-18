package com.example.referral.service;

import com.example.referral.dto.AuthResponse;
import com.example.referral.dto.LoginRequest;
import com.example.referral.dto.RegisterRequest;
import com.example.referral.model.ReferralRelationship;
import com.example.referral.model.TreePosition;
import com.example.referral.model.User;
import com.example.referral.repository.ReferralRelationshipRepository;
import com.example.referral.repository.TreePositionRepository;
import com.example.referral.repository.UserRepository;
import com.example.referral.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.UUID;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TreePositionRepository treePositionRepository;

    @Autowired
    private ReferralRelationshipRepository referralRelationshipRepository;

    @Autowired
    private PlacementService placementService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        // 1. Create User
        User user = User.builder()
                .username(request.getUsername())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .uid(generateRandomUid())
                .build();
        User savedUser = userRepository.save(user);
        if (savedUser == null)
            throw new RuntimeException("Failed to save user");
        user = savedUser;

        // 2. Determine Tree Position
        User referrer = null;
        if (request.getReferralUid() != null && !request.getReferralUid().isEmpty()) {
            referrer = userRepository.findByUid(request.getReferralUid())
                    .orElseThrow(() -> new RuntimeException("Referrer UID invalid"));
        }

        if (referrer != null) {
            // Use global placement order (NOT referrer-based)
            TreePosition placement = placementService.findNextPlacement();
            if (placement != null) {
                placement.setUser(user);
                treePositionRepository.save(placement);

                // Track social relationship (who referred whom)
                long count = referralRelationshipRepository.countByReferrerId(referrer.getId());
                ReferralRelationship rel = ReferralRelationship.builder()
                        .referrer(referrer)
                        .referred(user)
                        .placementOrder((int) count + 1)
                        .build();
                ReferralRelationship savedRel = referralRelationshipRepository.save(rel);
                if (savedRel == null)
                    throw new RuntimeException("Failed to save referral relationship");
            }
        } else {
            // First user/Root
            TreePosition rootPos = TreePosition.builder()
                    .user(user)
                    .level(0)
                    .positionName(null)
                    .build();
            TreePosition savedRoot = treePositionRepository.save(rootPos);
            if (savedRoot == null)
                throw new RuntimeException("Failed to save root position");
        }

        String token = jwtUtils.generateJwtToken(user.getUsername());
        return new AuthResponse(token, user.getUsername(), user.getUid());
    }

    public AuthResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

        User user = userRepository.findByUsername(request.getUsername()).orElseThrow();
        String token = jwtUtils.generateJwtToken(user.getUsername());
        return new AuthResponse(token, user.getUsername(), user.getUid());
    }

    private String generateRandomUid() {
        return UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }
}
