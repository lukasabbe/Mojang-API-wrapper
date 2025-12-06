import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Mojang API wrapper",
  description: "An mojang API wrapper",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: 'about/about' }
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
          { text: 'Get Profile', link: '/openapi/profile'},
          { text: 'Profile functions', link: '/openapi/profileFunctions'},
          { text: 'Skin functions', link: '/openapi/skin'},
          { text: 'Banned servers', link: '/openapi/bannedServers'},
          { text: 'Versions', link: '/openapi/versions'},
        ]
      },
      {
        text: "Mojang Auth",
        items: [
          { text: 'Intro', link: '/authapi/intro' },
          { text: "Authentication", link: '/authapi/authentication' },
          { text: "authprofile", link: '/authapi/authprofile' },
        ]
      },
      {
        text: 'Tools',
        items: [
          { text: 'UUID tools', link: '/tools/uuidtool' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/lukasabbe/Mojang-API-wrapper' },
      { icon: 'npm', link: 'https://www.npmjs.com/package/minecraft-api-wrapper' },
      { icon: 'discord', link: "https://discord.lukasabbe.com/"}
    ]
  }
})
