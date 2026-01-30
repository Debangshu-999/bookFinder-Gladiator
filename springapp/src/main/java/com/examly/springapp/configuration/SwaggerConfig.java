package com.examly.springapp.configuration;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;


@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI(){
        return new OpenAPI()
            .info(new Info()
                    .title("Book API Documentation")
                    .description("Automatically generated Swagger documentation for Book Management APIs"));
    }

    }


    // import org.springframework.stereotype.Controller;
    // import org.springframework.web.bind.annotation.GetMapping;
    
    // @Controller
    // public class HomeController {
    
    //     @GetMapping("/")
    //     public String redirectToSwagger() {
    //         return "redirect:/swagger-ui/index.html";
    //     }
    // }
    

