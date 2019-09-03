package demo;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Restリクエスト処理クラス
 */
@RequestMapping(value = "/DemoSample")
@RestController
public class RestHandler {

	private static final Logger logger = LoggerFactory.getLogger(RestHandler.class);
	final static String JSON_PATH = "classpath:static/img/%s/info.json"; 
	final static String IMAGE_URL = "/img/%s/data%05d.jpg";
	final static String JSON_KEY = "data%05d.jpg";
	final static List<String> CATE_LIST = Arrays.asList( 
			"interior", "design", "art", "landscape", "picture", 
			"wallpaper", "wow", "whatsthis", "surprised");
	
	@Autowired
	ResourceLoader resourceLoader;
	
	/**
	 * Restリクエスト処理
	 * @param params リクエストパラメーター 
	 * @return JSONの文字列
	 */
	@RequestMapping(value="GetImg",produces="application/json;charset=UTF-8")
	public String rest(@RequestParam Map<String,String> params)  {

		String json = "";
		try {
			int seq = Integer.parseInt(params.get("seq"));
			if ( seq < 1 || seq > 200 ) {
				throw new NumberFormatException();
			}
			String cate = params.get("cate");
			if ( !CATE_LIST.contains(cate) ) {
				throw new IllegalArgumentException();
			}
			Resource resource = resourceLoader.getResource(
									String.format(JSON_PATH, cate));
	
			ObjectMapper mapper = new ObjectMapper();
			JsonNode node = mapper.readTree(resource.getURL());
			Map<String,String> map = new HashMap<String,String>();
			map.put("url", String.format(IMAGE_URL, cate, seq));
			map.put("title", node.get( String.format(JSON_KEY, seq)).asText()); 				
			json = mapper.writeValueAsString(map);
			
		} catch (NumberFormatException e) {
			logger.info("パラメーター{}が無効です 【{}】", "seq", params.get("seq") );
		} catch (IllegalArgumentException e) {
			logger.info("パラメーター{}が無効です 【{}】", "cate", params.get("cate") );
		} catch (Exception e) {
			e.printStackTrace();
		}
		return json;
	}

}
