package smarttrip.entry.event;


import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.Table;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;

import org.springframework.boot.autoconfigure.domain.EntityScan;

import lombok.Data;
import smarttrip.entry.*;

@Data
@Entity
@Table(name = "events")
public class Event {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@NotBlank
	@NotNull
	@Size(min = 1, max = 40)
	private String name;

	@NotBlank
	@NotNull
	private String address;

	@NotBlank
	@NotNull
	@Size(min = 1, max = 20)
	private String telephone;

	@NotBlank
	@NotNull
	@Size(min = 1, max = 20)
	private String city;

	@NotBlank
	@NotNull
	@Size(min = 1, max = 500)
	private String description;

	private String website;
	
	@NotNull
	@Positive
	private Integer capacity;

	@NotNull
	@Positive
	private Double price;

	@NotNull
	@Enumerated(EnumType.STRING)
	@Column(name = "type_of_event")
	private TypeOfEvent typeOfEvent;

	@NotNull
	@Column(name = "start_date")
	private Date startDate;

	
	private String artists;
	
}
