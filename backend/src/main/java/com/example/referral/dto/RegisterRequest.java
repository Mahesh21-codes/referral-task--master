package com.example.referral.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    private String username;
    private String password;
    private String referralUid; // Optional: UID of the person who referred this user
}
