package com.example.referral.repository;

import com.example.referral.model.TreePosition;
import com.example.referral.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface TreePositionRepository extends JpaRepository<TreePosition, Long> {
    Optional<TreePosition> findByUserId(Long userId);

    List<TreePosition> findByParentId(Long parentId);

    Optional<TreePosition> findByParentIdAndPositionName(Long parentId, String positionName);

    Optional<TreePosition> findByLevel(Integer level);
}
