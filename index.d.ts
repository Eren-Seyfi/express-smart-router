import { Application, RequestHandler } from "express";

/**
 * express-smart-router için ayar seçenekleri
 */
export interface SmartRouterOptions {
  /**
   * Tüm route'lara eklenecek temel path (örn: '/api')
   */
  baseRoute?: string;

  /**
   * Konsola yüklenen route'ları yazmak için (varsayılan: true)
   */
  verbose?: boolean;

  /**
   * Yüklenecek dosya uzantılarını filtrelemek için RegExp (varsayılan: /\.js$/)
   */
  match?: RegExp;

  /**
   * Tüm route'lara uygulanacak middleware listesi
   */
  middleware?: RequestHandler[];
}

/**
 * express-smart-router:
 * Route dosyalarını klasör yapısına göre otomatik yükler.
 *
 * @param app Express uygulaması
 * @param routesDir Route dosyalarının bulunduğu klasör (absolute path)
 * @param options İsteğe bağlı ayarlar
 */
declare function smartRouter(
  app: Application,
  routesDir: string,
  options?: SmartRouterOptions
): void;

export = smartRouter;
