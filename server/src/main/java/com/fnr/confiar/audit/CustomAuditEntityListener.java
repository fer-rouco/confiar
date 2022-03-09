package com.fnr.confiar.audit;

import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.time.LocalDateTime;
import java.util.Objects;

import com.fnr.confiar.config.persistence.BaseEntity;

public class CustomAuditEntityListener {

    public final static Long USER_SYSTEM_ID = 1L;

    @PreUpdate
    public void preUpdate(BaseEntity<?> baseEntity) throws UnknownHostException {

        baseEntity.setDateUpdate(LocalDateTime.now());
        if (Objects.isNull(baseEntity.getUserUpdate())) {
            baseEntity.setUserUpdate(USER_SYSTEM_ID);
        }
        if (Objects.isNull(baseEntity.getIpNumberUpdate())) {
            baseEntity.setIpNumberUpdate(InetAddress.getLocalHost().getHostAddress());
        }
    }

    @PrePersist
    public void prePersist(BaseEntity<?> baseEntity) throws UnknownHostException {
        baseEntity.setDateUpdate(LocalDateTime.now());
        if (Objects.isNull(baseEntity.getUserUpdate())) {
            baseEntity.setUserUpdate(USER_SYSTEM_ID);
        }
        baseEntity.setDateCreate(LocalDateTime.now());
        if (Objects.isNull(baseEntity.getUserCreate())) {
            baseEntity.setUserCreate(USER_SYSTEM_ID);
        }
        if (Objects.isNull(baseEntity.getIpNumberCreate())) {
            baseEntity.setIpNumberUpdate(InetAddress.getLocalHost().getHostAddress());
        }
        if (Objects.isNull(baseEntity.getIpNumberCreate())) {
            baseEntity.setIpNumberCreate(InetAddress.getLocalHost().getHostAddress());
        }
    }
}