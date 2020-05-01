package smarttrip.entry.event;

import javax.validation.constraints.NotNull;

import lombok.Data;

@Data
public class Artist {

	@NotNull
	private String name;
	private String descriptionString;
	
	public Artist(String name) {
		this.name = name;
	}
	
}
