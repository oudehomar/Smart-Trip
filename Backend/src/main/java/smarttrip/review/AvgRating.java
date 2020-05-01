package smarttrip.review;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class AvgRating {

	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Integer id;
	
	
	Double avgAmbience = 0.0;
	Double avgFriendly = 0.0;
	Double avgClean = 0.0;
	Double avgFood = 0.0;
	Double avgFamily = 0.0;
	Double avgTotalRating = 0.0;
	
	@JsonBackReference
	@OneToOne
	@JoinColumn(name = "review_match")
	Review matchedReview;
	
}
