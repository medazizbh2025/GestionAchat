package com.aziz.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.aziz.entities.CommandeAchat;

@Repository
public interface CommandeAchatRepository extends JpaRepository<CommandeAchat, Long> {}
