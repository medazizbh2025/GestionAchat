package com.aziz.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aziz.entities.HistoriqueAchats;
import com.aziz.repositories.HistoriqueAchatsRepository;

import java.util.List;

@Service
public class HistoriqueAchatsService {

    @Autowired
    private HistoriqueAchatsRepository historiqueAchatsRepository;

    public HistoriqueAchats addHistoriqueAchat(HistoriqueAchats historiqueAchats) {
        return historiqueAchatsRepository.save(historiqueAchats);
    }

    public List<HistoriqueAchats> getAllHistoriqueAchats() {
        return historiqueAchatsRepository.findAll();
    }

    public HistoriqueAchats getHistoriqueAchatById(Long id) {
        return historiqueAchatsRepository.findById(id).orElse(null);
    }

    public List<HistoriqueAchats> getHistoriqueAchatByFournisseur(Long fournisseurId) {
        // A adapter en fonction de la relation entre les entités
        return historiqueAchatsRepository.findAll(); // A implémenter une méthode de filtre basée sur fournisseurId
    }

    public void deleteHistoriqueAchat(Long id) {
        historiqueAchatsRepository.deleteById(id);
    }
}
