// playwright.config.js
module.exports = {
    timeout: 30000, // 30 segundos de timeout por teste
    retries: 1, // Número de vezes que os testes falhados serão reexecutados
    reporter: [['html', { outputFolder: 'reports' }]], // Gera um relatório em HTML
    use: {
      baseURL: 'https://www.saucedemo.com',
      headless: true, // Define o modo "sem cabeça" (não exibe o navegador)
      viewport: { width: 1280, height: 720 },
      screenshot: 'only-on-failure', // Tira screenshots em caso de falha
      video: 'retain-on-failure', // Mantém vídeos em caso de falha
    },
    projects: [
      { name: 'chromium', use: { browserName: 'chromium' } },
      { name: 'firefox', use: { browserName: 'firefox' } },
      { name: 'webkit', use: { browserName: 'webkit' } },
    ],
  };
  