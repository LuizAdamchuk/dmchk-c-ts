export const QlikConnection = {
  config: {
    saas: {
      host: import.meta.env.VITE_SAAS_HOST,
      prefix: import.meta.env.VITE_SAAS_PREFIX,
      port: import.meta.env.VITE_SAAS_PORT,
      isSecure: Boolean(import.meta.env.VITE_SAAS_IS_SECURE),
      webIntegrationId: import.meta.env.VITE_SAAS_WEB_INTEGRATION_ID,
    },
    app: {
      appId: import.meta.env.VITE_APP_APP_ID,
      chartId: import.meta.env.VITE_APP_CHART_ID,
      chartId1: import.meta.env.VITE_APP_CHART_ID1,
      chartId2: import.meta.env.VITE_APP_CHART_ID2,
    },
  },
};
