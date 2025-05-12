package com.aziz.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.aziz.entities.Fournisseur;


@Repository
public interface FournisseurRepository extends JpaRepository<Fournisseur, Long> {}
