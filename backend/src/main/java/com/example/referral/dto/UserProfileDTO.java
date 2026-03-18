package com.example.referral.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserProfileDTO {
    private String username;
    private String uid;
    private String ownPosition;
    private long totalReferrals;
    private String referrerUsername;
}
