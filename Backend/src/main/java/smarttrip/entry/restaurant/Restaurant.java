package smarttrip.entry.restaurant;

import javax.persistence.DiscriminatorValue;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import smarttrip.entry.Entry;

@Entity
@Getter
@Setter
@DiscriminatorValue("Restaurant")
@RequiredArgsConstructor
public class Restaurant extends Entry {

	@Enumerated(EnumType.STRING)
	private EnumsRestaurant.restaurantType type;

	private Integer seats;

	@NotNull
	private String openTime;

	private Boolean parking;

	private Boolean familyFriendly;

	private Boolean veganFriendly;


		
	}



