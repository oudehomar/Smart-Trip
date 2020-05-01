package smarttrip.review;

import java.util.Iterator;

import java.util.List;

import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import smarttrip.entry.Entry;
import smarttrip.entry.hotel.Hotel;
import smarttrip.entry.hotel.HotelRepository;
import smarttrip.entry.restaurant.Restaurant;
import smarttrip.entry.restaurant.RestaurantRepository;

@RestController
@RequestMapping("/smart-trip/reviews")
public class ReviewsController {

	@Autowired
	ReviewRepository reviewrepository;

	@Autowired
	RestaurantRepository restaurantRepository;

	@Autowired
	HotelRepository hotelRepositiry;

	// Basic Features: find / findById / save / delete

	@GetMapping("/find")
	public List<Review> findAllReviews() {
		return reviewrepository.findAll();

	}

	/// get Reviews of one Restaurant:
	@GetMapping("/{id}")
	public ResponseEntity<?> getReviewsOfOne(@PathVariable Integer id) {

		Optional<Restaurant> maybeRestaurant = restaurantRepository.findById(id);
		Optional<Hotel> maybeHotel = hotelRepositiry.findById(id);

		if (maybeRestaurant.isPresent()) {

			Restaurant restaurant = maybeRestaurant.get();
			return new ResponseEntity<>(restaurant.getReviewList(), HttpStatus.OK);
		}

		else if (maybeHotel.isPresent()) {
			Hotel hotel = maybeHotel.get();
			return new ResponseEntity<>(hotel.getReviewList(), HttpStatus.OK);

		}

		return new ResponseEntity<>(HttpStatus.NOT_FOUND);

	}

	/// ----Addreview To A restaurant or Hotel// working on frontend now
	@PostMapping("/{id}/add")
	ResponseEntity<?> addReview(@PathVariable Integer id, @Valid @RequestBody Review review) {

		Optional<Restaurant> maybeRestaurant = restaurantRepository.findById(id);
		Optional<Hotel> maybeHotel = hotelRepositiry.findById(id);

		if (maybeRestaurant.isPresent()) {

			Restaurant restaurant = maybeRestaurant.get();
			restaurant.addReview(review);
			reviewrepository.save(review);
			return new ResponseEntity<>(HttpStatus.CREATED);
		} else if (maybeHotel.isPresent()) {
			Hotel hotel = maybeHotel.get();
			hotel.addReview(review);
			reviewrepository.save(review);
			return new ResponseEntity<>(hotel.getReviewList(), HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

	}

	/// AddReview To a restaurant
	@PostMapping("/restaurants/{id}/reviews")
	ResponseEntity<?> addReviewToRestaurant(@PathVariable Integer id, @Valid @RequestBody Review review) {

		Optional<Restaurant> maybeRestaurant = restaurantRepository.findById(id);
		if (!maybeRestaurant.isPresent()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		Restaurant restaurant = maybeRestaurant.get();

		restaurant.addReview(review);
		reviewrepository.save(review);
		return new ResponseEntity<Review>(HttpStatus.OK);

	}

	// 2:

	@PostMapping("/hotel/save/{id}")
	Optional<Review> addReviewToHotel(@PathVariable Integer id, @Valid @RequestBody Review review) {

		return hotelRepositiry.findById(id).map(hotel -> {
			review.setRootEntity(hotel);
			hotel.getReviewList().add(review);

			return reviewrepository.save(review);

		});
	}

	/// update a review of a restaurant and then update the avg Rating
	@PutMapping("update/{restaurantId}/{reviewId}")
	public ResponseEntity<?> updateReivew(@PathVariable Integer restaurantId, @PathVariable Integer reviewId,
			@RequestBody Review reviewF) {

		Entry rootTemp = reviewrepository.findById(reviewId).get().getRootEntity();
		if (reviewId != 0) {

			Iterator<Review> itr = rootTemp.getReviewList().iterator();
			while (itr.hasNext()) {
				Review review = itr.next();
				if (review.getId() == reviewId) {

					review = reviewF;
				}
			}
			rootTemp.updateRating();
			if (rootTemp.getReviewList().size() == 0) {
				rootTemp.setRating(0.0);

			}
		}
		reviewF.setId(reviewId);
		rootTemp.addReview(reviewF);
		reviewrepository.save(reviewF);
		rootTemp.updateRating();

		this.reviewrepository.save(reviewF);
		rootTemp.updateRating();

		return new ResponseEntity<>(HttpStatus.ACCEPTED);

	}

	@PostMapping("/save")
	ResponseEntity<Review> saveReview(@Valid @RequestBody Review review) {

		reviewrepository.save(review);
		return new ResponseEntity<Review>(HttpStatus.OK);

	}

	// Delete eine Review and then update the Rating
	@DeleteMapping("/delete/{id}")
	ResponseEntity<?> deleteReviewbyId(@PathVariable Integer id) {
		if (id != 0) {
			Entry rootTemp = reviewrepository.findById(id).get().getRootEntity();

			Iterator<Review> itr = rootTemp.getReviewList().iterator();
			while (itr.hasNext()) {
				Review review = itr.next();
				if (review.getId() == id) {
					itr.remove();

				}
			}

			rootTemp.updateRating();

			reviewrepository.deleteById(id);
			rootTemp.updateRating();
			if (rootTemp.getReviewList().size() == 0) {
				rootTemp.setRating(0.0);

			}

			return new ResponseEntity<Review>(HttpStatus.NO_CONTENT);

		}
		return new ResponseEntity<Review>(HttpStatus.NOT_FOUND);
	}

	@DeleteMapping("/deletehotrev/{id}")
	ResponseEntity<?> deleteHotelReviewbyId(@PathVariable Integer id) {
		if (id != 0) {
			reviewrepository.deleteById(id);
			return new ResponseEntity<Review>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<Review>(HttpStatus.NOT_FOUND);
	}

	@GetMapping("/find/{id}")
	ResponseEntity<Optional<Review>> findById(@PathVariable Integer id) {
		if (id != null) {
			return new ResponseEntity<Optional<Review>>(reviewrepository.findById(id), HttpStatus.OK);
		}
		return new ResponseEntity<Optional<Review>>(HttpStatus.NOT_FOUND);
	}

	// update Funktionen falls in Zukunft gebraucht:

	@PutMapping("/manage/{id}")
	ResponseEntity<Review> updateReview(@PathVariable Integer id, @RequestBody Review tmpReview) {
		if (id != null) {
			tmpReview.setId(id);
			reviewrepository.save(tmpReview);
			return new ResponseEntity<Review>(HttpStatus.ACCEPTED);
		}
		return new ResponseEntity<Review>(HttpStatus.NOT_FOUND);
	}

	@PutMapping("/updatecomment/{id}")
	Optional<Review> updateReviewComment(@PathVariable Integer id, @RequestBody Review review,
			@Valid @RequestParam String comment) {
		Review found = reviewrepository.findById(id).get();
		found.setComment(comment);
		reviewrepository.save(found);
		return reviewrepository.findById(id);

	}

	// Speichern einer neuen review in der jeweiligen ListofReviews im Estabishment

	@PostMapping("/restaurant/{estabishment_id}/reviews")
	Review saveReviewInEstablishment(@PathVariable Integer id, @RequestBody Review review) {

		review.setId(null);

		Restaurant restaurant = restaurantRepository.findById(id).get();

		restaurant.getReviewList().add(review);
		restaurantRepository.save(restaurant);
		return review;
	}

}
