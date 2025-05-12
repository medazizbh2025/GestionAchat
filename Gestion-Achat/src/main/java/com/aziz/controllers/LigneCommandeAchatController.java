package com.aziz.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.aziz.entities.LigneCommandeAchat;
import com.aziz.services.LigneCommandeAchatService;

import java.util.List;

@RestController
@RequestMapping("/lignes-commandes-achat")
public class LigneCommandeAchatController {

    @Autowired
    private LigneCommandeAchatService ligneCommandeAchatService;

    // Création d'une ligne de commande d'achat
    @PostMapping
    public LigneCommandeAchat createLigneCommandeAchat(@RequestBody LigneCommandeAchat ligneCommandeAchat) {
        return ligneCommandeAchatService.addLigneCommandeAchat(ligneCommandeAchat);
    }

    // Récupération de toutes les lignes de commande d'achat
    @GetMapping
    public List<LigneCommandeAchat> getAllLignesCommandesAchat() {
        return ligneCommandeAchatService.getAllLignesCommandesAchat();
    }

    // Récupération d'une ligne de commande d'achat par ID
    @GetMapping("/{id}")
    public LigneCommandeAchat getLigneCommandeAchatById(@PathVariable Long id) {
        return ligneCommandeAchatService.getLigneCommandeAchatById(id);
    }

    // Suppression d'une ligne de commande d'achat
    @DeleteMapping("/{id}")
    public void deleteLigneCommandeAchat(@PathVariable Long id) {
        ligneCommandeAchatService.deleteLigneCommandeAchat(id);
    }
}
