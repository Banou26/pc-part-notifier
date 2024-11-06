import { chromium } from 'playwright'

const headlessBrowser = await chromium.launch()
const headfulBrowser = await chromium.launch({ headless: false })
const headfulContext = await headfulBrowser.newContext()

const context = await headlessBrowser.newContext()

const defaultPage = await context.newPage()
await defaultPage.goto('https://www.google.fr/')

const productName = '9800X3D'

const checkLDLC = async () => {
  const page = await context.newPage()
  await page.goto('https://www.ldlc.com/recherche/9800X3D/')
  const elem = await page.$('.listing-product')
  const text = await elem.textContent()
  if (text.includes(productName)) {
    triggerSound()
  }
  await page.close()
}

const checkMateriel = async () => {
  const page = await context.newPage()
  await page.goto('https://www.materiel.net/recherche/9800X3D/')
  const elem = await page.$('.listing-product')
  const text = await elem.textContent()
  if (text.includes(productName)) {
    triggerSound()
  }
  await page.close()
}

const triggerSound = async () => {
  for (let i = 0; i < 10; i++) {
    const youtubePage = await headfulContext.newPage()
    await youtubePage.goto('https://www.youtube.com/watch?v=4FxCPS8jKGQ')
    try {
      await youtubePage.click('#content > div.body.style-scope.ytd-consent-bump-v2-lightbox > div.eom-buttons.style-scope.ytd-consent-bump-v2-lightbox > div:nth-child(1) > ytd-button-renderer:nth-child(2) > yt-button-shape > button > yt-touch-feedback-shape > div > div.yt-spec-touch-feedback-shape__fill')
    } catch (err) {
      console.log(err)
    }
  }
}

const checkProviders = () => {
  checkLDLC()
  checkMateriel()
}

setInterval(checkProviders, 30_000)

checkProviders()
