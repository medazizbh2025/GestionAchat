package com.aziz.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.aziz.entities.Fournisseur;
import com.aziz.services.FournisseurService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/fournisseurs")
public class FournisseurController {

    @Autowired
    private FournisseurService fournisseurService;

    // Création d'un fournisseur
    @PostMapping
    public Fournisseur createFournisseur(@RequestBody Fournisseur fournisseur) {
        return fournisseurService.addFournisseur(fournisseur);
    }

    // Récupération de tous les fournisseurs
    @GetMapping
    public List<Fournisseur> getAllFournisseurs() {
        return fournisseurService.getAllFournisseurs();
    }

    // Récupération d'un fournisseur par ID
    @GetMapping("/{id}")
    public Optional<Fournisseur> getFournisseurById(@PathVariable Long id) {
        return fournisseurService.getFournisseurById(id);
    }

    // Mise à jour d'un fournisseur
    @PutMapping("/{id}")
    public Fournisseur updateFournisseur(@PathVariable Long id, @RequestBody Fournisseur fournisseur) {
        return fournisseurService.updateFournisseur(id, fournisseur);
    }

    // Suppression d'un fournisseur
    @DeleteMapping("/{id}")
    public void deleteFournisseur(@PathVariable Long id) {
        fournisseurService.deleteFournisseur(id);
    }

    // Evaluation d'un fournisseur
    @GetMapping("/eval/{id}")
    public double evaluerFournisseur(@PathVariable Long id) {
        return fournisseurService.evaluerFournisseur(id);
    }
}
