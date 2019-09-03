package demo.filter;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * CORSフィルタ設定クラス
 */
@Configuration
public class FilterConfig {

	/**
	 * CORSフィルタ設定メソッド
	 * @return 設定されたBean
	 */
    @Bean
    public FilterRegistrationBean<CorsFilter> setCorsFilter() {
        
		FilterRegistrationBean<CorsFilter> bean = 
				new FilterRegistrationBean<CorsFilter>(new CorsFilter());
		bean.addUrlPatterns("/*");
		bean.setOrder(1);
		return bean;
    }
}
