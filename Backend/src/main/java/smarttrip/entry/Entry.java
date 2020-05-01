package smarttrip.entry;





import java.util.ArrayList;
import java.util.List;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import smarttrip.review.Review;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "Entity_Type")
public abstract class Entry {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	

	@NotBlank
	@Column(nullable = false)
	@Size(min = 1, max = 40)
	private String name;

	@NotBlank
	@Column(nullable = false)
	private String address;

	@NotBlank
	@Column(nullable = false)
	@Size(min = 1, max = 20)
	private String telephone;

	@NotBlank
	@Column(nullable = false)
	@Size(min = 1, max = 20)
	private String city;

	@NotBlank
	@Column(nullable = false)
	@Size(min = 1, max = 500)
	private String description;

	private String website;

	private Double rating;


	
	
	@JsonManagedReference
	@OneToMany(mappedBy = "rootEntity")
	private List<Review> reviewList = new ArrayList<Review>();


	public void updateRating() {
		double avg = 0;
		for (Review review : reviewList) {
			avg += review.getAverageRating();
		}
		double wert = avg / reviewList.size();
		
		setRating((double) Math.round(wert * 100) / 100);
	}


	public void addReview(Review review) {
		review.setRootEntity(this);
		reviewList.add(review);
		updateRating();
	}


	public List<Review> getReviewList() {
		return reviewList;
	}


	public void setReviewList(List<Review> reviewList) {
		this.reviewList = reviewList;
	}

	
	
}
