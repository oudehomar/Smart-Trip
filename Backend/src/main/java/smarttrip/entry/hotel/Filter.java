package smarttrip.entry.hotel;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Filter {

	
	
	
	String city;
	Double maxPrice;
	Integer stars;
	Double rating;
	
	Boolean hasFreeParking;
	Boolean hasFreeBreakfast;
	Boolean hasFreeWifi;
	Boolean hasRestaurant;
	Boolean hasSwimmingPool;
	
}
