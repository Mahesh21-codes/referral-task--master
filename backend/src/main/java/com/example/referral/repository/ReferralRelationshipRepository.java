package com.example.referral.repository;

import com.example.referral.model.ReferralRelationship;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ReferralRelationshipRepository extends JpaRepository<ReferralRelationship, Long> {
    List<ReferralRelationship> findByReferrerId(Long referrerId);

    long countByReferrerId(Long referrerId);
}
