package com.aziz.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.aziz.entities.HistoriqueAchats;
import com.aziz.services.HistoriqueAchatsService;

import java.util.List;

@RestController
@RequestMapping("/historiques-achats")
public class HistoriqueAchatsController {

    @Autowired
    private HistoriqueAchatsService historiqueAchatsService;

    // Création d'un historique d'achat
    @PostMapping
    public HistoriqueAchats createHistoriqueAchats(@RequestBody HistoriqueAchats historiqueAchats) {
        return historiqueAchatsService.addHistoriqueAchat(historiqueAchats);
    }

    // Récupération de tous les historiques d'achats
    @GetMapping
    public List<HistoriqueAchats> getAllHistoriquesAchats() {
        return historiqueAchatsService.getAllHistoriqueAchats();
    }

    // Récupération d'un historique d'achat par ID
    @GetMapping("/{id}")
    public HistoriqueAchats getHistoriqueAchatById(@PathVariable Long id) {
        return historiqueAchatsService.getHistoriqueAchatById(id);
    }

    // Suppression d'un historique d'achat
    @DeleteMapping("/{id}")
    public void deleteHistoriqueAchat(@PathVariable Long id) {
        historiqueAchatsService.deleteHistoriqueAchat(id);
    }
}
