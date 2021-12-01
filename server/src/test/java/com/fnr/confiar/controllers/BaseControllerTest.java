package com.fnr.confiar.controllers;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.google.common.collect.ObjectArrays;

import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

@SpringBootTest
public abstract class BaseControllerTest {

  @Autowired
  private WebApplicationContext applicationContext;

  protected MockMvc mockMvc;

  @BeforeEach
  void setup() {
    this.mockMvc = MockMvcBuilders
      .webAppContextSetup(applicationContext)
      .alwaysDo(print())
      .build();
  }
  
  protected abstract String getBaseMapping();

  protected String buildMapping(String... mappingParts) {
    return String.join("/", ObjectArrays.concat(getBaseMapping(), mappingParts));
  }

  public String buildJsonPath(String... jsonPathParts) {
    return String.join(".", jsonPathParts);
  }

  public String objectToContent(Object object) throws JsonProcessingException {
    // for @RequestBody
    ObjectMapper mapper = new ObjectMapper();
    mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
    ObjectWriter objectWriter = mapper.writer().withDefaultPrettyPrinter();
    return objectWriter.writeValueAsString(object);
  }

}
