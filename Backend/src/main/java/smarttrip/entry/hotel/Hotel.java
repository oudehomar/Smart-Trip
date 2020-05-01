package smarttrip.entry.hotel;

import javax.persistence.DiscriminatorValue;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.sun.istack.Nullable;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import smarttrip.entry.Entry;
import smarttrip.review.AvgRating;
import smarttrip.review.Review;

@Getter
@Setter
@Entity
@DiscriminatorValue("Hotel")
@AllArgsConstructor
@NoArgsConstructor
public class Hotel extends Entry {

	@NotBlank
	private Double price;
	

	private Integer stars;
	
	@NotNull
	private Integer rooms;
	
	private Boolean swimmingPool;


	private Boolean restaurant;

	private Boolean breakfast;

	private Boolean wifi;

	private Boolean parking;
	
	private String email;
	
	@JsonManagedReference
	@OneToOne(mappedBy = "matchedReview")
	private AvgRating avgRatingStats;

}
