package com.itf.SmartTrip;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import org.junit.Test;
import static org.junit.Assert.*;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import smarttrip.entry.hotel.Hotel;


public class JSONObjectTest {
	
	
	@Test
	public void givenBidirectionRelation_whenSerializingAsJSON_objectsNotEqual() 
			throws JsonProcessingException, IOException {
	
		
		
		List<Hotel> hotelList = new ArrayList<Hotel>();

		Hotel firstHotel = hotelList.get(0);
		
		Double avgClean = firstHotel.getAvgRatingStats().getAvgClean();
		
		
		String result = new ObjectMapper().writeValueAsString(avgClean);
		
		assertEquals("3.5", result );
		
}

	
	
	
	
	
}