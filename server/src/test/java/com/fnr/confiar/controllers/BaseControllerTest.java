package com.fnr.confiar.controllers;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

import java.util.List;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fnr.confiar.models.BaseModel;
import com.google.common.collect.ObjectArrays;

import org.junit.jupiter.api.BeforeEach;
import org.mockito.internal.matchers.apachecommons.ReflectionEquals;
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

  public void compareResponse(BaseModel<?> expectedRecord, BaseModel<?> actualRecord) {
    assertTrue(new ReflectionEquals(expectedRecord).matches(actualRecord));
  }

  public void compareResponses(List<BaseModel<?>> expectedRecords, List<BaseModel<?>> actualRecords) {
    for (int recordIndex = 0; recordIndex < expectedRecords.size(); recordIndex++) {
      compareResponse(expectedRecords.get(recordIndex), actualRecords.get(recordIndex));
    }
  }

}
