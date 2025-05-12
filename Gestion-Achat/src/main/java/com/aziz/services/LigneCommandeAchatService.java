package com.aziz.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aziz.entities.LigneCommandeAchat;
import com.aziz.repositories.LigneCommandeAchatRepository;

import java.util.List;

@Service
public class LigneCommandeAchatService {

    @Autowired
    private LigneCommandeAchatRepository ligneCommandeAchatRepository;

    public LigneCommandeAchat addLigneCommandeAchat(LigneCommandeAchat ligneCommandeAchat) {
        return ligneCommandeAchatRepository.save(ligneCommandeAchat);
    }

    public List<LigneCommandeAchat> getAllLignesCommandesAchat() {
        return ligneCommandeAchatRepository.findAll();
    }

    public LigneCommandeAchat getLigneCommandeAchatById(Long id) {
        return ligneCommandeAchatRepository.findById(id).orElse(null);
    }

    public void deleteLigneCommandeAchat(Long id) {
        ligneCommandeAchatRepository.deleteById(id);
    }
}
