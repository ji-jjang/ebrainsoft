package com.juny.finalboard.domain.post.announcement.dto;

import lombok.Builder;

@Builder
public record ResAnnouncementPost(
    Long id,
    String title,
    String content,
    Integer viewCount,
    Boolean isPinned,
    String createdBy,
    String createdAt,
    String categoryName,
    Boolean isNew) {}
