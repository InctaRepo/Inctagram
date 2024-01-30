export { Sidebar } from '@/shared/sidebar/ui/Sidebar'
export type { MenuSchema } from '@/shared/sidebar/model/slice/menuSlice'
export {
  menuReducer,
  setVariantIcon,
  setProfileFound,
} from '@/shared/sidebar/model/slice/menuSlice'
export { sidebarVariantIconSelector } from '@/shared/sidebar/model/selectors/sidebarVariantIconSelector'
export { profileFoundSelector } from '@/shared/sidebar/model/selectors/profileFoundSelector'
