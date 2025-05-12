package com.aziz.entities;

import jakarta.persistence.*;

import lombok.*;

@Entity
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class HistoriqueAchats {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Fournisseur fournisseur;
    
    public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Fournisseur getFournisseur() {
		return fournisseur;
	}
	public void setFournisseur(Fournisseur fournisseur) {
		this.fournisseur = fournisseur;
	}
	public String getProduit() {
		return produit;
	}
	public void setProduit(String produit) {
		this.produit = produit;
	}
	public Integer getQuantite() {
		return quantite;
	}
	public void setQuantite(Integer quantite) {
		this.quantite = quantite;
	}
	public Integer getDelaiLivraison() {
		return delaiLivraison;
	}
	public void setDelaiLivraison(Integer delaiLivraison) {
		this.delaiLivraison = delaiLivraison;
	}
	private String produit;
    private Integer quantite;
    private Integer delaiLivraison;
}
