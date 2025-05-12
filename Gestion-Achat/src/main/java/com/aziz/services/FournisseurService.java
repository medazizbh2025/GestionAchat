package com.aziz.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aziz.entities.Fournisseur;
import com.aziz.repositories.FournisseurRepository;

import java.util.List;
import java.util.Optional;

@Service
public class FournisseurService {

    @Autowired
    private FournisseurRepository fournisseurRepository;

    public Fournisseur addFournisseur(Fournisseur fournisseur) {
        return fournisseurRepository.save(fournisseur);
    }

    public List<Fournisseur> getAllFournisseurs() {
        return fournisseurRepository.findAll();
    }

    public Optional<Fournisseur> getFournisseurById(Long id) {
        return fournisseurRepository.findById(id);
    }

    public Fournisseur updateFournisseur(Long id, Fournisseur fournisseur) {
        if (fournisseurRepository.existsById(id)) {
            fournisseur.setId(id);
            return fournisseurRepository.save(fournisseur);
        }
        return null;
    }

    public void deleteFournisseur(Long id) {
        fournisseurRepository.deleteById(id);
    }

    public double evaluerFournisseur(Long id) {
        // Ici, calculer la note du fournisseur basé sur certains critères
        Optional<Fournisseur> fournisseur = fournisseurRepository.findById(id);
        return fournisseur.isPresent() ? fournisseur.get().getNote() : 0.0;
    }
}
