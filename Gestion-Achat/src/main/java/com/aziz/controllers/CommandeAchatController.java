package com.aziz.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.aziz.entities.CommandeAchat;
import com.aziz.services.CommandeAchatService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/commandes-achat")
public class CommandeAchatController {

    @Autowired
    private CommandeAchatService commandeAchatService;

    // Création d'une commande d'achat
    @PostMapping
    public CommandeAchat createCommandeAchat(@RequestBody CommandeAchat commandeAchat) {
        return commandeAchatService.addCommandeAchat(commandeAchat);
    }

    // Récupération de toutes les commandes d'achat
    @GetMapping
    public List<CommandeAchat> getAllCommandesAchat() {
        return commandeAchatService.getAllCommandesAchat();
    }

    // Récupération d'une commande d'achat par ID
    @GetMapping("/{id}")
    public Optional<CommandeAchat> getCommandeAchatById(@PathVariable Long id) {
        return commandeAchatService.getCommandeAchatById(id);
    }

    // Mise à jour du statut d'une commande d'achat
    @PutMapping("/{id}")
    public CommandeAchat updateStatutCommande(@PathVariable Long id, @RequestParam String statut) {
        return commandeAchatService.updateStatutCommande(id, statut);
    }

    // Suppression d'une commande d'achat
    @DeleteMapping("/{id}")
    public void deleteCommandeAchat(@PathVariable Long id) {
        commandeAchatService.deleteCommandeAchat(id);
    }
}
