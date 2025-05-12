package com.aziz.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.aziz.entities.LigneCommandeAchat;

@Repository
public interface LigneCommandeAchatRepository extends JpaRepository<LigneCommandeAchat, Long> {}
