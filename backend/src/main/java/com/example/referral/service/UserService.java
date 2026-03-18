package com.example.referral.service;

import com.example.referral.dto.UserProfileDTO;
import com.example.referral.model.ReferralRelationship;
import com.example.referral.model.TreePosition;
import com.example.referral.model.User;
import com.example.referral.repository.ReferralRelationshipRepository;
import com.example.referral.repository.TreePositionRepository;
import com.example.referral.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TreePositionRepository treePositionRepository;

    @Autowired
    private ReferralRelationshipRepository referralRelationshipRepository;

    public UserProfileDTO getUserProfile(String username) {
        User user = userRepository.findByUsername(username).orElseThrow();
        TreePosition pos = treePositionRepository.findByUserId(user.getId()).orElseThrow();

        String referrerUsername = pos.getParent() != null ? pos.getParent().getUsername() : "ROOT";
        long totalReferrals = referralRelationshipRepository.countByReferrerId(user.getId());

        return UserProfileDTO.builder()
                .username(user.getUsername())
                .uid(user.getUid())
                .ownPosition(pos.getPositionName() != null ? pos.getPositionName() : "ROOT")
                .totalReferrals(totalReferrals)
                .referrerUsername(referrerUsername)
                .build();
    }
}
