package com.fnr.confiar;

import com.fnr.confiar.services.MessageService;

import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {

  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/**").allowedMethods("GET", "POST","PUT", "DELETE");
  }

  @Bean
  public MessageSource messageSource() {
    ReloadableResourceBundleMessageSource messageSource = new ReloadableResourceBundleMessageSource();
    
    messageSource.setBasename("classpath:messages");
    messageSource.setDefaultEncoding("UTF-8");

    return messageSource;
  }

  @Bean
  public MessageService messageService() {
    return MessageService.getInstance();
  }

  // @Bean
  // public LocaleChangeInterceptor localeChangeInterceptor() {
  //     LocaleChangeInterceptor lci = new LocaleChangeInterceptor();
  //     lci.setParamName("lang");
  //     return lci;
  // }
  
  // @Override
  // public void addInterceptors(InterceptorRegistry registry) {
  //     registry.addInterceptor(localeChangeInterceptor());
  // }
    
}
