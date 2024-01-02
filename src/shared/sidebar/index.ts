export { Sidebar } from '@/src/shared/sidebar/ui/Sidebar'
export type { MenuState } from '@/src/shared/sidebar/model/slice/menuSlice'
export {
  menuReducer,
  setVariantIcon,
  setProfileFound,
} from '@/src/shared/sidebar/model/slice/menuSlice'
export { sidebarVariantIconSelector } from '@/src/shared/sidebar/model/selectors/sidebarVariantIconSelector'
export { profileFoundSelector } from '@/src/shared/sidebar/model/selectors/profileFoundSelector'
