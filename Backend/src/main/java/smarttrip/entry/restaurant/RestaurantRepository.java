package smarttrip.entry.restaurant;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Integer> {
	
	List<Restaurant> findByCityIgnoreCase(String city);

	List<Restaurant> findByCityIgnoreCaseOrderByRatingDesc(String city);

	List<Restaurant> findByTypeAndCityIgnoreCaseContains(EnumsRestaurant.restaurantType type, String city);

	List<Restaurant> findByTypeAndCityIgnoreCaseContainsAndRatingGreaterThanEqualOrderByRatingAsc(
			EnumsRestaurant.restaurantType type, String city, Double rating);

	List<Restaurant> findByCityIgnoreCaseAndRatingGreaterThanEqualOrderByRatingAsc(String city, Double rating);

	List<Restaurant> findByRatingGreaterThanEqual(Double rating);
	
	List<Restaurant> findByTypeAndRatingGreaterThanEqual(EnumsRestaurant.restaurantType type,Double rating);

	List<Restaurant> findByTypeOrderByRatingDesc(EnumsRestaurant.restaurantType type);

	List<Restaurant> findByNameIgnoreCaseContains(String name);

	List<Restaurant> findByCityIgnoreCaseAndNameIgnoreCaseContains(String city, String name);

}
