export { UserRole } from './model/types/user'

export { isUserAdmin, isUserManager, getUserRoles } from './model/selectors/roleSelectors'

export { getUserInited } from './model/selectors/getUserInited/getUserInited'
export { getUserAuthData } from './model/selectors/getUserAuthData/getUserAuthData'

export { userReducer, userActions } from './model/slice/userSlice'
export type { User, UserSchema } from './model/types/user'

export { useJsonSettings } from './model/selectors/jsonSettings'
export { saveJsonSettings } from './model/services/saveJsonSettings'
