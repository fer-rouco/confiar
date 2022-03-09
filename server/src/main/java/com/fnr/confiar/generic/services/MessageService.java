package com.fnr.confiar.generic.services;

import java.util.Locale;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;

public class MessageService implements ApplicationContextAware {

  /** MessageService Instance */
  private static MessageService instance = null;

  /** Spring Message source*/
  private ReloadableResourceBundleMessageSource messageSource;

  /** Application context */
  private ApplicationContext applicationContext;

  /** Return MessageService instance */
  public final static MessageService getInstance() {
    if (MessageService.instance == null) {
      synchronized(MessageService.class) {
        if (MessageService.instance == null)
          MessageService.instance = new MessageService();

      }
    }
    return instance;
  }

  /**  Return a message */    
  public String getMessage(String messageId) {
    messageSource = (ReloadableResourceBundleMessageSource) applicationContext.getBean("messageSource");
    Locale locale = LocaleContextHolder.getLocale();
    return messageSource.getMessage(messageId, null, locale);
  }

  @Override
  @Autowired
  public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
    this.applicationContext = applicationContext; 
  }
}
