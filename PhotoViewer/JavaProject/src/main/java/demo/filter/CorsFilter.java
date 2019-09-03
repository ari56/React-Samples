package demo.filter;

import java.io.IOException;
import java.util.Enumeration;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;

/**
 * CORSフィルタクラス
 */
@Component
public class CorsFilter implements Filter {
	
	/**
	 * CORSフィルタメソッド
	 * @param req サーブレットリクエスト 
	 * @param res サーブレットレスポンス
 	 * @param chain フィルタチェイン 
	 */
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) 
    											throws IOException, ServletException {
        // モジュール結合時に必要ないが、念のため残す
    	HttpServletResponse response = (HttpServletResponse) res;
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
        response.setHeader("Access-Control-Max-Age", "3600");
        response.setHeader("Access-Control-Allow-Headers", "x-requested-with");
        
        Enumeration<String> headersEnum = ((HttpServletRequest) req).getHeaders
        										("Access-Control-Request-Headers");
        StringBuilder headers = new StringBuilder();
        String delim = "";
        while (headersEnum.hasMoreElements()) {
          headers.append(delim).append(headersEnum.nextElement());
          delim = ", ";
        }
        ((HttpServletResponse ) res).setHeader("Access-Control-Allow-Headers", headers.toString());
        chain.doFilter(req, res);
    }


}
