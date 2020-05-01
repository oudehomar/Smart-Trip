package smarttrip.entry.hotel;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
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

import smarttrip.review.AvgRating;
import smarttrip.review.Review;

@RestController
@RequestMapping("/smart-trip/hotels/")
public class HotelController {

	@Autowired
	HotelRepository hotelRepository;

	Hotel hotel;
	List<Hotel> hotelList;
	List<Review> reviews;

	@GetMapping
	public List<Hotel> fetchAll() {

		hotelList = hotelRepository.findAll();
		setAvgRating(hotelList);
		return hotelList;

	}

	@PostMapping
	public Hotel add(@Valid @RequestBody Hotel hotel) {
		return hotelRepository.save(hotel);

	}

	@DeleteMapping("{id}")
	public ResponseEntity<?> delete(@PathVariable Integer id) {
		hotelRepository.deleteById(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);

	}

	@PutMapping("{id}")
	public ResponseEntity<?> edit(@Valid @PathVariable Integer id, @Valid @RequestBody Hotel hotel) {

		if (!hotelRepository.existsById(id)) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		hotel.setId(id);
		hotelRepository.save(hotel); // save is UPDATE because restaurant has existing id
		return new ResponseEntity<Hotel>(hotel, HttpStatus.OK);

	}

	@GetMapping("findbyid/{id}")
	public ResponseEntity<?> findById(@Valid @PathVariable Integer id) {

		hotelRepository.findById(id);
		return new ResponseEntity<Optional<Hotel>>(hotelRepository.findById(id), HttpStatus.OK);
	}

	@GetMapping("reviews/{id}")
	public ResponseEntity<?> findReviewList(@PathVariable Integer id) {
		Optional<Hotel> hotel;
		List<Review> reviewList;
		hotel = hotelRepository.findById(id);
		reviewList = hotel.get().getReviewList();

		return new ResponseEntity<List<Review>>(reviewList, HttpStatus.OK);

	}

	@GetMapping("/avgrevstats/{id}")
	public ResponseEntity<AvgRating> sendAvgRevStats(@PathVariable Integer id) {

		hotel = hotelRepository.findById(id).get();
		reviews = hotel.getReviewList();
		AvgRating avgReviewStats = new AvgRating();

		Double avgAmbience = 0.0;
		Double avgClean = 0.0;
		Double avgFood = 0.0;
		Double avgFamily = 0.0;
		Double avgFriendly = 0.0;
		Double avgTotalRating = 0.0;

		if (!reviews.isEmpty()) {

			for (Review review : reviews) {
				avgAmbience += review.getAmbience();
				avgClean += review.getCleanness();
				avgFood += review.getFoodQuality();
				avgFamily += review.getFamilyFriendly();
				avgFriendly += review.getFriendliness();

			}

			avgReviewStats.setAvgAmbience(avgAmbience / reviews.size());
			avgReviewStats.setAvgClean(avgClean / reviews.size());
			avgReviewStats.setAvgFood(avgFood / reviews.size());
			avgReviewStats.setAvgFamily(avgFamily / reviews.size());
			avgReviewStats.setAvgFriendly(avgFriendly / reviews.size());
			avgReviewStats.setAvgTotalRating(
					(avgReviewStats.getAvgAmbience() + avgReviewStats.getAvgClean() + avgReviewStats.getAvgFood()
							+ avgReviewStats.getAvgFamily() + avgReviewStats.getAvgFriendly()) / 5);

		}

		return new ResponseEntity<>(avgReviewStats, HttpStatus.OK);

	}

	public List<Hotel> setAvgRating(List<Hotel> hotelList) {

		for (Hotel hotel : hotelList) {
			AvgRating avgRating = new AvgRating();
			reviews = hotel.getReviewList();

			if (!reviews.isEmpty()) {

				Double avgAmbience = 0.0;
				Double avgClean = 0.0;
				Double avgFamily = 0.0;
				Double avgFood = 0.0;
				Double avgFriendly = 0.0;
				Double avgTotalRating = 0.0;

				for (Review review : reviews) {

					avgAmbience += review.getAmbience();
					avgClean += review.getCleanness();
					avgFamily += review.getFamilyFriendly();
					avgFood += review.getFoodQuality();
					avgFriendly += review.getFriendliness();
					avgTotalRating += review.getAverageRating();

				}

				avgRating.setAvgAmbience(avgAmbience / reviews.size());
				avgRating.setAvgClean(avgClean / reviews.size());
				avgRating.setAvgFood(avgFood / reviews.size());
				avgRating.setAvgFamily(avgFamily / reviews.size());
				avgRating.setAvgFriendly(avgFriendly / reviews.size());
				avgRating.setAvgTotalRating(avgTotalRating / reviews.size());

			} // Guard Ende

			hotel.setAvgRatingStats(avgRating);

		}

		return hotelList;

	}

	@PostMapping("findbyfilter")
	public List<Hotel> findAllbyFilter(@RequestBody Filter filterObject) {

		Stream<Hotel> filteredHotelList;

		filteredHotelList = hotelRepository.findAll().stream();

		if (filterObject.getMaxPrice() != null) {

			filteredHotelList = filteredHotelList.filter(hotel -> hotel.getPrice() <= filterObject.getMaxPrice());

		}

		if (filterObject.getStars() != null) {

			filteredHotelList = filteredHotelList.filter(hotel -> hotel.getStars() >= filterObject.getStars());

		}

		if (filterObject.getRating() != null) {

			filteredHotelList = filteredHotelList.filter(hotel -> hotel.getRating() >= filterObject.getRating());

		}

		if (filterObject.getHasRestaurant() != null && filterObject.getHasRestaurant() != false) {

			filteredHotelList = filteredHotelList.filter(
					hotel -> hotel.getRestaurant().booleanValue() == filterObject.getHasRestaurant().booleanValue());

		}

		if (filterObject.getHasSwimmingPool() != null && filterObject.getHasSwimmingPool() != false) {

			filteredHotelList = filteredHotelList.filter(hotel -> hotel.getSwimmingPool().booleanValue() == filterObject
					.getHasSwimmingPool().booleanValue());

		}

		if (filterObject.getHasFreeBreakfast() != null && filterObject.getHasFreeBreakfast() != false) {

			filteredHotelList = filteredHotelList.filter(
					hotel -> hotel.getBreakfast().booleanValue() == filterObject.getHasFreeBreakfast().booleanValue());

		}

		if (filterObject.getHasFreeParking() != null && filterObject.getHasFreeParking() != false) {

			filteredHotelList = filteredHotelList.filter(
					hotel -> hotel.getParking().booleanValue() == filterObject.getHasFreeParking().booleanValue());

		}

		if (filterObject.getCity() != null) {

			filteredHotelList = filteredHotelList.filter(hotel -> hotel.getCity().equals(filterObject.getCity()));

		}

		hotelList = filteredHotelList.collect(Collectors.toList());
		setAvgRating(hotelList);
		return hotelList;

	}

}
