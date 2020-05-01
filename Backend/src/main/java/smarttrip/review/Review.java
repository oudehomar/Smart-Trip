package smarttrip.review;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.sun.istack.NotNull;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import smarttrip.entry.Entry;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name="reviews")
public class Review {



	
	
	
	@Id
	@NotNull
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Integer id;
	
	private Double averageRating;

	
	@Min(0)
	@Max(5)
	private Double cleanness;

	@Min(0)
	@Max(5)
	private Double friendliness;

	@Min(0)
	@Max(5)
	private Double foodQuality;

	@Min(0)
	@Max(5)
	private Double ambience;

	@Min(0)
	@Max(5)
	private Double familyFriendly;

	@Size(min= 0, max = 255)
	private String comment;
	
	@NotBlank
	private String author;
	
	
	public Double getAverageRating() {
		
		return (cleanness+friendliness+foodQuality+ambience+familyFriendly)/5;
	}
	
	


	

	@JsonBackReference
	@ManyToOne
	@JoinColumn(name = "establishment_id")
	private Entry rootEntity;


	
	

}
