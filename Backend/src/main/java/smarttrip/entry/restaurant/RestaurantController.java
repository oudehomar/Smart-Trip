package smarttrip.entry.restaurant;

import java.util.List;
import java.util.Optional;

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

@RestController
@RequestMapping("/smart-trip/restaurants/")
public class RestaurantController {

	@Autowired
	RestaurantRepository restaurantRepository;

	@GetMapping
	public List<Restaurant> findall(@RequestParam(name = "city", required = false) String city,
			@RequestParam(name = "type", required = false) EnumsRestaurant.restaurantType type,
			@RequestParam(name = "name", required = false) String name,
			@RequestParam(name = "rating", required = false) Double rating

	) {

		if (name != null && city != null) {
			return restaurantRepository.findByCityIgnoreCaseAndNameIgnoreCaseContains(city, name);
		}
		if (name != null) {
			return restaurantRepository.findByNameIgnoreCaseContains(name);
		}

		if (isValidSearchWithoutCity(city, type, rating)) {
			return restaurantRepository.findByTypeAndRatingGreaterThanEqual(type, rating);

		}

		if (isValidSearchForTypeAndRatingAndCity(city, type, rating)) {
			return restaurantRepository
					.findByTypeAndCityIgnoreCaseContainsAndRatingGreaterThanEqualOrderByRatingAsc(type, city, rating);
		}

		if (isValidCityAndType(city, type)) {
			return restaurantRepository.findByTypeAndCityIgnoreCaseContains(type, city);
		}

		if (isValidCityAndRating(city, rating)) {
			return restaurantRepository.findByCityIgnoreCaseAndRatingGreaterThanEqualOrderByRatingAsc(city, rating);
		}

		if (city == "undefined" || city == "") {
			city = null;
			return restaurantRepository.findAll();
		}

		if (city != null) {
			return restaurantRepository.findByCityIgnoreCase(city);

		}

		if (type != null) {
			return restaurantRepository.findByTypeOrderByRatingDesc(type);

		}

		if (rating != null) {
			return restaurantRepository.findByRatingGreaterThanEqual(rating);

		}

		return restaurantRepository.findAll();

	}

	private boolean isValidCityAndRating(String city, Double rating) {
		return city != null && rating != null;
	}

	private boolean isValidCityAndType(String city, EnumsRestaurant.restaurantType type) {
		return city != null && type != null;
	}

	private boolean isValidSearchForTypeAndRatingAndCity(String city, EnumsRestaurant.restaurantType type,
			Double rating) {
		return isValidCityAndType(city, type) && rating != null;
	}

	private boolean isValidSearchWithoutCity(String city, EnumsRestaurant.restaurantType type, Double rating) {
		return city == "undefined" || city == "" || city == null && type != null && rating != null;
	}

	@PostMapping
	public Restaurant add(@Valid @RequestBody Restaurant restaurant) {

		return restaurantRepository.save(restaurant);

	}

	@DeleteMapping("{id}")
	public ResponseEntity<?> delete(@PathVariable Integer id) {

		restaurantRepository.deleteById(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);

	}

	@PutMapping("{id}")
	public ResponseEntity<?> edit(@Valid @PathVariable Integer id, @Valid @RequestBody Restaurant restaurant) {
		if (!restaurantRepository.existsById(id)) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		restaurant.setId(null);
		restaurantRepository.save(restaurant); // save is UPDATE because restaurant has existing id
		return new ResponseEntity<Restaurant>(restaurant, HttpStatus.OK);

	}

	@GetMapping("findbyid/{id}")
	public ResponseEntity<?> findById(@Valid @PathVariable Integer id) {

		restaurantRepository.findById(id);
		return new ResponseEntity<Optional>(restaurantRepository.findById(id), HttpStatus.OK);
	}

}
