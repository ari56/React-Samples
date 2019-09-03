package demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

/**
 * スプリングアプリケーション初期化クラス
 */
@ComponentScan
@EnableAutoConfiguration
@SpringBootApplication
public class Application {

	/**
	 * スプリングアプリケーション初期化メインメソッド
	 * @param args そのままスプリング初期化クラスに設定
	 */
   public static void main(String[] args) {
	   
        SpringApplication.run(Application.class, args);
    }
   
}