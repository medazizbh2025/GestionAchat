package com.aziz.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aziz.entities.CommandeAchat;
import com.aziz.repositories.CommandeAchatRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CommandeAchatService {

    @Autowired
    private CommandeAchatRepository commandeAchatRepository;

    public CommandeAchat addCommandeAchat(CommandeAchat commandeAchat) {
        return commandeAchatRepository.save(commandeAchat);
    }

    public List<CommandeAchat> getAllCommandesAchat() {
        return commandeAchatRepository.findAll();
    }

    public Optional<CommandeAchat> getCommandeAchatById(Long id) {
        return commandeAchatRepository.findById(id);
    }

    public CommandeAchat updateStatutCommande(Long id, String statut) {
        Optional<CommandeAchat> commandeAchat = commandeAchatRepository.findById(id);
        if (commandeAchat.isPresent()) {
            CommandeAchat updatedCommande = commandeAchat.get();
            updatedCommande.setStatut(statut);
            return commandeAchatRepository.save(updatedCommande);
        }
        return null;
    }

    public void deleteCommandeAchat(Long id) {
        commandeAchatRepository.deleteById(id);
    }
}
