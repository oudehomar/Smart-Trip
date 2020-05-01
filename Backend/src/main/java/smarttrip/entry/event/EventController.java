package smarttrip.entry.event;

import lombok.RequiredArgsConstructor;
import lombok.experimental.PackagePrivate;
import smarttrip.entry.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.apache.tomcat.util.http.parser.HttpParser;
import org.hibernate.cfg.annotations.Nullability;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;
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
@RequestMapping("/smart-trip/events")
@RequiredArgsConstructor
public class EventController {


	private final EventRepository eventRepository;

	///////////// filtering based on city, typeOfEvent, price/////////////////
	@GetMapping
	public ResponseEntity<?> findEvents(@RequestParam(name = "city", required = false) String city,
			@RequestParam(name = "typeOfEvent", required = false) TypeOfEvent typeOfEvent,
			@RequestParam(name = "minPrice", required = false) Double minPrice,
			@RequestParam(name = "maxPrice", required = false) Double maxPrice) {
		if (city != null && typeOfEvent == null) {
			return new ResponseEntity<List<Event>>(
					eventRepository.findByCityIgnoreCaseAndPriceBetween(city, minPrice, maxPrice), HttpStatus.OK);
		}
		if (city != null && typeOfEvent != null) {
			return new ResponseEntity<List<Event>>(eventRepository.findByCityIgnoreCaseAndTypeOfEventAndPriceBetween(
					city, typeOfEvent, minPrice, maxPrice), HttpStatus.OK);
		}
			return new ResponseEntity<List<Event>>(eventRepository.findAll(Sort.by("name")), HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> findByName(@PathVariable Integer id) {
		return ResponseEntity.of(eventRepository.findById(id));
	}

	//////////////// add, update, delete//////////////////////////
	@PostMapping
	public ResponseEntity<Event> addEvent(@RequestBody @Valid Event event) {
		return new ResponseEntity<Event>(eventRepository.save(event), HttpStatus.CREATED);
	}

	@PutMapping("/update")
	public ResponseEntity<?> updateEvent(@RequestParam Integer id, @Valid @RequestBody Event newEvent) {
		if (!eventRepository.existsById(id)) {
			return new ResponseEntity<Event>(HttpStatus.NOT_FOUND);
		}
		newEvent.setId(id);
		eventRepository.save(newEvent);
		return new ResponseEntity<Event>(HttpStatus.NO_CONTENT);
	}

	@DeleteMapping("/delete")
	public ResponseEntity<?> deleteEvent(@RequestParam Integer id) {
		if (!eventRepository.existsById(id)) {
			return new ResponseEntity<Event>(HttpStatus.NOT_FOUND);
		}
		eventRepository.deleteById(id);
		return new ResponseEntity<Event>(HttpStatus.NO_CONTENT);
	}

	//////////// listing based on price/////////////////////
	@GetMapping("/increasingprice")
	public ResponseEntity<List<Event>> showAllEventWithIncreasingPrice() {
		return new ResponseEntity<List<Event>>(eventRepository.findAll(Sort.by("price")), HttpStatus.OK);
	}

	@GetMapping("/decreasingprice")
	public ResponseEntity<List<Event>> showAllEventWithDecreasingPrice() {
		return new ResponseEntity<List<Event>>(eventRepository.findAll(Sort.by(Sort.Direction.DESC, "price")),
				HttpStatus.OK);
	}

//////////////////listing based on capacity//////////////////////
	@GetMapping("/increasingcapacity")
	public ResponseEntity<List<Event>> showAllEventWithIncreasingCapacity() {
		return new ResponseEntity<List<Event>>(eventRepository.findAll(Sort.by("capacity")), HttpStatus.OK);
	}

	@GetMapping("/decreasingcapacity")
	public ResponseEntity<List<Event>> showAllEventWithDecreasingCapacity() {
		return new ResponseEntity<List<Event>>(eventRepository.findAll(Sort.by(Sort.Direction.DESC, "capacity")),
				HttpStatus.OK);
	}

}
