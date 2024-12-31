// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

/** @type {import('next').NextConfig} */

const dotEnv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const { resolve } = require('path');

const myEnv = dotEnv.config({
  path: resolve(__dirname, '../../.env'),
});
dotenvExpand.expand(myEnv);

const {
  AD_SERVICE_ADDR = '',
  CART_SERVICE_ADDR = '',
  CHECKOUT_SERVICE_ADDR = '',
  CURRENCY_SERVICE_ADDR = '',
  PRODUCT_CATALOG_SERVICE_ADDR = '',
  RECOMMENDATION_SERVICE_ADDR = '',
  SHIPPING_SERVICE_ADDR = '',
  ENV_PLATFORM = '',
  OTEL_EXPORTER_OTLP_TRACES_ENDPOINT = '',
  OTEL_SERVICE_NAME = 'frontend',
  PUBLIC_OTEL_EXPORTER_OTLP_TRACES_ENDPOINT = '',
  CORALOGIX_RUM_ENABLED = '',
  CORALOGIX_RUM_ENV = '',
  CORALOGIX_RUM_APP = '',
  CORALOGIX_RUM_KEY,
  CORALOGIX_RUM_VERSION = '',
  CORALOGIX_RUM_USER_EMAIL = '',
  CORALOGIX_RUM_USER_NAME = '',
  CORALOGIX_RUM_USER_ID = '',
  CORALOGIX_RUM_USER_METADATA = '',
} = process.env;


const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  swcMinify: true,
  productionBrowserSourceMaps: true,
  compiler: {
    styledComponents: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.http2 = false;
      config.resolve.fallback.tls = false;
      config.resolve.fallback.net = false;
      config.resolve.fallback.dns = false;
      config.resolve.fallback.fs = false;
      config.devtool = 'source-map';
    }

    return config;
  },
  env: {
    AD_SERVICE_ADDR,
    CART_SERVICE_ADDR,
    CHECKOUT_SERVICE_ADDR,
    CURRENCY_SERVICE_ADDR,
    PRODUCT_CATALOG_SERVICE_ADDR,
    RECOMMENDATION_SERVICE_ADDR,
    SHIPPING_SERVICE_ADDR,
    OTEL_EXPORTER_OTLP_TRACES_ENDPOINT,
    NEXT_PUBLIC_PLATFORM: ENV_PLATFORM,
    NEXT_PUBLIC_OTEL_SERVICE_NAME: OTEL_SERVICE_NAME,
    NEXT_PUBLIC_OTEL_EXPORTER_OTLP_TRACES_ENDPOINT: PUBLIC_OTEL_EXPORTER_OTLP_TRACES_ENDPOINT,
    NEXT_PUBLIC1CORALOGIX_RUM_ENABLED: CORALOGIX_RUM_ENABLED,
    NEXT_PUBLIC_CORALOGIX_RUM_ENV: CORALOGIX_RUM_ENV,
    NEXT_PUBLIC_CORALOGIX_RUM_APP: CORALOGIX_RUM_APP,
    NEXT_PUBLIC_CORALOGIX_RUM_KEY: CORALOGIX_RUM_KEY,
//    CORALOGIX_RUM_VERSION,
//    CORALOGIX_RUM_USER_EMAIL,
//    CORALOGIX_RUM_USER_NAME,
//    CORALOGIX_RUM_USER_ID,
//    CORALOGIX_RUM_USER_METADATA,
  },
  images: {
    loader: "custom",
    loaderFile: "./utils/imageLoader.js"
  }
};

     module.exports = nextConfig;
