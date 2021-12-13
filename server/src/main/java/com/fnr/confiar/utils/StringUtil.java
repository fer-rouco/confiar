package com.fnr.confiar.utils;

import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;
import java.util.Base64;

import com.google.common.hash.Hashing;

public class StringUtil {
  
  public static String camelCaseToUnderscores(String camel) {
    String underscore;
    underscore = String.valueOf(Character.toLowerCase(camel.charAt(0)));
    for (int i = 1; i < camel.length(); i++) {
      underscore += Character.isLowerCase(camel.charAt(i)) ? String.valueOf(camel.charAt(i))
                   : "_" + String.valueOf(Character.toLowerCase(camel.charAt(i)));
    }
    return underscore;
  }

  public static String toSha256(String stringToHash) {
    return Hashing.sha256().hashString(stringToHash, StandardCharsets.UTF_8).toString();
  }

  public static String generateNewToken() {
      byte[] randomBytes = new byte[24];
      new SecureRandom().nextBytes(randomBytes);
      return Base64.getUrlEncoder().encodeToString(randomBytes);
  }

}
