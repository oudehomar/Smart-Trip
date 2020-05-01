package smarttrip.application;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;


@ComponentScan(basePackages = {"smarttrip"})
@ComponentScan("smarttrip")
@EntityScan("smarttrip")
@EnableJpaRepositories("smarttrip")
@SpringBootApplication
public class SmartTripApplication {

	public static void main(String[] args) {
		SpringApplication.run(SmartTripApplication.class, args);
	}

}
