package smarttrip.entry.event;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepository extends JpaRepository<Event, Integer>{

	
	
	public void deleteById(Integer id);
	  
	public List<Event> findByCityIgnoreCaseAndPriceBetween(String city, Double minPrice, Double maxPrice);
	
	public List<Event> findByCityIgnoreCaseAndTypeOfEventAndPriceBetween (String city, TypeOfEvent typeOfEvent, Double minPrice, Double maxPrice);
}
