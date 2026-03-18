package com.example.referral.controller;

import com.example.referral.dto.TreeNodeDTO;
import com.example.referral.service.TreeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tree")
public class TreeController {

    @Autowired
    private TreeService treeService;

    @GetMapping("/subtree/{uid}")
    public ResponseEntity<TreeNodeDTO> getSubtree(@PathVariable String uid) {
        return ResponseEntity.ok(treeService.getSubtree(uid));
    }
}
