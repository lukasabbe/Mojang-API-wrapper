import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Mojang API wrapper",
  description: "An mojang API wrapper",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/about/about' }
    ],

    sidebar: [
      {
        text: 'About & Installation',
        items: [
          { text: 'About', link: '/about/about' },
          { text: 'Installation', link: '/about/Installation' },
        ]
      },
      {
        text: 'Open API',
        items: [
          { text: 'Get UUID', link: 'openapi/getuuid'}
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/lukasabbe/Mojang-API-wrapper' }
    ]
  }
})
