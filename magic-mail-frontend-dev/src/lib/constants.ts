import homeIcon from '../assets/images/home-icon.svg'
import createIcon from '../assets/images/create-icon.svg'
import galleryIcon from '../assets/images/mail.svg'
import exploreIcon from '../assets/images/compass.svg'
import pricingIcon from '../assets/images/top-up-icon.svg'
import pricingMobileIcon from '../assets/images/top-up-icon-mobile.svg'
import autoIcon from '../assets/images/auto-icon.svg'
import generalIcon from '../assets/images/general-icon.svg'
import realisticIcon from '../assets/images/realistic-icon.svg'
import designIcon from '../assets/images/design-icon.svg'
import render3DIcon from '../assets/images/render3D-icon.svg'
import animeIcon from '../assets/images/anime-icon.svg'
import pixelIcon from '../assets/images/pixel-icon.svg'
import { FormState } from '../store/slice/formDataSlice'
import promptTabIcon from '../assets/images/generating-text.svg'
import styleTabIcon from '../assets/images/palette.svg'
import settingsTabIcon from '../assets/images/settings.svg'

export const SERVICE_ID = process.env.REACT_APP_SERVICE_ID || ''
export const TEMPLATE_ID = process.env.REACT_APP_TEMPLATE_ID || ''
export const PUBLIC_KEY = process.env.REACT_APP_PUBLIC_KEY || ''

export enum AppRoutes {
  home = '/',
  create = '/create',
  mails = '/mails',
  explore = '/explore',
  pricing = '/pricing',
  googleCallback = '/auth/google/callback',
  appleCallback = '/auth/apple/callback',
  terms = '/terms',
  privacy = '/privacy',
}

export enum ImageStyleTypes {
  auto = 'AUTO',
  general = 'GENERAL',
  realistic = 'REALISTIC',
  design = 'DESIGN',
  render3D = 'RENDER_3D',
  anime = 'ANIME',
  // pixelArt = 'PIXEL_ART',
}

export enum NotificationTypes {
  applyCodeSuccess = 'applyCodeSuccess',
  applyCodeWarning = 'applyCodeWarning',
  success = 'success',
  warning = 'warning',
  error = 'error',
  empty = 'empty',
}

export const notificationText: Record<string, string> = {
  success: 'Everything went well.\nThank you for joining the MagicMail family.',
  warning: 'Something went wrong.\nPlease reload the page and try again.',
  applyCodeSuccess: 'Code applied.\nEnjoy the magic!',
  applyCodeWarning: 'The code is invalid or expired.\nPlease double-check the code and try again.',
  empty: '',
}

export const imageStyles = [
  { icon: autoIcon, text: 'Random', type: ImageStyleTypes.auto },
  { icon: generalIcon, text: 'Universal', type: ImageStyleTypes.general },
  { icon: realisticIcon, text: 'Realistic', type: ImageStyleTypes.realistic },
  { icon: animeIcon, text: 'Anime', type: ImageStyleTypes.anime },
  { icon: designIcon, text: 'Design', type: ImageStyleTypes.design },
  { icon: render3DIcon, text: '3D Render', type: ImageStyleTypes.render3D },
  // { icon: pixelIcon, text: 'Pixel Art', type: ImageStyleTypes.pixelArt },
]

export const desktopTabs = [
  { name: 'Home', link: AppRoutes.home, icon: homeIcon },
  { name: 'Create', link: AppRoutes.create, icon: createIcon },
  { name: 'My mails', link: AppRoutes.mails, icon: galleryIcon },
  { name: 'Explore', link: AppRoutes.explore, icon: exploreIcon },
  { name: 'Top Up', link: AppRoutes.pricing, icon: pricingIcon },
]

export const mobileTabs = [
  { name: 'Home', link: AppRoutes.home, icon: homeIcon },
  { name: 'Create', link: AppRoutes.create, icon: createIcon },
  { name: 'My mails', link: AppRoutes.mails, icon: galleryIcon },
  { name: 'Explore', link: AppRoutes.explore, icon: exploreIcon },
  { name: 'Top Up', link: AppRoutes.pricing, icon: pricingMobileIcon },
]

export const formTabs = [
  { name: 'Prompt', icon: promptTabIcon },
  { name: 'Style', icon: styleTabIcon },
  { name: 'Settings', icon: settingsTabIcon },
]

export const tooltipShareText =
  'By default your email is private. Enabling this option will share generated email to community and will save you 1 credit.'

export const tooltipFontsText =
  'Some Email clients (like Gmail) don’t support linking external fonts, enable this option if you know what you’re doing.'
export const tooltipEventText =
  'By default, invitations are sent as private emails and are not shared with the community.'
export const tooltipButtonText =
  'Provide the link name and URL in the fields below, and it will be seamlessly integrated into the email.'

export const tagOptions = {
  settingTags: ['Die Hard', 'Grinch', 'Christmas', 'New Year', 'Bad Santa', 'Polar Express'],
  fromTags: [],
}

export const requiredFields: Array<keyof FormState> = ['signature_name', 'subject', 'setting']

export const PRICING_TABLE = [
  {
    title: 'Generate Email (Public Mode)',
    des: 'Your email content will be shared with the rest of the MagicMail community — great way to share and show off your creativity!',
    cost: 2,
  },
  {
    title: 'Generate Email (Private Mode)',
    des: 'Only your can see your creation.',
    cost: 3,
  },
  {
    title: 'Send Email',
    des: 'You can add up to 50 recipients at once.',
    cost: 1,
    per_recipient: 'per recipient',
  },
]
